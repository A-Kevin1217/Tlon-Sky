import plugin from '../../../lib/plugins/plugin.js';
import { render } from '../components/index.js'

const RW_URL = 'https://api.t1qq.com/api/sky/gy/sc/tlonsky/json/mrrw.jpg';
const JL_URL = 'https://api.t1qq.com/api/sky/gy/sc/tlonsky/json/scjl.jpg';
const DL_URL = 'https://api.t1qq.com/api/sky/gy/sc/tlonsky/json/scdl.jpg';
const MF_URL = 'https://api.t1qq.com/api/sky/gy/sc/json/mf.jpg';
const FK_URL = 'https://gitee.com/Tloml-Starry/Tlon-Sky-reprint/raw/master/image/Reprint.png'

export class 光遇_每日功能 extends plugin {
  constructor() {
    super({
      name: '光遇_每日任务&大蜡位置&季蜡位置&今日魔法',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^#?(光遇今日任务|国服今日任务|今日任务|任务|大蜡烛位置|大蜡位置|大蜡|DL|季蜡|季蜡位置|JL|今日魔法)$/,
          fnc: '每日'
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
}