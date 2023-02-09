import plugin from '../../../lib/plugins/plugin.js';
import fetch from "node-fetch";

export class wenan extends plugin {
  constructor() {
    super({
      name: '光遇',
      dsc: '季蜡查询',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^#(季蜡查询)(.*)$',
          fnc: 'sky_jlcx'
        },
        {
          reg: '^季蜡查询',
          fnc: 'sky_jlcxNO'
        }
      ]
    });
  }
  async sky_jlcx(e) {
    let msg = e.msg;
    let place = msg.replace(/#|季蜡查询/g, "").trim();
    let url = `http://plugin.skybay.cn:443/api/cx_w?id=${place}&cmd=jl`;
    let res = await fetch(url).catch((err) => logger.error(err));
    res = await res.json();
    const { time, change, residual } = res.data[0];
    await this.reply(`可能会有延迟\n变化时间：${time}\n变化数量：${change}\n剩余季蜡：${residual}`, true);
  }
  async sky_jlcxNO(e) {
    const Textreply = '该指令需要带"#"号噢,获取原ID教程请发送查询教程';
    logger.info('[SKY]', e.msg)
      let msg = [
        segment.at(this.e.user_id),'\n',
        Textreply ? Textreply : "",
                ]
      e.reply(msg, true)
      return true;
  }
}