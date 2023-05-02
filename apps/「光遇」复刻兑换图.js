import plugin from '../../../lib/plugins/plugin.js'
import fs from "fs"

export class 光遇_复刻兑换图 extends plugin {
  constructor () {
    super({
      name: '光遇_复刻兑换图',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^#?复刻兑换图$/,
          fnc: 'sky_Fk'
        },
      ]
    })
  }
  async sky_Fk(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/复刻图/image/Reprint.png';
    if (!fs.existsSync(imgreply)) {
      await e.reply("抱歉未找到复刻图文件夹！\n请使用指令 [#更新复刻] 安装");
      return false;
    }
    let msg = [
        imgreply ? segment.image(imgreply) : ""
    ]
    e.reply(msg)
    return true;
  }
}