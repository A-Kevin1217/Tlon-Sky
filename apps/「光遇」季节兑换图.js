import fs from "fs";

export class 光遇_季节兑换图 extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:季节兑换图',
      dsc: '光遇季节兑换图',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^(#|\/)?(.*)季兑换图$/,
          fnc: '季节兑换图'
        }
      ]
    })
  }
  async 季节兑换图(e) {
    let gc = e.msg.match(/^(#|\/)?(.*)季兑换图$/)
    let season = ''
    if (gc[2] === '欧若拉') { season = 'AURORA' }
    if (gc[2] === '集结') { season = '重组' }
    if (gc[2] === '凌冬') { season = '音韵' }
    const imgreply = `plugins/Tlon-Sky/resource/季节兑换图/${season}季.png`
    if (!fs.existsSync(imgreply)) {
      return e.reply(`抱歉，没有找到${season}季兑换图\n请检查名称是否正确`);
    } else {
      return this.e.reply([
        segment.at(this.e.user_id),
        segment.image(imgreply),
      ]);
    }
  }
}