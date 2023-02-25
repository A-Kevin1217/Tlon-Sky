import plugin from '../../../lib/plugins/plugin.js';
import{ segment }from 'oicq'

export class wenan extends plugin {
  constructor() {
    super({
      name: '光遇_季蜡查询',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: `^#?(季蜡查询)(.*)$`,
          fnc: 'sky_jlcx'
        }
      ]
    });
  }

  async sky_jlcx(e) {
    let msg = e.msg;
    let place = msg.replace(/#|季蜡查询/g, "").trim();
    let url = `https://api.t1qq.com/api/sky/gy/sc/scjl?id=${place}&type=jl`;
    await e.reply('正在查询中...\n返回速度较慢,请耐心等待\n数据更新取决于网易服务器\n如诺不对请等待3~5分钟再次查询\n注意!!!该ID极其重要,请发送后自行撤回', true)
    await this.reply(segment.image(url), true);
  }
}