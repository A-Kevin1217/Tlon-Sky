import plugin from '../../../lib/plugins/plugin.js';
import fs from "fs";


export class 光遇_绘画分享 extends plugin {
  constructor() {
    super({
      name: '光遇_绘画分享',
      dsc: '光遇',
      event: 'message',
      priority:3000,
      rule: [
        {
          reg: /^#?(绘画|绘画分享|绘图分享)$/,
          fnc:'绘画分享'
        }
      ]
    })
  }
  
  async 绘画分享(e) {
    let Sky_image = `${process.cwd()}/plugins/Tlon-Sky/resource/光遇绘画分享/image/`;
    if (!fs.existsSync(Sky_image)) {
      await e.reply("抱歉未找到光遇绘画分享文件夹！\n请使用指令 [#Sky更新图库] 安装");
      return false;
    }
    let 图片 = Sky_image + fs.readdirSync(Sky_image)[Math.floor(Math.random() * fs.readdirSync(Sky_image).length)];
    await e.reply(segment.image(`file:///${图片}`))
    return true;
  }
}