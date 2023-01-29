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
            {
                reg: '^加入$',
                fnc: 'sky_jr'
            },
            {
                reg: '^滚滚滚(,|，)真麻烦$',
                fnc: 'sky_ggg'
            }
        ]
    })
}
  async sky_cxsg(e) {
    const Textreply = '该功能需加群,是否加入？\n【加入】|【滚滚滚,真麻烦】\nps:查询方法未群主手动查询,望理解';
    logger.info('[光遇]', e.msg)
    let msg = [
        Textreply ? Textreply : "",
    ]
    e.reply(msg, true)
    return true;
  }
  async sky_jr(e) {
    const imgreply = 'plugins/SKY-GuangYu-plugin/resource/查询身高/二维码.png';
    logger.info('[光遇]',e.msg)
    let msg = [
        imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg, true, { recallMsg: 10 })
    return true;
  }
  async sky_ggg(e) {
    const Textreply = '好嘞~';
    const imgreply = 'plugins/SKY-GuangYu-plugin/resource/查询身高/表情.png';
    logger.info('[光遇]', e.msg)
    let msg = [
        Textreply ? Textreply : "",
        imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg, true)
    return true;
  }
}