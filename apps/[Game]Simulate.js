import path from 'path';
import { SKY_PATH, MAP_LIST } from './[Game]SkyGame.js';
import { GET_FILE_DIRECTORY, GET_JSON_DATA, IS_EXIST, STORAGE_JSON_DATA, GET_DATE } from './../model/Tools.js';
export class SKY extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]游戏',
            dsc: 'Tlon-Sky',
            event: 'message',
            priority: 1,
            rule: [
                { reg: /^(#|\/)?模拟跑图$/, fnc: 'F1' },
                // { reg: /^(#|\/)?结束跑图$/, fnc: 'F2' },
                // { reg: /^(#|\/)?跑图状态$/, fnc: 'F3' }
            ]
        })
    }

    async F1(e) {
        const UID = e.user_id
        const USER_FILE = path.join(SKY_PATH['user'], `${UID}.json`)
        if (!IS_EXIST(USER_FILE)) return e.reply(['请先发送[光遇签到]'])
        const USER_DATA = await GET_JSON_DATA(USER_FILE)

        if (USER_DATA['SIMULATED_STATE']) {
            const CONSUME_TIME = GET_DATE(USER_DATA['TIMESTAMP'])
            return e.reply([
                segment.at(UID),
                `\n您当前已经在跑图了\n已跑图[${CONSUME_TIME['DD']}]天[${CONSUME_TIME['HH']}]时[${CONSUME_TIME['MM']}]分[${CONSUME_TIME['SS']}]秒`
            ])
        }

        USER_DATA['SIMULATED_STATE'] = true
        USER_DATA['TIMESTAMP'] = Date.now()

        STORAGE_JSON_DATA(USER_FILE, USER_DATA)
        return e.reply([
            segment.at(UID),
            '\n开始模拟跑图'
        ])
    }
    /** 
        async F2(e) {
            const UID = e.user_id
            const USER_FILE = path.join(SKY_PATH['user'], `${UID}.json`)
            if (!IS_EXIST(USER_FILE)) return e.reply(['请先发送[光遇签到]'])
            const USER_DATA = await GET_JSON_DATA(USER_FILE)
            const CONFIG_DATA = await GET_JSON_DATA(SKY_PATH['config'])
    
            if (!USER_DATA['SIMULATED_STATE']) {
                return e.reply([
                    segment.at(UID),
                    `\n您当前并没有在跑图喵~`
                ])
            }
            const CONSUME_TIME = GET_DATE(USER_DATA['TIMESTAMP'])
    
    
        }
    */
}