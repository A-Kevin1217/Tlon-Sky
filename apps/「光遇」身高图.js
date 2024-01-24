const PIC_PATH = 'plugins/Tlon-Sky/resource/身高图/'
export class 光遇_身高图 extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:身高图',
      dsc: '光遇身高图',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^(#|\/)?(透明)?身高(透明)?图$/,
          fnc: 'STATURE_PIC'
        }
      ]
    })
  }

  async STATURE_PIC(e) {
    if (e.msg === '身高图') {
      return e.reply([segment.at(e.user_id), '\n发送[身高透明图]查看透明格式', segment.image(`${PIC_PATH}身高图.png`)]);
    } else if (e.msg === '身高透明图' || e.msg === '透明身高图') {
      return e.reply([segment.at(e.user_id), segment.image(`${PIC_PATH}透明身高图.png`)]);
    }

  }
}