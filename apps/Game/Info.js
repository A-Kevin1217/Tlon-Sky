import { SKY_PATH } from '../Game/SkyGame.js';
import { GET_JSON_DATA, IS_EXIST } from './../../model/Tools.js';
import { render } from './../../components/index.js'

export class SKY_GAME extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]游戏',
            dsc: 'Tlon-Sky',
            event: 'message',
            priority: 1,
            rule: [{ reg: /^(#|\/)?光遇信息$/, fnc: 'F' }]
        })
    }
    async F(e) {
        const UID = e.user_id
        const USER_FILE = `${SKY_PATH['user']}${UID}.json`
        if (!IS_EXIST(USER_FILE)) return e.reply(['请先发送[光遇签到]'])

        const USER_DATA = await GET_JSON_DATA(USER_FILE)

        return await render('admin/info', {
            A: USER_DATA['GAME_ID'],
            B: USER_DATA['GAME_NICKNAME'],
            C: USER_DATA['LOCATION'],
            D: '0天00:00:00',
            E: USER_DATA['CURRENCY_1'],
            F: USER_DATA['CURRENCY_2'],
            G: USER_DATA['ACCUMULATE'],
            H: USER_DATA['LAST_DATE']
        }, { e, scale: 1.4 })
    }
}