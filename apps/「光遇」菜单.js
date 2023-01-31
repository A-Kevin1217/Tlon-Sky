import plugin from '../../../lib/plugins/plugin.js'
import { segment } from "oicq";
let zr = [3620060826]

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
            {
              reg: '^常驻先祖兑换图$',
              fnc: 'czxzdht'
            }
        ]
    })
}
  async skybz(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/help/help.png';
    logger.info('[SKY帮助]', e.msg)
    let msg = [
      imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg)
    return true;
  }
  async jjdht(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/help/季节兑换图.png'
    logger.info('[季节兑换图]',e.msg)
    let msg = [
      imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg)
    return true;
  }
  async czxzdht(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/help/常驻兑换图.png'
    logger.info('[常驻兑换图]',e.msg)
    let msg = [
      imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg)
    return true;
  }
}