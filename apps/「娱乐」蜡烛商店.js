import fs from 'fs'
import { render } from '../components/index.js'
import { GD, ITUE, SD } from '../utils/db.js';

const SHOP_FILE = 'plugins/Tlon-Sky/data/商店/秋风商店.json'

export class SKY extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]娱乐:蜡烛商店',
            dsc: 'Tlon-Sky',
            event: 'message',
            priority: 1,
            rule: [{
                reg: /^(#|\/)?蜡烛商店$/,
                fnc: 'candleShop'
            }, {
                reg: /^(#|\/)购买(.*)$/,
                fnc: 'purchaseXXX'
            }]
        })
    }

    async candleShop(e) {
        if (!fs.existsSync(SHOP_FILE)) { await CREATE_SHOP() }
        const SHOP_DATA = GD(SHOP_FILE);
        const html = { 蜡烛保护卡: SHOP_DATA['蜡烛保护卡'], 签到双倍卡: SHOP_DATA['签到双倍卡'] }
        await render('admin/蜡烛商店', { ...html }, { e, scale: 1.4 })
    }

    async purchaseXXX(e) {
        const USER_ID = e.user_id;
        if (!ITUE(USER_ID)) { return e.reply('请先发送光遇签到'); }
        if (!fs.existsSync(SHOP_FILE)) { await CREATE_SHOP() }

        const MATCH = e.msg.match(/^(#|\/)购买(.*)$/);
        const BUY_A_PRODUCT = MATCH[2];

        const USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${USER_ID}.json`;
        const USER_DATA = GD(USER_FILE);
        const USER_JL = USER_DATA['季蜡']

        if (
            BUY_A_PRODUCT === '蜡烛保护卡' && USER_JL < 10 ||
            BUY_A_PRODUCT === '签到双倍卡' && USER_JL < 30
        ) return e.reply('季蜡不足，无法购买')

        const COMMODITY = ['蜡烛保护卡', '签到双倍卡'];
        if (COMMODITY.includes(BUY_A_PRODUCT)) {
            if (e.adapter === 'QQBot') return e.reply([
                '# 请直接发送购买数量',
                '> 取消购买请发送[**取消购买**]',
                `您的季蜡：${USER_JL}根，可购买：`,
                `蜡烛保护卡：**${Math.floor(USER_JL / 10)}** 张`,
                `签到双倍卡：**${Math.floor(USER_JL / 30)}** 张`
            ])
            e.reply([
                '请直接发送购买数量',
                '\n取消购买请发送[取消购买]',
                `\n您的季蜡：${USER_JL}根，可购买：`,
                `\n蜡烛保护卡：${Math.floor(USER_JL / 10)} 张`,
                `\n签到双倍卡：${Math.floor(USER_JL / 30)} 张`
            ])
            this.setContext('SELECTION_QUANTITY')
        } else { return e.reply('购买物品错误，商店无此物品'); }
    }

    SELECTION_QUANTITY(e) {
        const USER_ID = e.user_id;
        const MATCH = e.msg.match(/^(#|\/)购买(.*)$/);
        const BUY_A_PRODUCT = MATCH[2];

        const USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${USER_ID}.json`;

        const USER_DATA = GD(USER_FILE);
        const SHOP_DATA = GD(SHOP_FILE);

        if (/^(#|\/)?取消购买$/.test(this.e.msg)) { e.reply('已取消本次购买'); return this.finish('SELECTION_QUANTITY') }

        const QUANTITY = parseInt(this.e.msg)
        if (QUANTITY === NaN) { return e.reply('请发送纯数字！') }
        if (!Number.isInteger(QUANTITY)) { return e.reply('请输入整数！') }

        let REPLY, Price = '';
        if (BUY_A_PRODUCT === '蜡烛保护卡') { Price = QUANTITY * 10 }
        if (BUY_A_PRODUCT === '签到双倍卡') { Price = QUANTITY * 30 }

        if (USER_DATA['季蜡'] >= Price) {
            USER_DATA['季蜡'] -= Price;
            SHOP_DATA[BUY_A_PRODUCT] += QUANTITY;
            USER_DATA['背包'][BUY_A_PRODUCT] += QUANTITY;
            SD(USER_FILE, USER_DATA);
            SD(SHOP_FILE, SHOP_DATA);
            REPLY = [
                `购买成功！消耗季蜡：${Price}`,
                `剩余季蜡：${USER_DATA['季蜡']}根`,
                `现有${BUY_A_PRODUCT}：${USER_DATA['背包'][BUY_A_PRODUCT]}张`,
            ];
            if (e.adapter === 'QQBot') REPLY = [
                `# 购买成功！消耗季蜡：${Price}`,
                `> 剩余季蜡：${USER_DATA['季蜡']}根`,
                `现有${BUY_A_PRODUCT}：${USER_DATA['背包'][BUY_A_PRODUCT]}张`,
            ]

            e.reply(REPLY);
            return this.finish('SELECTION_QUANTITY')
        } else { return e.reply('季蜡不足！') }
    }
}

async function CREATE_SHOP() {
    const DATA = { 蜡烛保护卡: 0, 签到双倍卡: 0 }
    SD(SHOP_FILE, DATA);
    logger.mark(`已创建秋风商店信息`);
}