import plugin from '../../../lib/plugins/plugin.js'
import moment from "moment";

export class 光遇_判断图 extends plugin {
  constructor () {
    super({
      name: '光遇_判断图',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^#?季蜡判断$/,
          fnc: 'sky_jlpdt'
        },{
          reg: /^#?大蜡判断$/,
          fnc: 'sky_dlpdt'
        }
      ]
    })
  }
  async sky_jlpdt (e) {
    let month = Number(moment().month()) + 1
    let monthKey = `Yz:count:sendMsg:month:`
    let messageCount = await redis.get(`${monthKey}${month}`) || 0
    await e.reply('稍等...', true)
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
    await this.reply (msg )
  }  
  async sky_dlpdt (e) {
    await e.reply('稍等...', true)
    let url = `https://api.t1qq.com/api/sky/gy/img/pdt/dl/yy.png`;
    let url2 = `https://api.t1qq.com/api/sky/gy/img/pdt/dl/yl.png`
    let url3 = `https://api.t1qq.com/api/sky/gy/img/pdt/dl/xg.png`
    let url4 = `https://api.t1qq.com/api/sky/gy/img/pdt/dl/mt.png`
    let url5 = `https://api.t1qq.com/api/sky/gy/img/pdt/dl/jg.png`
    let msg = [ 
      '=====大蜡判断图======',segment.image(url),
      segment.image(url2), segment.image(url3),segment.image(url4), segment.image(url5)
    ]
    await this.reply( msg )
  } 
}
