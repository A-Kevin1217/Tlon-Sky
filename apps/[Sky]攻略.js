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
        { reg: /^(#|\/)?(碎石查询|今日(红|黑|碎)石|本月(碎|红|黑)石)$/, fnc: 'F6' }
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

  async F6(e) {
    await e.reply('稍等，正在截图', false, { recallMsg: 20 })
    await render('admin/光遇碎石日历', {}, { e, scale: 1.4 })
  }
}