export class 光遇_全图鉴参考 extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:全图鉴参考',
      dsc: '光遇全图鉴参考',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^(#|\/)?全图鉴参考$/,
          fnc: '全图鉴参考'
        },
      ]
    })
  }
  async 全图鉴参考(e) {
    e.reply('国际服全图鉴,国服仅供参考')
    return e.reply(segment.image('plugins/Tlon-Sky/resource/统计及其他/全图鉴参考.png'))
  }
}