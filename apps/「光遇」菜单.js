import plugin from '../../../lib/plugins/plugin.js'
import { segment } from "oicq";

export class example extends plugin {
    constructor () {
      super({
        name: '光遇_菜单',
        dsc: '菜单',
        event: 'message',
        priority: 5000,
        rule: [
            {
              reg: '^#?(SKY|Sky|sky|光遇)(帮助|菜单|使用说明)$',
              fnc: 'sky_BZ'
            },
            {
              reg: '^#?季节兑换图$',
              fnc: 'sky_JJDHT'
            },
            {
              reg: '^#?常驻先祖兑换图$',
              fnc: 'sky_CZXZDHT'
            }
        ]
    })
}
  async skyBZ(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/help/help.png';
    logger.info('[SKY帮助]', e.msg)
    let msg = [
      imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg)
    return true;
  }
  async sky_JJDHT(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/help/季节兑换图.png'
    logger.info('[季节兑换图]',e.msg)
    let msg = [
      imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg)
    return true;
  }
  async sky_CZXZDHT(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/help/常驻兑换图.png'
    logger.info('[常驻兑换图]',e.msg)
    let msg = [
      imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg)
    return true;
  }
}