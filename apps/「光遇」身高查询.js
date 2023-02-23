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
    const Textreply = '身高查询软件\nhttps://share.weiyun.com/x0dcR4m1';
    logger.info('[光遇]', e.msg)
    let msg = [
        Textreply ? Textreply : "",
    ]
    e.reply(msg, true)
    return true;
  }
}