import plugin from '../../../lib/plugins/plugin.js';
import fs from 'fs';

export class 娱乐_送蜡烛 extends plugin {
    constructor() {
        super({
            name: '娱乐_送蜡烛',
            dsc: '娱乐',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: /^(#|\/)?送蜡烛.*$/,
                    fnc: '送蜡烛'
                }
            ]
        })
    }

    async 送蜡烛(e) {
        const 用户ID = e.user_id;
        let 对象ID = e.at
        const regex = /\d+/g;
        if (e.atme === true) {
            对象ID = Bot.uin
        } else if (对象ID === undefined || 对象ID === null) {
            return e.reply('请at对方')
        }

        if (对象ID === 用户ID) {
            return e.reply('不可自己赠送自己')
        }
        const 用户位置 = `plugins/Tlon-Sky/data/Sky签到/${用户ID}.json`
        const 对象位置 = `plugins/Tlon-Sky/data/Sky签到/${对象ID}.json`

        try {
            let match = regex.exec(e.raw_message)
            const 提取赠送数量 = match[0]
            const 赠送数量 = parseFloat(提取赠送数量)
            if (isNaN(赠送数量) || 赠送数量 <= 0 || !Number.isInteger(赠送数量)) {
                return e.reply('请输入有效的整数赠送金额。');
            }

            const 赠送对象昵称 = e.raw_message.replace(/#?\/|送蜡烛@/g, "").replace(赠送数量, "")

            if (e.raw_message === '送蜡烛') {
                return e.reply('使用方法：\n送蜡烛@用户999（999为蜡烛数量）')
            } else if (e.raw_message === `送蜡烛@${赠送对象昵称}${赠送数量}`) {
                const 用户Data = await fs.promises.readFile(用户位置)
                const 用户JSON = JSON.parse(用户Data.toString())
                const 对象Data = await fs.promises.readFile(对象位置)
                const 对象JSON = JSON.parse(对象Data.toString())
                if (用户JSON[用户ID]['白蜡'] >= 赠送数量) {
                    用户JSON[用户ID]['白蜡'] -= 赠送数量
                    用户JSON[用户ID]['总赠送数量'] = (用户JSON[用户ID]['总赠送数量'] || 0) + 赠送数量

                    对象JSON[对象ID]['白蜡'] += 赠送数量
                    对象JSON[对象ID]['总收入数量'] = (对象JSON[对象ID]['总收入数量'] || 0) + 赠送数量
                    //  存储
                    fs.writeFileSync(用户位置, JSON.stringify(用户JSON, null, 4))
                    fs.writeFileSync(对象位置, JSON.stringify(对象JSON, null, 4))
                    return e.reply(`赠送成功！\n赠送数量：${赠送数量}`)
                } else {
                    return e.reply('赠送失败！白蜡不足')
                }
            } else {
                return e.reply('请正确at对方\n送蜡烛@用户999（999为蜡烛数量）')
            }
        } catch (error) {
            return e.reply('请输入金额')
        }
    }
}