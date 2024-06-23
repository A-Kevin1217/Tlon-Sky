import { render } from '../components/index.js'

export class SKY extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:攻略',
      dsc: '光遇攻略查询',
      event: 'message',
      priority: 1,
      rule: [
        { reg: /^(#|\/)?(光遇|国服)?(每日|今日)?任务$/, fnc: 'F1' },
        { reg: /^(#|\/)?(每日|今日)(魔法|季蜡|大蜡(烛)?)/, fnc: 'F1' },
        { reg: /^(#|\/)?(魔法|季蜡|大蜡(烛)?)位置/, fnc: 'F1' },
        { reg: /^(#|\/)?(每日|今日)?代币(位置)?$/, fnc: 'F2' },
        { reg: /^(#|\/)?季节任务$/, fnc: 'F3' },
        { reg: /^(#|\/)?任务图$/, fnc: 'F4' },
        { reg: /^(#|\/)?(碎石查询|今日(红|黑|碎)石)$/, fnc: 'F5' },
        { reg: /^(#|\/)?本月(碎|红|黑)石$/, fnc: 'F6' }
      ],
    });
  }

  async F1(e) { await render('admin/每日任务', { text: '看不清发[ 任务图 ]，复刻发[ 复刻兑换图 ]' }, { e, scale: 1.4 }) }
  async F2(e) { return e.reply([segment.image(`${SKY_IMAGE_URL['A']}当前/当前代币.jpg`)]) }
  async F3(e) { return e.reply([segment.image(`${SKY_IMAGE_URL['A']}当前/当前季节任务.jpg`)]) }
  async F4(e) {
    return e.reply([
      segment.at(e.user_id),
      segment.image(`${SKY_IMAGE_URL['B']}tlonsky/json/mrrw.jpg`),
      segment.image(`${SKY_IMAGE_URL['B']}tlonsky/json/scjl.jpg`),
      segment.image(`${SKY_IMAGE_URL['B']}tlonsky/json/scdl.jpg`),
      segment.image(`${SKY_IMAGE_URL['B']}json/mf.jpg`),
    ])
  }

  async F5(e) {
    /**
     * 碎石降落规律:  
     * - 每月1号~15号 [黑石在星期二，红石在星期六]  
     * - 每月15号~该月最后一天 [黑石在星期三，红石在星期五]  
     * - 每个星期天必有红石
     */
    const IMAGE_1 = `${SKY_IMAGE_URL['A']}碎石/1.jpg`
    const IMAGE_2 = `${SKY_IMAGE_URL['A']}碎石/2.jpg`

    const TODAY = new Date();
    const DAY_OF_MONTH = TODAY.getDate();
    const DAY_OF_WEEK = TODAY.getDay();

    let LANDING_TIME = ''
    let STONE_TYPE = ''
    if (DAY_OF_MONTH >= 1 && DAY_OF_MONTH <= 15) {
      if (DAY_OF_WEEK === 2) {
        STONE_TYPE = '黑石'
        LANDING_TIME = '(09:08—10:00)\n(14:08—15:00)\n(19:08—20:00)'
      } else if (DAY_OF_WEEK === 6) {
        STONE_TYPE = '红石'
        LANDING_TIME = '(10:08—11:00)\n(14:08—15:00)\n(22:08—23:00)'
      } else if (DAY_OF_WEEK === 0) {
        STONE_TYPE = '红石'
        LANDING_TIME = '(07:08—08:00)\n(13:08—14:00)\n(19:08—20:00)'
      } else return e.reply('今日无红&黑石')
    } else {
      if (DAY_OF_WEEK === 3) {
        STONE_TYPE = '黑石'
        LANDING_TIME = '(09:08—10:00)\n(15:08—16:00)\n(21:08—22:00)'
      } else if (DAY_OF_WEEK === 5) {
        STONE_TYPE = '红石'
        LANDING_TIME = '(11:08—12:00)\n(17:08—18:00)\n(23:08—24:00)'
      } else if (DAY_OF_WEEK === 0) {
        STONE_TYPE = '红石'
        LANDING_TIME = '(07:08—08:00)\n(13:08—14:00)\n(19:08—20:00)'
      } else return e.reply('今日无红&黑石')
    }

    return e.reply([
      `今日石头: ${STONE_TYPE}\n`,
      `降落时间段如下\n${LANDING_TIME}`,
      segment.image(IMAGE_1),
      segment.image(IMAGE_2)
    ])
  }

  async F6(e) { await render('admin/光遇碎石日历', {}, { e, scale: 1.4 }) }
}