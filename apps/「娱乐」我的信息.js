import plugin from '../../../lib/plugins/plugin.js';
import { render } from '../components/index.js'
import lodash from 'lodash'
import fs from 'fs';

const 用户位置 = 'plugins/Tlon-Sky/data/Sky签到';
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
                },
                {
                    reg: '^#?光遇背包$',
                    fnc: '光遇背包'
                }
            ]
        });
    }

    async 光遇信息(e) {
        const result_白 = await 白蜡排行数据();
        logger.mark('白蜡排行写入成功', result_白);
        const result_季 = await 季蜡排行数据();
        logger.mark('季蜡排行写入成功', result_季);
        const 用户ID = e.user_id;
        const 用户文件 = `plugins/Tlon-Sky/data/Sky签到/${用户ID}.json`;

        const 白蜡排名 = getUserRank(用户ID);
        const 季蜡排名 = getUserRank_(用户ID);

        try {
            const 用户文件Data = await fs.promises.readFile(用户文件);
            const 用户文件Json = JSON.parse(用户文件Data.toString());

            const 昵称 = 用户文件Json[用户ID]['昵称']
            const 最后签到日期 = 用户文件Json[用户ID]['最后签到日期']
            const 连续签到天数 = 用户文件Json[用户ID]['连续签到天数']
            const 累计签到天数 = 用户文件Json[用户ID]['累计签到天数']
            const 白蜡数 = 用户文件Json[用户ID]['白蜡']
            const 季蜡数 = 用户文件Json[用户ID]['季蜡']
            const 能量值 = 用户文件Json[用户ID]['能量值']
            const 等级 = 用户文件Json[用户ID]['等级']
            const 抢数 = 用户文件Json[用户ID]['抢蜡烛次数'] || 0
            const 被抢数 = 用户文件Json[用户ID]['被抢次数'] || 0
            const 抢蜡烛总数 = 用户文件Json[用户ID]['抢蜡烛总数'] || 0
            const 被抢蜡烛总数 = 用户文件Json[用户ID]['被抢蜡烛总数'] || 0
            let 平均抢 = isNaN(抢蜡烛总数 / 抢数) ? 0 : (抢蜡烛总数 / 抢数).toFixed(1);
            let 平均被抢 = isNaN(被抢蜡烛总数 / 被抢数) ? 0 : (被抢蜡烛总数 / 被抢数).toFixed(1);
            const 胜 = 用户文件Json[用户ID]['胜'] || 0
            const 负 = 用户文件Json[用户ID]['负'] || 0
            const 平 = 用户文件Json[用户ID]['平'] || 0
            const 总赚取 = 用户文件Json[用户ID]['赚取'] || 0
            const 总亏损 = 用户文件Json[用户ID]['亏损'] || 0
            const 总赠送数量 = 用户文件Json[用户ID]['总赠送数量'] || 0
            const 总收入数量 = 用户文件Json[用户ID]['总收入数量'] || 0
            let html = {
                昵称: 昵称,
                头像: `https://api.t1qq.com/api/tool/qq/qqtx?key=lHV6bOsaNrsNv2hmegRRVMxOUp&qq=${用户ID}`,
                等级: 等级,
                能量值: 能量值,
                白蜡数: 白蜡数,
                季蜡数: 季蜡数,
                抢次数: 抢数,
                被抢次数: 被抢数,
                抢蜡烛总数: 抢蜡烛总数,
                被抢蜡烛总数: 被抢蜡烛总数,
                连续签到: 连续签到天数,
                累计签到: 累计签到天数,
                最后签到日期: 最后签到日期,
                胜: 胜,
                负: 负,
                平: 平,
                总赚取: 总赚取,
                总亏损: 总亏损,
                平均抢: 平均抢,
                平均被抢: 平均被抢,
                总赠送数量: 总赠送数量,
                总收入数量: 总收入数量,
                白蜡排名: 白蜡排名,
                季蜡排名: 季蜡排名
            }
            await render('admin/光遇信息', {
                ...html,
                bg: await rodom()
            }, {
                e,
                scale: 1.4
            })
        } catch (err) {
            logger.mark(err);
            e.reply('无法找到用户数据\n请先发送"光遇签到"');
        }
    }

    async 光遇背包(e) {
        const 用户ID = e.user_id;
        const 用户背包文件 = `plugins/Tlon-Sky/data/背包/${用户ID}.json`

        try {
            const 用户背包文件Data = await fs.promises.readFile(用户背包文件)
            const 用户背包文件Json = JSON.parse(用户背包文件Data.toString())

            const 蜡烛保护卡 = 用户背包文件Json[用户ID]['蜡烛保护卡']
            const 签到双倍卡 = 用户背包文件Json[用户ID]['签到双倍卡']
            let html = {
                头像: `https://api.t1qq.com/api/tool/qq/qqtx?key=lHV6bOsaNrsNv2hmegRRVMxOUp&qq=${用户ID}`,
                用户ID: 用户ID,
                蜡烛保护卡: 蜡烛保护卡,
                签到双倍卡: 签到双倍卡
            }
            await render('admin/光遇背包', {
                ...html,
            }, {
                e,
                scale: 1.4
            })
        } catch (err) {
            logger.mark(err)
            return e.reply('无法找到用户背包数据\n请购买任意物品后查看')
        }
    }
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

const 白蜡排行数据 = async function () {

    const files = fs.readdirSync(用户位置); // 读取目录下的所有文件
    const 用户数量 = files.length;
    const ranking = [];

    // 遍历所有文件
    files.forEach((fileName) => {
        if (fileName.endsWith('.json')) {
            const userId = fileName.split('.')[0];
            const filePath = path.join(用户位置, fileName);
            const fileData = fs.readFileSync(filePath);
            const data = JSON.parse(fileData.toString());
            const level = data[userId]?.白蜡 || 0;
            const nickname = data[userId]?.昵称 || '未读取';

            ranking.push({ nickname, level, userId });
        }
    });

    ranking.sort((a, b) => b.level - a.level);

    const topTen = ranking.slice(0, 用户数量);
    // 将排行信息储存为 JSON 文件
    const jsonRanking = JSON.stringify(topTen, null, 2); // 格式化 JSON，使其更易读

    fs.writeFileSync('plugins/Tlon-Sky/data/排行榜/白蜡.json', jsonRanking);
}

const 季蜡排行数据 = async function () {
    const files = fs.readdirSync(用户位置);
    const 用户数量 = files.length;
    const ranking = [];

    files.forEach((fileName) => {
        if (fileName.endsWith('.json')) {
            const userId = fileName.split('.')[0];
            const filePath = path.join(用户位置, fileName);
            const fileData = fs.readFileSync(filePath);
            const data = JSON.parse(fileData.toString());
            const level = data[userId]?.季蜡 || 0;
            const nickname = data[userId]?.昵称 || '未读取';

            ranking.push({ nickname, level, userId });
        }
    });

    ranking.sort((a, b) => b.level - a.level);

    const topTen = ranking.slice(0, 用户数量);

    const jsonRanking = JSON.stringify(topTen, null, 2);

    fs.writeFileSync('plugins/Tlon-Sky/data/排行榜/季蜡.json', jsonRanking);
}

async function getUserRank(userId) {
    const 排行信息_白 = 'plugins/Tlon-Sky/data/排行榜/白蜡.json'
    const 排行信息Data_白 = await fs.promises.readFile(排行信息_白)
    const 排行信息Json_白 = JSON.parse(排行信息Data_白.toString())
    // 根据 level 属性对 JSON 数据进行排序
    const sortedData = 排行信息Json_白.sort((a, b) => b.level - a.level);

    // 遍历排序后的数据，查找匹配的 userId
    for (let i = 0; i < sortedData.length; i++) {
        if (sortedData[i].userId === userId) {
            return i + 1; // 返回排名（加1是因为排名从1开始）
        }
    }

    return -1; // 如果未找到匹配的 userId，则返回 -1 表示未找到
}

async function getUserRank_(userId) {
    const 排行信息_季 = 'plugins/Tlon-Sky/data/排行榜/季蜡.json'
    const 排行信息Data_季 = await fs.promises.readFile(排行信息_季)
    const 排行信息Json_季 = JSON.parse(排行信息Data_季.toString())
    // 根据 level 属性对 JSON 数据进行排序
    const sortedData = 排行信息Json_季.sort((a, b) => b.level - a.level);

    // 遍历排序后的数据，查找匹配的 userId
    for (let i = 0; i < sortedData.length; i++) {
        if (sortedData[i].userId === userId) {
            return i + 1; // 返回排名（加1是因为排名从1开始）
        }
    }

    return -1; // 如果未找到匹配的 userId，则返回 -1 表示未找到
}