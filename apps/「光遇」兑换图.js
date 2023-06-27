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
          reg: /^#?季节兑换图$/,
          fnc: '季节兑换图'
        },{
          reg: /^#?常驻兑换图$/,
          fnc: '常驻兑换图'
        },{
          reg: /^#?往期复刻图/,
          fnc: '往期复刻图'
        },{
          reg: /^#?活动兑换图/,
          fnc: '活动兑换图'
        }
      ]
    })
  }
  async 季节兑换图(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/help/季节兑换图.png'
    e.reply(
      imgreply ? segment.image(imgreply) : ""
      )
    return true;
  }
  async 常驻兑换图(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/help/常驻兑换图.png'
    e.reply(
      imgreply ? segment.image(imgreply) : ""
    )
    return true;
  }
  async 往期复刻图(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/help/往期复刻记录.png'
    e.reply(
      imgreply ? segment.image(imgreply) : ""
    )
    return true;
  }
  async 活动兑换图(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/help/活动兑换图.png'
    e.reply(
      imgreply ? segment.image(imgreply) : ""
    )
    return true;
  }
}