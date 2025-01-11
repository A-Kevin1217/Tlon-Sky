import { render } from '../components/index.js'

export class SKY extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]光遇:攻略',
            dsc: '光遇攻略查询',
            event: 'message',
            priority: 1,
            rule: [
                { reg: /^(#|\/)?(光遇|国服)?(每日|今日)?任务$/, fnc: 'handleDailyTask' },
                { reg: /^(#|\/)?(每日|今日)(魔法|季蜡|大蜡(烛)?)/, fnc: 'handleDailyTask' },
                { reg: /^(#|\/)?(魔法|季蜡|大蜡(烛)?)位置$/, fnc: 'handleDailyTask' },
                { reg: /^(#|\/)?(每日|今日)?代币(位置)?$/, fnc: 'handleCurrency' },
                { reg: /^(#|\/)?季节任务$/, fnc: 'handleSeasonalTask' },
                { reg: /^(#|\/)?任务图$/, fnc: 'handleTaskImage' },
                { reg: /^(#|\/)?本月[红黑碎]石$/, fnc: 'handleMonthlyShards' },
                { reg: /^(#|\/)?(查询)?(\d{4})年(\d{1,2})月碎石$/, fnc: 'handleYearlyShards' },
                { reg: /^[#\/]?今日[红黑碎]石$/, fnc: 'handleTodayShards' }
            ],
        });
    }

    async handleDailyTask(e) {
        await render('admin/每日任务', { text: '看不清发[ 任务图 ]，复刻发[ 复刻兑换图 ]' }, { e, scale: 1.4 });
    }

    async handleCurrency(e) {
        return e.reply([segment.image(`${SKY_IMAGE_URL['A']}当前/当前代币.jpg`)]);
    }

    async handleSeasonalTask(e) {
        return e.reply([segment.image(`${SKY_IMAGE_URL['A']}当前/当前季节任务.jpg`)]);
    }

    async handleTaskImage(e) {
        const images = [
            `${SKY_IMAGE_URL['B']}tlonsky/json/mrrw.jpg`,
            `${SKY_IMAGE_URL['B']}tlonsky/json/scjl.jpg`,
            `${SKY_IMAGE_URL['B']}tlonsky/json/scdl.jpg`,
            `${SKY_IMAGE_URL['B']}json/mf.jpg`
        ];
        return e.reply([segment.at(e.user_id), ...images.map(img => segment.image(img))]);
    }

    async handleMonthlyShards(e) {
        await e.reply('稍等，正在截图', false, { recallMsg: 20 });
        await render('admin/光遇碎石日历', {}, { e, scale: 1.4 });
    }

    async handleYearlyShards(e) {
        const match = e.msg.match(/(\d{4})年(\d{1,2})月/);
        if (match) {
            const year = parseInt(match[1], 10);
            const month = parseInt(match[2], 10) - 1;
            await render('admin/光遇碎石日历', { year, month }, { e, scale: 1.4 });
        } else {
            e.reply('请输入正确的年份和月份格式，例如：2023年5月');
        }
    }

    async handleTodayShards(e) {
        const date = new Date();
        const time = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
        const dayOfWeek = date.getDay();
        const maps = ['暮土', '禁阁', '云野', '雨林', '霞谷'];
        const mapsLocation = {
            '云野': { 2: '蝴蝶平原', 3: '仙乡', 5: '右边隐藏图', 6: '左边隐藏图', 0: '圣岛' },
            '雨林': { 2: '雨林蘑菇图', 3: '雨林水母图', 5: '大树屋', 6: '雨林神殿', 0: '秘密花园' },
            '霞谷': { 2: '滑冰场', 3: '滑冰场', 5: '圆梦村', 6: '圆梦村', 0: '雪隐峰' },
            '暮土': { 2: '暮土图一', 3: '暮土终点图', 5: '暮土沉船', 6: '巨兽荒原', 0: '失落方舟' },
            '禁阁': { 2: '星光沙漠', 3: '星光沙漠', 5: '星光沙漠·一隅', 6: '星光沙漠·一隅', 0: '星光沙漠·一隅' }
        };

        const isSpecialDate = (date) => {
            return date.getDate() <= 15 ? [2, 6, 0].includes(dayOfWeek) : [3, 5, 0].includes(dayOfWeek);
        };

        const getStoneType = (date) => {
            if (date.getDate() <= 15) {
                return dayOfWeek === 2 ? '黑石' : [6, 0].includes(dayOfWeek) ? '红石' : '';
            } else {
                return dayOfWeek === 3 ? '黑石' : [5, 0].includes(dayOfWeek) ? '红石' : '';
            }
        };

        const getFallTimes = (date) => {
            if (dayOfWeek === 0) return ['07:08', '13:08', '19:08'];

            return date.getDate() <= 15
                ? getStoneType(date) === '红石' ? ['10:08', '14:08', '22:08'] : ['09:08', '14:08', '19:08']
                : getStoneType(date) === '红石' ? ['11:08', '17:08', '23:08'] : ['09:08', '15:08', '21:08'];
        };

        if (isSpecialDate(date)) {
            const mapIndex = (date.getDate() - 1) % maps.length;
            const map = maps[mapIndex];
            const location = mapsLocation[map][dayOfWeek];
            const stoneType = getStoneType(date);
            const fallTimes = getFallTimes(date).join(', ');

            const message = `日期: ${time}\n碎石类型: ${stoneType}\n降落地图: ${map}\n降落位置: ${location}\n降落时间: ${fallTimes}`;
            e.reply(message);
        } else {
            e.reply('今日无碎石');
        }
    }
}