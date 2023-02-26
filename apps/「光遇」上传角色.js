import plugin from '../../../lib/plugins/plugin.js';
import fetch from 'node-fetch'

export class wenan extends plugin {
  constructor() {
    super({
      name: '光遇_上传角色',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: `^#?(上传角色)(.*)$`,
          fnc: 'sky_scjs'
        }
      ]
    });
  }

  async sky_scjs(e) {
    let msg = e.msg;
    let place = msg.replace(/#|上传角色/g, "").trim();
    let url = `https://api.t1qq.com/api/sky/gy/sc/id.php?id=${place}`;
    let res = await fetch(url).catch((err) => logger.error(err))
    res = await res.json()
    let num
    if(res.msg === '您已上传过该id值') {
        num = `这个id已经上传过啦~\n忘记了的话,就请前往392665563查询~`
    } else if(res.msg === '请上传正确格式的id值') {
        num = `这个id不对哦~如果不知道是什么id的话\n请发送'查询教程'查看~`
    } else if(res.msg === '上传成功') {
        num = `上传成功~\n您的新id是：${res.data.uid}\n请妥善保管哦~`
    }
    await this.reply(`${num}`, false, { recallMsg: 0 }, true)
  }
}