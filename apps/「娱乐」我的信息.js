import fs from 'fs';
import lodash from 'lodash';
import { render } from '../components/index.js';
import { Leaderboard } from '../utils/Leaderboard.js';
import { GD, ITUE } from '../utils/db.js';

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
                    reg: '^(#|\\/)?光遇(信息|背包)$',
                    fnc: 'si'
                },
                {
                    reg: '^(#|\\/)?排行信息$',
                    fnc: '排行信息'
                }
            ]
        });
    }

    async si(e) {
        Leaderboard();

        const USER_ID = e.user_id;
        if (!ITUE(USER_ID)) { return e.reply('请先发送光遇签到'); }

        const USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${USER_ID}.json`;
        const [USER_DATA, RANKING_A_DATA, RANKING_B_DATA] = await Promise.all([
            GD(USER_FILE),
            GD('plugins/Tlon-Sky/data/排行榜/白蜡.json'),
            GD('plugins/Tlon-Sky/data/排行榜/季蜡.json')
        ]);

        const RANKING_A = calculateRank(RANKING_A_DATA, USER_ID);
        const RANKING_B = calculateRank(RANKING_B_DATA, USER_ID);

        const { 头像, 等级, 能量值, 白蜡, 昵称, 季蜡, 抢蜡烛次数, 被抢次数, 抢蜡烛总数, 被抢蜡烛总数, 连续签到天数, 累计签到天数, 最后签到日期, 胜, 负, 平, 赚取, 亏损, 总赠送数量 } = USER_DATA;
        const AVERAGE_ROB = (抢蜡烛次数 === 0) ? 0 : (抢蜡烛总数 / 抢蜡烛次数).toFixed(1);
        const AVERAGE_GET_ROBBED = (被抢次数 === 0) ? 0 : (被抢蜡烛总数 / 被抢次数).toFixed(1);

        const html = {
            头像: `https://q.qlogo.cn/g?b=qq&nk=${头像}&s=640`,
            等级, 能量值, 白蜡, 昵称, 季蜡, 抢蜡烛次数, 被抢次数, 抢蜡烛总数, 被抢蜡烛总数, 连续签到天数, 累计签到天数, 最后签到日期, 胜, 负, 平, 赚取, 亏损, 总赠送数量,
            平均抢: AVERAGE_ROB, 平均被抢: AVERAGE_GET_ROBBED,
            白蜡排名: RANKING_A, 季蜡排名: RANKING_B,
            蜡烛保护卡: USER_DATA['背包']['蜡烛保护卡'],
            签到双倍卡: USER_DATA['背包']['签到双倍卡']
        };

        await render('admin/光遇信息', { ...html, bg: await rodom() }, { e, scale: 1.4 });
    }

    async 排行信息(e) {
        Leaderboard();

        const USER_ID = e.user_id;
        if (!ITUE(USER_ID)) { return e.reply('请先发送光遇签到'); }

        const USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${USER_ID}.json`;
        const USER_DATA = GD(USER_FILE);

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

        const leaderboardJsons = await Promise.all(leaderboardFiles.map(file => GD(file)));
        const leaderboardRanks = leaderboardJsons.map(json => calculateRank(json, USER_ID));

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
        };

        await render('admin/排行信息', { ...html }, { e, scale: 1.4 });
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
    const image = fs.readdirSync('./plugins/Tlon-Sky/resource/admin/imgs/bg');
    const imgs = image.length === 1 ? image[0] : image[lodash.random(0, image.length - 1)];
    return imgs;
};
