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
          fnc: 'sky_Fk'
        },
      ]
    })
  }
  async sky_Fk(e) {
    const imgreply = 'https://gitee.com/Tloml-Starry/Tlon-Sky-reprint/raw/master/image/Reprint.png';
    let msg = [
        imgreply ? segment.image(imgreply) : ""
    ]
    e.reply(msg)
    return true;
  }
}