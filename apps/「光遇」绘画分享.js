import plugin from '../../../lib/plugins/plugin.js';
import fs from "fs";

export class sky_hhfx extends plugin {
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
    //定义一个变量Sky_image为项目中的指定路径
    let Sky_image = `${process.cwd()}/plugins/Tlon-Sky/resource/光遇绘画分享/image/`;
    //如果这个路径下的文件夹不存在
    if (!fs.existsSync(Sky_image)) {
      //发送错误消息
      await e.reply("抱歉未找到光遇绘画分享文件夹！\n请使用指令 [#Sky更新图库] 安装");
      //返回false
      return false;
    }
    //定义变量img为随机选择文件夹中的图片
    let 图片 = Sky_image + fs.readdirSync(Sky_image)[Math.floor(Math.random() * fs.readdirSync(Sky_image).length)];
    //发送选中图片
    await e.reply(
      segment.image(`file:///${图片}`)
      )
      //返回true
    return true;
  }
}