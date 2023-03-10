import plugin from '../../../lib/plugins/plugin.js'
import{ segment }from 'oicq'

export class wenan extends plugin {
  constructor () {
    super({
      name: '光遇_大蜡位置',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: `^#?(大蜡烛位置|大蜡位置|大蜡)$`,
          fnc: 'sky_DLWZ'
        },
      ]
    })
  }
  async sky_DLWZ (e) {
      //cv了https://gitee.com/Nwflower/auto-plugin/blob/master/model/autoGroupName/OldTime.js的长安十二时辰代码
    await e.reply('正在返回图片,可能较慢')
    let now = new Date()
    let BigHourName = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥','子']
    let BigHourType = ['正','初']
    let BigMinName = ['零', '一', '二', '三', '四']
    let hour = Number(now.getHours())
    let minutes = now.getMinutes()
    let url = `https://api.t1qq.com/api/sky/gy/sc/scjlwz`;
    let url2 = `https://api.t1qq.com/api/sky/gy/sc/dlz/scdlwz.php`
    let url3 = `https://api.t1qq.com/api/sky/gy/sc/scsky.php`
    let url4 = `https://api.t1qq.com/api/sky/gy/sc/mf/magic`
    let msg = [
      '大蜡烛位置',segment.image(url2),
      '季蜡位置&今日任务&今日魔法',segment.image(url),segment.image(url3),segment.image(url4),
      `现在是长安${BigHourName[Math.floor((hour + 1)/2)]}${BigHourType[hour % 2]}${BigMinName[Math.floor(minutes/15)]}刻`
    ]
    await this.reply(msg, true)
    }  
}