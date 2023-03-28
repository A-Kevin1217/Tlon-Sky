import plugin from '../../../lib/plugins/plugin.js'

export class example extends plugin {
    constructor () {
      super({
        name: '光遇_活动兑换图',
        dsc: '活动兑换图',
        event: 'message',
        priority: 5000,
        rule: [
            {
              reg: /^#?(同心|情人)节兑换图$/,
              fnc: 'sky_txj'
            },
            {
              reg: /^#?花憩节兑换图$/,
              fnc: 'sky_hqj'
            }
        ]
    })
}
  async sky_txj(e) {
    const Textreply = '图源光萌攻略组\n如有侵权,联系仓库主人删除';
    const imgreply = 'plugins/Tlon-Sky/resource/活动兑换图/同心节兑换图.png';
    logger.info('[SKY]', e.msg)
    let msg = [
      imgreply ? segment.image(imgreply) : "",
      Textreply ? Textreply : "",
    ]
    e.reply(msg, true)
    return true;
  }
  async sky_hqj(e){
    const Textreply = '图源光萌攻略组\n如有侵权,联系仓库主人删除';
    const imgreply = 'plugins/Tlon-Sky/resource/活动兑换图/花憩节兑换图.png';
    logger.info('[SKY]', e.msg)
    let msg = [
      imgreply ? segment.image(imgreply) : "",
      Textreply ? Textreply : "",
    ]
    e.reply(msg, true)
    return true;
  }
}