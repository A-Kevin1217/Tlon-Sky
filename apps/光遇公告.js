import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';


export class wenan extends plugin {
    constructor () {
      super({
        name: '查询光遇公告',
        dsc: '最近光遇公告',
        event: 'message',
        priority: 5000,
        rule: [
          {
            reg: `^光遇公告$`,
            fnc: 'skygg'
          },
        ]
      })
    }

    async skygg(e) { 
      let msg = e.msg
      let url = `https://ma75.update.netease.com/game_notice/announcement_live.json`;
      let res = await fetch(url).catch((err) => logger.error(err))
      res = await res.json()
      await this.reply(`${res.Title}\n${res.OtherChannelMessage}`)
    }
}
