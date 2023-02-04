import plugin from '../../../lib/plugins/plugin.js'
import fetch from "node-fetch"

let time1
let change1
let residual1
let time2
let change2
let residual2
let time3
let change3
let residual3


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
      time1 = res.data[0].time
      time2 = res.data[1].time
      time3 = res.data[2].time
      change1 = res.data[0].change
      change2 = res.data[1].change
      change3 = res.data[2].change
      residual1 = res.data[0].residual
      residual2 = res.data[1].residual
      residual3 = res.data[2].residual

      await this.reply(`最近变化时间：${time1}\n变化数量：${change1}\n剩余蜡烛：${residual1}\n变化时间：${time2}\n变化数量：${change2}\n变化蜡烛：\n${residual2}\n变化时间：${time3}\n变化数量：${change3}\n变化蜡烛：\n${residual3}`)
    }
    async sky_jlcx(e) {
      let msg = e.msg
      let place = msg.replace(/#|季蜡查询/g, "").trim();
      let url = `http://plugin.skybay.cn:443/api/cx_w?id=${place}&cmd=jl`;
      let res = await fetch(url).catch((err) => logger.error(err))
      res = await res.json()
      time1 = res.data[0].time
      time2 = res.data[1].time
      time3 = res.data[2].time
      change1 = res.data[0].change
      change2 = res.data[1].change
      change3 = res.data[2].change
      residual1 = res.data[0].residual
      residual2 = res.data[1].residual
      residual3 = res.data[2].residual

      await this.reply(`最近变化时间：${time1}\n变化数量：${change1}\n剩余季蜡：${residual1}\n变化时间：${time2}\n变化数量：${change2}\n变化季蜡：\n${residual2}\n变化时间：${time3}\n变化数量：${change3}\n变化季蜡：\n${residual3}`)
    }
  }