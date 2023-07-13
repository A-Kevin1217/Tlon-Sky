import plugin from '../../../lib/plugins/plugin.js'

export class 光遇_活动兑换图 extends plugin {
  constructor () {
    super({
      name: '光遇_活动兑换图',
      dsc: '活动兑换图',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^#?(同心|情人)节兑换图$/,
          fnc: '情人节'
        },{
          reg: /^#?花憩节兑换图$/,
          fnc: '花憩节'
        },{
          reg: /^#?集体复刻兑换图$/,
          fnc: '集体复刻'
        },{
          reg: /^#?海洋节兑换图$/,
          fnc: '海洋节' 
        },{
          reg: /^#?周年庆兑换图$/,
          fnc: '周年庆'
        },{
          reg: /^#?(飞行日|彩虹日|彩虹节|缤纷飞行日)兑换图$/,
          fnc: '缤纷飞行日'
        }
      ]
    })
  }
  async 情人节(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/活动兑换图/同心节兑换图.png';
    const msg = [
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg)
  }
  async 花憩节(e){
    const imgreply = 'plugins/Tlon-Sky/resource/活动兑换图/花憩节兑换图.png';
    const msg = [
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg)
  }
  async 集体复刻(e){
    const imgreply = 'plugins/Tlon-Sky/resource/活动兑换图/集体复刻兑换图.png';
    const msg = [
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg)
  }
  async 海洋节(e){
    const imgreply = 'plugins/Tlon-Sky/resource/活动兑换图/海洋节兑换图.png';
    const msg = [
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg)
  }
  async 周年庆(e){
    const imgreply = 'plugins/Tlon-Sky/resource/活动兑换图/周年庆兑换图.png';
    const msg = [
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg)
  }
  async 缤纷飞行日(e){
    const imgreply = 'plugins/Tlon-Sky/resource/活动兑换图/飞行日兑换图.png';
    const msg = [
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg)
  }
}