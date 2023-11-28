import fs from 'fs';
import lodash from 'lodash';
import plugin from '../../../lib/plugins/plugin.js';
import { render } from '../components/index.js';
import { Leaderboard } from '../utils/Leaderboard.js';
import { GetData, UserFiles } from '../utils/db.js';

const 用户位置 = 'plugins/Tlon-Sky/data/Sky签到';

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
                    fnc: '光遇信息'
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

    async 光遇信息(e) {
        Leaderboard()
        const UserId = e.user_id;
        const UserFile = `plugins/Tlon-Sky/data/Sky签到/${UserId}.json`;
        if (!UserFiles(UserId)) { return e.reply('请先发送光遇签到') }
        const UserJson = GetData(UserFile)
        const 排行信息_白 = 'plugins/Tlon-Sky/data/排行榜/白蜡.json'
        const 排行信息Json_白 = GetData(排行信息_白)
        const 排行信息_季 = 'plugins/Tlon-Sky/data/排行榜/季蜡.json'
        const 排行信息Json_季 = GetData(排行信息_季)
        const 白蜡排名 = 获取排名(排行信息Json_白, UserId);
        const 季蜡排名 = 获取排名(排行信息Json_季, UserId);
        const {
            昵称, 总收入数量, 最后签到日期,
            连续签到天数, 累计签到天数,
            白蜡, 季蜡, 能量值, 等级, 抢蜡烛次数,
            被抢次数, 抢蜡烛总数, 被抢蜡烛总数, 胜,
            负, 平, 赚取, 亏损, 总赠送数量,
        } = UserJson[UserId];
        const 平均抢 = isNaN(抢蜡烛总数 / 抢蜡烛次数) ? 0 : (抢蜡烛总数 / 抢蜡烛次数).toFixed(1);
        const 平均被抢 = isNaN(被抢蜡烛总数 / 被抢次数) ? 0 : (被抢蜡烛总数 / 被抢次数).toFixed(1);
        const html = {
            头像: `https://q.qlogo.cn/g?b=qq&nk=${UserId}&s=640`,
            等级: 等级, 能量值: 能量值, 白蜡数: 白蜡, 昵称: 昵称,
            季蜡数: 季蜡, 抢次数: 抢蜡烛次数, 被抢次数: 被抢次数,
            抢蜡烛总数: 抢蜡烛总数, 被抢蜡烛总数: 被抢蜡烛总数,
            连续签到: 连续签到天数, 累计签到: 累计签到天数,
            最后签到日期: 最后签到日期, 胜: 胜, 负: 负,
            平: 平, 总赚取: 赚取, 总亏损: 亏损, 平均抢: 平均抢,
            平均被抢: 平均被抢, 总赠送数量: 总赠送数量,
            总收入数量: 总收入数量, 白蜡排名: 白蜡排名, 季蜡排名: 季蜡排名
        }
        await render('admin/光遇信息', { ...html, bg: await rodom() }, { e, scale: 1.4 })
    }

    async 光遇背包(e) {
        const UserId = e.user_id;
        const 用户背包文件 = `plugins/Tlon-Sky/data/背包/${UserId}.json`
        if (!UserFiles(UserId)) { return e.reply('请先发送光遇签到') }
        const 用户背包文件Json = GetData(用户背包文件)
        let html = {
            头像: `https://q.qlogo.cn/g?b=qq&nk=${UserId}&s=640`,
            用户ID: UserId,
            蜡烛保护卡: 用户背包文件Json[UserId]['蜡烛保护卡'],
            签到双倍卡: 用户背包文件Json[UserId]['签到双倍卡']
        }
        await render('admin/光遇背包', { ...html, }, { e, scale: 1.4 })
    }

    async 排行信息(e) {
        Leaderboard()
        const UserId = e.user_id;
        if (!UserFiles(UserId)) { return e.reply('请先发送光遇签到') }
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
            leaderboardRanks.push(获取排名(leaderboardJsons[i], UserId));
        }
        const html  = {
            头像: `https://q.qlogo.cn/g?b=qq&nk=${UserId}&s=640`,
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
function 获取排名(排行信息Json, UserId) {
    const files = fs.readdirSync(用户位置);
    const 用户数量 = files.length;
    for (let i = 0; i < 用户数量; i++) {
        if (排行信息Json[i].userId === UserId) {
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