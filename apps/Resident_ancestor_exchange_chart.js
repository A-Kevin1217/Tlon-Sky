import plugin from '../../../lib/plugins/plugin.js'
import { segment } from "oicq";
export class example extends plugin {
    constructor () {
      super({
        name: '光遇攻略',
        dsc: '光遇攻略',
        event: 'message',
        priority: 5000,
        rule: [
            {
                reg: '^晨岛兑换图$',
                fnc: 'chenddht'
            },
            {
                reg: '^云野兑换图$',
                fnc: 'yunydht'
            },
            {
                reg: '^雨林兑换图$',
                fnc: 'yuldht'
            },
            {
                reg: '^(峡谷|霞谷)兑换图$',
                fnc: 'xiagdht'
            },
            {
                reg: '^暮土兑换图$',
                fnc: 'mutdht'
            },
            {
                reg: '^禁阁兑换图$',
                fnc: 'jingdht'
            },
            {
                reg: '^墓土兑换图',
                fnc: 'mutu'
            }
        ]
    })
}
  async chenddht(e) {
    const imgreply = 'plugins/SKY-GuangYu-plugin/resource/Isle_of_Dawn_Exchange_chart.png';
      logger.info('[SKY]', e.msg)
      let msg = [
        segment.at(this.e.user_id),
        imgreply ? segment.image(imgreply) : "",
                ]
      e.reply(msg)
      return true;
  }
  async yunydht(e) {
    const imgreply = 'plugins/SKY-GuangYu-plugin/resource/Yuno_Exchange_chart.png';
      logger.info('[SKY]', e.msg)
      let msg = [
        segment.at(this.e.user_id),
        imgreply ? segment.image(imgreply) : "",
                ]
      e.reply(msg)
      return true;
  }
  async yuldht(e) {
    const imgreply = 'plugins/SKY-GuangYu-plugin/resource/Rain_forest_Exchange_chart.png';
      logger.info('[SKY]', e.msg)
      let msg = [
        segment.at(this.e.user_id),
        imgreply ? segment.image(imgreply) : "",
                ]
      e.reply(msg)
      return true;
  }
  async xiagdht(e) {
    const imgreply = 'plugins/SKY-GuangYu-plugin/resource/Xiagu_Exchange_chart.png';
      logger.info('[SKY]', e.msg)
      let msg = [
        segment.at(this.e.user_id),
        imgreply ? segment.image(imgreply) : "",
                ]
      e.reply(msg)
      return true;
  }
  async mutdht(e) {
    const imgreply = 'plugins/SKY-GuangYu-plugin/resource/Golden_Wasteland_Exchange_chart.png';
      logger.info('[SKY]', e.msg)
      let msg = [
        segment.at(this.e.user_id),
        imgreply ? segment.image(imgreply) : "",
                ]
      e.reply(msg)
      return true;
  }
  async jingdht(e) {
    const imgreply = 'plugins/SKY-GuangYu-plugin/resource/Forbidden_cabinet_Exchange_chart.png';
      logger.info('[SKY]', e.msg)
      let msg = [
        segment.at(this.e.user_id),
        imgreply ? segment.image(imgreply) : "",
                ]
      e.reply(msg)
      return true;
  }
  async mutu(e) {
    const Textreply = '不是"墓"土哦亲，是"暮"土';
    logger.info('[SKY]', e.msg)
      let msg = [
        segment.at(this.e.user_id),'\n',
        Textreply ? Textreply : "",
                ]
      e.reply(msg)
      return true;
  }
}