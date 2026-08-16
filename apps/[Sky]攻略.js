import { render } from '../components/index.js'
import Button from '../model/Button.js'
import { getPlainQQBotId, makeMarkdownSegment } from '../function/function.js'

const IMG = {
  SEASON_TASK: `${SKY_IMAGE_URL.A}当前/当前季节任务.jpg`,
  TASK_IMAGES: [
    `${SKY_IMAGE_URL.B}sc/scrw?key=qw36BL4Oiq8Kmpefl3bkpIs5IY` + "&num=" + Math.floor(Math.random() * 1000000),
    `${SKY_IMAGE_URL.B}sc/scjl?key=qw36BL4Oiq8Kmpefl3bkpIs5IY` + "&num=" + Math.floor(Math.random() * 1000000),
    `${SKY_IMAGE_URL.B}sc/scdl?key=qw36BL4Oiq8Kmpefl3bkpIs5IY` + "&num=" + Math.floor(Math.random() * 1000000),
    `${SKY_IMAGE_URL.B}mf/magic?key=qw36BL4Oiq8Kmpefl3bkpIs5IY` + "&num=" + Math.floor(Math.random() * 1000000)
  ],
  SHARD_MAP: loc => `https://raw.gitcode.com/Kevin1217/resources/raw/master/resources/img/光遇/ShardRouteMap/${loc}.jpg`
}

const MAPS_CONFIG = {
  maps: ['暮土', '禁阁', '云野', '雨林', '霞谷'],
  locations: {
    云野: { 2: '蝴蝶平原', 3: '仙乡', 5: '云顶浮石', 6: '幽光山洞', 0: '圣岛' },
    雨林: { 2: '荧光森林', 3: '密林遗迹', 5: '大树屋', 6: '雨林神殿', 0: '秘密花园' },
    霞谷: { 2: '滑冰场', 3: '滑冰场', 5: '圆梦村', 6: '圆梦村', 0: '雪隐峰' },
    暮土: { 2: '边陲荒漠', 3: '远古战场', 5: '黑水港湾', 6: '巨兽荒原', 0: '失落方舟' },
    禁阁: { 2: '星光沙漠', 3: '星光沙漠', 5: '星光沙漠·一隅', 6: '星光沙漠·一隅', 0: '星光沙漠·一隅' }
  }
}

function isQQBotEvent(e) {
  const bot = e?.bot ?? globalThis.Bot?.[e?.self_id] ?? globalThis.Bot
  const adapterId = bot?.adapter?.id || bot?.adapter?.name || e?.adapter_name || ''
  const versionId = bot?.version?.id || bot?.version?.name || ''
  const platform = e?.platform || ''
  return adapterId === 'QQBot' || versionId === 'QQBot' || String(platform).startsWith('QQ-')
}

function buildTaskImagesMarkdownItems() {
  const imageMeta = [
    { title: '每日任务', url: IMG.TASK_IMAGES[0], width: 1200, height: 750 },
    { title: '季节蜡烛', url: IMG.TASK_IMAGES[1], width: 1200, height: 750 },
    { title: '大蜡烛', url: IMG.TASK_IMAGES[2], width: 1200, height: 750 },
    { title: '每日魔法', url: IMG.TASK_IMAGES[3], width: 900, height: 600 }
  ]

  return imageMeta.map(item => `![${item.title} #${item.width}px #${item.height}px](${item.url})`)
}

export class SKY extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:攻略',
      dsc: '光遇攻略查询',
      event: 'message',
      priority: 1,
      rule: [
        { reg: /^[#\/]?(光遇|国服)?(每日|今日)?(任务|魔法|季蜡|大蜡(烛)?)$/, fnc: 'handleDynamic' },
        { reg: /^[#\/]?(季节任务|任务图|本月[红黑碎]石|碎石路线图)$/, fnc: 'handleDirect' },
        { reg: /^[#\/]?(查询)?(\d{4})年(\d{1,2})月碎石$/, fnc: 'handleYearlyShards' },
        { reg: /^[#\/]?今日[红黑碎]石$/, fnc: 'handleTodayShards' },
        { reg: /^[#\/]?(碎石规律|碎石规律说明)$/, fnc: 'showStoneRule' }
      ]
    })
  }

  async handleDynamic(e) {
    const type = e.msg.match(/任务|魔法|季蜡|大蜡/) ? 'dailyTask' : null
    if (!type) return

    if (type === 'dailyTask') {
      if (isQQBotEvent(e)) return this.replyTaskImages(e)
      await render('admin/每日任务', { text: '看不清发[ 任务图 ]，复刻发[ 复刻兑换图 ]' }, { e, scale: 1.4 }, null, new Button(e).strategy())
    }
  }

  async handleDirect(e) {
    const cmd = e.msg.replace(/[#\/]/g, '')
    if (cmd === '季节任务') return e.reply([segment.image(IMG.SEASON_TASK)])
    if (cmd === '任务图') return this.replyTaskImages(e)
    if (cmd.includes('碎石')) return cmd === '碎石路线图' ? this.stoneRoadMap(e) : this.handleMonthlyShards(e)
  }

  async replyTaskImages(e) {
    if (isQQBotEvent(e)) {
      const markdown = [
        `<@${getPlainQQBotId(e.user_id)}>`,
        '## 光遇任务图',
        '***',
        buildTaskImagesMarkdownItems().join('\n\n')
      ].join('\n\n')

      return e.reply([makeMarkdownSegment(markdown)])
    }

    return e.reply([segment.at(e.user_id), ...IMG.TASK_IMAGES.map(segment.image)])
  }

  async handleYearlyShards(e) {
    const match = e.msg.match(/(\d{4})年(\d{1,2})月/)
    if (!match) return e.reply('请输入正确格式，示例：2023年5月')

    await render('admin/光遇碎石日历', {
      year: parseInt(match[1], 10),
      month: parseInt(match[2], 10) - 1
    }, { e, scale: 1.4 })
  }

  async handleMonthlyShards(e) {
    await render('admin/光遇碎石日历', {}, { e, scale: 1.4 })
  }

  async handleTodayShards(e) {
        const data = this.getStoneData()
        if (!data) return e.reply('今日无碎石')

        const message = isQQBotEvent(e) ? makeMarkdownSegment(this.formatShardMarkdown(data)) : this.formatShardMsg(data)
        return e.reply([message, new Button(e).todayShards()])
    }

  async stoneRoadMap(e) {
    const data = this.getStoneData()
    data ? e.reply([segment.image(IMG.SHARD_MAP(data.location)), new Button(e).todayShards()]) : e.reply('今日无碎石')
  }

  getStoneData() {
    const date = new Date()
    const day = date.getDate()
    const dayOfWeek = date.getDay()
    const isFirstHalf = day <= 15

    const validDays = isFirstHalf ? [2, 6, 0] : [3, 5, 0]
    if (!validDays.includes(dayOfWeek)) return null

    const mapIndex = (day - 1) % MAPS_CONFIG.maps.length
    const map = MAPS_CONFIG.maps[mapIndex]
    const type = this.getStoneType(dayOfWeek, isFirstHalf)

    return {
      time: `${date.getFullYear()}年${date.getMonth() + 1}月${day}日`,
      stoneType: type,
      map,
      location: MAPS_CONFIG.locations[map][dayOfWeek],
      fallTimes: this.getFallTimes(dayOfWeek, type, isFirstHalf).join(', ')
    }
  }

  getStoneType(day, isFirstHalf) {
    return isFirstHalf
      ? day === 2 ? '黑石' : '红石'
      : day === 3 ? '黑石' : '红石'
  }

  getFallTimes(day, type, isFirstHalf) {
    if (day === 0) return ['07:08', '13:08', '19:08']
    const timeMap = {
      red: isFirstHalf ? ['10:08', '14:08', '22:08'] : ['11:08', '17:08', '23:08'],
      black: isFirstHalf ? ['09:08', '14:08', '19:08'] : ['09:08', '15:08', '21:08']
    }
    return timeMap[type === '红石' ? 'red' : 'black']
  }

  formatShardMsg({ time, stoneType, map, location, fallTimes }) {
    return `${time}\n碎石类型: ${stoneType}\n降落地图: ${map}\n` +
      `降落位置: ${location}\n降落时间: ${fallTimes}\n查看路线: 碎石路线图`
  }

  formatShardMarkdown({ time, stoneType, map, location, fallTimes }) {
    return [
      '# 今日碎石',
      `> ${time}`,
      '',
      `- 碎石类型：**${stoneType}**`,
      `- 降落地图：${map}`,
      `- 降落位置：${location}`,
      `- 降落时间：${fallTimes}`,
      '',
      '> 查看路线：碎石路线图'
    ].join('\n')
  }

  async showStoneRule(e) {
    if (isQQBotEvent(e)) {
      const markdown = [
        '# 光遇碎石规律说明',
        '## 碎石出现规律',
        '### 前半月（每月1-15号）',
        '- 周二：黑石，坠落时间：09:08、14:08、19:08',
        '- 周六：红石，坠落时间：10:08、14:08、22:08',
        '- 周日：红石，坠落时间：07:08、13:08、19:08',
        '### 后半月（每月16号-月末）',
        '- 周三：黑石，坠落时间：09:08、15:08、21:08',
        '- 周五：红石，坠落时间：11:08、17:08、23:08',
        '- 周日：红石，坠落时间：07:08、13:08、19:08',
        '## 地图循环规律',
        '地图按日期循环：暮土 → 禁阁 → 云野 → 雨林 → 霞谷',
        '> 每天按顺序轮换，周而复始',
        '## 各地图降落位置',
        '- 云野：周二→蝴蝶平原 | 周三→仙乡 | 周五→云顶浮石 | 周六→幽光山洞 | 周日→圣岛',
        '- 雨林：周二→荧光森林 | 周三→密林遗迹 | 周五→大树屋 | 周六→雨林神殿 | 周日→秘密花园',
        '- 霞谷：周二→滑冰场 | 周三→滑冰场 | 周五→圆梦村 | 周六→圆梦村 | 周日→雪隐峰',
        '- 暮土：周二→边陲荒漠 | 周三→远古战场 | 周五→黑水港湾 | 周六→巨兽荒原 | 周日→失落方舟',
        '- 禁阁：周二→星光沙漠 | 周三→星光沙漠 | 周五→星光沙漠·一隅 | 周六→星光沙漠·一隅 | 周日→星光沙漠·一隅',
        '## 使用提示',
        '- 发送「今日碎石」查看今日碎石信息',
        '- 发送「本月碎石」查看本月碎石日历',
        '- 发送「碎石路线图」查看路线图',
        '- 发送「2024年5月碎石」查询指定月份的碎石日历'
      ].join('\n')

      return e.reply([makeMarkdownSegment(markdown)])
    }

    const ruleText = `━ 光遇碎石规律说明 ━

【碎石出现规律】

📅 前半月（每月1-15号）
   • 周二：黑石，坠落时间：09:08、14:08、19:08
   • 周六：红石，坠落时间：10:08、14:08、22:08
   • 周日：红石，坠落时间：07:08、13:08、19:08

📅 后半月（每月16号-月末）
   • 周三：黑石，坠落时间：09:08、15:08、21:08
   • 周五：红石，坠落时间：11:08、17:08、23:08
   • 周日：红石，坠落时间：07:08、13:08、19:08

🗺️ 地图循环规律
   地图按日期循环：暮土 → 禁阁 → 云野 → 雨林 → 霞谷
   （每天按顺序轮换，周而复始）

📍 各地图降落位置
   • 云野：周二→蝴蝶平原 | 周三→仙乡 | 周五→云顶浮石 | 周六→幽光山洞 | 周日→圣岛
   • 雨林：周二→荧光森林 | 周三→密林遗迹 | 周五→大树屋 | 周六→雨林神殿 | 周日→秘密花园
   • 霞谷：周二→滑冰场 | 周三→滑冰场 | 周五→圆梦村 | 周六→圆梦村 | 周日→雪隐峰
   • 暮土：周二→边陲荒漠 | 周三→远古战场 | 周五→黑水港湾 | 周六→巨兽荒原 | 周日→失落方舟
   • 禁阁：周二→星光沙漠 | 周三→星光沙漠 | 周五→星光沙漠·一隅 | 周六→星光沙漠·一隅 | 周日→星光沙漠·一隅

💡 使用提示
   • 发送「今日碎石」查看今日碎石信息
   • 发送「本月碎石」查看本月碎石日历
   • 发送「碎石路线图」查看路线图
   • 发送「2024年5月碎石」查询指定月份的碎石日历`

    return e.reply(ruleText)
  }
}
