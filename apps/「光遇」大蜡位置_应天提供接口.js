import plugin from '../../../lib/plugins/plugin.js'
import fetch from 'node-fetch'
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
          reg: `^#?(光遇)?(大蜡烛|大蜡)?位置$`,
          fnc: 'sky_DLWZ'
        },
      ]
    })
  }
  async sky_DLWZ (e) {
    await e.reply('正在返回图片,可能较慢', true)
    let url = `https://api.t1qq.com/api/sky/gy/sc/dlz/scdlwz.php`;
    let res = await fetch(url).catch((err) => logger.error(err))
    await this.reply(segment.image(url), true)
    }  
}
