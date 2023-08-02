import plugin from '../../../lib/plugins/plugin.js';
import fs from 'fs';

export class 我的信息 extends plugin {
    constructor() {
        super({
            name: '光遇_我的信息',
            dsc: '光遇',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^#?光遇信息$',
                    fnc: '光遇信息'
                }
            ]
        });
    }

    async 光遇信息(e) {
        const userId = e.user_id;
        const filePath = `plugins/Tlon-Sky/data/Sky签到/${userId}.json`;

        try {
            const userData = await fs.promises.readFile(filePath);
            const userJson = JSON.parse(userData.toString());

            const 昵称 = userJson[userId]['昵称']
            const 最后签到日期 = userJson[userId]['最后签到日期']
            const 连续签到天数 = userJson[userId]['连续签到天数']
            const 累计签到天数 = userJson[userId]['累计签到天数']
            const 白蜡数 = userJson[userId]['白蜡数']
            const 季蜡数 = userJson[userId]['季蜡数']
            const 能量值 = userJson[userId]['能量值']
            const 等级 = userJson[userId]['等级']
            const 信息 = [
                `昵称：${昵称}\n`,
                `等级：${等级} | 能量值：${能量值}/100\n`,
                `白蜡数：${白蜡数}\n`,
                `季蜡数：${季蜡数}\n`
                `连续签到：${连续签到天数}天\n`,
                `累计签到：${累计签到天数}天\n`,
                `最后签到日期：${最后签到日期}`
            ]
            e.reply(信息);
        } catch (err) {
            console.error(err);
            e.reply('无法找到用户数据');
        }
    }
}
