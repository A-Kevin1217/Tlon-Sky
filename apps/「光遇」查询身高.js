import plugin from '../../../lib/plugins/plugin.js'
import { segment } from "oicq";

export class example extends plugin {
    constructor () {
      super({
        name: '光遇',
        dsc: '光遇查询身高',
        event: 'message',
        priority: 5000,
        rule: [
            {
                reg: '^查询身高$',
                fnc: 'sky_cxsg'
            },
        ]
    })
}
  async sky_cxsg(e) {
    const Textreply = '该功能已不可用！';
    const imgreply = 'https://gchat.qpic.cn/gchatpic_new/1947425850/950353702-3140688768-2303184357BE2AF40C2DE1722904E8D1/0?term=255&is_origin=0';
    logger.info('[光遇]', e.msg)
    let msg = [
        Textreply ? Textreply : "",
        imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg, true)
    return true;
  }
}