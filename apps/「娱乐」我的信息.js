import fs from 'fs';
import lodash from 'lodash';
import { render } from '../components/index.js';
import { Leaderboard } from '../utils/Leaderboard.js';
import { GetData, UserFiles } from '../utils/db.js';

const USER_FOLDER = 'plugins/Tlon-Sky/data/Sky签到';

export class 我的信息 extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]娱乐:我的信息',
            dsc: '娱乐我的信息',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^(#|\/)?光遇信息$',
                    fnc: 'si'
                },
                {
                    reg: '^(#|\/)?光遇背包$',
                    fnc: '光遇背包'
                },
                {
                    reg: '^(#|\/)?排行信息$',
                    fnc: '排行信息'
                }
            ]
        });
    }

    async si(e) {
        Leaderboard();

        const USER_ID = e.user_id;
        if (!UserFiles(USER_ID)) { return e.reply('请先发送光遇签到'); }

        const USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${USER_ID}.json`;
        const RANKING_A_FILE = 'plugins/Tlon-Sky/data/排行榜/白蜡.json';
        const RANKING_B_FILE = 'plugins/Tlon-Sky/data/排行榜/季蜡.json';

        const USER_DATA = GetData(USER_FILE);
        const RANKING_A_DATA = GetData(RANKING_A_FILE);
        const RANKING_B_DATA = GetData(RANKING_B_FILE);

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
            季蜡排名: RANKING_B
        }
        await render('admin/光遇信息', { ...html, bg: await rodom() }, { e, scale: 1.4 })
    }

    async 光遇背包(e) {
        const USER_ID = e.user_id;
        if (!UserFiles(USER_ID)) { return e.reply('请先发送光遇签到') }

        const USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${USER_ID}.json`;
        const USER_DATA = GetData(USER_FILE);

        let html = {
            头像: `https://q.qlogo.cn/g?b=qq&nk=${USER_DATA['头像']}&s=640`,
            用户ID: USER_ID,
            蜡烛保护卡: USER_DATA['背包']['蜡烛保护卡'],
            签到双倍卡: USER_DATA['背包']['签到双倍卡']
        }

        await render('admin/光遇背包', { ...html, }, { e, scale: 1.4 })
    }

    async 排行信息(e) {
        Leaderboard()

        const USER_ID = e.user_id;
        if (!UserFiles(USER_ID)) { return e.reply('请先发送光遇签到') }

        const USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${USER_ID}.json`;
        const USER_DATA = GetData(USER_FILE);

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
            leaderboardJsons.push(GetData(file));
        }

        const leaderboardRanks = [];
        for (let i = 0; i < leaderboardJsons.length; i++) {
            leaderboardRanks.push(calculateRank(leaderboardJsons[i], USER_ID));
        }
        const html = {
            头像: `https://q.qlogo.cn/g?b=qq&nk=${USER_DATA['头像']}&s=640`,
            白蜡排名: leaderboardRanks[0],
            季蜡排名: leaderboardRanks[1],
            亏损排名: leaderboardRanks[2],
            赚取排名: leaderboardRanks[3],
            抢蜡排名: leaderboardRanks[4],
            被抢排名: leaderboardRanks[5],
            连签排名: leaderboardRanks[6],
            累签排名: leaderboardRanks[7]
        }
        await render('admin/排行信息', { ...html, }, { e, scale: 1.4 })
    }
}
function calculateRank(RANKING_DATA, USER_ID) {
    const files = fs.readdirSync(USER_FOLDER);
    const USER_NUMBER = files.length;
    for (let i = 0; i < USER_NUMBER; i++) {
        if (RANKING_DATA[i].userId === USER_ID) {
            return i + 1;
        }
    }
    return -1;
}

const rodom = async function () {
    let image = fs.readdirSync('./plugins/Tlon-Sky/resource/admin/imgs/bg')
    let listImg = []
    for (let val of image) {
        listImg.push(val)
    }
    let imgs = listImg.length == 1 ? listImg[0] : listImg[lodash.random(0, listImg.length - 1)]
    return imgs
}