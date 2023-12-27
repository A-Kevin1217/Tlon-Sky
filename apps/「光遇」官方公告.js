import fetch from "node-fetch";
import { render } from '../components/index.js';

export class 光遇_公告 extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:公告',
      dsc: '光遇公告',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^(#|\/)?光遇公告$/,
          fnc: '光遇公告'
        },
      ]
    })
  }

  async 光遇公告(e) {
    let url = `https://ma75.update.netease.com/game_notice/announcement_live.json`;
    let res = await fetch(url).catch((err) => logger.error(err))
    res = await res.json()
    let msg = res.OtherChannelMessage
    msg = msg.replace(/<1>|<\/1>/g, "");

    const msg1 = res.Title
    let data = {
      msg1: msg1,
      msg: msg,
    }
    await render('admin/公告', {
      ...data
    }, {
      e,
      scale: 1.4
    })
  }
}