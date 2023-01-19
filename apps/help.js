import plugin from '../../../lib/plugins/plugin.js'
import { segment } from "oicq";
import fetch from 'node-fetch'
import schedule from 'node-schedule'

export class example extends plugin {
    constructor () {
      super({
        name: '光遇',
        dsc: '光遇帮助',
        event: 'message',
        priority: 5000,
        rule: [
            {
                reg: '^(SKY|Sky|sky|光遇)(帮助|菜单|使用说明)$',
                fnc: 'skybz'
            },
            {
                reg: '^季节兑换图$',
                fnc: 'jjdht'
            },
        ]
    })
}
  async skybz(e) {
    const imgreply = 'https://gchat.qpic.cn/gchatpic_new/3620060826/2054658697-3188931212-F1315B129471B79DA55DEE10B8AC17D9/0?term=3&is_origin=0';
    logger.info('[自助回复]', e.msg)
    let msg = [
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : ""
    ]
    e.reply(msg)
    return true;
  }
  async jjdht(e) {
    const imgreply = 'https://gchat.qpic.cn/gchatpic_new/3620060826/2054658697-2595398092-7E31C3691C641C877250CDDEBB2B89DE/0?term=3&is_origin=0'
    logger.info('[季节兑换图]',e.msg)
    let msg = [
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg)
    return true;
  }
}