import { render } from '../components/index.js'

const URL = 'https://gitee.com/Tloml-Starry/resources/raw/master/resources/img/光遇/当前/当前'
export class DAILY_FUNCTION extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:每日功能',
      dsc: '光遇任务&大蜡位置&季蜡位置&今日魔法&代币&季节任务',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^(#|\/)?(光遇|国服)?(每日|今日)?任务$/,
          fnc: 'TASK_AND_OTHER'
        },
        {
          reg: /^(#|\/)?(每日|今日)(魔法|季蜡|大蜡)(烛)?/,
          fnc: 'TASK_AND_OTHER'
        },
        {
          reg: /^(#|\/)?(魔法|季蜡|大蜡)(烛)?位置/,
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
    await render('admin/每日任务', {
      text: '看不清发[ 任务图 ]，复刻发[ 复刻兑换图 ]'
    }, {
      e,
      scale: 1.4
    })
  }
  async CURRENCY_LOCATION(e) {
    return e.reply([
      segment.image(`${URL}代币.jpg`)
    ])
  }

  async SEASON_TASK(e) {
    return e.reply([
      segment.image(`${URL}季节任务.jpg`)
    ])
  }

  async TASK_AND_OTHER_PIC(e) {
    return e.reply([
      segment.at(e.user_id),
      segment.image('https://api.t1qq.com/api/sky/gy/sc/tlonsky/json/mrrw.jpg'),
      segment.image('https://api.t1qq.com/api/sky/gy/sc/tlonsky/json/scjl.jpg'),
      segment.image('https://api.t1qq.com/api/sky/gy/sc/tlonsky/json/scdl.jpg'),
      segment.image('https://api.t1qq.com/api/sky/gy/sc/json/mf.jpg'),
    ])
  }
}