import { render } from '../components/index.js'

export class SKY extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]碎石查询',
            dsc: 'example',
            event: 'message',
            priority: 1,
            rule: [
                { reg: /^(碎石查询|今日(红|黑)石)$/, fnc: 'GRAVEL_QUERY' },
                { reg: /^本月(碎|红|黑)石$/, fnc: 'MONTH_STONE' }
            ]
        })
    }

    async GRAVEL_QUERY(e) {
        const URL = 'https://gitee.com/Tloml-Starry/resources/raw/master/resources/img/光遇/碎石/'
        const img1 = `${URL}1.jpg`
        const img2 = `${URL}2.jpg`

        const today = new Date();
        const dayOfMonth = today.getDate();
        const dayOfWeek = today.getDay();

        let landingTime = ''
        let stoneType = ''
        if (dayOfMonth >= 1 && dayOfMonth <= 15) {
            if (dayOfWeek === 2) {
                stoneType = '黑石'
                landingTime = '(09:08—10:00)\n(14:08—15:00)\n(19:08—20:00)'
            } else if (dayOfWeek === 6) {
                stoneType = '红石'
                landingTime = '(10:08—11:00)\n(14:08—15:00)\n(22:08—23:00)'
            } else if (dayOfWeek === 0) {
                stoneType = '红石'
                landingTime = '(07:08—08:00)\n(13:08—14:00)\n(19:08—20:00)'
            } else return e.reply('今日无红&黑石')
        } else {
            if (dayOfWeek === 3) {
                stoneType = '黑石'
                landingTime = '(09:08—10:00)\n(15:08—16:00)\n(21:08—22:00)'
            } else if (dayOfWeek === 5) {
                stoneType = '红石'
                landingTime = '(11:08—12:00)\n(17:08—18:00)\n(23:08—24:00)'
            } else if (dayOfWeek === 0) {
                stoneType = '红石'
                landingTime = '(07:08—08:00)\n(13:08—14:00)\n(19:08—20:00)'
            } else return e.reply('今日无红&黑石')
        }

        return e.reply((e.adapter === 'QQBot') ? [
            `今日石头: ${stoneType}`,
            `降落时间段如下\r${landingTime}`,
            '点击按钮查看降落位置',
            Bot.Button([[
                { label: '降落位置', link: img1 },
                { label: '前往教程', link: img2 }
            ]])
        ] : [
            `今日石头: ${stoneType}\r` +
            `降落时间段如下\r${landingTime}`,
            segment.image(img1),
            segment.image(img2)
        ])
    }

    async MONTH_STONE(e) {
        await render('admin/光遇碎石日历', {}, {
            e,
            scale: 1.4
        })
    }
}