const REGEX = /^(#|\/)?(20|21|22|23|24)年复刻记录$/
const URL = 'https://gitee.com/Tloml-Starry/resources/raw/master/resources/img/复刻记录/'
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
    return e.reply([
      '> 此表不计入集体复刻',
      segment.image(`${URL}${e.msg.match(REGEX)[2]}年光遇复刻记录.jpg`)
    ])
  }
}