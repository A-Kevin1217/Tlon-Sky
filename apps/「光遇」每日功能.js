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
          reg: /^(#|\/)?(光遇今日任务|国服今日任务|今日任务|任务|大蜡烛位置|大蜡位置|大蜡|DL|季蜡|季蜡位置|JL|今日魔法)$/,
          fnc: '每日'
        },
        {
          reg: /^(#|\/)?(代币位置|今日代币)$/,
          fnc: '代币'
        },
        {
          reg: /^(#|\/)?季节任务$/,
          fnc: '季任'
        },
        {
          reg: /^(#|\/)?任务图$/,
          fnc: '任务图'
        }
      ],
    });
  }

  async 每日(e) { await render('admin/每日任务', { text: '看不清发[ 任务图 ]，复刻发[ 复刻兑换图 ]' }, { e, scale: 1.4 }) }
  async 代币(e) { return e.reply(segment.image('https://gitee.com/Tloml-Starry/Tlon-Sky-reprint/raw/master/image/代币.png')) }
  async 季任(e) { return e.reply(segment.image('https://gitee.com/Tloml-Starry/Tlon-Sky-reprint/raw/master/image/季节任务.png')) }
  async 任务图(e) {
    const RW_URL = 'https://api.t1qq.com/api/sky/gy/sc/tlonsky/json/mrrw.jpg';
    const JL_URL = 'https://api.t1qq.com/api/sky/gy/sc/tlonsky/json/scjl.jpg';
    const DL_URL = 'https://api.t1qq.com/api/sky/gy/sc/tlonsky/json/scdl.jpg';
    const MF_URL = 'https://api.t1qq.com/api/sky/gy/sc/json/mf.jpg';
    return e.reply([
      RW_URL ? segment.image(RW_URL) : "",
      JL_URL ? segment.image(JL_URL) : "",
      DL_URL ? segment.image(DL_URL) : "",
      MF_URL ? segment.image(MF_URL) : "",
    ])
  }
}