import { render } from './../components/index.js';
import { getPlatformInfo } from './../function/function.js'

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

            const { Button, isQQBot } = getPlatformInfo(e)

            if (isQQBot && Button) {
                message.push(Button([{ text: '再次查询', callback: '光遇服务器状态' }]));
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
        const data = await getLinkData('https://s.166.net/config/ds_yy_02/ma75_wing_wings.json', 'json');

        // 使用映射表简化分类统计
        const categoryMap = {
            '晨岛': '晨', '云野': '云', '雨林': '雨',
            '霞谷': '霞', '暮土': '暮', '禁阁': '禁',
            '暴风眼': '暴', '复刻永久': '复刻永久',
            '普通永久': '普通永久'
        };

        // 动态初始化计数对象
        const counts = Object.values(categoryMap).reduce((acc, cur) => {
            acc[cur] = 0;
            return acc;
        }, {});

        data.forEach(item => {
            const key = categoryMap[item['一级标签']];
            if (key) counts[key]++;
        });

        // 解构常用数据
        const [reissue, normal] = [counts['复刻永久'], counts['普通永久']];

        // 生成消息内容
        const messages = [
            `永久翼: ${reissue + normal}个`,
            `复刻先祖永久翼: ${reissue}`,
            `常驻先祖永久翼: ${normal}`,
            ...Object.entries(categoryMap)
                .filter(([k]) => k !== '复刻永久' && k !== '普通永久')
                .map(([k, v]) => `${k}光翼：${counts[v]}`)
        ];

        return e.reply([
            `总光翼数量: ${data.length}`,
            '---------------',
            ...messages,
            '---------------',
            '数据来源: 网易大神'
        ]);
    }

    async showSeasonalRemaining(e) {
        const { season, activity } = await getLinkData('https://gitee.com/Tloml-Starry/resources/raw/master/resources/json/SkyChildrenoftheLight/GameProgress.json', 'json');
        const now = new Date();

        // 合并日期处理逻辑
        const parseDate = str => new Date(str.replace(/-/g, '/'));
        const endDate = parseDate(season.endDate);

        return render('admin/GameProgressQuery', {
            season,
            remainingTime: {
                days: (() => {
                    const diff = endDate - now;
                    if (diff <= 0) return '已结束';
                    return [
                        Math.floor(diff / 864e5) + '天',
                        Math.floor(diff / 36e5 % 24) + '时',
                        Math.floor(diff / 6e4 % 60) + '分',
                        Math.floor(diff / 1e3 % 60) + '秒'
                    ].filter(t => !t.startsWith('0')).join('');
                })(),
                endDate: season.endDate.split(' ')[0]
            },
            remainingCandles: (() => {
                const days = Math.ceil((endDate - now) / 864e5);
                return {
                    withPass: Math.max(days, 0) * 6,
                    withoutPass: Math.max(days, 0) * 5
                };
            })(),
            totalDays: {
                withPass: Math.ceil(season.requiredCandlesTrue / 6),
                withoutPass: Math.ceil(season.requiredCandlesFalse / 5)
            },
            activity: activity?.findLast(a => parseDate(a.endDate) > now),
            seasonStart: endDate > now
        }, { e, scale: 1.4 });
    }

    async checkSeasonReappearance(e) {
        const seasonName = e.msg.replace(/#|\/|季多久未复刻/g, '').trim();
        const currentDate = new Date();

        // 合并数据获取与处理逻辑
        const [seasonalData, regressionData] = await Promise.all([
            fetch('https://gitee.com/Tloml-Starry/resources/raw/master/resources/json/SkyChildrenoftheLight/SeasonalSpirits.json').then(r => r.json()),
            fetch('https://gitee.com/Tloml-Starry/resources/raw/master/resources/json/SkyChildrenoftheLight/RegressionRecords.json').then(r => r.json())
        ]);

        // 构建最后出现日期映射
        const lastAppearance = regressionData.flatMap(year =>
            year.yearRecord.flatMap(month =>
                month.monthRecord.map(record => ({
                    name: record.name,
                    date: new Date(year.year, month.month - 1, record.day)
                }))
            )
        ).reduce((acc, { name, date }) => {
            if (!acc[name] || acc[name] < date) acc[name] = date;
            return acc;
        }, {});

        // 查找目标季节数据
        const seasonInfo = seasonalData
            .map(season => ({
                ...season,
                spirits: season.spirits
                    .map(spirit => {
                        const spiritName = spirit.name || spirit;
                        const lastDate = lastAppearance[spiritName];
                        if (!lastDate) return null;

                        const adjustedDate = new Date(lastDate);
                        adjustedDate.setDate(adjustedDate.getDate() + 5);
                        const diffDays = Math.ceil((currentDate - adjustedDate) / 864e5);

                        return {
                            name: spiritName,
                            status: diffDays > 0 ? `已 ${diffDays} 天未复刻` : '当前正在复刻',
                            icons: spirit.icon || []
                        };
                    })
                    .filter(Boolean)
            }))
            .find(season => season.name === seasonName);

        if (!seasonInfo) return e.reply('不存在该季节');

        return render('admin/ancestor-last-reappearance-duration', {
            seasonName,
            seasonIcon: seasonInfo.icon,
            data: JSON.stringify(seasonInfo)
        }, { e, scale: 1.5 });
    }
}