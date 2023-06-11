import plugin from '../../../lib/plugins/plugin.js';
import fs from "fs";

export class 光遇_季节兑换图 extends plugin {
  constructor () {
    super({
      name: '光遇_季节兑换图',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^#?(.*)季兑换图$/,
          fnc: '季节兑换图'
        }
      ]
    })
  }
  async 季节兑换图 (e) {
    let msg = e.msg;
    let 季节 = msg.replace(/#|季兑换图/g, "").trim();
    if (季节 === '欧若拉') {季节 = 'AURORA'}
    if (季节 === '集结') {季节 = '重组'} 
    if (季节 === '凌冬') {季节 = '音韵'}
    const imgreply = `plugins/Tlon-Sky/resource/季节兑换图/${季节}季.png`
    if (!fs.existsSync(imgreply)) {
      await e.reply(`抱歉，没有找到${季节}季兑换图\n请检查名称是否正确`);
      return false;
    } else {
        await this.reply([
          segment.at(this.e.user_id),
          segment.image(imgreply),
        ]);
      }
    }
}