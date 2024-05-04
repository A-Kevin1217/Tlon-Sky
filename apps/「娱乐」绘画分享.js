import fetch from 'node-fetch'
import _ from 'lodash'

export class SKY extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]娱乐:绘画分享',
      dsc: 'Tlon-Sky',
      event: 'message',
      priority: 1,
      rule: [{
        reg: /^(#|\/)?(绘画|绘画分享|绘图分享)$/,
        fnc: 'paintingSharing'
      }]
    })
  }

  async paintingSharing(e) {
    const URL = 'https://gitee.com/Tloml-Starry/resources/raw/master/resources/json/'
    const TU_N = (await (await fetch(`${URL}云绘库.json`)).json())['n']
    const IMAGE = segment.image(`${URL}${_.random(0, TU_N)}.jpg`)
    e.reply((e.adapter === 'QQBot') ? [
      IMAGE,
      Bot.Button([[{ label: '再来一张', callback: '/绘画分享' }]])
    ] : [
      segment.at(e.user_id),
      IMAGE
    ])
  }
}