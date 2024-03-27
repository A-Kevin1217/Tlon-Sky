import fetch from "node-fetch"

const REGEX = /^(#|\/)?(.*)季多久未复刻$/
export class SKY extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:先祖多久未复刻查询',
      event: 'message',
      priority: 1,
      rule: [
        {
          reg: REGEX,
          fnc: 'snrd'
        }
      ]
    })
  }

  getDayDiff(date) {
    const today = new Date()
    const timeDiff = today.getTime() - date.getTime()
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24)).toString().padStart(3, '0')
  }

  async snrd(e) {
    const SEASON_NAME = (e.msg.match(REGEX))[2]


    const SEASON_DATA = await (await fetch('https://gitee.com/Tloml-Starry/resources/raw/master/resources/json/先祖多久未复刻.json')).json()

    if (!SEASON_DATA[SEASON_NAME]) return e.reply('不存在该季节,请输入以下季节名：\n感恩丨追光丨归属丨音韵\n魔法丨圣岛丨预言丨梦想\n集结丨小王子丨风行')

    let msg = `数据更新时间：${SEASON_DATA['UPDATE TIME']}\n此表不计入集体复刻\n`
    for (const role of SEASON_DATA[SEASON_NAME]) {
      const dayDiff = this.getDayDiff(new Date(role.date))
      msg += `${role.name}已[ ${dayDiff} ]天！未复刻\n`
    }
    if (e.adapter === 'QQBot') return e.reply([`> ${msg.trim()}`])
    return e.reply(msg.trim());
  }
}