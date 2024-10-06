import common from "../../../lib/common/common.js";
import { render } from './../components/index.js'
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
                { reg: /^[#\/]?(光遇|sky)公告$/i, fnc: 'skyAnnouncement' },
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
                '当前排队中\r',
                `排队人数：${linkData['pos']} 位\r`,
                `预计等待时间：${linkData['wait_time']} 秒`
            ])
        } catch (err) {
            return e.reply(['光遇服务器异常，可能正在维护更新'])
        }
    }

    async skyAnnouncement(e) {
        return render('admin/skyAnnouncement', {}, { e, scale: 1.4 })
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
        const data = await getLinkData('https://gitee.com/Tloml-Starry/resources/raw/master/resources/json/季节&活动剩余.json', 'json')
        return render('admin/季节&活动剩余', { data }, { e, scale: 1.4 })
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