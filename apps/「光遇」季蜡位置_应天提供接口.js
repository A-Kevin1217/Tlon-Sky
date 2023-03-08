import plugin from '../../../lib/plugins/plugin.js'
import{ segment }from 'oicq'

export class wenan extends plugin {
  constructor () {
    super({
      name: '光遇_季蜡位置',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: `^#?(季蜡|季蜡位置|JLWZ|jlwz)$`,
          fnc: 'sky_JLWZ'
        },
      ]
    })
  }
  async sky_JLWZ (e) {
    //cv了https://gitee.com/Nwflower/auto-plugin/blob/master/model/autoGroupName/SystemTime.js的系统时间代码
    let now = new Date()
    let hour = now.getHours()
    let minutes = now.getMinutes()
    if (hour < 10) { hour = `0${hour.toString()}` }
    if (minutes < 10) { minutes = `0${minutes.toString()}` }
    await e.reply('正在返回图片,可能较慢')
    let url = `https://api.t1qq.com/api/sky/gy/sc/scjlwz`;
    let url2 = `https://api.t1qq.com/api/sky/gy/sc/dlz/scdlwz.php`
    let url3 = `https://api.t1qq.com/api/sky/gy/sc/scsky.php`
    let msg = [
      '季蜡位置',segment.image(url),
      '今日任务&大蜡烛位置',segment.image(url3),segment.image(url2),
      '发送时间：',`${hour}`,':',`${minutes}`
    ]
    await this.reply(msg, true)
    }  
}
