import fs from 'fs';
import { render } from '../components/index.js';
import { GD, GUD, ITUE, SD } from '../utils/db.js';

const GH_FILE = `plugins/Tlon-Sky/data/秋风赌坊.json`
const COOLING_TIME = 5 * 60 * 1000
export class SKY extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]娱乐:赌蜡烛',
            dsc: 'Tlon-Sky',
            event: 'message',
            priority: 1,
            rule: [{
                reg: /^(#|\/)?(dlz|赌蜡烛)(.*)$/,
                fnc: 'gamble'
            }, {
                reg: /^(#|\/)?押注(.*)$/,
                fnc: 'wager'
            }, {
                reg: /^(#|\/)?(赌坊信息|秋风赌坊)$/,
                fnc: 'gamblingHouseIformation'
            }]
        })
    }

    async gamble(e) {
        const USER_ID = e.user_id;

        if (!ITUE(USER_ID)) return e.reply((e.adapter === 'QQBot') ? [
            '> 请先发送光遇签到',
            Bot.Button([[{ label: '光遇签到', callback: '/光遇签到' }]])
        ] : [
            segment.at(USER_ID),
            '\n请先发送光遇签到'
        ])

        const NOW_DATE = Date.now();

        /** 用户出拳 */
        const USER_USE = e.msg.match(/^(#|\/)?(dlz|赌蜡烛)(.*)$/)[3]

        const USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${USER_ID}.json`
        const USER_DATA = GUD(USER_ID)
        const LAST_EXECUTION_TIME = USER_DATA['上次赌蜡烛时间戳']

        if (NOW_DATE - LAST_EXECUTION_TIME < COOLING_TIME) {
            const REMAINING_TIME = COOLING_TIME - (NOW_DATE - LAST_EXECUTION_TIME)
            if (REMAINING_TIME > 0) {
                const MINUTES = Math.floor((REMAINING_TIME % (60 * 60 * 1000)) / (60 * 1000));
                const SECOND = Math.floor((REMAINING_TIME % (60 * 1000)) / 1000);

                const END_TIME_STAMP = NOW_DATE + REMAINING_TIME;
                const END_TIME = new Date(END_TIME_STAMP).toLocaleString();

                let Reply
                if (MINUTES === 0) Reply = (e.adapter === 'QQBot') ? [
                    '# CD中...',
                    `> 请等待${SECOND}秒后再试`,
                    `CD结束时间：**${END_TIME}**`
                ] : `CD中...\n请等待 ${SECOND} 秒后再试！\nCD结束时间：${END_TIME}`
                else if (MINUTES !== 0) Reply = (e.adapter === 'QQBot') ? [
                    '# CD中...',
                    `> 请等待${MINUTES}分钟${SECOND}秒后再试`
                        `CD结束时间：**${END_TIME}**`
                ] : `CD中...\n请等待 ${MINUTES} 分钟 ${SECOND} 秒后再试！\nCD结束时间：${END_TIME}`
                return e.reply(Reply)
            }
        }

        const ROCK = '石头';
        const PAPER = '布';
        const SCISSORS = '剪刀';
        const PG = [ROCK, PAPER, SCISSORS]

        // 为每个选项分配权重
        const weights = {
            [ROCK]: 200,
            [PAPER]: 200,
            [SCISSORS]: 200
        };

        // 生成一个随机数，范围在1到6之间
        const random = Math.floor(Math.random() * 600) + 1;

        let SYSTEM_USE;
        if (random <= weights[ROCK]) {
            SYSTEM_USE = ROCK;
        } else if (random <= weights[ROCK] + weights[PAPER]) {
            SYSTEM_USE = PAPER;
        } else {
            SYSTEM_USE = SCISSORS;
        }

        if (!PG.includes(USER_USE)) return e.reply((e.adapter === 'QQBot') ? [
            '# 请您输入正确的猜拳',
            Bot.Button([[
                { label: '剪刀', callback: '/赌蜡烛剪刀' },
                { label: '石头', callback: '/赌蜡烛石头' },
                { label: '布', callback: '/赌蜡烛布' }
            ]])
        ] : [
            segment.at(USER_ID),
            '\n请您输入正确的猜拳，如：\n"赌蜡烛剪刀" "赌蜡烛石头" "赌蜡烛布"'
        ])

        const BET_FILE = `plugins/Tlon-Sky/data/押注信息/${USER_ID}.json`;

        if (!fs.existsSync(BET_FILE)) return e.reply((e.adapter === 'QQBot') ? [
            '# 您尚未押注，请先押注',
            Bot.Button([[{ label: '押注', data: '/押注' }]])] : [
            segment.at(USER_ID),
            '\n您尚未押注，请先押注'
        ])

        const BET_DATA = GD(BET_FILE)
        const BET_AMOUNT = BET_DATA['押注金额']
        const BET_X = BET_DATA['倍率']

        if (BET_AMOUNT <= 0) return e.reply((e.adapter === 'QQBot') ? [
            '# 您尚未押注，请先押注',
            Bot.Button([[{ label: '押注', data: '/押注' }]])] : [
            segment.at(USER_ID),
            '\n您尚未押注，请先押注'
        ])

        const GH_DATA = GD(GH_FILE)

        if (USER_USE === SYSTEM_USE) {
            reset(USER_ID)
            USER_DATA['白蜡'] += BET_AMOUNT
            USER_DATA['平'] += 1
            USER_DATA['上次赌蜡烛时间戳'] = NowDate
            SD(USER_FILE, USER_DATA)

            GH_DATA['平'] += 1
            SD(GH_FILE, GH_DATA)

            return e.reply((e.adapter === 'QQBot') ? [
                '# 平局！',
                `> 你们都选择了**${SYSTEM_USE}**`,
                '白蜡已全额返还',
                Bot.Button([[
                    { label: '赌坊信息', callback: '/秋风赌坊' },
                    { label: '继续押注', data: '/押注' },
                    { label: '赌博排行', callback: '/赌博排行' }
                ]])
            ] : [
                segment.at(USER_ID),
                `\n平局！你和系统都选择了${SYSTEM_USE}\n赌注已全部返还用户`
            ])
        } else if (
            USER_USE === ROCK && SYSTEM_USE === SCISSORS ||
            USER_USE === PAPER && SYSTEM_USE === ROCK ||
            USER_USE === SCISSORS && SYSTEM_USE === PAPER
        ) { // 赢
            reset(USER_ID)
            const GET_BL = BET_AMOUNT * BET_X
            const NET_PROFIT = BET_AMOUNT * (BET_X - 1)

            USER_DATA['胜'] += 1
            USER_DATA['赚取'] += NET_PROFIT
            USER_DATA['白蜡'] += GET_BL
            USER_DATA['上次赌蜡烛时间戳'] = NowDate
            SD(USER_FILE, USER_DATA)

            GH_DATA['赔'] += NET_PROFIT
            GH_DATA['负'] += 1
            SD(GH_FILE, GH_DATA)

            return e.reply((e.adapter === 'QQBot') ? [
                '# 获胜！',
                `> 您出了**${USER_USE}**`,
                `系统出了**${SYSTEM_USE}**`,
                `获得净利润白蜡：${NET_PROFIT}根`,
                Bot.Button([[
                    { label: '赌坊信息', callback: '/秋风赌坊' },
                    { label: '继续押注', data: '/押注' },
                    { label: '赌博排行', callback: '/赌博排行' }
                ]])
            ] : [
                segment.at(USER_ID),
                `\n用户出拳：${USER_USE}\n系统出拳：${SYSTEM_USE}\n出拳结果：赢\n赚取蜡烛数量：${NET_PROFIT}根`
            ])
        } else { // 输
            reset(USER_ID)
            const restitution = parseFloat((BET_AMOUNT * 0.2).toFixed(0))
            USER_DATA['负'] += 1
            USER_DATA['亏损'] += BET_AMOUNT
            USER_DATA['白蜡'] += restitution
            USER_DATA['上次赌蜡烛时间戳'] = NowDate
            SD(USER_FILE, USER_DATA)

            GH_DATA['赚'] += BET_AMOUNT
            GH_DATA['胜'] += 1
            SD(GH_FILE, GH_DATA)

            return e.reply((e.adapter === 'QQBot') ? [
                '# 失败！',
                `> 您出了**${USER_USE}**`,
                `系统出了**${SYSTEM_USE}**`,
                `损失白蜡：${BET_AMOUNT - restitution}根`,
                '已返还20%蜡烛',
                Bot.Button([[
                    { label: '赌坊信息', callback: '/秋风赌坊' },
                    { label: '继续押注', data: '/押注' },
                    { label: '赌博排行', callback: '/赌博排行' }
                ]])
            ] : [
                segment.at(USER_ID),
                `用户出拳：${USER_USE}\n系统出拳：${SYSTEM_USE}\n出拳结果：输\n损失蜡烛数量：${BET_AMOUNT - restitution}根\n已返还20%蜡烛`
            ])
        }
    }


    async wager(e) {
        const USER_ID = e.user_id;

        if (!ITUE(USER_ID)) return e.reply((e.adapter === 'QQBot') ? [
            '> 请先发送光遇签到',
            Bot.Button([[{ label: '光遇签到', callback: '/光遇签到' }]])
        ] : [
            segment.at(USER_ID),
            '\n请先发送光遇签到'
        ])

        const BET_AMOUNT = parseFloat(e.msg.match(/^(#|\/)?(押注|yz)(.*)$/)[3])

        if (isNaN(BET_AMOUNT) || BET_AMOUNT <= 0 || !Number.isInteger(BET_AMOUNT)) return e.reply((e.adapter === 'QQBot') ? [
            '> 请输入有效的整数押注金额',
            Bot.Button([[{ label: '继续押注', data: '/押注' }]])
        ] : [
            segment.at(USER_ID),
            '\n请输入有效的整数押注金额。'
        ])

        const USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${USER_ID}.json`
        const BET_FILE = `plugins/Tlon-Sky/data/押注信息/${USER_ID}.json`

        const USER_DATA = GUD(USER_ID)

        if (USER_DATA['白蜡'] < BET_AMOUNT) {
            return e.reply((e.adapter === 'QQBot') ? [
                '# 您没有这么多白蜡',
                Bot.Button([[{ label: '重新押注', data: '/押注' }]])
            ] : [
                segment.at(USER_ID),
                '\n您没有这么多白蜡'
            ])
        }

        if (BET_AMOUNT < 100) return e.reply((e.adapter === 'QQBot') ? [
            '# 押注金额不可低于100',
            Bot.Button([[{ label: '重新押注', data: '/押注' }]])
        ] : [
            segment.at(USER_ID),
            '\n押注金额不可低于100'
        ])
        if (BET_AMOUNT > 3000) return e.reply((e.adapter === 'QQBot') ? [
            '# 押注金额不可大于3000',
            Bot.Button([[{ label: '重新押注', data: '/押注' }]])
        ] : [
            segment.at(USER_ID),
            '\n押注金额不可大于3000'
        ])

        if (!fs.existsSync(BET_FILE)) { SD(BET_FILE, { 押注金额: 0, 倍率: null }) }

        const BET_DATA = GD(BET_FILE)

        USER_DATA['白蜡'] -= BET_AMOUNT
        SD(USER_FILE, USER_DATA)

        const X = Math.min(1.5 + (Math.floor(BET_AMOUNT / 1000) * 0.5), 1.8);

        BET_DATA['押注金额'] += BET_AMOUNT
        BET_DATA['倍率'] = X
        SD(BET_FILE, BET_DATA)

        e.reply((e.adapter === 'QQBot') ? [
            `> 您已押注：**${BET_DATA['押注金额']}**`,
            `当前倍率：**${X}**`,
            Bot.Button([[
                { label: '剪刀', callback: '/赌蜡烛剪刀' },
                { label: '石头', callback: '/赌蜡烛石头' },
                { label: '布', callback: '/赌蜡烛布' }
            ]])
        ] : [
            segment.at(USER_ID),
            `\n你已成功押注 ${BET_DATA['押注金额']}根白蜡，倍率为 ${X}`
        ])


    }

    async gamblingHouseIformation(e) {
        const GH_DATA = GD(GH_FILE)

        await render('admin/秋风赌坊', {
            秋风赌坊: 'plugins/Tlon-Sky/resource/Tlon-Sky.png',
            赢: `赢：${GH_DATA['胜']} 次`,
            输: `输：${GH_DATA['负']} 次`,
            平: `平：${GH_DATA['平']} 次`,
            总赚取: `总赚取：${GH_DATA['赚']} 根白蜡`,
            总亏损: `总亏损：${GH_DATA['赔']} 根白蜡`,
        }, { e, scale: 1.4 })
    }
}

const reset = async function (USER_ID) {
    const BET_FILE = `plugins/Tlon-Sky/data/押注信息/${USER_ID}.json`; const BET_DATA = GD(BET_FILE)
    BET_DATA['押注金额'] = 0; BET_DATA['倍率'] = null
    fs.writeFileSync(BET_FILE, JSON.stringify(BET_DATA, null, 4))
}