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

            let msg = []
            if (linkData['ret'] !== 1) {
                msg = ['当前光遇服务器畅通，无需排队']
            } else {
                msg = [
                    segment.at(e.user_id),
                    '当前排队中\r',
                    `排队人数：${linkData['pos']} 位\r`,
                    `预计等待时间：${linkData['wait_time']} 秒`
                ]
            }
            let platform = e.bot?.adapter?.name || e.platform || '未知'
            if (platform === 'QQBot') {
                if (typeof Bot.Button === 'function') {
                    function bd(label, callback) {
                        return { label, callback }
                    }
                    msg.push(Bot.Button([[bd('再次查询', '光遇服务器状态')]]))
                } else if (typeof segment?.button === 'function') {
                    msg.push(segment.button([
                        { text: '再次查询', callback: '光遇服务器状态' }
                    ]))
                }
            }

            return e.reply(msg)
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
        return render('admin/季节&活动剩余', { data: JSON.stringify(data) }, { e, scale: 1.4 })
    }

    async F5(e) {
        const seasonName = e.msg.replace(/#|\/|季多久未复刻/g, '')
        fetchSeasonalLastAppearance().then(data => {
            const seasonData = data.find(season => season.name === seasonName)
            if (!seasonData) {
                return e.reply(['不存在该季节']);
            }
            return render('admin/ancestor-last-reappearance-duration', {
                seasonName,
                seasonIcon: seasonData.icon,
                data: JSON.stringify(seasonData)
            }, { e, scale: 1.4 })
        });
    }
}

function fetchSeasonalLastAppearance() {
    return fetch('https://gitee.com/Tloml-Starry/resources/raw/master/resources/json/SkyChildrenoftheLight/SeasonalSpirits.json')
        .then(res => res.json())
        .then(seasonalData => {
            return fetch('https://gitee.com/Tloml-Starry/resources/raw/master/resources/json/SkyChildrenoftheLight/RegressionRecords.json')
                .then(res => res.json())
                .then(regressionData => {
                    const lastAppearance = {};

                    regressionData.forEach(yearData => {
                        yearData.yearRecord.forEach(monthData => {
                            monthData.monthRecord.forEach(record => {
                                const name = record.name;
                                const date = new Date(yearData.year, monthData.month - 1, record.day);

                                if (!lastAppearance[name] || lastAppearance[name] < date) {
                                    lastAppearance[name] = date;
                                }
                            });
                        });
                    });

                    const currentDate = new Date();

                    const seasonalLastAppearance = seasonalData.map(season => {
                        return {
                            name: season.name,
                            icon: season.seasonIcon,
                            spirits: season.spirits
                                .map(spirit => {
                                    const spiritName = typeof spirit === 'string' ? spirit : spirit.name;
                                    const lastDate = lastAppearance[spiritName];
                                    const icons = typeof spirit === 'object' ? spirit.icon : [];
                                    
                                    if (lastDate) {
                                        const adjustedDate = new Date(lastDate);
                                        adjustedDate.setDate(adjustedDate.getDate() + 5);

                                        const diffTime = currentDate - adjustedDate;
                                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                                        return {
                                            name: spiritName,
                                            status: diffDays > 0 ? `已 ${diffDays} 天未复刻` : '当前正在复刻',
                                            icons: icons
                                        };
                                    }
                                    return null;
                                })
                                .filter(spirit => spirit !== null)
                        };
                    });

                    return seasonalLastAppearance;
                });
        });
}