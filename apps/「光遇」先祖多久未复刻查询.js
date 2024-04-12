import fetch from "node-fetch"

const REGEX = /^(#|\/)?(.*)季多久未复刻$/
export class SKY extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]光遇:先祖多久未复刻查询',
            event: 'message',
            priority: 1,
            rule: [{
                reg: REGEX,
                fnc: 'snrd'
            }]
        })
    }

    getDayDiff(date) {
        const today = new Date()
        const timeDiff = today.getTime() - date.getTime()
        return Math.floor(timeDiff / (1000 * 60 * 60 * 24)).toString().padStart(3, '0')
    }

    async snrd(e) {
        const SEASON_NAME = e.msg.match(REGEX)[2]
        const URL_DATA = await (await fetch('https://gitee.com/Tloml-Starry/resources/raw/master/resources/json/先祖多久未复刻.json')).json()

        if (!URL_DATA[SEASON_NAME]) return e.reply([
            segment.at(e.user_id),
            '\n不存在该季节，或该季节尚未开始复刻'
        ])

        let msg = `数据更新时间：${URL_DATA['UPDATE TIME']}\n此表不计入集体复刻\n`

        for (const role of URL_DATA[SEASON_NAME]) {
            msg += `${role.name}已[ ${this.getDayDiff(new Date(role.date))} ]天未复刻\n`
        }

        return e.reply((e.adapter === 'QQBot') ? [
            `> ${msg.trim()}`,
            Bot.Button([[
                { label: '感恩', callback: '/感恩季多久未复刻' },
                { label: '追光', callback: '/追光季多久未复刻' },
                { label: '归属', callback: '/归属季多久未复刻' },
                { label: '音韵', callback: '/音韵季多久未复刻' },
            ], [
                { label: '魔法', callback: '/魔法季多久未复刻' },
                { label: '圣岛', callback: '/圣岛季多久未复刻' },
                { label: '预言', callback: '/预言季多久未复刻' },
                { label: '梦想', callback: '/梦想季多久未复刻' },
            ], [
                { label: '集结', callback: '/集结季多久未复刻' },
                { label: '小王子', callback: '/小王子季多久未复刻' },
                { label: '风行', callback: '/风行季多久未复刻' },
            ]])
        ] : msg.trim())
    }
}