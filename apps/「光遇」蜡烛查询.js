import plugin from '../../../lib/plugins/plugin.js';
import fs from 'fs'

const dirpath = "plugins/Tlon-Sky/data/id"
let filename = `Sky ID.json`

export class 光遇_蜡烛查询 extends plugin {
  constructor() {
    super({
      name: '光遇_蜡烛查询',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^#?季蜡查询$/,
          fnc: '季蜡查询'
        },
        {
          reg: /^#?白蜡查询$/,
          fnc: '白蜡查询'
        }
      ]
    });
  }

  async 季蜡查询(e) {
    let json = JSON.parse(fs.readFileSync(dirpath + "/" + filename, "utf8"));
    let id = e.user_id
    let msg = e.msg;
    let place = msg.replace(/#|季蜡查询/g, "").trim();
    if(json.hasOwnProperty(id)) {
      await e.reply('id已收录，正在查询...', false, { recallMsg: 10 }, true)
      place = JSON.stringify(json[id].Sky_id).slice(1, -1)
      await e.reply('返回速度较慢,请耐心等待\n数据更新取决于网易服务器\n如诺不对请等待3~5分钟再次查询', false, { recallMsg: 10 }, true)
      let url = `https://api.t1qq.com/api/sky/gy/sc/scjl?id=${place}&type=jl`;
      msg = segment.image(url)
      await this.reply(msg, false, { recallMsg: 0 }, true);
    }
    else{await e.reply('您还未绑定id')}
  }

  async 白蜡查询(e) {
    let json = JSON.parse(fs.readFileSync(dirpath + "/" + filename, "utf8"));
    let id = e.user_id
    let msg = e.msg;
    let place = msg.replace(/#|白蜡查询/g, "").trim();
    if(json.hasOwnProperty(id)) {
      await e.reply('id已收录，正在查询...', false, { recallMsg: 10 }, true)
      place = JSON.stringify(json[id].Sky_id).slice(1, -1)
      await e.reply('返回速度较慢,请耐心等待\n数据更新取决于网易服务器\n如诺不对请等待3~5分钟再次查询', false, { recallMsg: 10 }, true)
      let url = `https://api.t1qq.com/api/sky/gy/sc/scbl?id=${place}&type=bl`;
      msg = segment.image(url)
      await this.reply(msg, false, { recallMsg: 0 }, true);
    }
    else{await e.reply('您还未绑定id')}
  }
}