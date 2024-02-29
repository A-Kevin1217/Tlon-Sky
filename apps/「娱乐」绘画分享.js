import fs from "fs";

export class SKY extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]娱乐:绘画分享',
      dsc: 'Tlon-Sky',
      event: 'message',
      priority: 1,
      rule: [{
        reg: /^(#|\/)?(绘画|绘画分享|绘图分享)$/,
        fnc: 'paintingSharing'
      }]
    })
  }

  async paintingSharing(e) {
    const imageFile = 'plugins/Tlon-Sky/resource/光遇绘画分享/image/';
    if (!fs.existsSync(imageFile)) { return e.reply("抱歉未找到光遇绘画分享文件夹！\n请使用指令 [#Sky更新图库] 安装") }
    const Pictrue = imageFile + fs.readdirSync(imageFile)[Math.floor(Math.random() * fs.readdirSync(imageFile).length)];
    return await e.reply(segment.image(`file:///${Pictrue}`))
  }
}