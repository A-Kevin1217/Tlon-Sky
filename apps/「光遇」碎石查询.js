export class SKY extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]碎石查询',
            dsc: 'example',
            event: 'message',
            priority: 1,
            rule: [
                {
                    reg: /^(碎石查询|今日(红|黑)石)/,
                    fnc: 'GRAVEL_QUERY'
                }
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

        if (dayOfMonth >= 1 && dayOfMonth <= 15) {
            if (dayOfWeek === 2) {
                return e.reply([
                    '今日是黑石\n降落时间段：\n(09:08~10:00)\n(14:08~15:00)\n(19:08~20:00)',
                    segment.image(img1),
                    segment.image(img2)
                ])
            } else if (dayOfWeek === 6) {
                return e.reply([
                    '今日是红石\n降落时间段：\n(10:08~11:00)\n(14:08~15:00)\n(22:08~23:00)',
                    segment.image(img1),
                    segment.image(img2)
                ])
            } else if (dayOfWeek === 0) {
                return e.reply([
                    '今日是红石\n降落时间段：\n(07:08~08:00)\n(13:08~14:00)\n(19:08~20:00)',
                    segment.image(img1),
                    segment.image(img2)
                ])
            } else {
                return e.reply('今日无(红|黑)石')
            }
        } else {
            if (dayOfWeek === 3) {
                return e.reply([
                    '今日是黑石\n降落时间段：\n(09:08~10:00)\n(15:08~16:00)\n(21:08~22:00)',
                    segment.image(img1),
                    segment.image(img2)
                ])
            } else if (dayOfWeek === 5) {
                return e.reply([
                    '今日是红石\n降落时间段：\n(11:08~12:00)\n(17:08~18:00)\n(23:08~24:00)',
                    segment.image(img1),
                    segment.image(img2)
                ])
            } else if (dayOfWeek === 0) {
                return e.reply([
                    '今日是红石\n降落时间段：\n(07:08~08:00)\n(13:08~14:00)\n(19:08~20:00)',
                    segment.image(img1),
                    segment.image(img2)
                ])
            } else {
                return e.reply('今日无(红|黑)石')
            }
        }
    }
}