import plugin from '../../../lib/plugins/plugin.js'
import fetch from "node-fetch"
import lodash from 'lodash'
import fs from 'fs'
import dayjs from 'dayjs'

let datapath = `../../data/Tlon-Sky_bl`
fs.exists("./data/Tlon-Sky_bl",function (exists) {
  if (!exists) fs.mkdirSync(".data/Tlon-Sky_bl")
})
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

      change1 = res.data[0].change

      residual1 = res.data[0].residual

      await this.reply(`最近变化时间：${time1}\n变化数量：${change1}\n剩余蜡烛：${residual1}`, true)
    }
    async sky_jlcx(e) {
      let msg = e.msg
      let place = msg.replace(/#|季蜡查询/g, "").trim();
      let url = `http://plugin.skybay.cn:443/api/cx_w?id=${place}&cmd=jl`;
      let res = await fetch(url).catch((err) => logger.error(err))
      res = await res.json()
      time1 = res.data[0].time

      change1 = res.data[0].change

      residual1 = res.data[0].residual

      await this.reply(`最近变化时间：${time1}\n变化数量：${change1}\n剩余蜡烛：${residual1}`, true)
    }
  }