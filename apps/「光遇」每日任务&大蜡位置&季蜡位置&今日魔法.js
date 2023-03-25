import plugin from '../../../lib/plugins/plugin.js'
import{ segment }from 'oicq'
import moment from "moment";
let RW = 'https://api.t1qq.com/api/sky/gy/sc/scsky.php'
let JL = 'https://api.t1qq.com/api/sky/gy/sc/scjlwz'
let DL = 'https://api.t1qq.com/api/sky/gy/sc/dlz/scdlwz.php'
let MF = 'https://api.t1qq.com/api/sky/gy/sc/mf/magic'
/*
cv了https://gitee.com/Nwflower/auto-plugin/blob/master/model/autoGroupName/MonthMassage.js月消息数代码
cv了https://gitee.com/Nwflower/auto-plugin/blob/master/model/autoGroupName/OldTime.js长安十二时辰代码
cv了https://gitee.com/Nwflower/auto-plugin/blob/master/model/autoGroupName/SystemTime.js系统时间代码
*/
export class wenan extends plugin {
  constructor () {
    super({
      name: '光遇_每日任务&大蜡位置&季蜡位置&今日魔法',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: `^#?(光遇今日任务|国服今日任务|今日任务|任务)$`,
          fnc: 'sky_JRRW'
        },
        {
          reg: `^#?(大蜡烛位置|大蜡位置|大蜡|DL)$`,
          fnc: 'sky_DLWZ'
        },
        {
          reg: `^#?(季蜡|季蜡位置|JL)$`,
          fnc: 'sky_JLWZ'
        },
      ]
    })
  }
  async sky_JRRW (e) {
    let month = Number(moment().month()) + 1
    let monthKey = `Yz:count:sendMsg:month:`
    let messageCount = await redis.get(`${monthKey}${month}`) || 0
    await e.reply('稍等...', true)
    let msg = [
      segment.image(MF),
      '今日任务',segment.image(RW),
      '季蜡位置&大蜡烛位置',segment.image(JL),segment.image(DL),
      '本月已发送',messageCount,'条消息'
    ]
    await this.reply(msg, true)
  }
  async sky_DLWZ (e) {
    await e.reply('稍等...', true)
    let now = new Date()
    let BigHourName = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥','子']
    let BigHourType = ['正','初']
    let BigMinName = ['零', '一', '二', '三', '四']
    let hour = Number(now.getHours())
    let minutes = now.getMinutes()
    let msg = [
      '大蜡烛位置',segment.image(DL),
      `现在是长安${BigHourName[Math.floor((hour + 1)/2)]}${BigHourType[hour % 2]}${BigMinName[Math.floor(minutes/15)]}刻`
    ]
    await this.reply(msg, true)
  }
  async sky_JLWZ (e) {
    let now = new Date()
    let hour = now.getHours()
    let minutes = now.getMinutes()
    if (hour < 10) { hour = `0${hour.toString()}` }
    if (minutes < 10) { minutes = `0${minutes.toString()}` }
    await e.reply('稍等...', true)
    let msg = [
      '季蜡位置',segment.image(JL),
      '发送时间：',hour,':',minutes
    ]
    await this.reply(msg, true)
  }  
}
