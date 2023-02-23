import plugin from '../../../lib/plugins/plugin.js'
import { segment } from "oicq";

export class example extends plugin {
    constructor () {
      super({
        name: '光遇_活动兑换图',
        dsc: '活动兑换图',
        event: 'message',
        priority: 5000,
        rule: [
            {
              reg: '^#?(同心|情人)节兑换图$',
              fnc: 'sky_txj'
            },
        ]
    })
}
  async sky_txj(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/活动兑换图/同心节兑换图.png';
    logger.info('[SKY]', e.msg)
    let msg = [
      imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg)
    return true;
  }
}