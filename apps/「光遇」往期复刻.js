import plugin from '../../../lib/plugins/plugin.js'
import fs from "fs";

export class 光遇_往期复刻 extends plugin {
  constructor () {
    super({
      name: '光遇_往期复刻',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^#?(.*)年复刻记录$/,
          fnc: '往期复刻'
        }
      ]
    })
  }
  async 往期复刻(e) {
    let msg = e.msg;
    let 往期复刻 = msg.replace(/#|年复刻记录/g, "").trim();
    if (往期复刻 === '20') {往期复刻 = '2020'}
    if (往期复刻 === '21') {往期复刻 = '2021'}
    if (往期复刻 === '22') {往期复刻 = '2022'}
    if (往期复刻 === '23') {往期复刻 = '2023'}
    const imgreply = `plugins/Tlon-Sky/resource/复刻记录/${往期复刻}年光遇复刻记录.png`;
    if (!fs.existsSync(imgreply)) {
      await e.reply(`抱歉，没有找到${往期复刻}年复刻记录\n请检查名称是否正确`);
      return false;
    } else {
        await this.reply([
          segment.at(this.e.user_id),
          segment.image(imgreply),
        ]);
      }
  }
}