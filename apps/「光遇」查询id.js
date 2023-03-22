import plugin from '../../../lib/plugins/plugin.js';
import fetch from 'node-fetch'

export class wenan extends plugin {
  constructor() {
    super({
      name: '光遇_查询id',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: `^#?(查询id)(.*)$`,
          fnc: 'sky_scids'
        }
      ]
    });
  }

  async sky_scids(e) {
    let msg = e.msg;
    let place = msg.replace(/#|查询id/g, "").trim();
    let url = `https://api.t1qq.com/api/sky/gy/gf/uid.php?uid=${place}`;
    let res = await fetch(url).catch((err) => logger.error(err))
    res = await res.json()
    let num
    if(res.msg === 201) {
        num = `查询失败！未找到id记录\n忘记了的话,请发送'上传id'\nps:首次上传才能进行反查uid哦！`
    } else if(res.msg === '请上传正确格式的id值') {
        num = `这个id不对哦~如果不知道是什么id的话\n请发送'查询教程'查看~\nps:首次上传才能进行反查uid哦！`
    } else if(res.code === 200) {
        num = `查询成功~\n您的玩家id是：${res.id}\n请妥善保管哦~\nps:首次上传才能进行反查uid哦！`
    }
    await this.reply(`${num}`, false, { recallMsg: 0 }, true)
  }
}