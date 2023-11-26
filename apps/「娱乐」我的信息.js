import plugin from '../../../lib/plugins/plugin.js';
import { render } from '../components/index.js';
import lodash from 'lodash';
import path from 'path';
import fs from 'fs';

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

        try {
            const 用户文件Data = await fs.promises.readFile(用户文件);
            const 用户文件Json = JSON.parse(用户文件Data.toString());

            const 排行信息_白 = 'plugins/Tlon-Sky/data/排行榜/白蜡.json'
            const 排行信息Data_白 = await fs.promises.readFile(排行信息_白)
            const 排行信息Json_白 = JSON.parse(排行信息Data_白.toString())

            const 排行信息_季 = 'plugins/Tlon-Sky/data/排行榜/季蜡.json'
            const 排行信息Data_季 = await fs.promises.readFile(排行信息_季)
            const 排行信息Json_季 = JSON.parse(排行信息Data_季.toString())

            const 白蜡排名 = 获取排名(排行信息Json_白, 用户ID);
            const 季蜡排名 = 获取排名(排行信息Json_季, 用户ID);

            const { 昵称, 最后签到日期, 连续签到天数, 累计签到天数, 白蜡, 季蜡, 能量值, 等级, 抢蜡烛次数, 被抢次数, 抢蜡烛总数, 被抢蜡烛总数, 胜, 负, 平, 赚取, 亏损, 总赠送数量, 总收入数量 } = 用户文件Json[用户ID];
            let 平均抢 = isNaN(抢蜡烛总数 / 抢蜡烛次数) ? 0 : (抢蜡烛总数 / 抢蜡烛次数).toFixed(1);
            let 平均被抢 = isNaN(被抢蜡烛总数 / 被抢次数) ? 0 : (被抢蜡烛总数 / 被抢次数).toFixed(1);
            let html = {
                昵称: 昵称,
                头像: `https://q.qlogo.cn/g?b=qq&nk=${用户ID}&s=640`,
                等级: 等级,
                能量值: 能量值,
                白蜡数: 白蜡,
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
                头像: `https://q.qlogo.cn/g?b=qq&nk=${用户ID}&s=640`,
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
function 获取排名(排行信息Json, 用户ID) {
    const files = fs.readdirSync(用户位置);
    const 用户数量 = files.length;
    for (let i = 0; i < 用户数量; i++) {
        if (排行信息Json[i].userId === 用户ID) {
            return i + 1;
        }
    }
    return -1; // 如果未找到匹配的用户ID，返回-1或其他适当的值
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
    const files = fs.readdirSync(用户位置);
    const 用户数量 = files.length;
    const ranking = [];
    files.forEach((fileName) => {
        if (fileName.endsWith('.json')) {
            const userId = parseFloat(fileName.split('.')[0]);
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
    const jsonRanking = JSON.stringify(topTen, null, 2);
    fs.writeFileSync('plugins/Tlon-Sky/data/排行榜/白蜡.json', jsonRanking);
}

const 季蜡排行数据 = async function () {
    const files = fs.readdirSync(用户位置);
    const 用户数量 = files.length;
    const ranking = [];
    files.forEach((fileName) => {
        if (fileName.endsWith('.json')) {
            const userId = parseFloat(fileName.split('.')[0]);
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