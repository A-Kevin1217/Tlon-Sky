import fetch from 'node-fetch'
import fs from 'fs'
import { getAppConfig } from '../function/function.js'

/**
 * Sky国服礼包查询插件（适配 Tlon-Sky 插件结构）
 */
export class SkyLiveGift extends plugin {
  constructor() {
    super({
      name: 'Sky国服礼包查询',
      dsc: 'Sky游戏国服礼包查询功能',
      event: 'message',
      priority: 5000,
      rule: [
        { reg: /^#?国服id绑定(.*)$/i, fnc: 'bindLiveId' },
        { reg: /^#?国服id切换(.*)$/i, fnc: 'switchLiveId' },
        { reg: /^#?国服礼包查询$/i, fnc: 'queryLiveGift' },
        { reg: /^#?国服id列表$/i, fnc: 'listLiveIds' },
        { reg: /^#?礼包查询帮助$/i, fnc: 'liveHelp' }
      ]
    })

    this.API_BASE = 'https://api.t1qq.com/api/sky/sc/mfskygift'

    // 从配置文件读取 API Key，支持用户自行配置
    const config = getAppConfig('国服礼包查询')
    this.API_KEY = config.API_KEY || ''
    this.userDataPath = process.cwd() + '/plugins/Tlon-Sky/data/sky_live_users/'

    // 确保数据目录存在
    if (!fs.existsSync(this.userDataPath)) {
      fs.mkdirSync(this.userDataPath, { recursive: true })
    }
  }

  getUserDataFile(userId) {
    return `${this.userDataPath}${userId}.json`
  }

  getUserData(userId) {
    const file = this.getUserDataFile(userId)
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf-8'))
    }
    return { ids: [], currentIndex: 0 }
  }

  saveUserData(userId, data) {
    const file = this.getUserDataFile(userId)
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
  }

  async liveHelp(e) {
    const msg = [
      '【Sky国服礼包查询说明】\n',
      '━━━━━━━━━━━━━━━━━━',
      '🔗 ID管理：',
      '#国服id绑定 [id] - 绑定国服账号ID',
      '#国服id列表 - 查看已绑定的ID',
      '#国服id切换 [序号] - 切换当前使用的ID',
      '',
      '━━━━━━━━━━━━━━━━━━',
      '🎁 礼包查询：',
      '#国服礼包查询 - 查询当前ID的礼包',
      '',
      '━━━━━━━━━━━━━━━━━━',
      '💡 示例：',
      '#国服id绑定 c84e795e-a6c2-4b7f-8187-91e2df511963',
      '#国服id切换 1',
      '#国服礼包查询',
      '',
      '━━━━━━━━━━━━━━━━━━',
      '📝 说明：',
      '• 每个用户可绑定多个国服ID',
      '• 使用序号切换不同账号',
      '• 礼包数据来自第三方API'
    ]
    await e.reply(msg.join('\n'))
    return true
  }

  async bindLiveId(e) {
    try {
      const idMatch = e.msg.replace(/^#?国服id绑定/i, '').trim()
      if (!idMatch) {
        await e.reply('❌ 请提供国服账号ID\n格式：#国服id绑定 [id]\n示例：#国服id绑定 c84e795e-a6c2-4b7f-8187-91e2df511963')
        return true
      }

      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      if (!uuidRegex.test(idMatch)) {
        await e.reply('❌ ID格式不正确\n正确格式：xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
        return true
      }

      const userId = e.user_id
      const userData = this.getUserData(userId)

      if (userData.ids.includes(idMatch)) {
        await e.reply('❌ 该ID已绑定')
        return true
      }

      userData.ids.push(idMatch)
      if (userData.ids.length === 1) userData.currentIndex = 0
      this.saveUserData(userId, userData)

      await e.reply(`✅ 绑定成功\nID: ${idMatch}\n当前共绑定 ${userData.ids.length} 个账号`)
    } catch (error) {
      await e.reply(`❌ 绑定失败：${error.message}`)
      logger.error(`[Sky国服礼包] 绑定ID失败: ${error}`)
    }

    return true
  }

  async listLiveIds(e) {
    try {
      const userId = e.user_id
      const userData = this.getUserData(userId)
      if (userData.ids.length === 0) {
        await e.reply('❌ 还未绑定任何ID\n使用 #国服id绑定 [id] 进行绑定')
        return true
      }

      const msg = ['【已绑定的国服ID】\n', '━━━━━━━━━━━━━━━━━━']
      userData.ids.forEach((id, index) => {
        const current = index === userData.currentIndex ? ' ✅' : ''
        msg.push(`${index + 1}. ${id}${current}`)
      })
      msg.push('', '━━━━━━━━━━━━━━━━━━')
      msg.push(`当前使用：第 ${userData.currentIndex + 1} 个`)
      msg.push('使用 #国服id切换 [序号] 切换账号')

      await e.reply(msg.join('\n'))
    } catch (error) {
      await e.reply(`❌ 查询失败：${error.message}`)
      logger.error(`[Sky国服礼包] 查询ID列表失败: ${error}`)
    }

    return true
  }

  async switchLiveId(e) {
    try {
      const userId = e.user_id
      const userData = this.getUserData(userId)
      if (userData.ids.length === 0) {
        await e.reply('❌ 还未绑定任何ID\n使用 #国服id绑定 [id] 进行绑定')
        return true
      }

      const indexMatch = e.msg.replace(/^#?国服id切换/i, '').trim()
      if (!indexMatch) {
        await e.reply(`❌ 请提供序号\n格式：#国服id切换 [序号]\n当前共有 ${userData.ids.length} 个ID`)
        return true
      }

      const index = parseInt(indexMatch) - 1
      if (isNaN(index) || index < 0 || index >= userData.ids.length) {
        await e.reply(`❌ 序号无效\n请输入 1-${userData.ids.length} 之间的数字`)
        return true
      }

      userData.currentIndex = index
      this.saveUserData(userId, userData)

      await e.reply(`✅ 已切换到第 ${index + 1} 个ID\n${userData.ids[index]}`)
    } catch (error) {
      await e.reply(`❌ 切换失败：${error.message}`)
      logger.error(`[Sky国服礼包] 切换ID失败: ${error}`)
    }

    return true
  }

  async queryLiveGift(e) {
    try {
      const userId = e.user_id
      const userData = this.getUserData(userId)
      if (userData.ids.length === 0) {
        await e.reply('❌ 还未绑定任何ID\n使用 #国服id绑定 [id] 进行绑定')
        return true
      }

      if (!this.API_KEY) {
        await e.reply('❌ 未配置 API Key\n请在 config/config/国服礼包查询.yaml 或 plugins/Tlon-Sky/config/国服礼包查询.yaml 中填写 API_KEY')
        return true
      }

      const currentId = userData.ids[userData.currentIndex]
      await e.reply('🔍 正在查询礼包信息...')

      const response = await fetch(`${this.API_BASE}?key=${this.API_KEY}&id=${currentId}`)
      if (!response.ok) {
        await e.reply(`❌ 查询失败：HTTP ${response.status}`)
        return true
      }

      const data = await response.json()
      if (data.code !== 200) {
        await e.reply(`❌ 查询失败：${data.msg || '未知错误'}`)
        return true
      }

      // 判断是否为官机：使用适配器名或平台名判断（e.bot?.adapter?.name ?? e.platform ?? '未知'）
      const adapterName = e.bot?.adapter?.name ?? e.platform ?? '未知'
      const isOfficial = adapterName === 'QQBot'

      // 构建原始（Markdown）消息结构
      const mdMsg = [
        '#【Sky国服礼包查询】\n',
        '---',
        `🆔 账号ID: ${currentId.substring(0, 8)}...`,
        `📦 礼包总数: ${data.count} 个`,
        `💰 总价值: ${data.price}`,
        ''
      ]

      if (data.data && data.data.length > 0) {
        const giftLines = data.data.map((gift, index) => {
          const collab = gift.is_collab ? ' [联动]' : ''
          return `${index + 1}. ${gift.name}${collab} - ${gift.price}`
        })
        mdMsg.push('```🎁 已购礼包列表\n' + giftLines.join('\n') + '\n```')
      } else {
        mdMsg.push('📭 暂无已购礼包')
      }

      mdMsg.push('', '---', `📊 当前使用：第 ${userData.currentIndex + 1}/${userData.ids.length} 个ID`, `⏰ 查询时间：${data.time}`)

      if (isOfficial) {
        // 官机：发送 Markdown/格式化消息
        await e.reply(mdMsg.join('\n'))
      } else {
        // 非官机：移除 Markdown 语法，发送纯文本
        const plain = []
        plain.push('【Sky国服礼包查询】')
        plain.push(`账号ID: ${currentId}`)
        plain.push(`礼包总数: ${data.count} 个`)
        plain.push(`总价值: ${data.price}`)
        plain.push('')
        if (data.data && data.data.length > 0) {
          plain.push('已购礼包列表:')
          data.data.forEach((gift, index) => {
            const collab = gift.is_collab ? ' [联动]' : ''
            plain.push(`${index + 1}. ${gift.name}${collab} - ${gift.price}`)
          })
        } else {
          plain.push('暂无已购礼包')
        }
        plain.push('')
        plain.push(`当前使用：第 ${userData.currentIndex + 1}/${userData.ids.length} 个ID`)
        plain.push(`查询时间：${data.time}`)

        await e.reply(plain.join('\n'))
      }
    } catch (error) {
      await e.reply(`❌ 查询异常：${error.message}`)
      logger.error(`[Sky国服礼包] 查询礼包失败: ${error}`)
    }

    return true
  }
}
