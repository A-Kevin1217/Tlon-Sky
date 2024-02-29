import fs from 'fs';
import { render } from '../components/index.js';
import { GD, GUD, ITUE, SD } from '../utils/db.js';

const GH_FILE = `plugins/Tlon-Sky/data/秋风赌坊.json`

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
                reg: /^(#|\/)?(押注|yz)(.*)$/,
                fnc: 'wager'
            }, {
                reg: /^(#|\/)?(赌坊信息|秋风赌坊)$/,
                fnc: 'gamblingHouseIformation'
            }]
        })
    }

    async gamble(e) {
        /** 用户ID */
        const USER_ID = e.user_id;

        if (!ITUE(USER_ID)) { return e.reply('请先发送光遇签到') } // 判断是否拥有该用户

        /** CD时间：30分钟 */
        const CoolingTime = 30 * 60 * 1000;
        const NowDate = Date.now();

        /** 用户出拳 */
        const USER_USE = e.msg.match(/^(#|\/)?(dlz|赌蜡烛)(.*)$/)[3]

        const USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${USER_ID}.json`
        const USER_DATA = GUD(USER_ID)

        /** 用户上次赌蜡烛时间 */
        const LastExecutionTime = USER_DATA['上次赌蜡烛时间戳'] || 0;

        const ROCK = '石头';
        const PAPER = '布';
        const SCISSORS = '剪刀';
        const PG = [SCISSORS, PAPER, ROCK]
        const Random = Math.floor(Math.random() * PG.length);
        const SYSTEM_USE = PG[Random];

        if (NowDate - LastExecutionTime < CoolingTime) {
            const RemainingTimestamp = CoolingTime - (NowDate - LastExecutionTime);
            if (RemainingTimestamp > 0) {
                const hour = Math.floor(RemainingTimestamp / (60 * 60 * 1000));
                const minutes = Math.floor((RemainingTimestamp % (60 * 60 * 1000)) / (60 * 1000));
                const second = Math.floor((RemainingTimestamp % (60 * 1000)) / 1000);

                const EndTimestamp = NowDate + RemainingTimestamp;
                const EndTime = new Date(EndTimestamp).toLocaleString();

                if (hour === 0) {
                    return e.reply(`赌蜡烛CD中！\n请等待 ${minutes} 分钟 ${second} 秒！\nCD结束时间：${EndTime}`);
                } else if (minutes === 0) {
                    return e.reply(`赌蜡烛CD中！\n请等待 ${second} 秒！\nCD结束时间：${EndTime}`);
                }
            }
        }

        if (!PG.includes(USER_USE)) return e.reply('请您输入正确的猜拳，如：\n"赌蜡烛剪刀" "赌蜡烛石头" "赌蜡烛布"')

        const BET_FILE = `plugins/Tlon-Sky/data/押注信息/${USER_ID}.json`;

        if (!fs.existsSync(BET_FILE)) { return e.reply('您尚未押注，请先押注') }

        const BET_DATA = GD(BET_FILE)
        const BET_AMOUNT = BET_DATA['押注金额']
        const BET_X = BET_DATA['倍率']

        if (BET_AMOUNT < 0) return e.reply('您尚未押注，请先押注')

        const GH_DATA = GD(GH_FILE)

        if (USER_USE === SYSTEM_USE) { // 平局
            reset(USER_ID)
            USER_DATA['白蜡'] += BET_AMOUNT
            USER_DATA['平'] += 1
            USER_DATA['上次赌蜡烛时间戳'] = NowDate
            SD(USER_FILE, USER_DATA)

            GH_DATA['平'] += 1
            SD(GH_FILE, GH_DATA)

            if (e.adapter === 'QQBot') return e.reply(['# 平局！', `> 你们都选择了**${SYSTEM_USE}**`, '白蜡已全额返还'])
            return e.reply(`平局！你和系统都选择了${SYSTEM_USE}\n赌注已全部返还用户`)
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

            if (e.adapter === 'QQBot') return e.reply(['# 获胜！', `> 您出了**${USER_USE}**`, `系统出了**${SYSTEM_USE}**`, `获得净利润白蜡：${NET_PROFIT}根`])
            return e.reply(`用户出拳：${USER_USE}\n系统出拳：${SYSTEM_USE}\n出拳结果：赢\n赚取蜡烛数量：${NET_PROFIT}根`)
        } else { // 输
            reset(USER_ID)
            USER_DATA['负'] += 1
            USER_DATA['亏损'] += BET_AMOUNT
            USER_DATA['上次赌蜡烛时间戳'] = NowDate
            SD(USER_FILE, USER_DATA)

            GH_DATA['赚'] += BET_AMOUNT
            GH_DATA['胜'] += 1
            SD(GH_FILE, GH_DATA)

            if (e.adapter === 'QQBot') return e.reply(['# 失败！', `> 您出了**${USER_USE}**`, `系统出了**${SYSTEM_USE}**`, `损失白蜡：${BET_AMOUNT}根`])
            return e.reply(`用户出拳：${USER_USE}\n系统出拳：${SYSTEM_USE}\n出拳结果：输\n损失蜡烛数量：${BET_AMOUNT}根`)
        }
    }


    async wager(e) {
        const USER_ID = e.user_id;

        if (!ITUE(USER_ID)) { return e.reply('请先发送光遇签到') } // 判断是否拥有该用户

        const BET_AMOUNT = parseFloat(e.msg.match(/^(#|\/)?(押注|yz)(.*)$/)[3])

        if (isNaN(BET_AMOUNT) || BET_AMOUNT <= 0 || !Number.isInteger(BET_AMOUNT)) { return e.reply('请输入有效的整数押注金额。') }

        const USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${USER_ID}.json`
        const BET_FILE = `plugins/Tlon-Sky/data/押注信息/${USER_ID}.json`

        const USER_DATA = GUD(USER_ID)

        if (USER_DATA['白蜡'] < BET_AMOUNT) { return e.reply('白蜡不足！') }

        if (!fs.existsSync(BET_FILE)) { SD(BET_FILE, { 押注金额: 0, 倍率: null }) }

        const BET_DATA = GD(BET_FILE)

        USER_DATA['白蜡'] -= BET_AMOUNT
        SD(USER_FILE, USER_DATA)

        const X = Math.min(1.5 + (Math.floor(BET_AMOUNT / 1000) * 0.5), 2.0);

        BET_DATA['押注金额'] += BET_AMOUNT
        BET_DATA['倍率'] = X
        SD(BET_FILE, BET_DATA)

        if (e.adapter === 'QQBot') return e.reply([`> 您已YZ：${BET_DATA['押注金额']}`, `当前倍率：${X}`])
        e.reply(`你已成功押注 ${BET_DATA['押注金额']}根白蜡，倍率为 ${X}`);

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