import plugin from '../../../lib/plugins/plugin.js'
import moment from "moment";

export class wenan extends plugin {
  constructor () {
    super({
      name: '光遇_季蜡判断图',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: `^#?(季蜡判断|任务)$`,
          fnc: 'sky_jlpdt'
        },
      ]
    })
  }
  async sky_jlpdt (e) {
    let month = Number(moment().month()) + 1
    let monthKey = `Yz:count:sendMsg:month:`
    let messageCount = await redis.get(`${monthKey}${month}`) || 0
    await e.reply('正在返回图片,可能较慢')
    let url = `https://api.t1qq.com/api/sky/gy/img/pdt/jl/yy.png`;
    let url2 = `https://api.t1qq.com/api/sky/gy/img/pdt/jl/yl.png`
    let url3 = `https://api.t1qq.com/api/sky/gy/img/pdt/jl/xg.png`
    let url4 = `https://api.t1qq.com/api/sky/gy/img/pdt/jl/mt.png`
    let url5 = `https://api.t1qq.com/api/sky/gy/img/pdt/jl/jg.png`
    let msg = [ 
      '=====季蜡判断图======',segment.image(url),
      segment.image(url2), segment.image(url3),segment.image(url4), segment.image(url5),
      '本月已发送',`${messageCount}`,'条消息'
    ]
    await this.reply(msg, true)
    }  
}
