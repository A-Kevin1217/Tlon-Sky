import fetch from "node-fetch"
import { render } from '../components/index.js'

export class SKY extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:信息',
      dsc: '光遇信息查询',
      event: 'message',
      priority: 1,
      rule: [
        { reg: /^(#|\/)?(光遇|sky)(服务器)?状态$/i, fnc: 'F1' },
        { reg: /^(#|\/)?(光遇|sky)公告$/i, fnc: 'F2' },
        { reg: /^(#|\/)?光翼统计$/, fnc: 'F3' },
        { reg: /^(#|\/)?(季节|活动)剩余$/, fnc: 'F4' },
        { reg: /^(#|\/)?(.*)季多久未复刻$/, fnc: 'F5' }
      ]
    })
  }

  getDayDiff(date) {
    const today = new Date()
    const timeDiff = today.getTime() - date.getTime()
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24)).toString().padStart(3, '0')
  }

  async F1(e) {
    try {
      const URL_DATA = await GET_URL_DATA('https://live-queue-sky-merge.game.163.com/queue?type=json')
      if (URL_DATA['ret'] !== 1) return e.reply(['当前SKY服务器畅通，无需排队'])
      return e.reply([segment.at(e.user_id), `当前排队中\n排队人数：${URL_DATA['pos']} 位\n预计等待时间：${URL_DATA['wait_time']} 秒`])
    } catch (err) {
      return e.reply(['光遇服务器异常\n可能正在维护更新'])
    }
  }

  async F2(e) {
    const URL_DATA = await GET_URL_DATA('https://ma75.update.netease.com/game_notice/announcement_live.json')

    const TITLE = URL_DATA['Title']
    const ANNOUNCEMENT = URL_DATA['OtherChannelMessage'].replace(/<1>|<\/1>/g, '')

    await render('admin/公告', { TITLE, ANNOUNCEMENT, }, { e, scale: 1.4 })
  }

  async F3(e) {
    const URL_DATA = await GET_URL_DATA('https://s.166.net/config/ds_yy_02/ma75_wing_wings.json')
    let TAG_COUNTS = {
      "复刻永久": 0, "普通永久": 0,
      "晨": 0, "云": 0, "雨": 0, "霞": 0, "暮": 0, "禁": 0, "暴": 0
    };
    URL_DATA.forEach(item => {
      if (item["一级标签"] === "复刻永久") TAG_COUNTS["复刻永久"]++
      if (item["一级标签"] === "普通永久") TAG_COUNTS["普通永久"]++
      if (item["一级标签"] === "晨岛") TAG_COUNTS["晨"]++
      if (item["一级标签"] === "云野") TAG_COUNTS["云"]++
      if (item["一级标签"] === "雨林") TAG_COUNTS["雨"]++
      if (item["一级标签"] === "霞谷") TAG_COUNTS["霞"]++
      if (item["一级标签"] === "暮土") TAG_COUNTS["暮"]++
      if (item["一级标签"] === "禁阁") TAG_COUNTS["禁"]++
      if (item["一级标签"] === "暴风眼") TAG_COUNTS["暴"]++
    });

    return e.reply([
      `总光翼数量：${URL_DATA.length}`,
      `\n永久翼：${TAG_COUNTS["复刻永久"] + TAG_COUNTS["普通永久"]}`,
      `\n复刻先祖永久翼：${TAG_COUNTS["复刻永久"]}`,
      `\n常驻先祖永久翼：${TAG_COUNTS["普通永久"]}`,
      `\n晨岛光翼：${TAG_COUNTS["晨"]}`,
      `\n云野光翼：${TAG_COUNTS["云"]}`,
      `\n雨林光翼：${TAG_COUNTS["雨"]}`,
      `\n霞谷光翼：${TAG_COUNTS["霞"]}`,
      `\n暮土光翼：${TAG_COUNTS["暮"]}`,
      `\n禁阁光翼：${TAG_COUNTS["禁"]}`,
      `\n伊甸光翼：${TAG_COUNTS["暴"]}`
    ])
  }

  async F4(e) {
    const URL_DATA = await GET_URL_DATA('https://gitee.com/Tloml-Starry/resources/raw/master/resources/json/季节&活动剩余.json')

    let ACTIVITY_DATA = [], ACTIVITY_NAME = []
    const START_TIME = new Date(URL_DATA['季节']['startDate']).getTime();
    const END_TIME = new Date(URL_DATA['季节']['endDate']).getTime();
    const SEASON_NAME = URL_DATA['季节']['name'];
    const GRADUATION_WAX = URL_DATA['季节']['number'];

    const GET_TIME = Date.now();
    const MILLISECOND = END_TIME - GET_TIME;

    for (let i = 0; i < URL_DATA['活动'].length; i++) {
      ACTIVITY_NAME.push(URL_DATA['活动'][i]['name'])
      const START_TIME = new Date(URL_DATA['活动'][i]['startDate']).getTime();
      const END_TIME = new Date(URL_DATA['活动'][i]['endDate']).getTime();
      const MILLISECOND = END_TIME - GET_TIME;
      const DAILY_GET_NUMBER = URL_DATA['活动'][i]['DailyGetNumber']
      const TOTAL_AVAILABLE = (DAYS + 1) * DAILY_GET_NUMBER
      const GRADUATION = URL_DATA['活动'][i]['number']

      const { DAYS, HOURS, MINUTES, SECONDS } = {
        DAYS: Math.floor(MILLISECOND / (24 * 60 * 60 * 1000)),
        HOURS: Math.floor((MILLISECOND % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)),
        MINUTES: Math.floor((MILLISECOND % (60 * 60 * 1000)) / (60 * 1000)),
        SECONDS: Math.floor((MILLISECOND % (60 * 1000)) / 1000)
      };
      ACTIVITY_DATA.push(`距离${URL_DATA['活动'][i]['name']}结束还剩\n`)
      ACTIVITY_DATA.push(`${DAYS}天${HOURS}小时${MINUTES}分钟${SECONDS}秒\n`)
      ACTIVITY_DATA.push(`截至至${URL_DATA['活动'][i]['endDate']}\n`)
      ACTIVITY_DATA.push(`本活动一共${Math.floor((END_TIME - START_TIME) / (24 * 60 * 60 * 1000)) + 1}天\n`)
      ACTIVITY_DATA.push(`代币还可获得: ${TOTAL_AVAILABLE}\n从今日开始兑换，${TOTAL_AVAILABLE < GRADUATION ? '已经来不及了' : '还可以兑换完'}\n`)
      ACTIVITY_DATA.push(`全部兑换需: ${Math.ceil(GRADUATION / TOTAL_AVAILABLE)}天\n`)
    }


    if (MILLISECOND <= 0) { return e.reply([segment.at(e.user_id), SEASON_NAME + '已结束！请等待下个季节到来.']) };

    const { DAYS, HOURS, MINUTES, SECONDS } = {
      DAYS: Math.floor(MILLISECOND / (24 * 60 * 60 * 1000)),
      HOURS: Math.floor((MILLISECOND % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)),
      MINUTES: Math.floor((MILLISECOND % (60 * 60 * 1000)) / (60 * 1000)),
      SECONDS: Math.floor((MILLISECOND % (60 * 1000)) / 1000)
    };

    return e.reply([
      segment.at(e.user_id),
      `\n距离${SEASON_NAME}结束还剩` +
      `\n${DAYS}天${HOURS}小时${MINUTES}分钟${SECONDS}秒` +
      `\n截至至${URL_DATA['季节']['endDate']}` +
      `\n本季节一共${Math.floor((END_TIME - START_TIME) / (24 * 60 * 60 * 1000)) + 1}天` +
      '\n季蜡还可获得：' +
      `\n[有季卡]：${(DAYS + 1) * 6}季蜡` +
      `\n[无季卡]：${(DAYS + 1) * 5}季蜡` +
      `\n本季节毕业需：${GRADUATION_WAX}季蜡` +
      `\n[有季卡]毕业需：${Math.ceil((GRADUATION_WAX - 30) / 6)}天` +
      `\n[无季卡]毕业需：${Math.ceil((GRADUATION_WAX - 12) / 5)}天` +
      '\n(无季卡包括非必要的魔法节点)' +
      '\n▔▔▔' +
      `\n当前活动: ${ACTIVITY_NAME.join(',')}` +
      `\n${ACTIVITY_DATA}`
    ])
  }

  async F5(e) {
    const SEASON_NAME = e.msg.replace(/#|\/|季多久未复刻/g, '')
    const URL_DATA = await GET_URL_DATA('https://gitee.com/Tloml-Starry/resources/raw/master/resources/json/先祖多久未复刻.json')

    if (!URL_DATA[SEASON_NAME]) return e.reply([
      segment.at(e.user_id),
      '\n不存在该季节，或该季节尚未开始复刻'
    ])

    let msg = `数据更新时间：${URL_DATA['UPDATE TIME']}\n此表不计入集体复刻\n`

    for (const role of URL_DATA[SEASON_NAME]) {
      msg += `${role.name}已[ ${this.getDayDiff(new Date(role.date))} ]天未复刻\n`
    }

    return e.reply([msg.trim()])
  }
}

/**
 * 请求网络接口并解析为JSON
 * @param {string} URL 网络接口
 * @returns {JSON}
 */
async function GET_URL_DATA(URL) { return await (await fetch(URL)).json() }