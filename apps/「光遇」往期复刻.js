import plugin from '../../../lib/plugins/plugin.js'
import { segment } from "oicq";

export class example extends plugin {
    constructor () {
      super({
        name: '光遇',
        dsc: '光遇往期复刻',
        event: 'message',
        priority: 5000,
        rule: [
            {
              reg: '^(2020|20)年复刻记录$',
              fnc: 'fkjl20'
            },
            {
              reg: '^(2021|21)年复刻记录$',
              fnc: 'fkjl21'
            },
            {
              reg: '^(2022|22)年复刻记录)$',
              fnc: 'fkjl22'
            },
            {
              reg: '^(2023|23)年复刻记录$',
              fnc: 'fkjl23'
            }
        ]
    })
}
  async fkjl20(e) {
    const imgreply = 'plugins/SKY-GuangYu-plugin/resource/复刻记录/2020年光遇复刻记录.png';
    logger.info('[复刻记录]', e.msg)
    let msg = [
      imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg)
    return true;
  }
  async fkjl21(e) {
    const imgreply = 'plugins/SKY-GuangYu-plugin/resource/复刻记录/2021年光遇复刻记录.png'
    logger.info('[复刻记录]',e.msg)
    let msg = [
      imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg)
    return true;
  }
  async fkjl22(e) {
    const imgreply = 'plugins/SKY-GuangYu-plugin/resource/复刻记录/2022年光遇复刻记录.png'
    logger.info('[复刻记录]',e.msg)
    let msg = [
      imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg)
    return true;
  }
  async fkjl23(e) {
    const imgreply = 'plugins/SKY-GuangYu-plugin/resource/复刻记录/2023年光遇复刻记录.png'
    logger.info('[复刻记录]',e.msg)
    let msg = [
        imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg)
    return true;
  }
}