import fs from 'fs'
import { render } from '../components/index.js'
import { GD, ITUE, SD } from '../utils/db.js';

const SHOP_FILE = 'plugins/Tlon-Sky/data/商店/秋风商店.json'
if (!fs.existsSync(SHOP_FILE)) { SD(SHOP_FILE, { 蜡烛保护卡: 0, 签到双倍卡: 0 }); logger.mark(`已创建秋风商店信息`) }

const purchaseXXX_REGEX = /^(#|\/)购买(蜡烛保护卡|签到双倍卡)$/
const portion_REGEX = /^(#|\/)([1-9]\d*)份$/
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
        const SHOP_DATA = GD(SHOP_FILE);
        await render('admin/蜡烛商店', { 蜡烛保护卡: SHOP_DATA['蜡烛保护卡'], 签到双倍卡: SHOP_DATA['签到双倍卡'] }, { e, scale: 1.4 })
        return Bot.Button([[
            { label: '购买保护卡', callback: '/购买蜡烛保护卡' },
            { label: '购买双倍卡', callback: '/购买签到双倍卡' }
        ]])
    }

    async purchaseXXX(e) {
        const USER_ID = e.user_id;
        if (!ITUE(USER_ID)) { return e.reply((e.adapter === 'QQBot') ? ['> 请先发送光遇签到', Bot.Button([[{ label: '光遇签到', callback: '/光遇签到' }]])] : '请先发送光遇签到') }

        const BUY_A_PRODUCT = e.msg.match(purchaseXXX_REGEX)[2];

        const USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${USER_ID}.json`;
        const USER_DATA = GD(USER_FILE);
        const USER_JL = USER_DATA['季蜡']

        if (
            BUY_A_PRODUCT === '蜡烛保护卡' && USER_JL < 10 ||
            BUY_A_PRODUCT === '签到双倍卡' && USER_JL < 30
        ) return e.reply((e.adapter === 'QQBot') ? ['> **季蜡不足，无法购买**'] : '季蜡不足，无法购买')

        if (BUY_A_PRODUCT === '蜡烛保护卡') {
            e.reply((e.adapter === 'QQBot') ? ['# 请发送购买数量', `> 您的季蜡：${USER_JL}根，可购买：`, `蜡烛保护卡：**${Math.floor(USER_JL / 10)}** 张`] : [segment.at(USER_ID), '\n请发送购买数量', '\n如[#1份]', `\n您的季蜡：${USER_JL}根，可购买：`, `\n蜡烛保护卡：${Math.floor(USER_JL / 10)} 张`])
            USER_DATA['购买物品'] = '蜡烛保护卡'
        } else if (BUY_A_PRODUCT === '签到双倍卡') {
            e.reply((e.adapter === 'QQBot') ? ['# 请发送购买数量', `> 您的季蜡：${USER_JL}根，可购买：`, `签到双倍卡：**${Math.floor(USER_JL / 30)}** 张`] : [segment.at(USER_ID), '\n请发送购买数量', '\n如[#1份]', `\n您的季蜡：${USER_JL}根，可购买：`, `\n签到双倍卡：${Math.floor(USER_JL / 30)} 张`])
            USER_DATA['购买物品'] = '签到双倍卡'
        }
        SD(USER_FILE, USER_DATA)
        return Bot.Button([[
            { label: '买一张', callback: '/1份' },
            { label: '买三张', callback: '/3份' },
            { label: '买五张', callback: '/5份' },
            { label: '自选', data: '/?份' },
        ]])
    }

    async portion(e) {
        const USER_ID = e.user_id;
        if (!ITUE(USER_ID)) { return e.reply((e.adapter === 'QQBot') ? ['> 请先发送光遇签到', Bot.Button([[{ label: '光遇签到', callback: '/光遇签到' }]])] : '请先发送光遇签到') }

        const portion = parseInt(e.msg.match(portion_REGEX)[2])

        const USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${USER_ID}.json`;
        const USER_DATA = GD(USER_FILE);
        const SHOP_DATA = GD(SHOP_FILE);

        const USER_PG = USER_DATA['购买物品']

        if (!USER_PG) return e.reply((e.adapter === 'QQBot') ? ['> 你尚未选择购买商品', Bot.Button([[{ label: '购买保护卡', callback: '/购买蜡烛保护卡' }, { label: '购买双倍卡', callback: '/购买签到双倍卡' }]])] : '你尚未选择购买商品')


        if (portion === NaN) return e.reply((e.adapter === 'QQBot') ? ['> 请发送纯数字！'] : '请发送纯数字！')
        if (!Number.isInteger(portion)) return e.reply((e.adapter === 'QQBot') ? ['> 请输入整数！'] : '请输入整数！')

        let REPLY, Price = '';
        if (USER_PG === '蜡烛保护卡') { Price = portion * 10 }
        if (USER_PG === '签到双倍卡') { Price = portion * 30 }

        if (USER_DATA['季蜡'] >= Price) {
            USER_DATA['季蜡'] -= Price;
            SHOP_DATA[USER_PG] += portion;
            USER_DATA['背包'][USER_PG] += portion;
            USER_DATA['购买物品'] = false
            SD(USER_FILE, USER_DATA);
            SD(SHOP_FILE, SHOP_DATA);

            return e.reply((e.adapter === 'QQBot') ? [`# 购买成功！消耗季蜡：${Price}`, `> 剩余季蜡：${USER_DATA['季蜡']}根`, `现有${USER_PG}：${USER_DATA['背包'][USER_PG]}张`] : [segment.at(USER_ID), `购买成功！消耗季蜡：${Price}`, `\n剩余季蜡：${USER_DATA['季蜡']}根`, `\n现有${USER_PG}：${USER_DATA['背包'][USER_PG]}张`,]);
        }
    }
}