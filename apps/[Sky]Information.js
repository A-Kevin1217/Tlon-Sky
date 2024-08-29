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
        const URL_DATA = await getLinkData('https://gitee.com/Tloml-Starry/resources/raw/master/resources/json/季节&活动剩余.json', 'json')

        const { endDate: SEASON_END_DATE, name: SEASON_NAME, number: SGRSW } = URL_DATA['季节']
        const SEASON_START_TIMESTAMP = new Date(URL_DATA['季节']['startDate']).getTime();
        const SEASON_END_TIMESTAMP = new Date(SEASON_END_DATE).getTime();

        const CURRENT_TIMESTAMP = Date.now();
        const SEASONAL_REMAINING_TIMESTAMP = SEASON_END_TIMESTAMP - CURRENT_TIMESTAMP;

        let Tips = []
        if (SEASONAL_REMAINING_TIMESTAMP <= 0) {
            Tips.push(`\r${SEASON_NAME}已结束！请等待下个季节到来.`)
        } else {
            const { DAYS, HOURS, MINUTES, SECONDS } = GET_TIME_CONVERSION(SEASONAL_REMAINING_TIMESTAMP)
            Tips.push([
                `\r距离[${SEASON_NAME}]结束还剩` +
                `\r${DAYS}天${HOURS}时${MINUTES}分${SECONDS}秒` +
                `\r截至至${SEASON_END_DATE}` +
                `\r本季节一共${Math.floor((SEASON_END_TIMESTAMP - SEASON_START_TIMESTAMP) / (24 * 60 * 60 * 1000)) + 1}天` +
                '\r季蜡还可获得: ' +
                `\r[有季卡]：${(DAYS + 1) * 6}季蜡` +
                `\r[无季卡]：${(DAYS + 1) * 5}季蜡` +
                `\r本季节毕业需：${SGRSW}季蜡` +
                `\r[有季卡]毕业需：${Math.ceil((SGRSW - 30) / 6)}天` +
                `\r[无季卡]毕业需：${Math.ceil((SGRSW - 12) / 5)}天` +
                '\r(无季卡包括非必要的魔法节点)'
            ])
        };

        const NUMBER_OF_ACTIVITIES = URL_DATA['活动'].length
        let ACTIVITY_DATA = [], ACTIVITY_NAME = []
        if (NUMBER_OF_ACTIVITIES) {
            for (let i = 0; i < NUMBER_OF_ACTIVITIES; i++) {
                const { endDate: EVENT_END_DATE, name: EVENT_NAME, number: DAC } = URL_DATA['活动'][i]
                const EVENT_START_TIMESTAMP = new Date(URL_DATA['活动'][i]['startDate']).getTime();
                const EVENT_END_TIMESTAMP = new Date(EVENT_END_DATE).getTime();
                const ACTIVITY_REMAINING_TIMESTAMP = EVENT_END_TIMESTAMP - CURRENT_TIMESTAMP;
                if (ACTIVITY_REMAINING_TIMESTAMP <= 0) continue
                const ACTIVITIES_REQUIRE_CURRENCY = URL_DATA['活动'][i]['DailyGetNumber']
                const { DAYS, HOURS, MINUTES, SECONDS } = GET_TIME_CONVERSION(ACTIVITY_REMAINING_TIMESTAMP)
                const TOTAL_AVAILABLE = (DAYS + 1) * ACTIVITIES_REQUIRE_CURRENCY

                ACTIVITY_DATA.push(...[
                    `\r距离${EVENT_NAME}结束还剩` +
                    `\r${DAYS}天${HOURS}小时${MINUTES}分钟${SECONDS}秒` +
                    `\r截至至${EVENT_END_DATE}` +
                    `\r本活动一共${Math.floor((EVENT_END_TIMESTAMP - EVENT_START_TIMESTAMP) / (24 * 60 * 60 * 1000)) + 1}天` +
                    `\r本活动代币物品总计需要: ${DAC}代币` +
                    `\r代币还可获得: ${TOTAL_AVAILABLE}\r从今日开始兑换，${TOTAL_AVAILABLE < DAC ? '已经来不及了' : '还可以兑换完'}` +
                    `\r全部兑换需: ${Math.ceil(DAC / ACTIVITIES_REQUIRE_CURRENCY)}天` +
                    `\r备注: ${URL_DATA['活动'][i]['other']}` +
                    '\r▔▔▔▔▔▔\r'
                ])
                ACTIVITY_NAME.push(EVENT_NAME)
            }
        }
        Tips.push([
            `\r当前活动: ${ACTIVITY_DATA.length === 0 ? '无' : ACTIVITY_NAME.join(',')}` +
            ACTIVITY_DATA.join('')
        ])

        return e.reply([
            segment.at(e.user_id),
            Tips[0].join(''),
            '\r▔▔▔▔▔▔\r' +
            Tips[1].join('').trim(),
        ])
    }

    async F5(e) {
        const SEASON_NAME = e.msg.replace(/#|\/|季多久未复刻/g, '')
        const URL_DATA = await getLinkData('https://gitee.com/Tloml-Starry/resources/raw/master/resources/json/先祖多久未复刻.json', 'json')

        if (!URL_DATA[SEASON_NAME]) return e.reply([
            segment.at(e.user_id),
            '\r不存在该季节，或该季节尚未开始复刻'
        ])

        let msg = `数据更新时间：${URL_DATA['UPDATE TIME']}\r此表不计入集体复刻\r`

        function getDayDiff(date) {
            const today = new Date()
            const timeDiff = today.getTime() - date.getTime()
            return Math.floor(timeDiff / (1000 * 60 * 60 * 24)).toString().padStart(3, '0')
        }

        for (const role of URL_DATA[SEASON_NAME]) {
            const daysNumber = getDayDiff(new Date(role.date))
            if (daysNumber.charAt(1) === '-') {
                msg += `${role.name} 当前正在复刻或即将复刻\r`
            } else {
                msg += `${role.name}已[ ${daysNumber} ]天未复刻\r`
            }
        }

        return e.reply([msg.trim()])
    }
}

function GET_TIME_CONVERSION(TIMESTAMP) {
    return {
        DAYS: Math.floor(TIMESTAMP / (24 * 60 * 60 * 1000)),
        HOURS: Math.floor((TIMESTAMP % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)),
        MINUTES: Math.floor((TIMESTAMP % (60 * 60 * 1000)) / (60 * 1000)),
        SECONDS: Math.floor((TIMESTAMP % (60 * 1000)) / 1000)
    }
}