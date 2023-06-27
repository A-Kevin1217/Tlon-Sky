import plugin from '../../../lib/plugins/plugin.js'

export class 光遇_复刻兑换图 extends plugin {
  constructor () {
    super({
      name: '光遇_复刻兑换图',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^#?(复刻兑换图|国服复刻)$/,
          fnc: '复刻兑换图'
        },
      ]
    })
  }
  async 复刻兑换图(e) {
    const Textreply = '仅供参考,以正式上线为准'
    const imgreply = 'https://gitee.com/Tloml-Starry/Tlon-Sky-reprint/raw/master/image/Reprint.png';
    let msg = [
      imgreply ? segment.image(imgreply) : ""
    ]
    e.reply(Textreply)
    e.reply(msg)
    return true;
  }
}