import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import { render } from '../components/index.js';

/** 用户文件位置 */
const ALL_USER_FILE_PATH = 'plugins/Tlon-Sky/data/USER/';
/** 团队文件位置 */
const ALL_GROUP_FILE_PATH = 'plugins/Tlon-Sky/data/GROUP/';
/** 配置文件位置 */
const CONFIG_FILE_PATH = 'plugins/Tlon-Sky/config/config.json';
/** 地图文件位置 */
const MAP_FILE_PATH = 'plugins/Tlon-Sky/data/map.json';
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
];

if (!fs.existsSync(MAP_FILE_PATH)) saveData(MAP_FILE_PATH, {
    遇境: [], 云巢: [],
    晨岛: [], 预言山谷: [], 夜行石: [],
    云野: [], 圣岛: [], 云峰: [],
    雨林: [], 大树屋: [], 风行网道: [],
    霞谷: [], 圆梦村: [], 雪隐峰: [], 圆梦村剧场: [], 音乐商店: [],
    暮土: [], 遗忘方舟: [], 藏宝岛礁: [],
    禁阁: [], 办公室: [], 星光沙漠: [], 庇护所: [], 月牙绿洲: [],
    伊甸: []
});
if (!fs.existsSync(CONFIG_FILE_PATH)) saveData(CONFIG_FILE_PATH, { a: 20, b: 5, c: 60, d: 1 });

['USER', 'GROUP'].forEach(dir => fs.mkdirSync(`plugins/Tlon-Sky/data/${dir}`, { recursive: true }));

const folderPath = 'plugins/Tlon-Sky/data/USER';

fs.readdir(folderPath, (err, files) => {
    if (err) {
        logger.error('读取文件夹错误:', err);
        return;
    }

    files.forEach(file => {
        if (path.extname(file) === '.json') {
            const filePath = path.join(folderPath, file);
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    logger.error('读取文件错误:', err);
                    return;
                }

                try {
                    const jsonData = JSON.parse(data);
                    if (!jsonData.hasOwnProperty('GROUP')) {
                        jsonData.GROUP = "";
                        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                            if (err) {
                                logger.error('写入文件错误:', err);
                            } else { }
                        });
                    }
                } catch (error) {
                    logger.error('解析JSON出错:', error);
                }
            });
        }
    });
});

const REGEX_1 = /^(#|\/)传送(.*)$/;
const REGEX_2 = /^(#|\/)?设置((团队)?(昵称|名称))(:|：)(.*)$/;
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
            }, {
                reg: /^(#|\/)?(建立|创建)团队$/,
                fnc: 'Feature_9'
            }, {
                reg: /^(#|\/)?团队信息$/,
                fnc: 'Feature_10'
            }, {
                reg: /^(#|\/)?查看玩家(.*)$/,
                fnc: 'Feature_11'
            }]
        })
    }

    /** 光遇签到 */
    async Feature_1(e) {
        const USER_ID = e.user_id
        const USER_FILE = ALL_USER_FILE_PATH + USER_ID + '.json'
        const CONFIGURATION = getConfigInfo()
        const USER_NUMBER = fs.readdirSync(ALL_USER_FILE_PATH).length

        if (!fs.existsSync(USER_FILE)) {
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
                TIMESTAMP: Date.now(), // 模拟跑图时间戳
                GROUP: '' // 团队编号
            })
        }


        const USER_DATA = JSON.parse(fs.readFileSync(USER_FILE, 'utf8'))
        if (USER_DATA['LAST_DATE'] === getCurrentDate())
            return e.reply((e.adapter === 'QQBot') ? [
                '# 今日已签，请明日再来',
                segment.at(USER_ID),
                Bot.Button([[
                    { label: '信息', callback: '/光遇信息' },
                    { label: '跑图', callback: '/模拟跑图' },
                    { label: '地图', callback: '/光遇地图' }
                ]])
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
            segment.at(USER_ID),
            Bot.Button([[
                { label: '设置昵称', data: '/设置昵称:' },
                { label: '信息', callback: '/光遇信息' },
                { label: '跑图', callback: '/模拟跑图' },
                { label: '地图', callback: '/光遇地图' }
            ]])
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
        if (!isExistenceUser(e)) return
        const USER_ID = e.user_id
        const USER_FILE = ALL_USER_FILE_PATH + USER_ID + '.json'

        const USER_DATA = JSON.parse(fs.readFileSync(USER_FILE, 'utf8'))

        let GROUP_DATA = '暂未加入团队'
        if (USER_DATA['GROUP'] !== '') {
            GROUP_DATA = JSON.parse(fs.readFileSync(ALL_GROUP_FILE_PATH + USER_DATA['GROUP'] + '.json', 'utf8'))
            GROUP_DATA = GROUP_DATA['NACKNAME']
        }

        let BUTTON = (e.adapter === 'QQBot')
            ? [[{ label: '签到', callback: '/光遇签到' }, { label: '跑图', callback: '/模拟跑图' }, { label: '信息', callback: '/光遇信息' }, { label: '地图', callback: '/光遇地图' }]]
            : ''

        return await render(`html/skyInfo`, {
            img: await randomPicture(),
            GAME_ID: USER_DATA['GAME_ID'],
            GAME_NICKNAME: USER_DATA['GAME_NICKNAME'],
            LAST_DATE: USER_DATA['LAST_DATE'],
            ACCUMULATE: USER_DATA['ACCUMULATE'],
            LOCATION: USER_DATA['LOCATION'],
            SIMULATED_STATE: USER_DATA['SIMULATED_STATE'],
            CURRENCY_1: USER_DATA['CURRENCY_1'],
            CURRENCY_2: USER_DATA['CURRENCY_2']
        }, { e, scale: 2.0 }, '', BUTTON);
    }

    /** 模拟跑图 */
    async Feature_3(e) {
        if (!isExistenceUser(e)) return
        const USER_ID = e.user_id
        const USER_FILE = ALL_USER_FILE_PATH + USER_ID + '.json'
        const CONFIGURATION = getConfigInfo()

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
                Bot.Button([[
                    { label: '结束', callback: '/结束跑图' },
                    { label: '状态', callback: '/跑图状态' },
                    { label: '信息', callback: '/光遇信息' }
                ]])
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
            Bot.Button([[
                { label: '结束', callback: '/结束跑图' },
                { label: '信息', callback: '/光遇信息' }
            ]])
        ] : [
            segment.at(USER_ID),
            `\n已开始模拟跑图\n每分钟[${CONFIGURATION['d']}]白蜡 | 上限[${CONFIGURATION['c']}]白蜡`
        ])
    }

    /** 结束跑图 */
    async Feature_4(e) {
        if (!isExistenceUser(e)) return
        const USER_ID = e.user_id
        const USER_FILE = ALL_USER_FILE_PATH + USER_ID + '.json'
        const CONFIGURATION = getConfigInfo()

        const USER_DATA = JSON.parse(fs.readFileSync(USER_FILE, 'utf8'))
        const MAP_DATA = JSON.parse(fs.readFileSync(MAP_FILE_PATH, 'utf8'))

        if (!USER_DATA['SIMULATED_STATE'])
            return e.reply((e.adapter === 'QQBot') ? [
                '# 您当前并没有在跑图呢',
                segment.at(USER_ID),
                Bot.Button([[
                    { label: '跑图', callback: '/模拟跑图' }
                ]])
            ] : [
                segment.at(USER_ID),
                `\n您当前并没有在跑图呢`
            ])

        const TIME_TAKEN = getTimeTaken(USER_DATA['TIMESTAMP'])
        const RANDOM_MAP = MAP_LIST[Math.floor(Math.random() * MAP_LIST.length)]
        const USER_LOCATION = USER_DATA['LOCATION']
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
        MAP_DATA[USER_LOCATION] = MAP_DATA[USER_LOCATION].filter(item => item !== USER_DATA['ID'])
        MAP_DATA[RANDOM_MAP].push(USER_DATA['ID'])
        saveData(MAP_FILE_PATH, MAP_DATA)
        saveData(USER_FILE, USER_DATA)

        return e.reply((e.adapter === 'QQBot') ? [
            '# 已结束本次跑图',
            `> 本次跑图抵达[${RANDOM_MAP}]`,
            `用时[${H}]时[${M}]分[${S}]秒`,
            TIPS,
            `获得白蜡[${GET_CURRENCY_1}]`,
            segment.at(USER_ID),
            Bot.Button([[
                { label: '信息', callback: '/光遇信息' },
                { label: '跑图', callback: '/模拟跑图' }
            ]])
        ] : [
            segment.at(USER_ID),
            `\n已结束本次跑图\n本次跑图抵达[${RANDOM_MAP}]\n用时[${H}]时[${M}]分[${S}]秒\n${TIPS}获得白蜡[${GET_CURRENCY_1}]`
        ])
    }

    /** 跑图状态 */
    async Feature_5(e) {
        if (!isExistenceUser(e)) return
        const USER_ID = e.user_id
        const USER_FILE = ALL_USER_FILE_PATH + USER_ID + '.json'
        const CONFIGURATION = getConfigInfo()

        const USER_DATA = JSON.parse(fs.readFileSync(USER_FILE, 'utf8'))

        if (!USER_DATA['SIMULATED_STATE'])
            return e.reply((e.adapter === 'QQBot') ? [
                '# 您当前并没有在跑图呢',
                segment.at(USER_ID),
                Bot.Button([[{ label: '跑图', callback: '/模拟跑图' }]])
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
            Bot.Button([[
                { label: '信息', callback: '/光遇信息' },
                { label: '结束', callback: '/结束跑图' }
            ]])
        ] : [
            segment.at(USER_ID),
            `正在跑图中\n已跑图[${H}]时[${M}]分[${S}]秒\n每分钟[${CONFIGURATION['d']}]白蜡 | 上限[${CONFIGURATION['c']}]白蜡`
        ])
    }

    /** 光遇地图 */
    async Feature_6(e) {
        if (!isExistenceUser(e)) return
        // 先执行一遍这个
        addarray()
        const USER_ID = e.user_id
        const USER_FILE = ALL_USER_FILE_PATH + USER_ID + '.json'

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
            Bot.Button([[
                { label: '传送', data: '/传送' },
                { label: '查看玩家', callback: '/查看玩家' }
            ]])
        ] : [
            segment.at(USER_ID),
            `\n您当前在 [${USER_LOCATION}]\n与您在同一地图的玩家共有[${LOCATION_NUMBER}]位\n其他位置玩家人数\n`,
            ...OTHER_LOCATION_NUMBER
        ])
    }

    /** 传送 */
    async Feature_7(e) {
        if (!isExistenceUser(e)) return
        const USER_ID = e.user_id
        const USER_FILE = ALL_USER_FILE_PATH + USER_ID + '.json'

        const LOCATION = e.msg.match(REGEX_1)[2].replace(/\s/g, '');
        if (!MAP_LIST.includes(LOCATION))
            return e.reply((e.adapter === 'QQBot') ? [
                '# 没有这个地图',
                '> 您可以发送[光遇地图]查看可传送地图',
                segment.at(USER_ID),
                Bot.Button([[
                    { label: '地图', callback: '/光遇地图' }
                ]])
            ] : [
                segment.at(USER_ID),
                '\n没有这个地图\n您可以发送[光遇地图]查看可传送地图'
            ])

        const USER_DATA = JSON.parse(fs.readFileSync(USER_FILE, 'utf8'))
        const MAP_DATA = JSON.parse(fs.readFileSync(MAP_FILE_PATH, 'utf8'))

        if (USER_DATA['SIMULATED_STATE'])
            return e.reply((e.adapter === 'QQBot') ? [
                '> 当前正在模拟跑图，无法传送！',
                segment.at(USER_ID),
                Bot.Button([[
                    { label: '结束', callback: '/结束跑图' }
                ]])
            ] : [
                segment.at(USER_ID),
                '\n当前正在模拟跑图，无法传送！'
            ])
        const USER_LOCATION = USER_DATA['LOCATION']
        if (LOCATION === USER_LOCATION)
            return e.reply((e.adapter === 'QQBot') ? [
                '# 您已经在这个地图了',
                '> 您可以发送[光遇地图]查看可传送地图',
                segment.at(USER_ID),
                Bot.Button([[
                    { label: '地图', callback: '/光遇地图' }
                ]])
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
                Bot.Button([[
                    { label: '地图', callback: '/光遇地图' },
                    { label: '查看玩家', callback: '/查看玩家' }
                ]])
            ] : [
                segment.at(USER_ID),
                `\n传送成功！\n您已抵达[${LOCATION}]\n耗时[${(TIME / 1000).toFixed(2)}]秒`
            ])
        }, TIME);
    }

    /** 设置((团队)昵称) */
    async Feature_8(e) {
        if (!isExistenceUser(e)) return
        const USER_ID = e.user_id
        const USER_FILE = ALL_USER_FILE_PATH + USER_ID + '.json'

        const MATCH = e.msg.match(REGEX_2)
        const SETTINGS = MATCH[2]
        const SETTINGS_CONTENT = MATCH[6]

        const USER_DATA = JSON.parse(fs.readFileSync(USER_FILE, 'utf8'))
        if (/^(昵称|名称)/.test(SETTINGS)) {
            if (SETTINGS_CONTENT.length < 2 || SETTINGS_CONTENT.length > 12)
                return e.reply((e.adapter === 'QQBot') ? [
                    '# 设置失败！',
                    '> 昵称长度小于2位或大于12位',
                    '请重新设置',
                    segment.at(USER_ID),
                    Bot.Button([[
                        { label: `重新设置`, data: `设置昵称:${SETTINGS_CONTENT}` }
                    ]])
                ] : [
                    segment.at(USER_ID),
                    `\n设置失败！\n昵称长度小于2位或大于12位\n请重新设置`
                ])

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
        } else if (/^团队(昵称|名称)/.test(SETTINGS)) {
            const GROUP_FILE = ALL_GROUP_FILE_PATH + USER_DATA['GROUP'] + '.json'

            if (USER_DATA['GROUP'] === '') // 无团队
                return e.reply((e.adapter === 'QQBot') ? [
                    '# 您尚未创建团队',
                    '> ', segment.at(USER_ID),
                    Bot.Button([[{ lanel: '创建团队' }]])
                ] : [
                    segment.at(USER_ID),
                    '\n您尚未创建团队'
                ])


            if (SETTINGS_CONTENT.length < 2 || SETTINGS_CONTENT.length > 8)
                return e.reply((e.adapter === 'QQBot') ? [
                    '# 设置失败！',
                    '> 长度小于2位或大于8位',
                    '请重新设置',
                    segment.at(USER_ID),
                    Bot.Button([[{ callback: '重新设置', data: `设置团队昵称:${SETTINGS_CONTENT}` }]])
                ] : [
                    segment.at(USER_ID),
                    `\n设置失败！\n长度小于2位或大于8位\n请重新设置`
                ])

            const GROUP_DATA = JSON.parse(fs.readFileSync(GROUP_FILE, 'utf8'))

            if (GROUP_DATA['LEADER'] !== USER_ID)
                return e.reply((e.adapter === 'QQBot') ? [
                    '# 您不是团长！',
                    '> 无法设置团名',
                    segment.at(USER_ID),
                ] : [
                    segment.at(USER_ID),
                    '\n您不是团长！\n无法设置团名'
                ])

            GROUP_DATA['NACKNAME'] = SETTINGS_CONTENT
            saveData(GROUP_FILE, GROUP_DATA)

            return e.reply((e.adapter === 'QQBot') ? [
                '# 设置成功',
                `> 团队新昵称[${SETTINGS_CONTENT}]`,
                segment.at(USER_ID)
            ] : [
                segment.at(USER_ID),
                `\n设置成功！\n团队新昵称[${SETTINGS_CONTENT}]`
            ])
        }
    }

    /** 创建团队 */
    async Feature_9(e) {
        if (!isExistenceUser(e)) return
        const USER_ID = e.user_id
        const USER_FILE = ALL_USER_FILE_PATH + USER_ID + '.json'
        const USER_DATA = JSON.parse(fs.readFileSync(USER_FILE, 'utf8'))

        if (USER_DATA['CURRENCY_1'] < 10000 && USER_DATA['CURRENCY_2'] < 320)
            return e.reply((e.adapter === 'QQBot') ? [
                '# 资金不足！',
                '> 需要白蜡[10000] | 季蜡[320]',
                segment.at(USER_ID)
            ] : [
                segment.at(USER_ID),
                '\n资金不足！\n需要白蜡[10000] | 季蜡[320]'
            ])

        if (USER_DATA['GROUP'] !== '')
            return e.reply((e.adapter === 'QQBot') ? [
                '# 您已经有团队了',
                '> 请先退出再建立团队',
                segment.at(USER_ID),
                Bot.Button([[{ label: '退出团队' }]])
            ] : [
                segment.at(USER_ID),
                '您已经有团了\n请先退出再建立团队'
            ])

        const GROUP_FILE = ALL_GROUP_FILE_PATH + USER_ID + '.json'
        const GROUP_NUMBER = (fs.readdirSync(ALL_GROUP_FILE_PATH).length) + 1

        USER_DATA['CURRENCY_1'] -= 10000
        USER_DATA['CURRENCY_2'] -= 320
        USER_DATA['GROUP'] = `${USER_ID}`
        saveData(USER_FILE, USER_DATA)
        saveData(GROUP_FILE, {
            FOUNDER: USER_ID, // 创建者ID
            LEADER: USER_ID, // 团长ID
            NACKNAME: `未命名团队${GROUP_NUMBER}`, // 团队名称
            GROUP_ID: GROUP_NUMBER, // 团队ID
            MEMBERS: [], // 团队成员
            CONTRIBUTIONS_POOL: 0, // 贡献池数量
            CONTRIBUTIONS_LEVEL: 0 // 贡献池等级
        })

        return e.reply((e.adapter === 'QQBot') ? [
            '# 创建成功！',
            `> 团队编号[${GROUP_NUMBER}]`,
            `团队昵称[未命名团队${GROUP_NUMBER}]`,
            segment.at(USER_ID),
            Bot.Button([[{ label: '设置团队昵称', data: '设置团队昵称' }]])
        ] : [
            segment.at(USER_ID),
            `\n创建成功！\n团队编号[${GROUP_NUMBER}]\n团队昵称[未命名团队${GROUP_NUMBER}]\n可用指令[设置团队昵称:(名称)]来设置名称`
        ])
    }

    /** 团队信息 */
    async Feature_10(e) {
        if (!isExistenceUser(e)) return
        const USER_ID = e.user_id
        const USER_DATA = JSON.parse(fs.readFileSync(ALL_USER_FILE_PATH + USER_ID + '.json', 'utf8'))

        if (USER_DATA['GROUP'] === '') return e.reply((e.adapter === 'QQBot') ? [
            '# 您尚未加入(或创建)团队',
            '> ', segment.at(USER_ID)
        ] : [
            segment.at(USER_ID),
            '\n您尚未加入(或创建)团队'
        ])

        const GROUP_DATA = JSON.parse(fs.readFileSync(ALL_GROUP_FILE_PATH + USER_DATA['GROUP'] + '.json', 'utf8'))

        let LEADER_NICKNAME = USER_DATA['GAME_NICKNAME']
        if (GROUP_DATA['LEADER'] !== USER_ID) {
            const LEADER_DATA = JSON.parse(fs.readFileSync(ALL_USER_FILE_PATH + GROUP_DATA['LEADER'] + '.json', 'utf8'))
            LEADER_NICKNAME = LEADER_DATA['GAME_NICKNAME']
        }

        return e.reply((e.adapter === 'QQBot') ? [
            `# [${GROUP_DATA['GROUP_ID']}]${GROUP_DATA['NACKNAME']}`,
            `团长 [${LEADER_NICKNAME}]`,
            `团队成员数量 [${GROUP_DATA['MEMBERS'].length}]位`,
            `贡献池数量 [${GROUP_DATA['CONTRIBUTIONS_POOL']}] | 等级 [${GROUP_DATA['CONTRIBUTIONS_LEVEL']}]`,
            segment.at(USER_ID)
        ] : [
            segment.at(USER_ID),
            `\n[${GROUP_DATA['GROUP_ID']}]${GROUP_DATA['NACKNAME']}`,
            `\n团长 [${LEADER_NICKNAME}]`,
            `\n团队成员数量 [${GROUP_DATA['MEMBERS'].length}]位`,
            `\n贡献池数量 [${GROUP_DATA['CONTRIBUTIONS_POOL']}] | 等级 [${GROUP_DATA['CONTRIBUTIONS_LEVEL']}]`
        ])
    }

    /** 查看玩家 */
    async Feature_11(e) {
        if (!isExistenceUser(e)) return
        const USER_ID = e.user_id
        const USER_DATA = JSON.parse(fs.readFileSync(ALL_USER_FILE_PATH + USER_ID + '.json', 'utf8'))
        const MAP_DATA = JSON.parse(fs.readFileSync(MAP_FILE_PATH, 'utf8'))
        const NEARBY_USER = MAP_DATA[USER_DATA['LOCATION']]

        if (/^(#|\/)?查看玩家$/.test(e.msg)) {
            let REPLY_ARRAY = []
            let USER_NUMBER = NEARBY_USER.length > 10 ? 10 : NEARBY_USER.length
            for (let i = 0; i < USER_NUMBER; i++) {
                const USER_DATAS = JSON.parse(fs.readFileSync(ALL_USER_FILE_PATH + NEARBY_USER[i] + '.json', 'utf8'))
                REPLY_ARRAY.push(`${i + 1}、[${USER_DATAS['GAME_NICKNAME'].replace(/_/, '')}]`)
                if (e.adapter !== 'QQBot') REPLY_ARRAY.push('\n')
            }

            return e.reply((e.adapter === 'QQBot') ? [
                '# 附近玩家(最高展示十位)',
                '> ', ...REPLY_ARRAY,
                Bot.Button([[{ label: '查看玩家1', data: '查看玩家1' }]])
            ] : [
                segment.at(USER_ID),
                '\n附近玩家(最高展示十位)\n',
                ...REPLY_ARRAY
            ])
        } else {
            const SERIAL_NUMBER = parseInt(e.msg.replace(/#|\/|查看玩家/, '').replace(/\s/g, '')) - 1

            if (typeof SERIAL_NUMBER !== 'number' && isNaN(SERIAL_NUMBER))
                return e.reply((e.adapter === 'QQBot') ? [
                    '# 请输入纯数字！',
                    '> ', segment.at(USER_ID)
                ] : [
                    segment.at(USER_ID),
                    '请输入纯数字！'
                ])

            const QUERYING_USER_DATA = JSON.parse(fs.readFileSync(ALL_USER_FILE_PATH + NEARBY_USER[SERIAL_NUMBER] + '.json', 'utf8'))

            let GROUP_DATA = '暂未加入团队'
            if (QUERYING_USER_DATA['GROUP'] !== '') {
                GROUP_DATA = JSON.parse(fs.readFileSync(ALL_GROUP_FILE_PATH + QUERYING_USER_DATA['GROUP'] + '.json', 'utf8'))
                GROUP_DATA = GROUP_DATA['NACKNAME']
            }

            return e.reply((e.adapter === 'QQBot') ? [
                `# [${QUERYING_USER_DATA['GAME_ID']}]${QUERYING_USER_DATA['GAME_NICKNAME']}`,
                `> 最近签到日期 [${QUERYING_USER_DATA['LAST_DATE']}]`,
                `累计签到次数 [${QUERYING_USER_DATA['ACCUMULATE']}]`,
                `所在位置 [${QUERYING_USER_DATA['LOCATION']}]`,
                `白蜡 [${QUERYING_USER_DATA['CURRENCY_1']}] | 季蜡 [${QUERYING_USER_DATA['CURRENCY_2']}]`,
                `模拟跑图状态 [${QUERYING_USER_DATA['SIMULATED_STATE']}]`,
                `团队 [${GROUP_DATA}]`,
                segment.at(USER_ID),
                Bot.Button([[
                    { label: '签到', callback: '/光遇签到' },
                    { label: '跑图', callback: '/模拟跑图' },
                    { label: '信息', callback: '/光遇信息' },
                    { label: '地图', callback: '/光遇地图' }
                ]])
            ] : [
                segment.at(USER_ID),
                `\n[${QUERYING_USER_DATA['GAME_ID']}]${QUERYING_USER_DATA['GAME_NICKNAME']}`,
                `\n最近签到日期 [${QUERYING_USER_DATA['LAST_DATE']}]`,
                `\n累计签到次数 [${QUERYING_USER_DATA['ACCUMULATE']}]`,
                `\n所在位置 [${QUERYING_USER_DATA['LOCATION']}]`,
                `\n白蜡 [${QUERYING_USER_DATA['CURRENCY_1']}] | 季蜡 [${QUERYING_USER_DATA['CURRENCY_2']}]`,
                `\n模拟跑图状态 [${QUERYING_USER_DATA['SIMULATED_STATE']}]`,
                `\n团队 [${GROUP_DATA}]`
            ])
        }
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
function isExistenceUser(e) {
    const USER_ID = e.user_id
    if (!fs.existsSync(ALL_USER_FILE_PATH + USER_ID + '.json')) {
        e.reply((e.adapter === 'QQBot') ? [
            '# 没有您的用户信息',
            '> 请先发送[光遇签到]创建',
            segment.at(USER_ID),
            Bot.Button([[{ label: '光遇签到' }]])
        ] : [
            segment.at(USER_ID),
            '\n没有您的用户信息，请先发送[光遇签到]创建'
        ])
        return false
    }
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

async function randomPicture() {
    const image = await fs.promises.readdir('./plugins/Tlon-Sky/resources/img/');
    const list_img = Array.from(image);
    const theme = list_img.length === 1 ? list_img[0] : list_img[_.random(0, list_img.length - 1)];
    return theme;
}
