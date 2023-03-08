import plugin from '../../../lib/plugins/plugin.js'
import{ segment }from 'oicq'

export class wenan extends plugin {
  constructor () {
    super({
      name: '光遇_大蜡位置',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: `^#?(大蜡烛位置|大蜡位置|大蜡)$`,
          fnc: 'sky_DLWZ'
        },
      ]
    })
  }
  async sky_DLWZ (e) {
    await e.reply('正在返回图片,可能较慢')
    let url = `https://api.t1qq.com/api/sky/gy/sc/scjlwz`;
    let url2 = `https://api.t1qq.com/api/sky/gy/sc/dlz/scdlwz.php`
    let url3 = `https://api.t1qq.com/api/sky/gy/sc/scsky.php`
    let msg = [
      '大蜡烛位置',segment.image(url2),
      '季蜡位置&今日任务',segment.image(url),segment.image(url3)
    ]
    await this.reply(msg, true)
    }  
}
