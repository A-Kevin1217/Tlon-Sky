const REGEX = /^(#|\/)?(20|21|22|23|24)年复刻记录$/
export class A_COPY_OF_THE_PAST extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:往期复刻',
      dsc: '光遇往期复刻',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: REGEX,
          fnc: 'A_COPY_OF_THE_PAST'
        }
      ]
    })
  }

  async A_COPY_OF_THE_PAST(e) {
    const image = `plugins/Tlon-Sky/resource/Picture/Duplicate recording/${(e.msg.match(REGEX))[2]}年光遇复刻记录.png`
    if (e.adapter === 'QQBot') return e.reply(['> 此表不计入集体复刻', segment.image(image)])
    return e.reply([segment.image(image)])
  }
}