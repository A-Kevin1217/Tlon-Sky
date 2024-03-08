import { GUD, ITUE, SD } from '../utils/db.js';

export class SKY extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]娱乐:送蜡烛',
            dsc: 'Tlon-Sky',
            event: 'message',
            priority: 1,
            rule: [{
                reg: /^(#|\/)?送蜡烛(\d+)$/,
                fnc: 'candleGift'
            }]
        })
    }

    async candleGift(e) {
        const USER_ID = e.user_id;
        const OBJECTS_USER_ID = e.at;

        if (e.adapter === 'QQBot') { return e.reply(['> QQBot暂不支持赠送蜡烛']) }
        if (e.atme === true) { return e.reply('不可赠送机器人') }
        if (!OBJECTS_USER_ID) { return e.reply('请at对方') }
        if (OBJECTS_USER_ID === USER_ID) { return e.reply('不可自己赠送自己') }

        if (!ITUE(USER_ID)) { return e.reply('请先发送光遇签到') }
        if (!ITUE(OBJECTS_USER_ID)) { return e.reply('对方没有Tlon-Sky存档') }

        const USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${USER_ID}.json`;
        const OBJECTS_USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${OBJECTS_USER_ID}.json`;

        const USER_DATA = GUD(USER_ID);
        const OBJECTS_USER_DATA = GUD(OBJECTS_USER_ID);

        const MATCH = e.msg.match(/^(#|\/)?送蜡烛(\d+)$/);
        const GIVE_NUMBER = Number(MATCH[2]);

        if (!Number.isInteger(GIVE_NUMBER)) { return e.reply('请输入有效的整数赠送金额') }

        if (USER_DATA['白蜡'] >= GIVE_NUMBER) {
            USER_DATA['白蜡'] -= GIVE_NUMBER;
            USER_DATA['总赠送数量'] += GIVE_NUMBER;

            OBJECTS_USER_DATA['白蜡'] += GIVE_NUMBER;
            OBJECTS_USER_DATA['总收入数量'] += GIVE_NUMBER;

            SD(USER_FILE, USER_DATA);
            SD(OBJECTS_USER_FILE, OBJECTS_USER_DATA);
            return e.reply(`已赠送${GIVE_NUMBER}根白蜡给对方`);
        } else { return e.reply('赠送失败！白蜡不足'); }
    }
}