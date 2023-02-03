import plugin from '../../../lib/plugins/plugin.js'
import fetch from "node-fetch"
let time1
let change1
let residual1

export class wenan extends plugin {
    constructor () {
      super({
        name: '光遇',
        dsc: '蜡烛查询',
        event: 'message',
        priority: 5000,
        rule: [
          {
            reg: `^(蜡烛查询)(.*)$`,
            fnc: 'sky_lzcx'
          },
          {
            reg: '^(季蜡查询)(.*)$',
            fnc: 'sky_jlcx'
          },
          {
            reg: '^查询(教程|帮助)$',
            fnc: 'sky_cxjc'
          }
        ]
      })
    }
    async sky_lzcx(e) {
      let msg = e.msg
      let place = msg.replace(/#|蜡烛查询/g, "").trim();
      let url = `http://plugin.skybay.cn:443/api/cx_w?id=${place}&cmd=bl`;
      let res = await fetch(url).catch((err) => logger.error(err))
      res = await res.json()
      time1 = res.data[1].time

      change1 = res.data[1].change

      residual1 = res.data[1].residual

      await this.reply(`最近变化时间：${time1}\n变化数量：${change1}\n剩余蜡烛：${residual1}`, true)
    }
    async sky_jlcx(e) {
      let msg = e.msg
      let place = msg.replace(/#|季蜡查询/g, "").trim();
      let url = `http://plugin.skybay.cn:443/api/cx_w?id=${place}&cmd=jl`;
      let res = await fetch(url).catch((err) => logger.error(err))
      res = await res.json()
      time1 = res.data[1].time

      change1 = res.data[1].change

      residual1 = res.data[1].residual

      await this.reply(`最近变化时间：${time1}\n变化数量：${change1}\n剩余蜡烛：${residual1}`, true)
    }
    async sky_cxjc(e) {
      const imgreply = 'https://gchat.qpic.cn/gchatpic_new/3591203536/3882665563-2933672716-752D64627CEA1AE9F750F11C934579BD/0?term=3&is_origin=0';
      logger.info('[SKY]', e.msg)
      let msg = [
        segment.at(this.e.user_id),
        imgreply ? segment.image(imgreply) : "",
      ]
      e.reply(msg)
      return true;
    }
  }