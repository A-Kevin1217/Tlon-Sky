import { render } from '../components/index.js'

const RW_URL = 'https://api.t1qq.com/api/sky/gy/sc/tlonsky/json/mrrw.jpg';
const JL_URL = 'https://api.t1qq.com/api/sky/gy/sc/tlonsky/json/scjl.jpg';
const DL_URL = 'https://api.t1qq.com/api/sky/gy/sc/tlonsky/json/scdl.jpg';
const MF_URL = 'https://api.t1qq.com/api/sky/gy/sc/json/mf.jpg';
const FK_URL = 'https://gitee.com/Tloml-Starry/Tlon-Sky-reprint/raw/master/image/Reprint.png';
const DB_URL = 'https://gitee.com/Tloml-Starry/Tlon-Sky-reprint/raw/master/image/代币.png';
const JR_URL = 'https://gitee.com/Tloml-Starry/Tlon-Sky-reprint/raw/master/image/季节任务.png';

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
        }
      ],
    });
  }
  async 每日(e) {
    let html = {
      魔法Url: MF_URL,
      任务Url: RW_URL,
      季蜡Url: JL_URL,
      大蜡Url: DL_URL,
      复刻Url: FK_URL
    }
    await render('admin/每日任务', {
      ...html
    }, {
      e,
      scale: 1.4
    })
  }

  async 代币(e) {
    e.reply(segment.image(DB_URL))
  }

  async 季任(e) {
    e.reply(segment.image(JR_URL))
  }
}