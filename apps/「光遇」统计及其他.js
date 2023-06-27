import plugin from '../../../lib/plugins/plugin.js'

export class 光遇_统计及其他 extends plugin {
  constructor () {
    super({
      name: '光遇_统计及其他',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^#?好友树兑换图$/,
          fnc: '好友树兑换图'
        },{
          reg: /^#?测量规则$/,
          fnc: '测量规则'
        },{
          reg: /^#?蜡烛合成机制$/,
          fnc: '蜡烛合成机制'
        },{
          reg: /^#?身高进阶知识$/,
          fnc: '身高进阶知识'
        }
      ]
    })
  }
  async 好友树兑换图(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/统计及其他/好友树兑换图.png';
    let msg = [
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ]
    e.reply (msg )
    return true;
  }
  async 测量规则(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/统计及其他/测量规则.png';
    let msg = [
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ]
    e.reply( msg )
    return true;
  }
  async 蜡烛合成机制(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/统计及其他/蜡烛合成机制.png';
    let msg = [
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ]
    e.reply( msg )
    return true;
  }
  async 身高进阶知识(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/统计及其他/身高进阶知识.png';
    let msg = [
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ]
    e.reply ( msg )
    return true;
  }
}