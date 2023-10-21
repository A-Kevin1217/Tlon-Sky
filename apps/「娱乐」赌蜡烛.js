import plugin from '../../../lib/plugins/plugin.js';
import { render } from '../components/index.js'
import fs from 'fs';
import path from 'path';

export class 娱乐_赌蜡烛 extends plugin {
    constructor() {
        super({
            name: '娱乐_赌蜡烛',
            dsc: '娱乐',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: /^dlz(.*)$/,
                    fnc: '赌蜡烛'
                }, {
                    reg: /^押注(.*)$/,
                    fnc: '押注'
                }, {
                    reg: /^(赌坊信息|秋风赌坊)$/,
                    fnc: '赌坊信息'
                }
            ]
        });
    }

    async 赌蜡烛(e) {
        //  获取用户猜拳结果
        const 用户猜拳 = e.msg.replace(/dlz/g, "")
        //  获取用户ID
        const userID = e.user_id;

        //  判断用户输入是否正确
        if (用户猜拳 === '剪刀' || 用户猜拳 === '石头' || 用户猜拳 === '布') {
            //  读取押注信息
            const 押注信息 = `plugins/Tlon-Sky/data/押注信息/${userID}.json`;
            const 押注信息Data = await fs.promises.readFile(押注信息);
            const 押注信息Json = JSON.parse(押注信息Data.toString());

            //  读取用户信息
            const 用户信息 = `plugins/Tlon-Sky/data/Sky签到/${userID}.json`;
            const 用户信息Data = await fs.promises.readFile(用户信息);
            const 用户信息Json = JSON.parse(用户信息Data.toString());

            //  读取秋风赌坊信息
            const 秋风信息 = `plugins/Tlon-Sky/data/秋风赌坊.json`;
            const 秋风信息Data = await fs.promises.readFile(秋风信息);
            const 秋风信息Json = JSON.parse(秋风信息Data.toString());

            //  判断是否押注
            if (押注信息Json[userID]['押注金额'] > 0) {

                let 猜拳 = ['剪刀', '石头', '布']
                let 随机索引 = Math.floor(Math.random() * 猜拳.length);
                let 系统猜拳 = 猜拳[随机索引];

                if (用户猜拳 === '剪刀') {
                    //  平局
                    if (系统猜拳 === '剪刀') {
                        重置押注信息(e)
                        //  用户信息处理
                        用户信息Json[userID].白蜡 = (用户信息Json[userID]?.白蜡) + (押注信息Json[userID]?.押注金额)
                        用户信息Json[userID].平 = (用户信息Json[userID]?.平 || 0) + 1
                        fs.writeFileSync(用户信息, JSON.stringify(用户信息Json, null, 4));

                        //  秋风信息处理
                        秋风信息Json.平 += 1
                        fs.writeFileSync(秋风信息, JSON.stringify(秋风信息Json, null, 4))

                        return e.reply(`用户出拳：${用户猜拳}\n系统出拳：${系统猜拳}\n出拳结果：平\n返还押注蜡烛：${押注信息Json[userID]['押注金额']}根`)
                        //  输了
                    } else if (系统猜拳 === '石头') {
                        重置押注信息(e)
                        //  用户信息处理
                        用户信息Json[userID].负 = (用户信息Json[userID]?.负 || 0) + 1
                        用户信息Json[userID].亏损 = (用户信息Json[userID]?.亏损 || 0) + 押注信息Json[userID].押注金额
                        fs.writeFileSync(用户信息, JSON.stringify(用户信息Json, null, 4));

                        //  秋风信息处理
                        秋风信息Json.赚 = (秋风信息Json?.赚) + 押注信息Json[userID].押注金额
                        秋风信息Json.胜 += 1
                        fs.writeFileSync(秋风信息, JSON.stringify(秋风信息Json, null, 4))

                        return e.reply(`用户出拳：${用户猜拳}\n系统出拳：${系统猜拳}\n出拳结果：输\n损失蜡烛数量：${押注信息Json[userID]['押注金额']}根`)

                        //  赢了
                    } else if (系统猜拳 === '布') {
                        重置押注信息(e)
                        //  押注金额与倍率相乘
                        const 赚取金额 = 押注信息Json[userID].押注金额 * 押注信息Json[userID].倍率
                        const 净利润 = 押注信息Json[userID].押注金额 * 0.5
                        //  用户信息处理
                        用户信息Json[userID].胜 = (用户信息Json[userID]?.胜 || 0) + 1
                        用户信息Json[userID].赚取 = (用户信息Json[userID]?.赚取 || 0) + 净利润
                        用户信息Json[userID].白蜡 = (用户信息Json[userID]?.白蜡) + 赚取金额
                        fs.writeFileSync(用户信息, JSON.stringify(用户信息Json, null, 4));

                        //  秋风信息处理
                        秋风信息Json.赔 = 秋风信息Json?.赔 + 净利润
                        秋风信息Json.负 += 1
                        fs.writeFileSync(秋风信息, JSON.stringify(秋风信息Json, null, 4))

                        return e.reply(`用户出拳：${用户猜拳}\n系统出拳：${系统猜拳}\n出拳结果：赢\n赚取蜡烛数量：${净利润}根`)
                    }
                } else if (用户猜拳 === '石头') {
                    if (系统猜拳 === '剪刀') {
                        重置押注信息(e)
                        //  押注金额与倍率相乘
                        const 赚取金额 = 押注信息Json[userID].押注金额 * 押注信息Json[userID].倍率
                        const 净利润 = 押注信息Json[userID].押注金额 * 0.5
                        //  用户信息处理
                        用户信息Json[userID].胜 = (用户信息Json[userID]?.胜 || 0) + 1
                        用户信息Json[userID].赚取 = (用户信息Json[userID]?.赚取 || 0) + 净利润
                        用户信息Json[userID].白蜡 = (用户信息Json[userID]?.白蜡) + 赚取金额
                        fs.writeFileSync(用户信息, JSON.stringify(用户信息Json, null, 4));

                        //  秋风信息处理
                        秋风信息Json.赔 = 秋风信息Json?.赔 + 净利润
                        秋风信息Json.负 += 1
                        fs.writeFileSync(秋风信息, JSON.stringify(秋风信息Json, null, 4))

                        return e.reply(`用户出拳：${用户猜拳}\n系统出拳：${系统猜拳}\n出拳结果：赢\n赚取蜡烛数量：${净利润}根`)
                    } else if (系统猜拳 === '石头') {
                        重置押注信息(e)
                        //  用户信息处理
                        用户信息Json[userID].白蜡 = 用户信息Json[userID].白蜡 + 押注信息Json[userID].押注金额
                        用户信息Json[userID].平 = (用户信息Json[userID]?.平 || 0) + 1
                        fs.writeFileSync(用户信息, JSON.stringify(用户信息Json, null, 4));

                        //  秋风信息处理
                        秋风信息Json.平 += 1
                        fs.writeFileSync(秋风信息, JSON.stringify(秋风信息Json, null, 4))

                        return e.reply(`用户出拳：${用户猜拳}\n系统出拳：${系统猜拳}\n出拳结果：平\n返还押注蜡烛：${押注信息Json[userID]['押注金额']}根`)
                    } else if (系统猜拳 === '布') {
                        重置押注信息(e)
                        //  用户信息处理
                        用户信息Json[userID].负 = (用户信息Json[userID]?.负 || 0) + 1
                        用户信息Json[userID].亏损 = (用户信息Json[userID]?.亏损 || 0) + 押注信息Json[userID].押注金额
                        fs.writeFileSync(用户信息, JSON.stringify(用户信息Json, null, 4));

                        //  秋风信息处理
                        秋风信息Json.赚 = 秋风信息Json.赚 + 押注信息Json[userID].押注金额
                        秋风信息Json.胜 += 1
                        fs.writeFileSync(秋风信息, JSON.stringify(秋风信息Json, null, 4))

                        return e.reply(`用户出拳：${用户猜拳}\n系统出拳：${系统猜拳}\n出拳结果：输\n损失蜡烛数量：${押注信息Json[userID]['押注金额']}根`)
                    }
                } else if (用户猜拳 === '布') {
                    if (系统猜拳 === '剪刀') {
                        重置押注信息(e)
                        //  用户信息处理
                        用户信息Json[userID].负 = (用户信息Json[userID]?.负 || 0) + 1
                        用户信息Json[userID].亏损 = (用户信息Json[userID]?.亏损 || 0) + 押注信息Json[userID].押注金额
                        fs.writeFileSync(用户信息, JSON.stringify(用户信息Json, null, 4));

                        //  秋风信息处理
                        秋风信息Json.赚 = 秋风信息Json.赚 + 押注信息Json[userID].押注金额
                        秋风信息Json.胜 += 1
                        fs.writeFileSync(秋风信息, JSON.stringify(秋风信息Json, null, 4))

                        return e.reply(`用户出拳：${用户猜拳}\n系统出拳：${系统猜拳}\n出拳结果：输\n损失蜡烛数量：${押注信息Json[userID]['押注金额']}根`)
                    } else if (系统猜拳 === '石头') {
                        重置押注信息(e)
                        //  押注金额与倍率相乘
                        const 赚取金额 = 押注信息Json[userID].押注金额 * 押注信息Json[userID].倍率
                        const 净利润 = 押注信息Json[userID].押注金额 * 0.5
                        //  用户信息处理
                        用户信息Json[userID].胜 = (用户信息Json[userID]?.胜 || 0) + 1
                        用户信息Json[userID].赚取 = (用户信息Json[userID]?.赚取 || 0) + 净利润
                        用户信息Json[userID].白蜡 = (用户信息Json[userID]?.白蜡) + 赚取金额
                        fs.writeFileSync(用户信息, JSON.stringify(用户信息Json, null, 4));

                        //  秋风信息处理
                        秋风信息Json.赔 = 秋风信息Json?.赔 + 净利润
                        秋风信息Json.负 += 1
                        fs.writeFileSync(秋风信息, JSON.stringify(秋风信息Json, null, 4))

                        return e.reply(`用户出拳：${用户猜拳}\n系统出拳：${系统猜拳}\n出拳结果：赢\n赚取蜡烛数量：${净利润}根`)
                    } else if (系统猜拳 === '布') {
                        重置押注信息(e)
                        //  用户信息处理
                        用户信息Json[userID].白蜡 = 用户信息Json[userID].白蜡 + 押注信息Json[userID].押注金额
                        用户信息Json[userID].平 = (用户信息Json[userID]?.平 || 0) + 1
                        fs.writeFileSync(用户信息, JSON.stringify(用户信息Json, null, 4));

                        //  秋风信息处理
                        秋风信息Json.平 += 1
                        fs.writeFileSync(秋风信息, JSON.stringify(秋风信息Json, null, 4))

                        return e.reply(`用户出拳：${用户猜拳}\n系统出拳：${系统猜拳}\n出拳结果：平\n返还押注蜡烛：${押注信息Json[userID]['押注金额']}根`)
                    }
                }
            } else {
                return e.reply('您尚未押注，请先押注')
            }
        } else {
            return e.reply('请输入正确，"剪刀","石头","布"')
        }
    }


    async 押注(e) {
        // 从消息中提取押注的金额
        const 押注金额 = e.msg.replace(/押注/g, "");
        const 押注金额数字 = parseFloat(押注金额);

        if (isNaN(押注金额数字) || 押注金额数字 <= 0 || !Number.isInteger(押注金额数字)) {
            return e.reply('请输入有效的整数押注金额。');
        }
        // 获取用户ID以及信息
        const userID = e.user_id;
        const 签到文件夹 = 'plugins/Tlon-Sky/data/Sky签到/';
        const filePath = `${签到文件夹}${userID}.json`;
        const userData = await fs.promises.readFile(filePath);
        const userJson = JSON.parse(userData.toString());

        let 数据 = {}
        数据[userID] = { 押注金额: 0, 倍率: null }
        if (!fs.existsSync(`plugins/Tlon-Sky/data/押注信息/${userID}.json`)) {
            // 如果文件不存在，创建文件并写入 JSON 数据
            fs.writeFileSync(`plugins/Tlon-Sky/data/押注信息/${userID}.json`, JSON.stringify(数据, null, 2));
            logger.mark('JSON 文件创建成功！');
        }
        //  读取押注信息
        const 押注信息 = `plugins/Tlon-Sky/data/押注信息/${userID}.json`;
        const 押注信息Data = await fs.promises.readFile(押注信息);
        const 押注信息Json = JSON.parse(押注信息Data.toString());

        //  判断金额是否足够押注
        if (userJson[userID]['白蜡'] > 押注金额数字) {
            //  押注成功，减少用户白蜡
            userJson[userID]['白蜡'] = userJson[userID]['白蜡'] - 押注金额数字
            fs.writeFileSync(filePath, JSON.stringify(userJson, null, 4));

            // 计算倍率，最高为5.0
            const 倍率 = Math.min(1.5 + (Math.floor(押注金额数字 / 1000) * 0.5), 5.0);

            // 将用户押注信息存储

            const 押注文件路径 = `plugins/Tlon-Sky/data/押注信息/${userID}.json`
            let 押注信息 = {}
            押注信息[userID] = { 押注金额: (押注信息Json[userID]?.押注金额) + 押注金额数字, 倍率: 倍率 }
            fs.writeFileSync(押注文件路径, JSON.stringify(押注信息, null, 4));

            // 发送回复消息，告知用户押注成功
            e.reply(`你已成功押注 ${押注金额数字}根白蜡，倍率为 ${倍率}。`);
        } else {
            return e.reply('白蜡不足！')
        }
    }

    async 赌坊信息(e) {
        const 赌坊信息 = 'plugins/Tlon-Sky/data/秋风赌坊.json';
        const 赌坊信息Data = await fs.promises.readFile(赌坊信息);
        const 赌坊信息Json = JSON.parse(赌坊信息Data.toString());
        let html = {
            秋风赌坊: 'plugins/Tlon-Sky/resource/Tlon-Sky.png',
            赢: `赢：${赌坊信息Json.胜} 次`,
            输: `输：${赌坊信息Json.负} 次`,
            平: `平：${赌坊信息Json.平} 次`,
            总赚取: `总赚取：${赌坊信息Json.赚} 根白蜡`,
            总亏损: `总亏损：${赌坊信息Json.赔} 根白蜡`,
        }
        await render('admin/秋风赌坊', {
            ...html
        }, {
            e,
            scale: 1.4
        })
    }
}

const 重置押注信息 = async function (e) {
    //  获取用户ID
    const userID = e.user_id;

    //  读取押注信息
    const 押注信息 = `plugins/Tlon-Sky/data/押注信息/${userID}.json`;
    const 押注信息Data = await fs.promises.readFile(押注信息);
    const 押注信息Json = JSON.parse(押注信息Data.toString());

    //  重置
    押注信息Json[userID]['押注金额'] = 0
    押注信息Json[userID]['倍率'] = null
    fs.writeFileSync(押注信息, JSON.stringify(押注信息Json, null, 4));
}