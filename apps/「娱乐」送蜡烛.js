import plugin from '../../../lib/plugins/plugin.js';
import { GetData, SaveData, UserFiles } from '../utils/db.js';

export class 娱乐_送蜡烛 extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]娱乐:送蜡烛',
            dsc: '娱乐送蜡烛',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: /^(#|\/)?送蜡烛(.*)$/,
                    fnc: '送蜡烛'
                }
            ]
        })
    }

    async 送蜡烛(e) {
        const UserId = e.user_id;
        const UsersId = e.at
        if (e.atme === true) {
            return e.reply('不可赠送机器人');
        } else if (!UsersId) {
            return e.reply('请at对方');
        } else if (UsersId === UserId) {
            return e.reply('不可自己赠送自己');
        } else if (e.msg === '送蜡烛') {
            return e.reply('使用方法：\n送蜡烛@用户999（999为蜡烛数量）');
        }
        if (!UserFiles(UserId)) { return e.reply('请先发送光遇签到') }
        if (!UserFiles(UsersId)) { return e.reply('对方没有Tlon-Sky存档') }
        const UserFile = `plugins/Tlon-Sky/data/Sky签到/${UserId}.json`
        const UsersFile = `plugins/Tlon-Sky/data/Sky签到/${UsersId}.json`

        const extraction = e.msg.match(/^#?\/|送蜡烛(.*)$/)
        const GiveNumber = extraction[1]
        logger.mark('赠送数量' + GiveNumber)
        if (!Number.isInteger(GiveNumber)) {
            return e.reply('请输入有效的整数赠送金额。');
        }
        const UserData = GetData(UserFile)
        const UsersData = GetData(UsersFile)
        if (UserData[UserId]['白蜡'] >= 赠送数量) {
            UserData[UserId]['白蜡'] -= 赠送数量
            UserData[UserId]['总赠送数量'] = (UserData[UserId]['总赠送数量'] || 0) + 赠送数量

            UsersData[UsersId]['白蜡'] += 赠送数量
            UsersData[UsersId]['总收入数量'] = (UsersData[UsersId]['总收入数量'] || 0) + 赠送数量

            SaveData(UserFile, UserData)
            SaveData(UsersFile, UsersData)
            return e.reply(`赠送成功！\n赠送数量：${赠送数量}`)
        } else {
            return e.reply('赠送失败！白蜡不足')
        }
    }
}