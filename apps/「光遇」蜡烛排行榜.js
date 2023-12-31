import plugin from '../../../lib/plugins/plugin.js';
import fetch from 'node-fetch'

export class 光遇_蜡烛排行榜 extends plugin {
  constructor() {
    super({
      name: '光遇_蜡烛排行榜',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^#?白蜡排行榜$/,
          fnc: '白蜡排行榜'
        },
        {
          reg: /^#?季蜡排行榜$/,
          fnc: '季蜡排行榜'
        }
      ]
    });
  }
  async 白蜡排行榜(e) {
    let msg = e.msg;
    let url = `https://api.t1qq.com/api/sky/gy/sc/id/phb/blphb.php`;
    let res = await fetch(url).catch((err) => logger.error(err))
    res = await res.json()
    await this.e.reply('!!!不是全服白蜡排行!!!\n排行榜只显示20位\n诺蜡烛能上榜,却没在榜上看见\n请查询一次白蜡', true, { recallMsg: 10 })
    let msgList = []
    for (let i = 0; i < 20 && i < res.data.length; i++) {
      const { id, candle, write } = res.data[i];
      let num = [
        `\nid: ${id}`,
        `\n普通蜡数量: [${candle}]`,
      ];
      if (write) {
        num.push(`\n上榜时间: ${write}`);
      }
      msgList.push({
        message: `==========Top${i + 1}========== ${num.join(' |')}`,
        nickname: Bot.nickname,
        user_uid: Bot.uin,
      });
    }
    await this.e.reply(await Bot.makeForwardMsg(msgList))
  }
  async 季蜡排行榜(e) {
    let msg = e.msg;
    let url = `https://api.t1qq.com/api/sky/gy/sc/id/phb/jlphb.php`;
    let res = await fetch(url).catch((err) => logger.error(err))
    res = await res.json()
    await this.e.reply('!!!不是全服季蜡排行!!!\n排行榜只显示20位\n诺蜡烛能上榜,却没在榜上看见\n请查询一次季蜡', true, { recallMsg: 10 })
    let msgList = []
    for (let i = 0; i < 20 && i < res.data.length; i++) {
      const { id, candle, write } = res.data[i];
      let num = [
        `\nid: ${id}`,
        `\n季节蜡数量: [${candle}]`,
      ];
      if (write) {
        num.push(`\n上榜时间: ${write}`);
      }
      msgList.push({
        message: `==========Top${i + 1}========== ${num.join(' |')}`,
        nickname: Bot.nickname,
        user_uid: Bot.uin,
      });
    }
    await this.e.reply(await Bot.makeForwardMsg(msgList))
  }
}