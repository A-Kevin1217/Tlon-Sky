export class 光遇_复刻兑换图 extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:复刻兑换图',
      dsc: '光遇复刻兑换图',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^(#|\/)?(复刻兑换图|国服复刻)$/,
          fnc: '复刻兑换图'
        },
      ]
    })
  }
  async 复刻兑换图(e) {
    e.reply('仅供参考,以正式上线为准')
    return e.reply(segment.image('https://gitee.com/Tloml-Starry/Tlon-Sky-reprint/raw/master/image/Reprint.png'))
  }
}