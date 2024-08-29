import common from "../../../lib/common/common.js";
import {
    getLinkData
} from '../function/function.js';

export class Ts extends plugin {
    constructor() {
        super({
            name: '[Ts]光遇信息查询',
            dsc: '光遇信息查询',
            event: 'message',
            priority: 1,
            rule: [
                { reg: /^[#\/]?(光遇|sky)(服务器)?状态$/i, fnc: 'F1' },
                { reg: /^[#\/]?(光遇|sky)公告$/i, fnc: 'F2' },
                { reg: /^[#\/]?光翼统计$/, fnc: 'F3' },
                { reg: /^[#\/]?(季节|活动)剩余$/, fnc: 'F4' },
                { reg: /^[#\/]?(.*)季多久未复刻$/, fnc: 'F5' }
            ]
        })
    }

    async F1(e) {
        try {
            const linkData = await getLinkData('https://live-queue-sky-merge.game.163.com/queue?type=json', 'json')

            if (linkData['ret'] !== 1) {
                return e.reply(['当前光遇服务器畅通，无需排队'])
            }

            return e.reply([
                segment.at(e.user_id),
                '当前派对中\r',
                `排队人数：${linkData['pos']} 位\r`,
                `预计等待时间：${linkData['wait_time']} 秒`
            ])
        } catch (err) {
            return e.reply(['光遇服务器异常，可能正在维护更新'])
        }
    }

    async F2(e) {
        const linkData1 = await getLinkData('https://ma75.update.netease.com/game_notice/announcement_live.json', 'json')
        const linkData2 = await getLinkData('https://ma75.update.netease.com/game_notice/announcement_qa.json', 'json')

        const { Title, OtherChannelMessage } = linkData1
        const { Title: Title2, OtherChannelMessage: OtherChannelMessage2 } = linkData2

        const msg = [
            await common.makeForwardMsg(e, [OtherChannelMessage], Title),
            await common.makeForwardMsg(e, [OtherChannelMessage2], Title2),
        ]

        return e.reply(await common.makeForwardMsg(e, msg, '点击查看'))
    }

    async F3(e) {
        const linkData = await getLinkData('https://s.166.net/config/ds_yy_02/ma75_wing_wings.json', 'json')
        let tagCounts = {
            "复刻永久": 0,
            "普通永久": 0,
            "晨": 0,
            "云": 0,
            "雨": 0,
            "霞": 0,
            "暮": 0,
            "禁": 0,
            "暴": 0
        };
        linkData.forEach(item => {
            if (item["一级标签"] === "复刻永久") tagCounts["复刻永久"]++
            if (item["一级标签"] === "普通永久") tagCounts["普通永久"]++
            if (item["一级标签"] === "晨岛") tagCounts["晨"]++
            if (item["一级标签"] === "云野") tagCounts["云"]++
            if (item["一级标签"] === "雨林") tagCounts["雨"]++
            if (item["一级标签"] === "霞谷") tagCounts["霞"]++
            if (item["一级标签"] === "暮土") tagCounts["暮"]++
            if (item["一级标签"] === "禁阁") tagCounts["禁"]++
            if (item["一级标签"] === "暴风眼") tagCounts["暴"]++
        });

        const msg = [
            `永久翼: ${tagCounts["复刻永久"] + tagCounts["普通永久"]}个`,
            `复刻先祖永久翼: ${tagCounts["复刻永久"]}`,
            `常驻先祖永久翼：${tagCounts["普通永久"]}`,
            `晨岛光翼：${tagCounts["晨"]}`,
            `云野光翼：${tagCounts["云"]}`,
            `雨林光翼：${tagCounts["雨"]}`,
            `霞谷光翼：${tagCounts["霞"]}`,
            `暮土光翼：${tagCounts["暮"]}`,
            `禁阁光翼：${tagCounts["禁"]}`,
            `伊甸光翼：${tagCounts["暴"]}`
        ]

        return e.reply(await common.makeForwardMsg(e, [msg.join('\r'), '数据来源: 网易大神'], `总光翼数量: ${linkData.length} | 点击查看更多`))
    }

    async F4(e) {
        const currentTimestamp = Date.now()
        const linkData = await getLinkData('https://gitee.com/Tloml-Starry/resources/raw/master/resources/json/季节&活动剩余.json', 'json')
        const { 季节: season, 活动: activity } = linkData

        let msg = []

        const {
            name: seasonName,
            number: seasonNumber,
            startDate: seasonStartDate,
            endDate: seasonEndDate,
            ancestorsNumber
        } = season

        const seasonStartTimestamp = new Date(seasonStartDate).getTime()
        const seasonEndTimestamp = new Date(seasonEndDate).getTime()
        const seasonRemainingTimestamp = seasonEndTimestamp - currentTimestamp

        if (seasonRemainingTimestamp <= 0) {
            msg.push(`${seasonName}已结束 请等待下个季节到来`)
        } else {
            const { days, hours, minutes, seconds } = Cttrt(seasonRemainingTimestamp);
            const totalNumberOfDays = Math.floor((seasonEndTimestamp - seasonStartTimestamp) / 86400000) + 1
            const { YesJKGetNumber, NoJKGetNumber } = {
                YesJKGetNumber: (days + 1) * 6,
                NoJKGetNumber: (days + 1) * 5
            }

            const { YesJKGraduationDays, NoJKGraduationDays } = {
                YesJKGraduationDays: parseInt((seasonNumber - 30) / 6),
                NoJKGraduationDays: parseInt((seasonNumber - ancestorsNumber * 3) / 5)
            }

            const data = [
                `距离[${seasonName}]结束还剩`,
                `${days}天${hours}时${minutes}分${seconds}秒`,
                `截至至${seasonEndDate}`,
                `本季节一共${totalNumberOfDays}天`,
                '季蜡还可获得: ',
                `[有季卡]: ${YesJKGetNumber}季蜡`,
                `[无季卡]: ${NoJKGetNumber}季蜡`,
                `本季节毕业需: ${seasonNumber}季蜡`,
                `[有季卡]毕业需: ${YesJKGraduationDays}天`,
                `[无季卡]毕业需: ${NoJKGraduationDays}天`,
                '(无季卡包括非必要的魔法节点)'
            ]

            msg.push(data.join('\r'))
        }

        for (const activityData of activity) {
            const {
                name: activityName,
                number: activityNumber,
                DailyGetNumber: activityDailyGetNumber,
                startDate: activityStartDate,
                endDate: activityEndDate,
                other: activityOther
            } = activityData

            const activityStartTimestamp = new Date(activityStartDate).getTime()
            const activityEndTimestamp = new Date(activityEndDate).getTime()
            const activityRemainingTimestamp = activityEndTimestamp - currentTimestamp

            if (activityRemainingTimestamp <= 0) {
                continue
            } else {
                const { days, hours, minutes, seconds } = Cttrt(activityRemainingTimestamp);
                const totalNumberOfDays = Math.floor((activityEndTimestamp - activityStartTimestamp) / 86400000) + 1
                const remainingObtainableQuantity = (days + 1) * activityDailyGetNumber
                const graduationDays = parseInt(activityNumber / activityDailyGetNumber)

                const data = [
                    `距离[${activityName}]结束还剩`,
                    `${days}天${hours}时${minutes}分${seconds}秒`,
                    `截至至${activityEndDate}`,
                    `本活动一共${totalNumberOfDays}天`,
                    `代币物品总计需要: ${activityNumber}代币`,
                    `从今天至结束可获得代币: ${remainingObtainableQuantity}枚`,
                    `全部兑换需: ${graduationDays}天`,
                    `[备注] ${activityOther}`,
                ]

                msg.push(data.join('\r'))
            }
        }

        return e.reply(await common.makeForwardMsg(e, msg, '点击查看'))
    }

    async F5(e) {
        const seasonName = e.msg.replace(/#|\/|季多久未复刻/g, '')
        const linkData = await getLinkData('https://gitee.com/Tloml-Starry/resources/raw/master/resources/json/先祖多久未复刻.json', 'json')

        if (!linkData[seasonName]) {
            return e.reply([
                segment.at(e.user_id),
                '\r不存在该季节，或该季节尚未开始复刻'
            ])
        }

        let msg = `数据更新时间：${linkData['UPDATE TIME']}\r此表不计入集体复刻\r`

        function getDayDiff(date) {
            const today = new Date()
            const timeDiff = today.getTime() - date.getTime()
            return Math.floor(timeDiff / (1000 * 60 * 60 * 24)).toString().padStart(3, '0')
        }

        for (const role of linkData[seasonName]) {
            const daysNumber = getDayDiff(new Date(role.date))
            if (daysNumber.charAt(1) === '-') {
                msg += `${role.name} 当前正在复刻或即将复刻\r`
            } else {
                msg += `${role.name}已[${daysNumber}]天未复刻\r`
            }
        }

        return e.reply([msg.trim()])
    }
}

function Cttrt(timestamp) {
    return {
        days: Math.floor(timestamp / (24 * 60 * 60 * 1000)),
        hours: Math.floor((timestamp % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)),
        minutes: Math.floor((timestamp % (60 * 60 * 1000)) / (60 * 1000)),
        seconds: Math.floor((timestamp % (60 * 1000)) / 1000)
    }
}