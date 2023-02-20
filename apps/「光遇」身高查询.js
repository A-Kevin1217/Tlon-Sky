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
    const Textreply = '暂不支持,请联系1947425850,备注来意';
    logger.info('[光遇]', e.msg)
    let msg = [
        Textreply ? Textreply : "",
    ]
    e.reply(msg, true)
    return true;
  }
}