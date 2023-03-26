import plugin from '../../../lib/plugins/plugin.js'

export class wenan extends plugin {
  constructor () {
    super({
      name: '光遇_季蜡判断图',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: `^#?(大蜡判断|任务)$`,
          fnc: 'sky_dlpdt'
        },
      ]
    })
  }
  async sky_dlpdt (e) {
    await e.reply('正在返回图片,可能较慢')
    let url = `https://api.t1qq.com/api/sky/gy/img/pdt/dl/yy.png`;
    let url2 = `https://api.t1qq.com/api/sky/gy/img/pdt/dl/yl.png`
    let url3 = `https://api.t1qq.com/api/sky/gy/img/pdt/dl/xg.png`
    let url4 = `https://api.t1qq.com/api/sky/gy/img/pdt/dl/mt.png`
    let url5 = `https://api.t1qq.com/api/sky/gy/img/pdt/dl/jg.png`
    let msg = [ 
      '=====大蜡判断图======',segment.image(url),
      segment.image(url2), segment.image(url3),segment.image(url4), segment.image(url5)
    ]
    await this.reply(msg, true)
    }  
}
