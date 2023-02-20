import plugin from '../../../lib/plugins/plugin.js';
import fetch from "node-fetch";

export class wenan extends plugin {
  constructor() {
    super({
      name: '光遇',
      dsc: '白蜡查询',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: `^#?(蜡烛查询)(.*)$`,
          fnc: 'sky_lzcx'
        }
      ]
    });
  }

  async sky_lzcx(e) {
    let msg = e.msg;
    let place = msg.replace(/#|蜡烛查询/g, "").trim();
    let url = `http://plugin.skybay.cn:443/api/cx_w?id=${place}&cmd=bl`;
    let res = await fetch(url).catch((err) => logger.error(err));
    res = await res.json();
    const { time, change, residual } = res.data[0];
    await this.reply(`可能会有延迟\n变化时间：${time}\n变化数量：${change}\n剩余蜡烛：${residual}`, true);
  }
}