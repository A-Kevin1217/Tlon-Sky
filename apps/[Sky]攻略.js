import { render } from '../components/index.js'

export class SKY extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]光遇:攻略',
            dsc: '光遇攻略查询',
            event: 'message',
            priority: 1,
            rule: [
                { reg: /^(#|\/)?(光遇|国服)?(每日|今日)?任务$/, fnc: 'F1' },
                { reg: /^(#|\/)?(每日|今日)(魔法|季蜡|大蜡(烛)?)/, fnc: 'F1' },
                { reg: /^(#|\/)?(魔法|季蜡|大蜡(烛)?)位置/, fnc: 'F1' },
                { reg: /^(#|\/)?(每日|今日)?代币(位置)?$/, fnc: 'F2' },
                { reg: /^(#|\/)?季节任务$/, fnc: 'F3' },
                { reg: /^(#|\/)?任务图$/, fnc: 'F4' },
                { reg: /^(#|\/)?(碎石查询|今日(红|黑|碎)石|本月(碎|红|黑)石)$/, fnc: 'F6' },
                { reg: /^(#|\/)?(查询)?(\d{4})年(\d{1,2})月碎石$/, fnc: 'F7' }
            ],
        });
    }

    async F1(e) {
        await render('admin/每日任务', { text: '看不清发[ 任务图 ]，复刻发[ 复刻兑换图 ]' }, { e, scale: 1.4 });
    }

    async F2(e) {
        return e.reply([segment.image(`${SKY_IMAGE_URL['A']}当前/当前代币.jpg`)]);
    }

    async F3(e) {
        return e.reply([segment.image(`${SKY_IMAGE_URL['A']}当前/当前季节任务.jpg`)]);
    }

    async F4(e) {
        const images = [
            `${SKY_IMAGE_URL['B']}tlonsky/json/mrrw.jpg`,
            `${SKY_IMAGE_URL['B']}tlonsky/json/scjl.jpg`,
            `${SKY_IMAGE_URL['B']}tlonsky/json/scdl.jpg`,
            `${SKY_IMAGE_URL['B']}json/mf.jpg`
        ];
        return e.reply([segment.at(e.user_id), ...images.map(img => segment.image(img))]);
    }

    async F6(e) {
        await e.reply('稍等，正在截图', false, { recallMsg: 20 });
        await render('admin/光遇碎石日历', {}, { e, scale: 1.4 });
    }

    async F7(e) {
        const match = e.msg.match(/(\d{4})年(\d{1,2})月/);
        if (match) {
            const year = parseInt(match[1], 10);
            const month = parseInt(match[2], 10) - 1; // JavaScript月份从0开始
            await render('admin/光遇碎石日历', { year, month }, { e, scale: 1.4 });
        } else {
            e.reply('请输入正确的年份和月份格式，例如：2023年5月');
        }
    }
}