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
    const URL = 'https://gitee.com/Tloml-Starry/resources/raw/master/resources/img/其他/全图鉴参考.jpg'
    return e.reply((e.adapter === 'QQBot') ? [
      '# 光遇全图鉴',
      '> 国际服全图鉴 国服仅供参考',
      segment.image(URL)
    ] : [
      segment.at(e.user_id),
      '\n国际服全图鉴 国服仅供参考',
      segment.image(URL)
    ])
  }
}