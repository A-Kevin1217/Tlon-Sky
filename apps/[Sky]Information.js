import fetch from 'node-fetch'
import { render } from '../components/index.js'

const LINK = [
    'https://live-queue-sky-merge.game.163.com/queue?type=json',
    'https://ma75.update.netease.com/game_notice/announcement_live.json',
    'https://s.166.net/config/ds_yy_02/ma75_wing_wings.json',
    'https://gitee.com/Tloml-Starry/resources/raw/master/resources/json/季节&活动剩余.json'
]
export class SKY extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]光遇:信息',
            dsc: '光遇信息查询',
            event: 'message',
            priority: 1,
            rule: [
                { reg: /^(#|\/)?(光遇|sky)(服务器)?状态$/i, fnc: 'F1' },
                { reg: /^(#|\/)?(光遇|sky)公告$/i, fnc: 'F2' },
                { reg: /^(#|\/)?光翼统计$/, fnc: 'F3' },
                { reg: /^(#|\/)?(季节|活动)剩余$/, fnc: 'F4' },
                { reg: /^(#|\/)?(.*)季多久未复刻$/, fnc: 'F5' }
            ]
        })
    }
    getDayDiff(date) {
        const today = new Date()
        const timeDiff = today.getTime() - date.getTime()
        return Math.floor(timeDiff / (1000 * 60 * 60 * 24)).toString().padStart(3, '0')
    }
    async F1(e) {
        try {
            const URL_DATA = await GET_URL_DATA(LINK[0])
            if (URL_DATA['ret'] !== 1) return e.reply(['当前SKY服务器畅通，无需排队'])
            return e.reply([segment.at(e.user_id), `当前排队中\r排队人数：${URL_DATA['pos']} 位\r预计等待时间：${URL_DATA['wait_time']} 秒`])
        } catch (err) {
            return e.reply(['光遇服务器异常\r可能正在维护更新'])
        }
    }

    async F2(e) {
        const URL_DATA = await GET_URL_DATA(LINK[1])

        const TITLE = URL_DATA['Title']
        const ANNOUNCEMENT = URL_DATA['OtherChannelMessage'].replace(/<1>|<\/1>/g, '')

        await render('admin/公告', { TITLE, ANNOUNCEMENT, }, { e, scale: 1.4 })
    }

    async F3(e) {
        const URL_DATA = await GET_URL_DATA(LINK[2])
        let TAG_COUNTS = {
            "复刻永久": 0, "普通永久": 0,
            "晨": 0, "云": 0, "雨": 0, "霞": 0, "暮": 0, "禁": 0, "暴": 0
        };
        URL_DATA.forEach(item => {
            if (item["一级标签"] === "复刻永久") TAG_COUNTS["复刻永久"]++
            if (item["一级标签"] === "普通永久") TAG_COUNTS["普通永久"]++
            if (item["一级标签"] === "晨岛") TAG_COUNTS["晨"]++
            if (item["一级标签"] === "云野") TAG_COUNTS["云"]++
            if (item["一级标签"] === "雨林") TAG_COUNTS["雨"]++
            if (item["一级标签"] === "霞谷") TAG_COUNTS["霞"]++
            if (item["一级标签"] === "暮土") TAG_COUNTS["暮"]++
            if (item["一级标签"] === "禁阁") TAG_COUNTS["禁"]++
            if (item["一级标签"] === "暴风眼") TAG_COUNTS["暴"]++
        });

        return e.reply([
            `总光翼数量：${URL_DATA.length}`,
            `\r永久翼：${TAG_COUNTS["复刻永久"] + TAG_COUNTS["普通永久"]}`,
            `\r复刻先祖永久翼：${TAG_COUNTS["复刻永久"]}`,
            `\r常驻先祖永久翼：${TAG_COUNTS["普通永久"]}`,
            `\r晨岛光翼：${TAG_COUNTS["晨"]}`,
            `\r云野光翼：${TAG_COUNTS["云"]}`,
            `\r雨林光翼：${TAG_COUNTS["雨"]}`,
            `\r霞谷光翼：${TAG_COUNTS["霞"]}`,
            `\r暮土光翼：${TAG_COUNTS["暮"]}`,
            `\r禁阁光翼：${TAG_COUNTS["禁"]}`,
            `\r伊甸光翼：${TAG_COUNTS["暴"]}`
        ])
    }

    async F4(e) {
        const URL_DATA = await GET_URL_DATA(LINK[3])

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
        const URL_DATA = await GET_URL_DATA(LINK[3].replace(/季节&活动剩余/g, '先祖多久未复刻'))

        if (!URL_DATA[SEASON_NAME]) return e.reply([
            segment.at(e.user_id),
            '\r不存在该季节，或该季节尚未开始复刻'
        ])

        let msg = `数据更新时间：${URL_DATA['UPDATE TIME']}\r此表不计入集体复刻\r`

        for (const role of URL_DATA[SEASON_NAME]) {
            const daysNumber = this.getDayDiff(new Date(role.date))
            if (daysNumber.charAt(1) === '-') {
                msg += `${role.name}当前正在或即将复刻\r`
            } else {
                msg += `${role.name}已[ ${daysNumber} ]天未复刻\r`
            }
        }

        return e.reply([msg.trim()])
    }
}

/**
 * 请求网络接口并解析为JSON
 * @param {string} URL 网络接口
 * @returns {JSON}
 */
async function GET_URL_DATA(URL) { return await (await fetch(URL)).json() }

function GET_TIME_CONVERSION(TIMESTAMP) {
    return {
        DAYS: Math.floor(TIMESTAMP / (24 * 60 * 60 * 1000)),
        HOURS: Math.floor((TIMESTAMP % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)),
        MINUTES: Math.floor((TIMESTAMP % (60 * 60 * 1000)) / (60 * 1000)),
        SECONDS: Math.floor((TIMESTAMP % (60 * 1000)) / 1000)
    }
}