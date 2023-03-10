import plugin from '../../../lib/plugins/plugin.js'
import{ segment }from 'oicq'
import moment from "moment";

export class wenan extends plugin {
  constructor () {
    super({
      name: '光遇_每日任务',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: `^#?(光遇今日任务|国服今日任务|今日任务|任务)$`,
          fnc: 'sky_JRRW'
        },
      ]
    })
  }
  async sky_JRRW (e) {
    //cv了https://gitee.com/Nwflower/auto-plugin/blob/master/model/autoGroupName/MonthMassage.js的月消息数代码
    let month = Number(moment().month()) + 1
    let monthKey = `Yz:count:sendMsg:month:`
    let messageCount = await redis.get(`${monthKey}${month}`) || 0
    await e.reply('正在返回图片,可能较慢')
    let url = `https://api.t1qq.com/api/sky/gy/sc/scjlwz`;
    let url2 = `https://api.t1qq.com/api/sky/gy/sc/dlz/scdlwz.php`
    let url3 = `https://api.t1qq.com/api/sky/gy/sc/scsky.php`
    let url4 = `https://api.t1qq.com/api/sky/gy/sc/mf/magic`
    let msg = [
      segment.image(url4),
      '今日任务',segment.image(url3),
      '季蜡位置&大蜡烛位置',segment.image(url),segment.image(url2),
      '本月已发送',`${messageCount}`,'条消息'
    ]
    await this.reply(msg, true)
    }  
}
