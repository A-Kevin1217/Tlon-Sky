import plugin from '../../../lib/plugins/plugin.js';
import fetch from "node-fetch";


export class 光遇_公告 extends plugin {
  constructor () {
    super({
      name: '光遇_公告',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^#?光遇公告$/,
          fnc: '光遇公告'
        },
      ]
    })
  }
  
  async 光遇公告(e) {
    let url = `https://ma75.update.netease.com/game_notice/announcement_live.json`;
    let res = await fetch(url).catch((err) => logger.error(err))
    res = await res.json()
    await this.reply(`${res.Title}\n${res.OtherChannelMessage}`, false, { recallMsg: 20 })
  }
}