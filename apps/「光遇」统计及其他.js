export class STATISTICS_AND_OTHERS extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:统计及其他',
      dsc: '光遇统计及其他',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^(#|\/)?(透明)?身高(透明)?图$|(#|\/)?身高进阶知识$|(#|\/)?蜡烛合成机制$|(#|\/)?测量规则$|(#|\/)?好友树兑换图$/,
          fnc: 'STATISTICS_AND_OTHERS'
        }
      ]
    })
  }
  async STATISTICS_AND_OTHERS(e) {
    const PIC_PATH = 'plugins/Tlon-Sky/resource/Picture/Statistics and others/'
    if (/(#|\/)?身高图/.test(e.msg)) {
      return SEND(e, true, `${PIC_PATH}身高图.png`)
    } else if (/(#|\/)?透明身高图/.test(e.msg) || /(#|\/)?身高透明图/.test(e.msg)) {
      return SEND(e, false, `${PIC_PATH}透明身高图.png`)
    } else if (/(#|\/)?身高进阶知识/.test(e.msg)) {
      return SEND(e, false, `${PIC_PATH}身高进阶知识.png`)
    } else if (/(#|\/)?蜡烛合成机制/.test(e.msg)) {
      return SEND(e, false, `${PIC_PATH}蜡烛合成机制.png`)
    } else if (/(#|\/)?测量规则/.test(e.msg)) {
      return SEND(e, false, `${PIC_PATH}测量规则.png`)
    } else if (/(#|\/)?好友树兑换图/.test(e.msg)) {
      return SEND(e, false, `plugins/Tlon-Sky/resource/Picture/Exchange picture/好友树兑换图.png`)
    }
  }
}

async function SEND(e, STATE, PICTRUE) {
  let TEXT = ''; if (STATE) { TEXT = '\n发送[身高透明图]查看透明格式' }
  return e.reply([segment.at(e.user_id), TEXT, segment.image(PICTRUE)])
}