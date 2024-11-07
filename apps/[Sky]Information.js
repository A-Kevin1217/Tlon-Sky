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
                { reg: /^[#\/]?(光遇|sky)(服务器)?状态$/i, fnc: 'checkServerStatus' },
                { reg: /^[#\/]?(光遇|sky)公告$/i, fnc: 'showAnnouncement' },
                { reg: /^[#\/]?光翼统计$/, fnc: 'countWings' },
                { reg: /^[#\/]?(季节|活动)剩余$/, fnc: 'showSeasonalRemaining' },
                { reg: /^[#\/]?(.*)季多久未复刻$/, fnc: 'checkSeasonReappearance' }
            ]
        })
    }

    async checkServerStatus(e) {
        try {
            const serverData = await getLinkData('https://live-queue-sky-merge.game.163.com/queue?type=json', 'json');
            const message = serverData['ret'] !== 1 
                ? ['当前光遇服务器畅通，无需排队'] 
                : [
                    segment.at(e.user_id),
                    '当前排队中\r',
                    `排队人数：${serverData['pos']} 位\r`,
                    `预计等待时间：${serverData['wait_time']} 秒`
                ];

            const platform = e.bot?.adapter?.name || e.platform || '未知';
            if (platform === 'QQBot') {
                const buttonFunction = typeof Bot.Button === 'function' ? Bot.Button : segment?.button;
                if (buttonFunction) {
                    message.push(buttonFunction([{ text: '再次查询', callback: '光遇服务器状态' }]));
                }
            }

            return e.reply(message);
        } catch (error) {
            return e.reply(['光遇服务器异常，可能正在维护更新']);
        }
    }

    async showAnnouncement(e) {
        return render('admin/skyAnnouncement', {}, { e, scale: 1.4 });
    }

    async countWings(e) {
        const wingData = await getLinkData('https://s.166.net/config/ds_yy_02/ma75_wing_wings.json', 'json');
        const wingCounts = wingData.reduce((counts, item) => {
            const tag = item["一级标签"];
            if (tag in counts) counts[tag]++;
            return counts;
        }, {
            "复刻永久": 0,
            "普通永久": 0,
            "晨": 0,
            "云": 0,
            "雨": 0,
            "霞": 0,
            "暮": 0,
            "禁": 0,
            "暴": 0
        });

        const message = [
            `永久翼: ${wingCounts["复刻永久"] + wingCounts["普通永久"]}个`,
            `复刻先祖永久翼: ${wingCounts["复刻永久"]}`,
            `常驻先祖永久翼：${wingCounts["普通永久"]}`,
            `晨岛光翼：${wingCounts["晨"]}`,
            `云野光翼：${wingCounts["云"]}`,
            `雨林光翼：${wingCounts["雨"]}`,
            `霞谷光翼：${wingCounts["霞"]}`,
            `暮土光翼：${wingCounts["暮"]}`,
            `禁阁光翼：${wingCounts["禁"]}`,
            `伊甸光翼：${wingCounts["暴"]}`
        ];

        return e.reply(await common.makeForwardMsg(e, [message.join('\r'), '数据来源: 网易大神'], `总光翼数量: ${wingData.length} | 点击查看更多`));
    }

    async showSeasonalRemaining(e) {
        const seasonalData = await getLinkData('https://gitee.com/Tloml-Starry/resources/raw/master/resources/json/季节&活动剩余.json', 'json');
        return render('admin/季节&活动剩余', { data: JSON.stringify(seasonalData) }, { e, scale: 1.4 });
    }

    async checkSeasonReappearance(e) {
        const seasonName = e.msg.replace(/#|\/|季多久未复刻/g, '').trim();
        const seasonalData = await fetchSeasonalLastAppearance();
        const seasonInfo = seasonalData.find(season => season.name === seasonName);

        if (!seasonInfo) {
            return e.reply(['不存在该季节']);
        }

        return render('admin/ancestor-last-reappearance-duration', {
            seasonName,
            seasonIcon: seasonInfo.icon,
            data: JSON.stringify(seasonInfo)
        }, { e, scale: 1.4 });
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