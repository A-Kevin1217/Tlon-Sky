import { render } from '../components/index.js'

const IMG = {
  DAILY_COIN: `${SKY_IMAGE_URL.A}当前/当前代币.jpg`,
  SEASON_TASK: `${SKY_IMAGE_URL.A}当前/当前季节任务.jpg`,
  TASK_IMAGES: [
    `${SKY_IMAGE_URL.B}tlonsky/json/mrrw.jpg`,
    `${SKY_IMAGE_URL.B}tlonsky/json/scjl.jpg`,
    `${SKY_IMAGE_URL.B}tlonsky/json/scdl.jpg`,
    `${SKY_IMAGE_URL.B}json/mf.jpg`
  ],
  SHARD_MAP: loc => `https://gitcode.com/Kevin1217/resources/raw/master/resources/img/光遇/ShardRouteMap/${loc}.jpg`
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

export class SKY extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:攻略',
      dsc: '光遇攻略查询',
      event: 'message',
      priority: 1,
      rule: [
        {
          reg: /^(#|\/)?(光遇|国服)?(每日|今日)?(任务|魔法|季蜡|大蜡(烛)?|代币(位置)?)$/,
          fnc: 'handleDynamic'
        },
        { reg: /^(#|\/)?(季节任务|任务图|本月[红黑碎]石|碎石路线图)$/, fnc: 'handleDirect' },
        { reg: /^(#|\/)?(查询)?(\d{4})年(\d{1,2})月碎石$/, fnc: 'handleYearlyShards' },
        { reg: /^[#\/]?今日[红黑碎]石$/, fnc: 'handleTodayShards' }
      ]
    })
  }

  async handleDynamic(e) {
    const type = e.msg.includes('代币') ? 'currency'
      : e.msg.match(/任务|魔法|季蜡|大蜡/) ? 'dailyTask' : null
    if (!type) return

    type === 'dailyTask'
      ? await render('admin/每日任务', { text: '看不清发[ 任务图 ]，复刻发[ 复刻兑换图 ]' }, { e, scale: 1.4 })
      : e.reply([segment.image(IMG.DAILY_COIN)])
  }

  async handleDirect(e) {
    const cmd = e.msg.replace(/[#\/]/g, '')
    if (cmd === '季节任务') return e.reply([segment.image(IMG.SEASON_TASK)])
    if (cmd === '任务图') return e.reply([segment.at(e.user_id), ...IMG.TASK_IMAGES.map(segment.image)])
    if (cmd.includes('碎石')) return cmd === '碎石路线图' ? this.stoneRoadMap(e) : this.handleMonthlyShards(e)
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
    data ? e.reply(this.formatShardMsg(data)) : e.reply('今日无碎石')
  }

  async stoneRoadMap(e) {
    const data = this.getStoneData()
    data ? e.reply([segment.image(IMG.SHARD_MAP(data.location))]) : e.reply('今日无碎石')
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
}