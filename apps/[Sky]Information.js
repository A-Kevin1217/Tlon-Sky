import common from '../../../lib/common/common.js';
import { render } from './../components/index.js';

export class SkyInformationPlugin extends plugin {
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
        });
    }

    async checkServerStatus(e) {
        try {
            const { ret, pos, wait_time } = await getLinkData('https://live-queue-sky-merge.game.163.com/queue?type=json', 'json');

            let timeDisplay = '';
            if (wait_time) {
                const hours = Math.floor(wait_time / 3600);
                const minutes = Math.floor((wait_time % 3600) / 60);
                const seconds = wait_time % 60;

                if (hours > 0) {
                    timeDisplay = `${hours}时${minutes}分${seconds}秒`;
                } else if (minutes > 0) {
                    timeDisplay = `${minutes}分${seconds}秒`;
                } else {
                    timeDisplay = `${seconds}秒`;
                }
            }

            const message = ret !== 1
                ? ['当前光遇服务器畅通，无需排队']
                : [
                    segment.at(e.user_id),
                    '当前排队中\r',
                    `排队人数：${pos} 位\r`,
                    `预计等待时间：${timeDisplay}`
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
            const tag = item['一级标签'];
            if (tag === '晨岛') counts['晨']++;
            else if (tag === '云野') counts['云']++;
            else if (tag === '雨林') counts['雨']++;
            else if (tag === '霞谷') counts['霞']++;
            else if (tag === '暮土') counts['暮']++;
            else if (tag === '禁阁') counts['禁']++;
            else if (tag === '暴风眼') counts['暴']++;
            else if (tag === '复刻永久') counts['复刻永久']++;
            else if (tag === '普通永久') counts['普通永久']++;
            return counts;
        }, {
            '复刻永久': 0,
            '普通永久': 0,
            '晨': 0,
            '云': 0,
            '雨': 0,
            '霞': 0,
            '暮': 0,
            '禁': 0,
            '暴': 0
        });

        const message = [
            `永久翼: ${wingCounts['复刻永久'] + wingCounts['普通永久']}个`,
            `复刻先祖永久翼: ${wingCounts['复刻永久']}`,
            `常驻先祖永久翼：${wingCounts['普通永久']}`,
            `晨岛光翼：${wingCounts['晨']}`,
            `云野光翼：${wingCounts['云']}`,
            `雨林光翼：${wingCounts['雨']}`,
            `霞谷光翼：${wingCounts['霞']}`,
            `暮土光翼：${wingCounts['暮']}`,
            `禁阁光翼：${wingCounts['禁']}`,
            `伊甸光翼：${wingCounts['暴']}`
        ];

        return e.reply(await common.makeForwardMsg(e, [message.join('\r'), '数据来源: 网易大神'], `总光翼数量: ${wingData.length} | 点击查看更多`));
    }

    async showSeasonalRemaining(e) {
        const { season, activity } = await getLinkData('https://gitee.com/Tloml-Starry/resources/raw/master/resources/json/SkyChildrenoftheLight/GameProgress.json', 'json');

        const {
            name, // 季节名称
            /* icon, // 季节图标
            requiredCandlesTrue, // 持有季卡毕业所需季蜡
            requiredCandlesFalse, // 无季卡毕业所需季蜡
            startDate, // 季节开始时间 */
            endDate // 季节结束时间
        } = season;

        // 计算剩余时间
        const calculateRemainingTime = (endDateStr) => {
            const end = new Date(endDateStr.replace(/-/g, '/'));
            const now = new Date();
            const diff = end - now;

            if (diff <= 0) return '已结束';

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            const timeParts = [];
            if (days > 0) timeParts.push(`${days}天`);
            if (hours > 0) timeParts.push(`${hours}时`);
            if (minutes > 0) timeParts.push(`${minutes}分`);
            timeParts.push(`${seconds}秒`);

            return timeParts.join('');
        };

        // 计算剩余季蜡（按自然日计算）
        const getRemainingCandles = (endDateStr) => {
            const end = new Date(endDateStr.replace(/-/g, '/'));
            const now = new Date();
            end.setHours(0, 0, 0, 0);
            now.setHours(0, 0, 0, 0);

            const diffDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
            return {
                withPass: Math.max(diffDays, 0) * 6,  // 有季卡每天6根
                withoutPass: Math.max(diffDays, 0) * 5 // 无季卡每天5根
            };
        };

        const remainingTime = {
            days: calculateRemainingTime(endDate),
            endDate: endDate.split(' ')[0]
        };

        const remainingCandles = getRemainingCandles(endDate);

        // 计算毕业所需总天数
        const totalDays = {
            withPass: Math.ceil(season.requiredCandlesTrue / 6),  // 有季卡每天6根
            withoutPass: Math.ceil(season.requiredCandlesFalse / 5) // 无季卡每天5根
        };

        return render('admin/GameProgressQuery', { 
            data: JSON.stringify({
                ...season,
                remainingTime,
                remainingCandles,
                totalDays
            }) 
        }, { e, scale: 1.4 });
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
                                    return {
                                        name: spiritName,
                                        status: '此先祖还未开始复刻',
                                        icons: icons
                                    };
                                })
                                .filter(spirit => spirit !== null)
                        };
                    });

                    return seasonalLastAppearance;
                });
        });
}