import fetch from "node-fetch";
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
      let url = 'https://gchat.qpic.cn/gchatpic_new/3620060826/950353702-2605128334-94C0ED7D68A2766BE6E952F86A2DEFB9/0?term=3&is_origin=0'
      let res = await fetch(url).catch((err) => logger.error(err))
      await this.reply([
        segment.at(this.e.user_id),
        segment.image(url),"发送「身高透明图」查看PNG格式"
      ])
    }
    async sgtmt (e) {
        let url = 'https://gchat.qpic.cn/gchatpic_new/3620060826/950353702-3074695606-E2ED2EC049E20D91558D712E40A66537/0?term=3&is_origin=0'
        let res = await fetch(url).catch((err) => logger.error(err))
        await this.reply([
          segment.at(this.e.user_id),
          segment.image(url)
        ])
      }
}