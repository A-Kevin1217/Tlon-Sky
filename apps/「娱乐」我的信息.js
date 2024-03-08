import fs from 'fs';
import lodash from 'lodash';
import { render } from '../components/index.js';
import { Leaderboard } from '../utils/Leaderboard.js';
import { GD, GUD, ITUE } from '../utils/db.js';

export class SKY extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]娱乐:我的信息',
            dsc: 'Tlon-Sky',
            event: 'message',
            priority: 1,
            rule: [{
                reg: /^(#|\/)?光遇信息$/,
                fnc: 'skyEncounterData'
            }, {
                reg: /^(#|\/)?排行信息$/,
                fnc: 'rankingData'
            }]
        })
    }

    async skyEncounterData(e) {
        Leaderboard();

        const USER_ID = e.user_id;
        if (!ITUE(USER_ID)) { return e.reply((e.adapter === 'QQBot') ? ['> 请先发送光遇签到', Bot.Button([[{ label: '光遇签到', callback: '/光遇签到' }]])] : '请先发送光遇签到') }

        const RANKING_A_FILE = 'plugins/Tlon-Sky/data/排行榜/白蜡.json';
        const RANKING_B_FILE = 'plugins/Tlon-Sky/data/排行榜/季蜡.json';

        const USER_DATA = GUD(USER_ID);
        const RANKING_A_DATA = GD(RANKING_A_FILE);
        const RANKING_B_DATA = GD(RANKING_B_FILE);

        const RANKING_A = calculateRank(RANKING_A_DATA, USER_ID);
        const RANKING_B = calculateRank(RANKING_B_DATA, USER_ID);

        const { 昵称, 头像, 总收入数量, 最后签到日期, 连续签到天数, 累计签到天数, 白蜡, 季蜡, 能量值, 等级, 抢蜡烛次数, 被抢次数, 抢蜡烛总数, 被抢蜡烛总数, 胜, 负, 平, 赚取, 亏损, 总赠送数量 } = USER_DATA;
        const AVERAGE_ROB = isNaN(抢蜡烛总数 / 抢蜡烛次数) ? 0 : (抢蜡烛总数 / 抢蜡烛次数).toFixed(1);
        const AVERAGE_GET_ROBBED = isNaN(被抢蜡烛总数 / 被抢次数) ? 0 : (被抢蜡烛总数 / 被抢次数).toFixed(1);

        const html = {
            头像: `https://q.qlogo.cn/g?b=qq&nk=${头像}&s=640`,
            等级: 等级,
            能量值: 能量值,
            白蜡数: 白蜡,
            昵称: 昵称,
            季蜡数: 季蜡,
            抢次数: 抢蜡烛次数,
            被抢次数: 被抢次数,
            抢蜡烛总数: 抢蜡烛总数,
            被抢蜡烛总数: 被抢蜡烛总数,
            连续签到: 连续签到天数,
            累计签到: 累计签到天数,
            最后签到日期: 最后签到日期,
            胜: 胜,
            负: 负,
            平: 平,
            总赚取: 赚取,
            总亏损: 亏损,
            平均抢: AVERAGE_ROB,
            平均被抢: AVERAGE_GET_ROBBED,
            总赠送数量: 总赠送数量,
            总收入数量: 总收入数量,
            白蜡排名: RANKING_A,
            季蜡排名: RANKING_B,
            蜡烛保护卡: USER_DATA['背包']['蜡烛保护卡'],
            签到双倍卡: USER_DATA['背包']['签到双倍卡']
        }
        await render('admin/光遇信息', { ...html, bg: await rodom() }, { e, scale: 1.4 }, '', [[{ label: '光遇信息', callback: '/光遇信息' }, { label: '排行信息', callback: '/排行信息' }]])
    }

    async rankingData(e) {
        Leaderboard()

        let USER_ID = e.user_id;
        if (!ITUE(USER_ID)) { return e.reply((e.adapter === 'QQBot') ? ['> 请先发送光遇签到', Bot.Button([[{ label: '光遇签到', callback: '/光遇签到' }]])] : '请先发送光遇签到') }

        const USER_DATA = GUD(USER_ID);
        let USER_NICKNAME = USER_DATA['昵称']
        if (USER_NICKNAME.length > 10) { USER_NICKNAME = USER_NICKNAME.substring(0, 10) + "..." }

        const leaderboardFiles = [
            'plugins/Tlon-Sky/data/排行榜/白蜡.json',
            'plugins/Tlon-Sky/data/排行榜/季蜡.json',
            'plugins/Tlon-Sky/data/排行榜/亏损.json',
            'plugins/Tlon-Sky/data/排行榜/赚取.json',
            'plugins/Tlon-Sky/data/排行榜/抢蜡烛次数.json',
            'plugins/Tlon-Sky/data/排行榜/被抢次数.json',
            'plugins/Tlon-Sky/data/排行榜/连续签到天数.json',
            'plugins/Tlon-Sky/data/排行榜/累计签到天数.json'
        ];

        const leaderboardJsons = [];
        for (const file of leaderboardFiles) {
            leaderboardJsons.push(GD(file));
        }

        const leaderboardRanks = [];
        for (let i = 0; i < leaderboardJsons.length; i++) {
            leaderboardRanks.push(calculateRank(leaderboardJsons[i], USER_ID));
        }

        USER_ID = USER_ID.substring(USER_ID.indexOf("-") + 1)
        return e.reply((e.adapter === 'QQBot') ? [`# 用户昵称：${USER_NICKNAME}`, `> ID：${USER_ID}`, `白蜡排名: ${leaderboardRanks[0]}`, `季蜡排名: ${leaderboardRanks[1]}`, `亏损排名: ${leaderboardRanks[2]}`, `赚取排名: ${leaderboardRanks[3]}`, `抢蜡排名: ${leaderboardRanks[4]}`, `被抢排名: ${leaderboardRanks[5]}`, `连签排名: ${leaderboardRanks[6]}`, `累签排名: ${leaderboardRanks[7]}`, segment.image(`https://q.qlogo.cn/g?b=qq&nk=${USER_DATA['头像']}&s=640`), Bot.Button([[{ label: '排行信息', callback: '/排行信息' }]])] : `用户昵称：${USER_NICKNAME}\nID：${USER_DATA['ID']}\n白蜡排名：${leaderboardRanks[0]}\n季蜡排名: ${leaderboardRanks[1]}\n亏损排名: ${leaderboardRanks[2]}\n赚取排名: ${leaderboardRanks[3]}\n抢蜡排名: ${leaderboardRanks[4]}\n被抢排名: ${leaderboardRanks[5]}\n连签排名: ${leaderboardRanks[6]}\n累签排名: ${leaderboardRanks[7]}`)
    }
}

function calculateRank(RANKING_DATA, USER_ID) {
    const files = fs.readdirSync('plugins/Tlon-Sky/data/Sky签到');
    const USER_NUMBER = files.length;
    for (let i = 0; i < USER_NUMBER; i++) { if (RANKING_DATA[i].userId === USER_ID) { return i + 1 } }
    return -1
}

const rodom = async function () {
    let image = await fs.promises.readdir('plugins/Tlon-Sky/resource/admin/imgs/bg');
    let imgs = image.length === 1 ? image[0] : lodash.sample(image);
    return imgs;
}
