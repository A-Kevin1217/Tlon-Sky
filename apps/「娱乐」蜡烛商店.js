import fs from 'fs'
import { render } from '../components/index.js'
import { GD, ITUE, SD } from '../utils/db.js';

const SHOP_FILE = 'plugins/Tlon-Sky/data/商店/秋风商店.json'

export class 娱乐_蜡烛商店 extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]娱乐:蜡烛商店',
            dsc: '娱乐蜡烛商店',
            event: 'message',
            priority: 1,
            rule: [
                {
                    reg: /^(#|\/)?蜡烛商店$/,
                    fnc: 'SHOP'
                },
                {
                    reg: /^(#|\/)购买(.*)$/,
                    fnc: 'PURCHASE'
                }
            ]
        })
    }

    async SHOP(e) {
        if (!fs.existsSync(SHOP_FILE)) { await CREATE_SHOP(); }
        const SHOP_DATA = GD(SHOP_FILE);
        const html = { 蜡烛保护卡: SHOP_DATA['蜡烛保护卡'], 签到双倍卡: SHOP_DATA['签到双倍卡'] }
        await render('admin/蜡烛商店', { ...html }, { e, scale: 1.4 })
    }

    async PURCHASE(e) {
        const USER_ID = e.user_id;
        if (!ITUE(USER_ID)) { return e.reply('请先发送光遇签到'); }
        if (!fs.existsSync(SHOP_FILE)) { await CREATE_SHOP(); }

        const MATCH = e.msg.match(/^(#|\/)购买(.*)$/);
        const BUY_A_PRODUCT = MATCH[2];

        const USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${USER_ID}.json`;
        const USER_DATA = GD(USER_FILE);

        const COMMODITY = ['蜡烛保护卡', '签到双倍卡'];
        if (COMMODITY.includes(BUY_A_PRODUCT)) {
            e.reply(`请发送购买数量\n您当前季蜡：${USER_DATA['季蜡']} 根,可购买：\n蜡烛保护卡：${Math.floor(USER_DATA['季蜡'] / 10)} 张\n签到双倍卡：${Math.floor(USER_DATA['季蜡'] / 30)} 张`)
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

        const QUANTITY = parseInt(this.e.msg)
        if (QUANTITY === NaN) { return e.reply('请发送纯数字！') }
        if (!Number.isInteger(QUANTITY)) { return e.reply('请输入整数！') }

        let REPLY
        if (BUY_A_PRODUCT === '蜡烛保护卡') {
            const Price = QUANTITY * 10
            if (USER_DATA['季蜡'] >= Price) {
                USER_DATA['季蜡'] -= Price;
                SHOP_DATA['蜡烛保护卡'] += QUANTITY;
                USER_DATA['背包']['蜡烛保护卡'] += QUANTITY;
                SD(USER_FILE, USER_DATA);
                SD(SHOP_FILE, SHOP_DATA);
                REPLY = [
                    '购买成功！消耗季蜡：' + Price + '\n' +
                    '剩余季蜡：' + USER_DATA['季蜡'] + '根\n' +
                    '蜡烛保护卡：' + USER_DATA['背包']['蜡烛保护卡'] + '张'
                ];
                e.reply(REPLY);
                return this.finish('SELECTION_QUANTITY')
            } else { return e.reply('季蜡不足！'); }
        } else if (BUY_A_PRODUCT === '签到双倍卡') {
            const Price = QUANTITY * 30
            if (USER_DATA['季蜡'] >= Price) {
                USER_DATA['季蜡'] -= Price;
                SHOP_DATA['签到双倍卡'] += QUANTITY;
                USER_DATA['背包']['签到双倍卡'] += QUANTITY;
                SD(USER_FILE, USER_DATA);
                SD(SHOP_FILE, SHOP_DATA);
                REPLY = [
                    '购买成功！消耗季蜡：' + Price + '\n' +
                    '剩余季蜡：' + USER_DATA['季蜡'] + '根\n' +
                    '签到双倍卡：' + USER_DATA['背包']['签到双倍卡'] + '张'
                ];
                e.reply(REPLY);
                return this.finish('SELECTION_QUANTITY')
            } else { return e.reply('季蜡不足！'); }
        }
    }
}

async function CREATE_SHOP() {
    const DATA = { 蜡烛保护卡: 0, 签到双倍卡: 0 }
    SD(SHOP_FILE, DATA);
    logger.mark(`已创建秋风商店信息`);
}