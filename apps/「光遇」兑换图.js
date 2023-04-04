import plugin from '../../../lib/plugins/plugin.js'

export class 光遇_兑换图 extends plugin {
    constructor () {
      super({
        name: '光遇_兑换图',
        dsc: '兑换图',
        event: 'message',
        priority: 5000,
        rule: [
            {
              reg: '^#?季节兑换图$',
              fnc: 'sky_JJDHT'
            },
            {
              reg: '^#?常驻兑换图$',
              fnc: 'sky_CZXZDHT'
            },
            {
              reg: '^#?往期复刻图',
              fnc: 'sky_WQFKT'
            },
            {
              reg: '^#?活动兑换图',
              fnc: 'sky_HDDHT'
            }
        ]
    })
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
  async sky_WQFKT(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/help/往期复刻记录.png'
    logger.info('[往期复刻记录]',e.msg)
    let msg = [
      imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg)
    return true;
  }
  async sky_HDDHT(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/help/活动兑换图.png'
    logger.info('[活动兑换图]',e.msg)
    let msg = [
      imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg)
    return true;
  }

}