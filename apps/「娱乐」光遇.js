import fs from 'fs'
import path from 'path'
import _ from 'lodash'

/** 用户文件位置 */
const ALL_USER_FILE_PATH = 'plugins/Tlon-Sky/data/USER/'
/** 配置文件位置 */
const CONFIG_FILE_PATH = 'plugins/Tlon-Sky/config/config.json'
/** 地图文件位置 */
const MAP_FILE_PATH = 'plugins/Tlon-Sky/data/map.json'
/** 地图列表 */
const MAP_LIST = [
    '遇境', '云巢',
    '晨岛', '预言山谷', '夜行石',
    '云野', '圣岛', '云峰',
    '雨林', '大树屋', '风行网道',
    '霞谷', '圆梦村', '雪隐峰', '圆梦村剧场', '音乐商店',
    '暮土', '遗忘方舟', '藏宝岛礁',
    '禁阁', '办公室', '星光沙漠', '庇护所', '月牙绿洲',
    '伊甸'
]

if (!fs.existsSync(MAP_FILE_PATH)) saveData(MAP_FILE_PATH, {
    遇境: [], 云巢: [],
    晨岛: [], 预言山谷: [], 夜行石: [],
    云野: [], 圣岛: [], 云峰: [],
    雨林: [], 大树屋: [], 风行网道: [],
    霞谷: [], 圆梦村: [], 雪隐峰: [], 圆梦村剧场: [], 音乐商店: [],
    暮土: [], 遗忘方舟: [], 藏宝岛礁: [],
    禁阁: [], 办公室: [], 星光沙漠: [], 庇护所: [], 月牙绿洲: [],
    伊甸: []
})
if (!fs.existsSync(CONFIG_FILE_PATH)) saveData(CONFIG_FILE_PATH, { a: 20, b: 5, c: 60, d: 1 })

const REGEX_1 = /^(#|\/)传送(.*)$/
const REGEX_2 = /^(#|\/)?设置(昵称)(:|：)(.*)$/
export class SKY extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]娱乐',
            dsc: 'Tlon-Sky',
            event: 'message',
            priority: 1,
            rule: [{
                reg: /^(#|\/)?光遇签到$/,
                fnc: 'Feature_1'
            }, {
                reg: /^(#|\/)?光遇信息$/,
                fnc: 'Feature_2'
            }, {
                reg: /^(#|\/)?模拟跑图$/,
                fnc: 'Feature_3'
            }, {
                reg: /^(#|\/)?结束跑图$/,
                fnc: 'Feature_4'
            }, {
                reg: /^(#|\/)?跑图状态$/,
                fnc: 'Feature_5'
            }, {
                reg: /^(#|\/)?光遇地图$/,
                fnc: 'Feature_6'
            }, {
                reg: REGEX_1,
                fnc: 'Feature_7'
            }, {
                reg: REGEX_2,
                fnc: 'Feature_8'
            }]
        })
    }

    /** 光遇签到 */
    async Feature_1(e) {
        const USER_ID = e.user_id
        const USER_FILE = ALL_USER_FILE_PATH + USER_ID + '.json'
        const CONFIGURATION = getConfigInfo()
        const USER_NUMBER = fs.readdirSync(ALL_USER_FILE_PATH).length

        if (!isExistenceUser(USER_ID)) {
            const MAP_DATA = JSON.parse(fs.readFileSync(MAP_FILE_PATH, 'utf8'))
            MAP_DATA['遇境'].push(USER_ID)
            saveData(MAP_FILE_PATH, MAP_DATA)
            saveData(USER_FILE, {
                ID: USER_ID, // 用户ID
                GAME_ID: USER_NUMBER, // 游戏ID
                GAME_NICKNAME: `Tloml_${USER_NUMBER}`, // 游戏昵称
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
                TIMESTAMP: Date.now() // 模拟跑图时间戳
            })
        }


        const USER_DATA = JSON.parse(fs.readFileSync(USER_FILE, 'utf8'))
        if (USER_DATA['LAST_DATE'] === getCurrentDate())
            return e.reply((e.adapter === 'QQBot') ? [
                '# 今日已签，请明日再来',
                segment.at(USER_ID),
                Bot.Button([[{ label: '光遇信息' }, { label: '模拟跑图' }]])
            ] : [
                segment.at(USER_ID),
                '\n今日已签，请明日再来'
            ])


        USER_DATA['CURRENCY_1'] += CONFIGURATION['a']
        USER_DATA['CURRENCY_2'] += CONFIGURATION['b']
        USER_DATA['LAST_DATE'] = getCurrentDate()
        USER_DATA['ACCUMULATE'] += 1

        saveData(USER_FILE, USER_DATA)

        return e.reply((e.adapter === 'QQBot') ? [
            '# 签到成功！',
            `> Game ID: ${USER_DATA['GAME_ID']}`,
            `已累计签到 [${USER_DATA['ACCUMULATE']}] 天`,
            `获得白蜡: ${CONFIGURATION['a']} | 季蜡：${CONFIGURATION['b']}`,
            segment.at(USER_ID)
        ] : [
            segment.at(USER_ID),
            '\n签到成功！',
            `\nGame ID: ${USER_DATA['GAME_ID']}`,
            `\n已累计签到 [${USER_DATA['ACCUMULATE']}] 天`,
            `\n获得白蜡: ${CONFIGURATION['a']} | 季蜡：${CONFIGURATION['b']}`
        ])
    }

    /** 光遇信息 */
    async Feature_2(e) {
        const USER_ID = e.user_id
        const USER_FILE = ALL_USER_FILE_PATH + USER_ID + '.json'

        if (!isExistenceUser(USER_ID))
            return e.reply((e.adapter === 'QQBot') ? [
                '# 没有您的用户信息',
                '> 请先发送[光遇签到]创建',
                segment.at(USER_ID),
                Bot.Button([[{ label: '光遇签到' }]])
            ] : [
                segment.at(USER_ID),
                '\n没有您的用户信息，请先发送[光遇签到]创建'
            ])

        const USER_DATA = JSON.parse(fs.readFileSync(USER_FILE, 'utf8'))
        return e.reply((e.adapter === 'QQBot') ? [
            `# [${USER_DATA['GAME_ID']}]${USER_DATA['GAME_NICKNAME']}`,
            `> 最近签到日期 [${USER_DATA['LAST_DATE']}]`,
            `累计签到次数 [${USER_DATA['ACCUMULATE']}]`,
            `所在位置 [${USER_DATA['LOCATION']}]`,
            `白蜡 [${USER_DATA['CURRENCY_1']}] | 季蜡 [${USER_DATA['CURRENCY_2']}]`,
            `模拟跑图状态 [${USER_DATA['SIMULATED_STATE']}]`,
            segment.at(USER_ID),
            Bot.Button([[{ label: '光遇签到' }, { label: '模拟跑图' }]])
        ] : [
            segment.at(USER_ID),
            `\n[${USER_DATA['GAME_ID']}]${USER_DATA['GAME_NICKNAME']}`,
            `\n最近签到日期 [${USER_DATA['LAST_DATE']}]`,
            `\n累计签到次数 [${USER_DATA['ACCUMULATE']}]`,
            `\n所在位置 [${USER_DATA['LOCATION']}]`,
            `\n白蜡 [${USER_DATA['CURRENCY_1']}] | 季蜡 [${USER_DATA['CURRENCY_2']}]`,
            `\n模拟跑图状态 [${USER_DATA['SIMULATED_STATE']}]`,
        ])
    }

    /** 模拟跑图 */
    async Feature_3(e) {
        const USER_ID = e.user_id
        const USER_FILE = ALL_USER_FILE_PATH + USER_ID + '.json'
        const CONFIGURATION = getConfigInfo()

        if (!isExistenceUser(USER_ID))
            return e.reply((e.adapter === 'QQBot') ? [
                '# 没有您的用户信息',
                '> 请先发送[光遇签到]创建',
                segment.at(USER_ID),
                Bot.Button([[{ label: '光遇签到' }]])
            ] : [
                segment.at(USER_ID),
                '\n没有您的用户信息，请先发送[光遇签到]创建'
            ])

        const USER_DATA = JSON.parse(fs.readFileSync(USER_FILE, 'utf8'))

        const TIME_TAKEN = getTimeTaken(USER_DATA['TIMESTAMP'])
        const H = TIME_TAKEN['H']
        const M = TIME_TAKEN['M']
        const S = TIME_TAKEN['S']

        if (USER_DATA['SIMULATED_STATE'])
            return e.reply((e.adapter === 'QQBot') ? [
                '# 您当前已经在跑图了',
                `> 已跑图[${H}]时[${M}]分[${S}]秒`,
                segment.at(USER_ID),
                Bot.Button([[{ label: '结束跑图' }, { label: '跑图状态' }]])
            ] : [
                segment.at(USER_ID),
                `\n您当前已经在跑图了\n已跑图[${H}]时[${M}]分[${S}]秒`
            ])

        USER_DATA['SIMULATED_STATE'] = true
        USER_DATA['TIMESTAMP'] = Date.now()

        saveData(USER_FILE, USER_DATA)

        return e.reply((e.adapter === 'QQBot') ? [
            '# 已开始模拟跑图',
            `> 每分钟[${CONFIGURATION['d']}]白蜡 | 上限[${CONFIGURATION['c']}]白蜡`,
            segment.at(USER_ID),
            Bot.Button([[{ label: '结束跑图' }]])
        ] : [
            segment.at(USER_ID),
            `\n已开始模拟跑图\n每分钟[${CONFIGURATION['d']}]白蜡 | 上限[${CONFIGURATION['c']}]白蜡`
        ])
    }

    /** 结束跑图 */
    async Feature_4(e) {
        const USER_ID = e.user_id
        const USER_FILE = ALL_USER_FILE_PATH + USER_ID + '.json'
        const CONFIGURATION = getConfigInfo()

        if (!isExistenceUser(USER_ID))
            return e.reply((e.adapter === 'QQBot') ? [
                '# 没有您的用户信息',
                '> 请先发送[光遇签到]创建',
                segment.at(USER_ID),
                Bot.Button([[{ label: '光遇签到' }]])
            ] : [
                segment.at(USER_ID),
                '\n没有您的用户信息，请先发送[光遇签到]创建'
            ])

        const USER_DATA = JSON.parse(fs.readFileSync(USER_FILE, 'utf8'))


        if (!USER_DATA['SIMULATED_STATE'])
            return e.reply((e.adapter === 'QQBot') ? [
                '# 您当前并没有在跑图呢',
                segment.at(USER_ID),
                Bot.Button([[{ label: '模拟跑图' }]])
            ] : [
                segment.at(USER_ID),
                `\n您当前并没有在跑图呢`
            ])

        const TIME_TAKEN = getTimeTaken(USER_DATA['TIMESTAMP'])
        const RANDOM_MAP = MAP_LIST[Math.floor(Math.random() * MAP_LIST.length)]
        const H = TIME_TAKEN['H']
        const M = TIME_TAKEN['M']
        const S = TIME_TAKEN['S']

        let GET_CURRENCY_1 = ((H * 60) + M) * CONFIGURATION['d']
        let TIPS = ''
        if (GET_CURRENCY_1 > CONFIGURATION['c']) {
            TIPS = `理论获得白蜡[${GET_CURRENCY_1}]，但超出上限，所以`
            GET_CURRENCY_1 = CONFIGURATION['c']
        }

        USER_DATA['SIMULATED_STATE'] = false
        USER_DATA['CURRENCY_1'] += GET_CURRENCY_1
        USER_DATA['LOCATION'] = RANDOM_MAP

        saveData(USER_FILE, USER_DATA)

        return e.reply((e.adapter === 'QQBot') ? [
            '# 已结束本次跑图',
            `> 本次跑图抵达${RANDOM_MAP}`,
            `用时[${H}]时[${M}]分[${S}]秒`,
            TIPS,
            `获得白蜡[${GET_CURRENCY_1}]`,
            segment.at(USER_ID),
            Bot.Button([[{ label: '光遇信息' }, { label: '模拟跑图' }]])
        ] : [
            segment.at(USER_ID),
            `\n已结束本次跑图\n本次跑图抵达${RANDOM_MAP}\n用时[${H}]时[${M}]分[${S}]秒\n${TIPS}获得白蜡[${GET_CURRENCY_1}]`
        ])
    }

    /** 跑图状态 */
    async Feature_5(e) {
        const USER_ID = e.user_id
        const USER_FILE = ALL_USER_FILE_PATH + USER_ID + '.json'
        const CONFIGURATION = getConfigInfo()

        if (!isExistenceUser(USER_ID))
            return e.reply((e.adapter === 'QQBot') ? [
                '# 没有您的用户信息',
                '> 请先发送[光遇签到]创建',
                segment.at(USER_ID),
                Bot.Button([[{ label: '光遇签到' }]])
            ] : [
                segment.at(USER_ID),
                '\n没有您的用户信息，请先发送[光遇签到]创建'
            ])

        const USER_DATA = JSON.parse(fs.readFileSync(USER_FILE, 'utf8'))

        if (!USER_DATA['SIMULATED_STATE'])
            return e.reply((e.adapter === 'QQBot') ? [
                '# 您当前并没有在跑图呢',
                segment.at(USER_ID),
                Bot.Button([[{ label: '模拟跑图' }]])
            ] : [
                segment.at(USER_ID),
                `\n您当前并没有在跑图呢`
            ])

        const TIME_TAKEN = getTimeTaken(USER_DATA['TIMESTAMP'])
        const H = TIME_TAKEN['H']
        const M = TIME_TAKEN['M']
        const S = TIME_TAKEN['S']

        return e.reply((e.adapter === 'QQBot') ? [
            '# 正在跑图中',
            `> 已跑图[${H}]时[${M}]分[${S}]秒`,
            `每分钟[${CONFIGURATION['d']}]白蜡 | 上限[${CONFIGURATION['c']}]白蜡`,
            segment.at(USER_ID),
            Bot.Button([[{ label: '光遇信息' }, { label: '结束跑图' }]])
        ] : [
            segment.at(USER_ID),
            `正在跑图中\n已跑图[${H}]时[${M}]分[${S}]秒\n每分钟[${CONFIGURATION['d']}]白蜡 | 上限[${CONFIGURATION['c']}]白蜡`
        ])
    }

    /** 光遇地图 */
    async Feature_6(e) {
        // 先执行一遍这个
        addarray()
        const USER_ID = e.user_id
        const USER_FILE = ALL_USER_FILE_PATH + USER_ID + '.json'

        if (!isExistenceUser(USER_ID))
            return e.reply((e.adapter === 'QQBot') ? [
                '# 没有您的用户信息',
                '> 请先发送[光遇签到]创建',
                segment.at(USER_ID),
                Bot.Button([[{ label: '光遇签到' }]])
            ] : [
                segment.at(USER_ID),
                '\n没有您的用户信息，请先发送[光遇签到]创建'
            ])

        const USER_DATA = JSON.parse(fs.readFileSync(USER_FILE, 'utf8'))
        const MAP_DATA = JSON.parse(fs.readFileSync(MAP_FILE_PATH, 'utf8'))

        const USER_LOCATION = USER_DATA['LOCATION']
        const LOCATION_NUMBER = MAP_DATA[USER_LOCATION].length - 1
        const MAP_LISTS = MAP_LIST.filter(item => item !== USER_DATA['LOCATION'])

        let OTHER_LOCATION_NUMBER = []
        for (let i = 0; i < MAP_LISTS.length; i++) {
            OTHER_LOCATION_NUMBER.push(MAP_LISTS[i] + '人数[' + MAP_DATA[MAP_LISTS[i]].length + ']')
            if (e.adapter !== 'QQBot') OTHER_LOCATION_NUMBER.push('\n')
        }

        return e.reply((e.adapter === 'QQBot') ? [
            `# 您当前在 [${USER_LOCATION}]`,
            `> 与您在同一地图的玩家共有[${LOCATION_NUMBER}]位`,
            '其他位置玩家人数',
            ...OTHER_LOCATION_NUMBER,
            segment.at(USER_ID),
            Bot.Button([[{ label: '#传送' }]])
        ] : [
            segment.at(USER_ID),
            `\n您当前在 [${USER_LOCATION}]\n与您在同一地图的玩家共有[${LOCATION_NUMBER}]位\n其他位置玩家人数\n`,
            ...OTHER_LOCATION_NUMBER
        ])
    }

    /** 传送 */
    async Feature_7(e) {
        const USER_ID = e.user_id
        const USER_FILE = ALL_USER_FILE_PATH + USER_ID + '.json'

        if (!isExistenceUser(USER_ID))
            return e.reply((e.adapter === 'QQBot') ? [
                '# 没有您的用户信息',
                '> 请先发送[光遇签到]创建',
                segment.at(USER_ID),
                Bot.Button([[{ label: '光遇签到' }]])
            ] : [
                segment.at(USER_ID),
                '\n没有您的用户信息，请先发送[光遇签到]创建'
            ])

        const LOCATION = e.msg.match(REGEX_1)[2].replace(/\s/g, '');
        if (!MAP_LIST.includes(LOCATION))
            return e.reply((e.adapter === 'QQBot') ? [
                '# 没有这个地图',
                '> 您可以发送[光遇地图]查看可传送地图',
                segment.at(USER_ID),
                Bot.Button([[{ label: '光遇地图' }]])
            ] : [
                segment.at(USER_ID),
                '\n没有这个地图\n您可以发送[光遇地图]查看可传送地图'
            ])

        const USER_DATA = JSON.parse(fs.readFileSync(USER_FILE, 'utf8'))
        const MAP_DATA = JSON.parse(fs.readFileSync(MAP_FILE_PATH, 'utf8'))

        const USER_LOCATION = USER_DATA['LOCATION']
        if (LOCATION === USER_LOCATION)
            return e.reply((e.adapter === 'QQBot') ? [
                '# 您已经在这个地图了',
                '> 您可以发送[光遇地图]查看可传送地图',
                segment.at(USER_ID),
                Bot.Button([[{ label: '光遇地图' }]])
            ] : [
                segment.at(USER_ID),
                '\n您已经在这个地图了\n您可以发送[光遇地图]查看可传送地图'
            ])

        const TIME = _.random(2000, 6000)

        e.reply((e.adapter === 'QQBot') ? [
            '# 开始传送，请稍等',
            '> ', segment.at(USER_ID),
        ] : [
            segment.at(USER_ID),
            '\n开始传送，请稍等'
        ])

        USER_DATA['LOCATION'] = LOCATION
        MAP_DATA[USER_LOCATION] = MAP_DATA[USER_LOCATION].filter(item => item !== USER_DATA['ID'])
        MAP_DATA[LOCATION].push(USER_DATA['ID'])
        saveData(USER_FILE, USER_DATA)
        saveData(MAP_FILE_PATH, MAP_DATA)

        setTimeout(function () {
            return e.reply((e.adapter === 'QQBot') ? [
                '# 传送成功！',
                `> 您已抵达[${LOCATION}]`,
                `耗时[${(TIME / 1000).toFixed(2)}]秒`,
                segment.at(USER_ID),
                Bot.Button([[{ label: '光遇地图' }]])
            ] : [
                segment.at(USER_ID),
                `\n传送成功！\n您已抵达[${LOCATION}]\n耗时[${(TIME / 1000).toFixed(2)}]秒`
            ])
        }, TIME);
    }

    /** 设置(昵称) */
    async Feature_8(e) {
        const USER_ID = e.user_id
        const USER_FILE = ALL_USER_FILE_PATH + USER_ID + '.json'

        if (!isExistenceUser(USER_ID))
            return e.reply((e.adapter === 'QQBot') ? [
                '# 没有您的用户信息',
                '> 请先发送[光遇签到]创建',
                segment.at(USER_ID),
                Bot.Button([[{ label: '光遇签到' }]])
            ] : [
                segment.at(USER_ID),
                '\n没有您的用户信息，请先发送[光遇签到]创建'
            ])

        const MATCH = e.msg.match(REGEX_2)
        // const SETTINGS = MATCH[2]
        const SETTINGS_CONTENT = MATCH[4]
        // if (SETTINGS === '昵称') {}
        if (SETTINGS_CONTENT.length < 2 || SETTINGS_CONTENT.length > 12)
            return e.reply((e.adapter === 'QQBot') ? [
                '# 设置失败！',
                '> 昵称长度小于2位或大于12位',
                '请重新设置', segment.at(USER_ID),
                Bot.Button([[{ label: `设置昵称${SETTINGS_CONTENT}` }]])
            ] : [
                segment.at(USER_ID),
                `\n设置失败！\n昵称长度小于2位或大于12位\n请重新设置`
            ])

        const USER_DATA = JSON.parse(fs.readFileSync(USER_FILE, 'utf8'))

        USER_DATA['GAME_NICKNAME'] = SETTINGS_CONTENT
        saveData(USER_FILE, USER_DATA)

        return e.reply((e.adapter === 'QQBot') ? [
            '# 设置成功',
            `> 您的新昵称[${SETTINGS_CONTENT}]`,
            segment.at(USER_ID)
        ] : [
            segment.at(USER_ID),
            `\n设置成功！\n您的新昵称[${SETTINGS_CONTENT}]`
        ])
    }
}

/** 计算用时 */
function getTimeTaken(startTimestamp) {
    const TIME_DIFF = Date.now() - startTimestamp
    const H = Math.floor(TIME_DIFF / 3600000)
    const M = Math.floor((TIME_DIFF % 3600000) / 60000)
    const S = Math.floor((TIME_DIFF % 60000) / 1000)
    return { H, M, S }
}

/** 读取配置 */
function getConfigInfo() {
    const DATA = JSON.parse(fs.readFileSync(CONFIG_FILE_PATH, 'utf8'))
    /** 签到获得白蜡 */
    const a = DATA['a']
    /** 签到获得季蜡 */
    const b = DATA['b']
    /** 模拟跑图上限 */
    const c = DATA['c']
    /** 模拟跑图1分钟多少白蜡 */
    const d = DATA['d']
    return { a, b, c, d }
}

/** 是否存在用户 */
function isExistenceUser(USER_ID) {
    if (!fs.existsSync(ALL_USER_FILE_PATH + USER_ID + '.json')) return false
    return true
}

/** 存储
 * @FILE 位置
 * @DATA 数据
 */
function saveData(FILE, DATA) { fs.writeFileSync(FILE, JSON.stringify(DATA, null, 4), 'utf8') }

/** 当前日期(YYYY-MM-DD) */
function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function addarray() {
    const MAP_DATA = JSON.parse(fs.readFileSync(MAP_FILE_PATH, 'utf8'))
    fs.readdir(ALL_USER_FILE_PATH, (err, files) => {
        if (err) {
            logger.error('Error reading folder:', err);
            return;
        }

        files.forEach(file => {
            if (path.extname(file) === '.json') {
                const filePath = path.join(ALL_USER_FILE_PATH, file);
                const data = fs.readFileSync(filePath, 'utf8');
                const json = JSON.parse(data);

                const location = json.LOCATION;
                const id = json.ID;

                if (!MAP_DATA[location].includes(id)) {
                    MAP_DATA[location].push(id);
                }
            }
        });
        saveData(MAP_FILE_PATH, MAP_DATA)
    });
}
