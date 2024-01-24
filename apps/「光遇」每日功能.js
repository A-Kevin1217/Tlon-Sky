import { render } from '../components/index.js'

export class 光遇_每日功能 extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:每日功能',
      dsc: '光遇任务&大蜡位置&季蜡位置&今日魔法&代币&季节任务',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^(#|\/)?(光遇|国服)?(今日|每日)?(任务|魔法|季蜡|大蜡)?(烛)?(位置)?$/,
          fnc: 'TASK_AND_OTHER'
        },
        {
          reg: /^(#|\/)?(今日)?代币(位置)?$/,
          fnc: 'CURRENCY_LOCATION'
        },
        {
          reg: /^(#|\/)?季节任务$/,
          fnc: 'SEASON_TASK'
        },
        {
          reg: /^(#|\/)?任务图$/,
          fnc: 'TASK_AND_OTHER_PIC'
        }
      ],
    });
  }

  async TASK_AND_OTHER(e) { await render('admin/每日任务', { text: '看不清发[ 任务图 ]，复刻发[ 复刻兑换图 ]' }, { e, scale: 1.4 }) }
  async CURRENCY_LOCATION(e) { return e.reply(segment.image('https://gitee.com/Tloml-Starry/Tlon-Sky-reprint/raw/master/image/代币.png')) }
  async SEASON_TASK(e) { return e.reply(segment.image('https://gitee.com/Tloml-Starry/Tlon-Sky-reprint/raw/master/image/季节任务.png')) }
  async TASK_AND_OTHER_PIC(e) {
    const RW_URL = 'https://api.t1qq.com/api/sky/gy/sc/tlonsky/json/mrrw.jpg';
    const JL_URL = 'https://api.t1qq.com/api/sky/gy/sc/tlonsky/json/scjl.jpg';
    const DL_URL = 'https://api.t1qq.com/api/sky/gy/sc/tlonsky/json/scdl.jpg';
    const MF_URL = 'https://api.t1qq.com/api/sky/gy/sc/json/mf.jpg';
    return e.reply([
      segment.at(e.user_id),
      RW_URL ? segment.image(RW_URL) : "",
      JL_URL ? segment.image(JL_URL) : "",
      DL_URL ? segment.image(DL_URL) : "",
      MF_URL ? segment.image(MF_URL) : "",
    ])
  }
}