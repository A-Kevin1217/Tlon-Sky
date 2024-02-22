export class REFERENCE_PIC extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:全图鉴参考',
      dsc: '光遇全图鉴参考',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^(#|\/)?全图鉴参考$/,
          fnc: 'REFERENCE_PIC'
        },
      ]
    })
  }
  async REFERENCE_PIC(e) {
    if (e.adapter === 'QQBot') {
      return e.reply([
        '# 光遇全图鉴', '> 国际服全图鉴 国服仅供参考',
        segment.image('plugins/Tlon-Sky/resource/Picture/Statistics and others/全图鉴参考.png')
      ])
    }
    return e.reply([
      segment.at(e.user_id),
      '\n国际服全图鉴 国服仅供参考',
      segment.image('plugins/Tlon-Sky/resource/Picture/Statistics and others/全图鉴参考.png')
    ])
  }
}