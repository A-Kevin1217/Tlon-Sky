import plugin from '../../../lib/plugins/plugin.js'
import fetch from 'node-fetch'
import{ segment }from 'oicq'

export class wenan extends plugin {
  constructor () {
    super({
      name: '光遇_每日任务',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: `^#?(光遇)?(今日|每日)?任务$`,
          fnc: 'sky_JRRW'
        },
      ]
    })
  }
  async sky_JRRW (e) {
    await e.reply('正在返回图片,可能较慢', true)
    let url = `https://api.t1qq.com/api/sky/gy/sc/scsky.php`;
    let res = await fetch(url).catch((err) => logger.error(err))
    await this.reply(segment.image(url), true)
    }  
}
