import fs from 'fs'
import { render } from '../components/index.js'
import { GD, ITUE, SD } from '../utils/db.js';

const SHOP_FILE = 'plugins/Tlon-Sky/data/商店/秋风商店.json'

const purchaseXXX_REGEX = /^(#|\/)购买(蜡烛保护卡|签到双倍卡)$/
const portion_REGEX = /^(#|\/)(.*)份$/
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
                reg: purchaseXXX_REGEX,
                fnc: 'purchaseXXX'
            }, {
                reg: portion_REGEX,
                fnc: 'portion'
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

        const BUY_A_PRODUCT = e.msg.match(purchaseXXX_REGEX)[2];

        const USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${USER_ID}.json`;
        const USER_DATA = GD(USER_FILE);
        const USER_JL = USER_DATA['季蜡']

        if (
            BUY_A_PRODUCT === '蜡烛保护卡' && USER_JL < 10 ||
            BUY_A_PRODUCT === '签到双倍卡' && USER_JL < 30
        ) return e.reply('季蜡不足，无法购买')

        if (BUY_A_PRODUCT === '蜡烛保护卡') {
            if (e.adapter === 'QQBot') {
                e.reply([
                    '# 请发送购买数量',
                    `> 您的季蜡：${USER_JL}根，可购买：`,
                    `蜡烛保护卡：**${Math.floor(USER_JL / 10)}** 张`
                ])
            } else {
                e.reply([
                    '请发送购买数量',
                    '\n如[#1份]',
                    '\n取消购买请发送[取消购买]',
                    `\n您的季蜡：${USER_JL}根，可购买：`,
                    `\n蜡烛保护卡：${Math.floor(USER_JL / 10)} 张`
                ])
            }
            USER_DATA['购买物品'] = '蜡烛保护卡'
        } else if (BUY_A_PRODUCT === '签到双倍卡') {
            if (e.adapter === 'QQBot') {
                e.reply([
                    '# 请发送购买数量',
                    `> 您的季蜡：${USER_JL}根，可购买：`,
                    `签到双倍卡：**${Math.floor(USER_JL / 30)}** 张`
                ])
            } else {
                e.reply([
                    '请发送购买数量',
                    '\n如[#1份]',
                    '\n取消购买请发送[取消购买]',
                    `\n您的季蜡：${USER_JL}根，可购买：`,
                    `\n签到双倍卡：${Math.floor(USER_JL / 30)} 张`
                ])
            }
            USER_DATA['购买物品'] = '签到双倍卡'
        }
        SD(USER_FILE, USER_DATA)
    }

    async portion(e) {
        const USER_ID = e.user_id;
        if (!ITUE(USER_ID)) { return e.reply('请先发送光遇签到'); }

        const portion = parseInt(e.msg.match(portion_REGEX)[2])

        const USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${USER_ID}.json`;
        const USER_DATA = GD(USER_FILE);
        const SHOP_DATA = GD(SHOP_FILE);

        const USER_PG = USER_DATA['购买物品']

        if (!USER_PG) {
            if (e.adapter === 'QQBot') return e.reply(['> 你尚未选择购买商品'])
            return e.reply('你尚未选择购买商品')
        }

        if (portion === NaN) return e.reply('请发送纯数字！')
        if (!Number.isInteger(portion)) return e.reply('请输入整数！')

        let REPLY, Price = '';
        if (USER_PG === '蜡烛保护卡') { Price = portion * 10 }
        if (USER_PG === '签到双倍卡') { Price = portion * 30 }

        if (USER_DATA['季蜡'] >= Price) {
            USER_DATA['季蜡'] -= Price;
            SHOP_DATA[USER_PG] += portion;
            USER_DATA['背包'][BUY_A_PRODUCT] += portion;
            USER_DATA['购买物品'] = false
            SD(USER_FILE, USER_DATA);
            SD(SHOP_FILE, SHOP_DATA);
            REPLY = [
                `购买成功！消耗季蜡：${Price}`,
                `剩余季蜡：${USER_DATA['季蜡']}根`,
                `现有${USER_PG}：${USER_DATA['背包'][USER_PG]}张`,
            ];
            if (e.adapter === 'QQBot') REPLY = [
                `# 购买成功！消耗季蜡：${Price}`,
                `> 剩余季蜡：${USER_DATA['季蜡']}根`,
                `现有${USER_PG}：${USER_DATA['背包'][USER_PG]}张`,
            ]

            return e.reply(REPLY);
        }
    }
}

async function CREATE_SHOP() {
    const DATA = { 蜡烛保护卡: 0, 签到双倍卡: 0 }
    SD(SHOP_FILE, DATA);
    logger.mark(`已创建秋风商店信息`);
}