import plugin from '../../../lib/plugins/plugin.js';
import { render } from '../components/index.js'
import lodash from 'lodash'
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
                },
                {
                    reg: '^#?光遇背包$',
                    fnc: '光遇背包'
                }
            ]
        });
    }

    async 光遇信息(e) {
        const 用户ID = e.user_id;
        const 用户文件 = `plugins/Tlon-Sky/data/Sky签到/${用户ID}.json`;

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
                总收入数量: 总收入数量
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
            let html = {
                头像: `https://api.t1qq.com/api/tool/qq/qqtx?key=lHV6bOsaNrsNv2hmegRRVMxOUp&qq=${用户ID}`,
                用户ID: 用户ID,
                蜡烛保护卡: 蜡烛保护卡
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