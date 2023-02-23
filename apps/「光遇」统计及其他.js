import plugin from '../../../lib/plugins/plugin.js'
import { segment } from "oicq";

//图源光媛攻略组，侵权联系删
export class example extends plugin {
    constructor () {
      super({
        name: '光遇',
        dsc: '光遇统计及其他',
        event: 'message',
        priority: 5000,
        rule: [
            {
                reg: '^#?好友树兑换图$',
                fnc: 'sky_HYS'
            },
            {
                reg: '^#?测量规则$',
                fnc: 'sky_CLGZ'
            },
            {
                reg: '^#?蜡烛合成机制$',
                fnc: 'sky_LZHCJZ'
            },
            {
                reg: '^#?身高进阶知识$',
                fnc: 'sky_SGJJZS'
            }
        ]
    })
}
  async sky_HYS(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/统计及其他/好友树兑换图.png';
      logger.info('[SKY]', e.msg)
      let msg = [
        imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg, true)
    return true;
  }
  async sky_CLGZ(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/统计及其他/测量规则.png';
    logger.info('[SKY]', e.msg)
    let msg = [
        imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg, true)
    return true;
  }
  async sky_LZHCJZ(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/统计及其他/蜡烛合成机制.png';
    logger.info('[SKY]', e.msg)
    let msg = [
        imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg, true)
    return true;
  }
  async sky_SGJJZS(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/统计及其他/身高进阶知识.png';
    logger.info('[SKY]', e.msg)
    let msg = [
        imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg, true)
    return true;
  }
}