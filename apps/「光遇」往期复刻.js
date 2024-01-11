import fs from "fs";

export class 光遇_往期复刻 extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:往期复刻',
      dsc: '光遇往期复刻',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^(#|\/)?(.*)年复刻记录$/,
          fnc: '往期复刻'
        }
      ]
    })
  }

  async 往期复刻(e) {
    let gc = e.msg.match(/^(#|\/)?(.*)年复刻记录$/)
    let year = '';
    if (gc[2] === '20') { year = '2020' }
    if (gc[2] === '21') { year = '2021' }
    if (gc[2] === '22') { year = '2022' }
    if (gc[2] === '23') { year = '2023' }
    if (gc[2] === '24') { year = '2024' }
    const imgreply = `plugins/Tlon-Sky/resource/复刻记录/${year}年光遇复刻记录.png`;
    if (!fs.existsSync(imgreply)) {
      return e.reply(`抱歉，没有找到${year}年复刻记录\n请检查名称是否正确`);
    } else {
      await e.reply([
        segment.at(e.user_id),
        segment.image(imgreply),
      ]);
    }
  }
}