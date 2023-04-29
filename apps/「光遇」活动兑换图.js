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
          fnc: 'sky_txj'
        },{
          reg: /^#?花憩节兑换图$/,
          fnc: 'sky_hqj'
        },{
          reg: /^#?集体复刻兑换图$/,
          fnc: 'sky_jtfk'
        }
      ]
    })
  }
  async sky_txj(e) {
    const Textreply = '图源光萌攻略组\n如有侵权,联系Tlon_Fu(微)删除';
    const imgreply = 'plugins/Tlon-Sky/resource/活动兑换图/同心节兑换图.png';
    e.reply(
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
      Textreply ? Textreply : "",
      )
    return true;
  }
  async sky_hqj(e){
    const Textreply = '图源光萌攻略组\n如有侵权,联系Tlon_Fu(微)删除';
    const imgreply = 'plugins/Tlon-Sky/resource/活动兑换图/花憩节兑换图.png';
    e.reply(
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
      Textreply ? Textreply : "",
      )
    return true;
  }
  async sky_jtfk(e){
    const imgreply = 'plugins/Tlon-Sky/resource/活动兑换图/集体复刻兑换图.png';
    e.reply(
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
      )
    return true;
  }
}