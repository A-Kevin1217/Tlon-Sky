import lodash from 'lodash';
import path from 'path';
import { SKY_PATH } from '../SkyGame.js';
import { render } from './../components/index.js';
import { GET_FILE_DIRECTORY, GET_JSON_DATA, IS_EXIST, STORAGE_JSON_DATA } from './../model/Tools.js';
export class SKY_GAME extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]游戏',
            dsc: 'Tlon-Sky',
            event: 'message',
            priority: 1,
            rule: [{ reg: /^(#|\/)?抢蜡烛$/, fnc: 'F' }]
        })
    }
    async F(e) {
        const UID = e.user_id
        const USER_FILE = path.join(SKY_PATH['user'], `${UID}.json`)
        if (!IS_EXIST(USER_FILE)) return e.reply(['请先发送[光遇签到]'])

        const USER_DATA = await GET_JSON_DATA(USER_FILE)
        const CONFIG_DATA = await GET_JSON_DATA(SKY_PATH['config'])
        const ROBBERY_CD = CONFIG_DATA['E'] ? CONFIG_DATA['E'] : 5 * 60 * 1000
        const REMAINING_TIMESTAMP = Date.now() - USER_DATA['ROBBERY_TIMESTAMP']
        if (REMAINING_TIMESTAMP < ROBBERY_CD) {
            return e.reply([
                'CD中...' +
                '\n剩余CD时间' +
                `> ${Math.floor((ROBBERY_CD - REMAINING_TIMESTAMP) / 60000)}分${Math.floor((ROBBERY_CD - REMAINING_TIMESTAMP) / 1000) % 60}秒`
            ])
        }

        let USER_LIST = GET_FILE_DIRECTORY(SKY_PATH['user']);
        USER_LIST = USER_LIST.filter(item => item !== `${UID}.json`);

        for (const FILE of USER_LIST) {
            const FILE_PATH = path.join(SKY_PATH['user'], FILE);
            const JSON_DATA = await GET_JSON_DATA(FILE_PATH);

            if (JSON_DATA['CURRENCY_1'] < 15) {
                USER_LIST = USER_LIST.filter(item => item !== FILE);
            }
        }

        const RANDOM_USER_FILE = path.join(SKY_PATH['user'], USER_LIST[Math.floor(Math.random() * USER_LIST.length)])
        const RANDOM_USER_DATA = await GET_JSON_DATA(RANDOM_USER_FILE)

        const RANDOM_INT = lodash.random(1, 15);
        if (RANDOM_USER_DATA['CURRENCY_1'] < RANDOM_INT) return logger.error('异常')

        USER_DATA['CURRENCY_1'] += RANDOM_INT
        USER_DATA['ROBBERY_TIMESTAMP'] = Date.now()
        RANDOM_USER_DATA['CURRENCY_1'] -= RANDOM_INT

        STORAGE_JSON_DATA([USER_FILE, RANDOM_USER_FILE], [USER_DATA, RANDOM_USER_DATA])

        let AVATAR_1 = `https://q1.qlogo.cn/g?b=qq&nk=${UID}&s=160`
        let AVATAR_2 = `https://q1.qlogo.cn/g?b=qq&nk=${RANDOM_USER_DATA['ID']}&s=160`
        // if (typeof UID === 'string') {
        //     AVATAR_1 = `https://q.qlogo.cn/qqapp/102076896/${UID.replace(/102076896-/g, '')}/640`
        // }

        // if (typeof RANDOM_USER_DATA['ID'] === 'string') {
        //     AVATAR_2 = `https://q.qlogo.cn/qqapp/102076896/${RANDOM_USER_DATA['ID'].replace(/102076896-/g, '')}/640`
        // }

        return await render('admin/Robbery', {
            AVATAR_1, AVATAR_2,
            A_1: USER_DATA['GAME_ID'], A_2: RANDOM_USER_DATA['GAME_ID'],
            B_1: USER_DATA['GAME_NICKNAME'], B_2: RANDOM_USER_DATA['GAME_NICKNAME'],
            C_1: USER_DATA['LOCATION'], C_2: RANDOM_USER_DATA['LOCATION'],
            D_1: '0天00:00:00', D_2: '0天00:00:00',
            E_1: USER_DATA['CURRENCY_1'], E_2: RANDOM_USER_DATA['CURRENCY_1'],
            F_1: USER_DATA['CURRENCY_2'], F_2: RANDOM_USER_DATA['CURRENCY_2'],
            G_1: USER_DATA['ACCUMULATE'], G_2: RANDOM_USER_DATA['ACCUMULATE'],
            H_1: USER_DATA['LAST_DATE'], H_2: RANDOM_USER_DATA['LAST_DATE'],
            I: RANDOM_INT
        }, { e, scale: 1.4 })
    }
}