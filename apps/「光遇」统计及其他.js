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
                reg: '^好友树兑换$',
                fnc: 'sky_hys'
            },
            {
                reg: '^测量规则$',
                fnc: 'sky_clgz'
            },
            {
                reg: '^蜡烛合成机制$',
                fnc: 'sky_lzhcjz'
            },
            {
                reg: '^身高进阶知识$',
                fnc: 'sky_sgjjzs'
            }
        ]
    })
}
  async sky_hys(e) {
    const imgreply = 'plugins/SKY-GuangYu-plugin/resource/统计及其他/好友树.png';
      logger.info('[SKY]', e.msg)
      let msg = [
        imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg, true)
    return true;
  }
  async sky_clgz(e) {
    const imgreply = 'plugin/SKY-GuangYu-plugin/resource/统计及其他/测量规则.png';
    logger.info('[SKY]', e.msg)
    let msg = [
        imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg, true)
    return true;
  }
  async sky_lzhcjz(e) {
    const imgreply = 'plugin/SKY-GuangYu-plugin/resource/统计及其他/蜡烛合成机制.png';
    logger.info('[SKY]', e.msg)
    let msg = [
        imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg, true)
    return true;
  }
  async sky_sgjjzs(e) {
    const imgreply = 'plugin/SKY-GuangYu-plugin/resource/统计及其他/身高进阶知识.png';
    logger.info('[SKY]', e.msg)
    let msg = [
        imgreply ? segment.image(imgreply) : "",
    ]
    e.reply(msg, true)
    return true;
  }
}