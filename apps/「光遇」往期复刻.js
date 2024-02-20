import fs from "fs";

const REGEX = /^(#|\/)?(.*)年复刻记录$/
export class A_COPY_OF_THE_PAST extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:往期复刻',
      dsc: '光遇往期复刻',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: REGEX,
          fnc: 'A_COPY_OF_THE_PAST'
        }
      ]
    })
  }

  async A_COPY_OF_THE_PAST(e) {
    let year = (e.msg.match(REGEX))[2]
    const yearMap = {
      '20': '2020',
      '21': '2021',
      '22': '2022',
      '23': '2023',
      '24': '2024'
    };
    if (yearMap.hasOwnProperty(year)) {
      year = yearMap[year];
    }
    const imgreply = `plugins/Tlon-Sky/resource/Picture/Duplicate recording/${year}年光遇复刻记录.png`;
    if (!fs.existsSync(imgreply)) {
      return e.reply(`抱歉，没有找到${year}年复刻记录\n请检查名称是否正确`);
    } else {
      await e.reply([segment.at(e.user_id), segment.image(imgreply)]);
    }
  }
}