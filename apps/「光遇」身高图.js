import plugin from '../../../lib/plugins/plugin.js';
import { segment } from "oicq";
export class example extends plugin {
    constructor () {
      super({
        name: '光遇攻略',
        dsc: '光遇身高图',
        event: 'message',
        priority: 5000,
        rule: [
          {
            reg: '^身高图$',
            fnc: 'sgt'
          },
          {
            reg: '^身高透明图$',
            fnc: 'sgtmt'
          }
        ]
      })
    }
    async sgt (e) {
      const imgreply = 'plugins/SKY-GuangYu-plugin/resource/身高图/身高图.png';
      logger.info('[SKY]', e.msg)
      let msg = [
        segment.at(this.e.user_id),
        imgreply ? segment.image(imgreply) : "发送「身高透明图」查看透明格式",
                ]
      e.reply(msg)
      return true;
    }
    async sgtmt (e) {
      const imgreply = 'plugins/SKY-GuangYu-plugin/resource/身高图/透明身高图.png';
      logger.info('[SKY]', e.msg)
      let msg = [
        segment.at(this.e.user_id),
        imgreply ? segment.image(imgreply) : "",
                ]
      e.reply(msg)
      return true;
      }
}