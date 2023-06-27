import plugin from '../../../lib/plugins/plugin.js';

export class 光遇_身高图 extends plugin {
  constructor () {
    super({
      name: '光遇_身高图',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^#?身高图$/,
          fnc: '身高图'
        },{
          reg: /^#?(透明身高图|身高透明图)$/,
          fnc: '身高透明图'
        }
      ]
    })
  }
  async 身高图(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/身高图/身高图.png';
    const Textreply = '发送「身高透明图」查看透明格式'
    let msg = [
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
      Textreply ? Textreply : "",
    ]
    e.reply( msg )
    return true;
  }
  async 身高透明图(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/身高图/透明身高图.png';
    let msg = [
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ]
    e.reply( msg )
    return true;
  }
}