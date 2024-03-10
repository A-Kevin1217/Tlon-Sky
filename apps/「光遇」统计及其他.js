const URL = 'https://gitee.com/Tloml-Starry/resources/raw/master/resources/img/其他/'
export class STATISTICS_AND_OTHERS extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:统计及其他',
      dsc: '光遇统计及其他',
      event: 'message',
      priority: 5000,
      rule: [{
        reg: /^(#|\/)?身高(透明)?图$/,
        fnc: 'f1'
      }, {
        reg: /^(#|\/)?身高进阶知识$/,
        fnc: 'f2'
      }, {
        reg: /^(#|\/)?蜡烛合成机制$/,
        fnc: 'f3'
      }, {
        reg: /^(#|\/)?(身高)?测量规则$/,
        fnc: 'f4'
      }]
    })
  }

  async f1(e) {
    if (/^(#|\/)?身高透明图$/.test(e.msg)) {
      return e.reply([
        segment.image(`${URL}透明身高图.png`)
      ])
    } else {
      return e.reply([
        '发送[身高透明图]查看透明格式',
        segment.image(`${URL}身高图.jpg`)
      ])
    }
  }

  async f2(e) {
    return e.reply([
      segment.image(`${URL}身高进阶知识.jpg`)
    ])
  }

  async f3(e) {
    return e.reply([
      segment.image(`${URL}蜡烛合成机制.jpg`)
    ])
  }

  async f4(e) {
    return e.reply([
      segment.image(`${URL}测量规则.jpg`)

    ])
  }
}