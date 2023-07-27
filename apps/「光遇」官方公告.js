import plugin from '../../../lib/plugins/plugin.js';
import { render , Data } from '../components/index.js'
import fetch from "node-fetch";
import lodash from 'lodash'
import fs from 'fs'


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
    const 昵称 = e.sender.nickname;
    let url = `https://ma75.update.netease.com/game_notice/announcement_live.json`;
    let res = await fetch(url).catch((err) => logger.error(err))
    res = await res.json()
    const msg = `${res.Title}\n${res.OtherChannelMessage}`
    let data = {
      msg: msg,
      qq: 昵称
    }
    await render('admin/gg', {
      ...data,
      bg: await rodom()
    }, {
      e,
      scale: 1.4
    })
  }
}
const rodom = async function () {
  let image = fs.readdirSync('./plugins/Tlon-Sky/resource/admin/imgs/bg')
  let listImg = []
  for (let val of image) {
    listImg.push(val)
  }
  let imgs = listImg.length == 1 ? listImg[0] : listImg[lodash.random(0, listImg.length - 1)]
  return imgs
}