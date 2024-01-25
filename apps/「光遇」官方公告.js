import fetch from "node-fetch"
import { render } from '../components/index.js'

export class SKY_ANNOUNCEMENT extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:公告',
      dsc: '光遇公告',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^(#|\/)?光遇公告$/,
          fnc: 'SKY_ANNOUNCEMENT'
        },
      ]
    })
  }

  async SKY_ANNOUNCEMENT(e) {
    const FETCH_DATA = await fetch('https://ma75.update.netease.com/game_notice/announcement_live.json')
    const JSON = await FETCH_DATA.json()

    const TITLE = JSON.Title
    const GET_ANNOUNCEMENT = JSON.OtherChannelMessage
    const ANNOUNCEMENT = GET_ANNOUNCEMENT.replace(/<1>|<\/1>/g, "")

    await render('admin/公告', { TITLE: TITLE, ANNOUNCEMENT: ANNOUNCEMENT, }, { e, scale: 1.4 })
  }
}