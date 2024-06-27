import { SKY_PATH } from './[Game]SkyGame.js';
import { GET_FILE_DIRECTORY, GET_JSON_DATA, IS_EXIST, STORAGE_JSON_DATA } from './../model/Tools.js';
import path from 'path';

export class SKY_GAME extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]游戏',
            dsc: 'Tlon-Sky',
            event: 'message',
            priority: 1,
            rule: [{ reg: /^(#|\/)?光遇签到$/, fnc: 'F' }]
        })
    }
    async F(e) {
        const UID = e.user_id
        const USER_FILE = path.join(SKY_PATH['user'], `${UID}.json`)
        const USER_NUMBER = GET_FILE_DIRECTORY(SKY_PATH['user']).length

        if (!IS_EXIST(USER_FILE)) {
            const MAP_DATA = await GET_JSON_DATA(SKY_PATH['map'])
            MAP_DATA['遇境'].push(UID)
            STORAGE_JSON_DATA(SKY_PATH['map'], MAP_DATA)
            STORAGE_JSON_DATA(USER_FILE, {
                ID: UID, // 用户ID
                GAME_ID: USER_NUMBER, // 游戏ID
                GAME_NICKNAME: `光崽${USER_NUMBER}号`, // 游戏昵称
                LAST_DATE: '2024-01-01', // 最近签到日期
                LOCATION: '遇境', // 所在地图
                ACCUMULATE: 0, // 累计签到次数
                SACRIFICE: 0, // 献祭次数
                LEVEL: 0, // 光翼
                CURRENCY_1: 0, // 白蜡
                CURRENCY_2: 0, // 季蜡
                CURRENCY_3: 0, // 心
                CURRENCY_4: 0, // 红蜡
                SIMULATED_STATE: false, // 模拟跑图状态
                TIMESTAMP: Date.now(), // 模拟跑图时间戳
                GROUP: '' // 团队编号
            })
        }


        const USER_DATA = await GET_JSON_DATA(USER_FILE)

        const DATE = new Date();
        const YEAR = DATE.getFullYear();
        const MONTH = String(DATE.getMonth() + 1).padStart(2, '0');
        const DAY = String(DATE.getDate()).padStart(2, '0');
        const CURRENT_DATE = `${YEAR}-${MONTH}-${DAY}`;

        if (USER_DATA['LAST_DATE'] === CURRENT_DATE)
            return e.reply([
                segment.at(UID),
                '\n今日已签，请明日再来'
            ])


        const CONFIG_DATA = await GET_JSON_DATA(SKY_PATH['config'])
        USER_DATA['CURRENCY_1'] += CONFIG_DATA['a']
        USER_DATA['CURRENCY_2'] += CONFIG_DATA['b']
        USER_DATA['LAST_DATE'] = CURRENT_DATE
        USER_DATA['ACCUMULATE'] += 1

        STORAGE_JSON_DATA(USER_FILE, USER_DATA)

        return e.reply([
            segment.at(UID),
            '\n签到成功！' +
            `\n光遇ID: ${USER_DATA['GAME_ID']}` +
            `\n已累计签到 [${USER_DATA['ACCUMULATE']}] 天` +
            `\n获得白蜡: ${CONFIG_DATA['a']} | 季蜡：${CONFIG_DATA['b']}`
        ])
    }
}