/**
 * [Tlon-Sky] 光遇身高查询 / 历史身高
 * 调用 KevCore 网关 https://api.kevcore.cn/v1/gateway/sky-height-cn
 * 返回简易身高数据（当前身高 / 最高可达 / 最低可达），并自动记录历史身高
 *
 * 数据与 Key 配置：
 *   - API Key 与光翼查询/本月日历共用（config/config/kevcore.yaml 或环境变量 KEVCORE_API_KEY）
 *   - 绑定与历史记录存放在插件 JSON：plugins/Tlon-Sky/data/skyHeight/<用户ID>.json
 *
 * 流程说明（非好友需先绑定好友码）：
 *   1. 发送「光遇绑定好友码 xxxx-xxxx-xxxx」绑定好友码（12 位数字字母，可带连字符）
 *   2. 发送「光遇身高查询」：服务端通过好友码添加好友并读取数据，
 *      成功后自动保存返回的玩家ID，下次查询直接走玩家ID（查询时请保持游戏在线并同意好友申请）
 *   3. 发送「光遇历史身高」查看历史记录（自动记录最近100次）
 *
 * 参考：Kevin-plugin/apps/「光遇」身高查询.js（好友码绑定与查询流程一致），
 * 该参考插件该功能优先值为 -5000，本插件注册优先值 1，不会抢先处理同名指令。
 */
import fs from 'fs'
import { render } from '../components/index.js'
import { fileExists, getKevCoreApiKey, getPlainQQBotId, makeMarkdownSegment } from '../function/function.js'

const HEIGHT_API = 'https://api.kevcore.cn/v1/gateway/sky-height-cn'
const DATA_DIR = 'plugins/Tlon-Sky/data/skyHeight'
const MAX_RECORDS = 100 // 历史记录上限
const HISTORY_DISPLAY_COUNT = 10 // 历史身高展示条数
const RANK_DISPLAY_COUNT = 12 // 排行榜展示条数

// 服务端提示需要好友码的返回码（与参考插件一致）
const NEED_FRIEND_CODE_CODES = [409, 44004]

// 官方机器人（QQBot）判定：与 [Sky]攻略.js 保持一致
function isQQBotEvent(e) {
  const bot = e?.bot ?? globalThis.Bot?.[e?.self_id] ?? globalThis.Bot
  const adapterId = bot?.adapter?.id || bot?.adapter?.name || e?.adapter_name || ''
  const versionId = bot?.version?.id || bot?.version?.name || ''
  const platform = e?.platform || ''
  return adapterId === 'QQBot' || versionId === 'QQBot' || String(platform).startsWith('QQ-')
}

// 官方机器人 markdown（开头@用户），其他环境 at + 纯文本
function makeReply(e, markdownLines, textLines) {
  if (isQQBotEvent(e)) {
    const markdown = [`<@${getPlainQQBotId(e.user_id)}>`, '', ...markdownLines].join('\n')
    return [makeMarkdownSegment(markdown)]
  }
  return [segment.at(e.user_id), `\n${textLines.join('\n')}`]
}

function formatTime(date = new Date()) {
  const pad = n => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

// 身高数值展示（保留5位小数），非法值显示 未知
function formatHeightValue(value) {
  const number = Number(value)
  return Number.isFinite(number) ? number.toFixed(5) : '未知'
}

// 标准化玩家ID（36位UUID）
function normalizeSkyPlayerId(value) {
  const playerId = String(value || '').trim()
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(playerId)
    ? playerId
    : ''
}

// 标准化好友码：xxxxxxxxxxxx / xxxx-xxxx-xxxx → xxxx-XXXX-XXXX
function normalizeFriendCode(value) {
  let code = String(value || '').replace(/\s/g, '').toUpperCase()
  if (/^[A-Za-z0-9]{12}$/.test(code)) {
    code = code.replace(/([A-Za-z0-9]{4})(?=[A-Za-z0-9])/g, '$1-')
  }
  return /^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/.test(code) ? code : ''
}

// 昵称打码：保留首尾，中间打码（长度不足时全码/单码）
function maskName(name) {
  const text = String(name || '').trim()
  if (!text) return ''
  if (text.length === 1) return '*'
  if (text.length === 2) return text[0] + '*'
  if (text.length === 3) return text[0] + '*' + text[2]
  return text[0] + '**' + text[text.length - 1]
}

// 游戏ID打码：保留前8后4，中间省略
function maskGameId(id) {
  const text = String(id || '').trim()
  if (!text) return '未绑定ID'
  if (text.length <= 12) return text[0] + '***' + text.slice(-2)
  return text.slice(0, 8) + '…' + text.slice(-4)
}

// 采集用户昵称（随消息事件附带，可能为空）
function getSenderNickname(e) {
  return String(e?.sender?.card || e?.sender?.nickname || '').trim()
}

// QQ 头像直链：纯数字QQ走 q1.qlogo.cn；官方机器人 openid（uin:xxx 形式）走 q.qlogo.cn/qqapp（需 appid）
function getAvatarUrl(userId, appid = '') {
  const text = String(userId || '').trim()
  if (!text) return ''
  const plain = text.includes(':') ? text.split(':').pop() : text
  if (/^\d+$/.test(plain)) return `https://q1.qlogo.cn/g?b=qq&nk=${plain}&s=640`
  return appid && /^[A-Za-z0-9_-]{5,}$/.test(plain)
    ? `https://q.qlogo.cn/qqapp/${appid}/${plain}/640`
    : ''
}

// markdown 中打码昵称里的 * 会触发斜体/加粗语法，换成同形符号
function mdSafeNickname(nickname) {
  return String(nickname || '').replace(/\*/g, '∗')
}

function getUserDataFile(userId) {
  return `${DATA_DIR}/${userId}.json`
}

function getUserData(userId) {
  const file = getUserDataFile(userId)
  if (!fileExists(file)) {
    const initialData = { target_id: '', friend_code: '', nickname: '', records: [] }
    fs.writeFileSync(file, JSON.stringify(initialData, null, 2), 'utf8')
    return initialData
  }
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'))
    return {
      target_id: data.target_id || '',
      friend_code: data.friend_code || '',
      nickname: data.nickname || '',
      records: Array.isArray(data.records) ? data.records : []
    }
  } catch (error) {
    logger.error(`[光遇身高] 读取用户数据失败 ${file}: ${error.message}`)
    return { target_id: '', friend_code: '', nickname: '', records: [] }
  }
}

function saveUserData(userId, userData) {
  fs.writeFileSync(getUserDataFile(userId), JSON.stringify(userData, null, 2), 'utf8')
}

export class SkyHeight extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:身高查询',
      dsc: '光遇身高查询与历史身高记录',
      event: 'message',
      priority: 1,
      rule: [
        { reg: /^[#\/]?光遇身高查询$/, fnc: 'queryHeight' },
        { reg: /^[#\/]?光遇绑定好友码\s*(.*)$/, fnc: 'bindFriendCode' },
        { reg: /^[#\/]?(光遇)?历史身高$/, fnc: 'showHeightHistory' },
        { reg: /^[#\/]?(光遇)?身高排行榜$/, fnc: 'showHeightRank' }
      ]
    })
    this.apiKey = getKevCoreApiKey()
    // 历史身高数据目录
    if (!fileExists(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
  }

  // ========== 光遇身高查询 ==========
  async queryHeight(e) {
    try {
      if (!this.apiKey) {
        return e.reply(makeReply(e,
          ['查询失败：未配置 KevCore API Key（与光翼查询共用）', '请前往 https://api.kevcore.cn/ 获取 API Key 后，', '填入 config/config/kevcore.yaml 或环境变量 KEVCORE_API_KEY'],
          ['查询失败：未配置 KevCore API Key（与光翼查询共用）', '请前往 https://api.kevcore.cn/ 获取 API Key 后，', '填入 config/config/kevcore.yaml 或环境变量 KEVCORE_API_KEY']))
      }

      const userData = getUserData(e.user_id)
      const { target_id, friend_code } = userData

      // 未绑定任何身份：引导绑定好友码
      if (!target_id && !friend_code) {
        const guide = [
          '首次查询请先绑定好友码（非好友查询需要）',
          '发送：光遇绑定好友码xxxx-xxxx-xxxx',
          '绑定后发送 光遇身高查询 即可，请保持游戏账号在线并同意好友申请'
        ]
        return e.reply(makeReply(e,
          ['# 光遇身高查询', '', ...guide.map(g => `> ${g}`)],
          ['—— 光遇身高查询 ——', '', ...guide]))
      }

      // 查询策略（与参考插件一致）：
      //   1. 有玩家ID时优先用它查询，失败且提示需要好友码时回退好友码
      //   2. 仅有好友码（首次/非好友）时直接用好友码查询
      let data = null

      if (target_id) {
        try {
          data = await this.requestOnce(target_id)
        } catch (error) {
          // 服务端提示需要好友码时继续走好友码流程，其余错误直接抛出
          if (!NEED_FRIEND_CODE_CODES.includes(error.code)) throw error
        }
      }

      if (!data) {
        if (!friend_code) {
          throw new Error('查询失败：请先绑定好友码（发送 光遇绑定好友码xxxx-xxxx-xxxx），保持游戏在线并同意好友申请后重试')
        }
        data = await this.requestOnce(friend_code)
      }

      // 通过好友码查询成功 → 自动绑定返回的玩家ID，下次直接查询
      const discoveredTargetId = normalizeSkyPlayerId(data.target_id)
      const isNewTarget = Boolean(discoveredTargetId && discoveredTargetId !== target_id)
      if (isNewTarget) {
        userData.target_id = discoveredTargetId
      }

      // 记录历史身高（当前身高），并顺带更新昵称（用于本地排行榜，展示时会打码）
      const time = formatTime()
      const nickname = getSenderNickname(e)
      if (nickname) userData.nickname = nickname
      userData.records.unshift({ time, height: Number(data.current_height) })
      userData.records = userData.records.slice(0, MAX_RECORDS)
      saveUserData(e.user_id, userData)

      const current = formatHeightValue(data.current_height)
      const max = formatHeightValue(data.max_height)
      const min = formatHeightValue(data.min_height)
      const bindTip = isNewTarget ? '（已绑定该账号，下次可直接查询）' : ''

      return e.reply(makeReply(e,
        [
          '# 光遇身高查询',
          `> ${time}${bindTip}`,
          '',
          `- 当前身高：**${current}**`,
          `- 最高可达：${max}`,
          `- 最低可达：${min}`,
          '',
          '> 已自动记录到历史身高，发送「光遇历史身高」查看'
        ],
        [
          '—— 光遇身高查询 ——',
          `查询时间：${time}${bindTip}`,
          `当前身高：${current}`,
          `最高可达：${max}`,
          `最低可达：${min}`,
          '(已自动记录到历史身高，发送「光遇历史身高」查看)'
        ]))
    } catch (error) {
      logger.error(`[光遇身高] 查询失败: ${error.message}`)
      return e.reply(makeReply(e,
        [`身高查询失败：${error.message || '请稍后重试'}`],
        [`身高查询失败：${error.message || '请稍后重试'}`]))
    }
  }

  // ========== 光遇绑定好友码 xxxx-xxxx-xxxx ==========
  async bindFriendCode(e) {
    try {
      const raw = String(e.msg.match(/^[#\/]?光遇绑定好友码\s*(.*)$/)?.[1] || '')
        .replace(/[\u4e00-\u9fa5()（）]/g, '')
      const friendCode = normalizeFriendCode(raw)

      if (!friendCode) {
        return e.reply(makeReply(e,
          ['好友码格式错误，请检查后重试', '格式：光遇绑定好友码xxxx-xxxx-xxxx（12位数字字母）'],
          ['好友码格式错误，请检查后重试', '格式：光遇绑定好友码xxxx-xxxx-xxxx（12位数字字母）']))
      }

      const userData = getUserData(e.user_id)
      const nickname = getSenderNickname(e)
      if (nickname) userData.nickname = nickname
      userData.friend_code = friendCode
      // 换绑好友码时旧的玩家ID可能对应他人，一并清空，下次查询重新绑定
      userData.target_id = ''
      saveUserData(e.user_id, userData)

      return e.reply(makeReply(e,
        ['# 绑定成功', '', `> 已绑定好友码：\`${friendCode}\``, '', '> 发送「光遇身高查询」开始查询\n> 请保持游戏账号在线，并同意新好友申请'],
        ['—— 绑定成功 ——', `已绑定好友码：${friendCode}`, '发送 光遇身高查询 开始查询', '请保持游戏账号在线，并同意新好友申请']))
    } catch (error) {
      logger.error(`[光遇身高] 绑定失败: ${error.message}`)
      return e.reply(makeReply(e,
        ['绑定失败，请稍后重试'],
        ['绑定失败，请稍后重试']))
    }
  }

  // ========== 光遇历史身高 ==========
  async showHeightHistory(e) {
    try {
      const userData = getUserData(e.user_id)
      const records = userData.records || []

      if (records.length === 0) {
        return e.reply(makeReply(e,
          ['暂无身高记录，发送「光遇身高查询」记录第一条吧'],
          ['暂无身高记录，发送「光遇身高查询」记录第一条吧']))
      }

      const latest = records.slice(0, HISTORY_DISPLAY_COUNT)
      const lines = latest.map((record, index) => {
        const height = Number.isFinite(Number(record.height)) ? Number(record.height).toFixed(5) : '未知'
        return `${index + 1}. ${record.time}  身高 ${height}`
      })

      return e.reply(makeReply(e,
        [
          '# 光遇历史身高',
          `> 共 ${records.length} 条记录，展示最近 ${latest.length} 条`,
          '',
          ...lines,
          '',
          '> 发送「光遇身高查询」记录新数据'
        ],
        [
          '—— 光遇历史身高 ——',
          `共 ${records.length} 条记录，展示最近 ${latest.length} 条`,
          '',
          ...lines
        ]))
    } catch (error) {
      logger.error(`[光遇身高] 读取历史失败: ${error.message}`)
      return e.reply(makeReply(e,
        ['读取历史身高失败，请稍后重试'],
        ['读取历史身高失败，请稍后重试']))
    }
  }

  // ========== 光遇身高排行榜（仅本地数据） ==========
  async showHeightRank(e) {
    try {
      const entries = this.collectRankEntries()

      if (entries.length < 2) {
        return e.reply(makeReply(e,
          ['本地身高数据不足，暂时无法排行', '至少需要 2 位用户查询过身高哦～发送「光遇身高查询」即可参与'],
          ['本地身高数据不足，暂时无法排行', '至少需要 2 位用户查询过身高哦～发送「光遇身高查询」即可参与']))
      }

      // 按最新身高从高到低排列
      entries.sort((a, b) => b.height - a.height)

      if (isQQBotEvent(e)) {
        // 官方机器人：markdown 回复，头像使用直链（带尺寸）
        const appid = String(e?.bot?.info?.appid || '')
        return this.replyRankMarkdown(e, entries, appid)
      }

      // 普通环境：渲染排行榜图片
      const rows = entries.slice(0, RANK_DISPLAY_COUNT).map((entry, index) => ({
        rank: index + 1,
        medal: index < 3 ? ['🥇', '🥈', '🥉'][index] : '',
        avatar: getAvatarUrl(entry.userId),
        char: entry.nickname.slice(0, 1),
        nickname: entry.nickname,
        gameId: entry.gameId,
        height: entry.height.toFixed(5),
        time: entry.time
      }))

      await render('admin/SkyHeightRank', {
        rows: JSON.stringify(rows),
        total: entries.length,
        shown: rows.length,
        time: formatTime()
      }, { e, scale: 1.4, cache: false })
    } catch (error) {
      logger.error(`[光遇身高] 排行榜生成失败: ${error.message}`)
      return e.reply(makeReply(e,
        ['排行榜生成失败，请稍后重试'],
        ['排行榜生成失败，请稍后重试']))
    }
  }

  // 汇总本地所有用户的最新身高记录（含本地文件扫描与脏数据过滤）
  collectRankEntries() {
    const entries = []
    if (!fileExists(DATA_DIR)) return entries

    for (const fileName of fs.readdirSync(DATA_DIR)) {
      if (!fileName.endsWith('.json')) continue
      try {
        const data = JSON.parse(fs.readFileSync(`${DATA_DIR}/${fileName}`, 'utf8'))
        const latest = Array.isArray(data.records) && data.records.length ? data.records[0] : null
        const height = latest ? Number(latest.height) : NaN
        if (!Number.isFinite(height)) continue
        entries.push({
          userId: fileName.replace(/\.json$/, ''),
          nickname: maskName(data.nickname) || '匿名旅人',
          gameId: maskGameId(data.target_id),
          height,
          time: latest.time || ''
        })
      } catch (error) {
        logger.debug(`[光遇身高] 跳过无效排行数据 ${fileName}: ${error.message}`)
      }
    }
    return entries
  }

  // 官方机器人 markdown 排行榜：头像直链、尺寸适中，昵称/游戏ID打码
  replyRankMarkdown(e, entries, appid) {
    const medals = ['🥇', '🥈', '🥉']
    const top = entries.slice(0, RANK_DISPLAY_COUNT)
    const avatarSize = 64 // 头像声明尺寸 px（QQ markdown 图片需带尺寸，过大占位太高、过小看不清）

    const lines = [
      `<@${getPlainQQBotId(e.user_id)}>`,
      '',
      '# ☀️ 光遇身高排行榜',
      `> 本地排行 · 按最新身高从高到低 · 共 ${entries.length} 位玩家`,
      `> ${formatTime()}`,
      '***',
      ''
    ]

    top.forEach((entry, index) => {
      const avatarUrl = getAvatarUrl(entry.userId, appid)
      const avatarMd = avatarUrl
        ? `![头像 #${avatarSize}px #${avatarSize}px](${avatarUrl})　`
        : ''
      const rankLabel = index < 3 ? medals[index] : `${index + 1}`
      const nickname = mdSafeNickname(entry.nickname)
      lines.push(`${rankLabel} ${avatarMd}${nickname}｜${entry.gameId}｜**${entry.height.toFixed(5)}**`)
    })

    lines.push('', '> 昵称与游戏ID已打码保护隐私 · 数据仅来自本地查询记录')

    return e.reply([makeMarkdownSegment(lines.join('\n'))])
  }

  // ========== 接口请求（POST，20s 超时） ==========
  async requestOnce(target) {
    if (!target) throw new Error('缺少查询目标')

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 20000)

    try {
      const response = await fetch(HEIGHT_API, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey
        },
        body: JSON.stringify({ target_id: target }),
        signal: controller.signal
      })
      const result = await response.json().catch(() => ({}))

      if (Number(result.code) !== 0) {
        const error = new Error(result.msg || `接口返回码 ${result.code}`)
        error.code = Number(result.code)
        throw error
      }
      if (!result.data) {
        throw new Error('接口返回数据异常')
      }
      return result.data
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('查询超时，请稍后重试')
      }
      throw error
    } finally {
      clearTimeout(timeout)
    }
  }
}
