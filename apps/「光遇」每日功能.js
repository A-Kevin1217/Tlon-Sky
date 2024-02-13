import { render } from '../components/index.js'
import fetch from "node-fetch"

export class DAILY_FUNCTION extends plugin {
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

  async TASK_AND_OTHER(e) {
    const URL_DATA = await (await fetch('https://gitee.com/Tloml-Starry/Tlon-Sky-reprint/raw/master/FK.json')).json()

    const endTime = URL_DATA['endTime']
    const now = new Date();
    const specifiedTime = new Date(endTime['years'], endTime['month'], endTime['day'], endTime['Hour'], endTime['minute'], endTime['second']);

    let fk = 'https://gitee.com/Tloml-Starry/Tlon-Sky-reprint/raw/master/PICTURE/FK.jpg'
    if (now > specifiedTime) { fk = 'https://gitee.com/Tloml-Starry/Tlon-Sky-reprint/raw/master/FK.jpg' }

    if (e.msg === '#' || e.msg === '/' || e.msg === '') { return }; await render('admin/每日任务', { text: '看不清发[ 任务图 ]，复刻发[ 复刻兑换图 ]', fk }, { e, scale: 1.4 })
  }
  async CURRENCY_LOCATION(e) { return e.reply(segment.image('https://gitee.com/Tloml-Starry/Tlon-Sky-reprint/raw/master/PICTURE/DB.jpg')) }
  async SEASON_TASK(e) { return e.reply(segment.image('https://gitee.com/Tloml-Starry/Tlon-Sky-reprint/raw/master/PICTURE/JJRW.jpg')) }
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