import fs from 'fs';
import _ from 'lodash';
import path from 'path';

/** 用户文件位置 */
const AUFP = 'plugins/Tlon-Sky/data/USER/';
/** 团队文件位置 */
const AGFP = 'plugins/Tlon-Sky/data/GROUP/';
/** 配置文件位置 */
const CFP = 'plugins/Tlon-Sky/config/config.json';
/** 地图文件位置 */
const MFP = 'plugins/Tlon-Sky/data/map.json';
/** 地图列表 */
const ML = [
    '遇境', '云巢',
    '晨岛', '预言山谷', '夜行石',
    '云野', '圣岛', '云峰',
    '雨林', '大树屋', '风行网道',
    '霞谷', '圆梦村', '雪隐峰', '圆梦村剧场', '音乐商店',
    '暮土', '遗忘方舟', '藏宝岛礁',
    '禁阁', '办公室', '星光沙漠', '庇护所', '月牙绿洲',
    '伊甸'
];
/** 按钮 */
const BUTTON_LIST = {
    A: [[
        BT_1('光遇信息', '/光遇信息'), BT_1('光遇签到', '/光遇签到'), BT_1('模拟跑图', '/模拟跑图')
    ], [
        BT_1('结束跑图', '/结束跑图'), BT_1('跑图状态', '/跑图状态'), BT_1('光遇地图', '/光遇地图')
    ], [
        BT_1('创建团队', '/创建团队'), BT_1('团队信息', '/团队信息'), BT_1('排行榜', '/光遇排行榜')
    ], [
        BT_2('设置昵称', '/设置昵称')
    ]],
    B: [[
        BT_2('传送+地图名', '/传送')
    ]]
}

if (!fs.existsSync(MFP)) SD(MFP, {
    遇境: [], 云巢: [],
    晨岛: [], 预言山谷: [], 夜行石: [],
    云野: [], 圣岛: [], 云峰: [],
    雨林: [], 大树屋: [], 风行网道: [],
    霞谷: [], 圆梦村: [], 雪隐峰: [], 圆梦村剧场: [], 音乐商店: [],
    暮土: [], 遗忘方舟: [], 藏宝岛礁: [],
    禁阁: [], 办公室: [], 星光沙漠: [], 庇护所: [], 月牙绿洲: [],
    伊甸: []
});
if (!fs.existsSync(CFP)) SD(CFP, { a: 20, b: 5, c: 60, d: 1 });
/** 
fs.readdir(AUFP, (err, files) => {
    if (err) {
        logger.error('读取文件夹错误:', err);
        return;
    }

    files.forEach(file => {
        if (path.extname(file) === '.json') {
            const filePath = path.join(AUFP, file);
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
/** */
const REG_1 = /^(#|\/)传送(.*)$/;
const REG_2 = /^(#|\/)?设置((团队)?(昵称|名称))(:|：)(.*)$/;
export class SKY extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]娱乐',
            dsc: 'Tlon-Sky',
            event: 'message',
            priority: 1,
            rule: [
                { reg: /^(#|\/)?光遇签到$/, fnc: 'F_1' },
                { reg: /^(#|\/)?光遇信息$/, fnc: 'F_2' },
                { reg: /^(#|\/)?模拟跑图$/, fnc: 'F_3' },
                { reg: /^(#|\/)?结束跑图$/, fnc: 'F_4' },
                { reg: /^(#|\/)?跑图状态$/, fnc: 'F_5' },
                { reg: /^(#|\/)?光遇地图$/, fnc: 'F_6' },
                { reg: REG_1, fnc: 'F_7' },
                { reg: REG_2, fnc: 'F_8' },
                { reg: /^(#|\/)?(建立|创建)团队$/, fnc: 'F_9' },
                { reg: /^(#|\/)?团队信息$/, fnc: 'F_10' },
                { reg: /^(#|\/)?查看玩家(.*)$/, fnc: 'F_11' },
                { reg: /^(#|\/)?(光遇|白蜡|季蜡)排行榜$/, fnc: 'F_12' }
            ]
        })
    }

    /** 光遇签到 */
    async F_1(e) {
        const UID = e.user_id
        const UF = `${AUFP}${UID}.json`
        const UN = fs.readdirSync(AUFP).length

        if (!fs.existsSync(UF)) {
            const MD = JSON.parse(fs.readFileSync(MFP, 'utf8'))
            MD['遇境'].push(UID)
            SD(MFP, MD)
            SD(UF, {
                ID: UID, // 用户ID
                GAME_ID: UN, // 游戏ID
                GAME_NICKNAME: `光崽${UN}号`, // 游戏昵称
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


        const UD = JSON.parse(fs.readFileSync(UF, 'utf8'))
        if (UD['LAST_DATE'] === getCurrentDate())
            return e.reply((e.adapter === 'QQBot') ? [
                '# 今日已签，请明日再来',
                segment.at(UID),
                Bot.Button(BUTTON_LIST['A'])
            ] : [
                segment.at(UID),
                '\n今日已签，请明日再来'
            ])


        const CD = GCD()
        UD['CURRENCY_1'] += CD['a']
        UD['CURRENCY_2'] += CD['b']
        UD['LAST_DATE'] = getCurrentDate()
        UD['ACCUMULATE'] += 1

        SD(UF, UD)

        return e.reply((e.adapter === 'QQBot') ? [
            segment.at(UID),
            '# 签到成功！',
            '***',
            `# 昵称: ${UD['GAME_NICKNAME']}`,
            `> 光遇ID: ${UD['GAME_ID']}`,
            `已累计签到 [${UD['ACCUMULATE']}] 天`,
            `获得白蜡: ${CD['a']} | 季蜡：${CD['b']}`,
            Bot.Button(BUTTON_LIST['A'])
        ] : [
            segment.at(UID),
            '\n签到成功！',
            `\n光遇ID: ${UD['GAME_ID']}`,
            `\n已累计签到 [${UD['ACCUMULATE']}] 天`,
            `\n获得白蜡: ${CD['a']} | 季蜡：${CD['b']}`
        ])
    }

    /** 光遇信息 */
    async F_2(e) {
        if (!IEU(e)) return
        const UID = e.user_id
        const UF = `${AUFP}${UID}.json`

        const UD = JSON.parse(fs.readFileSync(UF, 'utf8'))

        let GD = '暂未加入团队'
        if (UD['GROUP'] !== '') {
            GD = JSON.parse(fs.readFileSync(`${AGFP}${UD['GROUP']}.json`, 'utf8'))
            GD = GD['NACKNAME']
        }

        return e.reply((e.adapter === 'QQBot') ? [
            segment.at(UID),
            `# 玩家ID: ${UD['GAME_ID']}`,
            '***',
            `# 玩家昵称: ${UD['GAME_NICKNAME']}`,
            `># 白蜡 [${UD['CURRENCY_1']}] 季蜡 [${UD['CURRENCY_2']}]`,
            `># 爱心 [0] 红蜡 [0]`,
            `最近签到日期: ${UD['LAST_DATE']}`,
            `累签次数 [${UD['ACCUMULATE']}]`,
            `所在位置 [${UD['LOCATION']}]`,
            `模拟跑图状态 [${UD['SIMULATED_STATE']}]`,
            Bot.Button(BUTTON_LIST['A'])
        ] : [
            segment.at(UID),
            `\n玩家ID: ${UD['GAME_ID']}`,
            '\n————————————————————',
            `\n玩家昵称: ${UD['GAME_NICKNAME']}`,
            `\n白蜡 [${UD['CURRENCY_1']}] 季蜡 [${UD['CURRENCY_2']}]`,
            `\n爱心 [0] 红蜡 [0]`,
            `\n最近签到日期: ${UD['LAST_DATE']}\n累签次数 [${UD['ACCUMULATE']}]`,
            `\n所在位置 [${UD['LOCATION']}]\n模拟跑图状态 [${UD['SIMULATED_STATE']}]`,
        ])
    }

    /** 模拟跑图 */
    async F_3(e) {
        if (!IEU(e)) return
        const UID = e.user_id
        const UF = `${AUFP}${UID}.json`
        const CD = GCD()

        const UD = JSON.parse(fs.readFileSync(UF, 'utf8'))

        const TT = GTT(UD['TIMESTAMP'])
        const H = TT['H']
        const M = TT['M']
        const S = TT['S']

        if (UD['SIMULATED_STATE'])
            return e.reply((e.adapter === 'QQBot') ? [
                '# 您当前已经在跑图了',
                `> 已跑图[${H}]时[${M}]分[${S}]秒`,
                segment.at(UID),
                Bot.Button([[
                    { label: '结束', callback: '/结束跑图' },
                    { label: '状态', callback: '/跑图状态' },
                    { label: '信息', callback: '/光遇信息' }
                ]])
            ] : [
                segment.at(UID),
                `\n您当前已经在跑图了\n已跑图[${H}]时[${M}]分[${S}]秒`
            ])

        UD['SIMULATED_STATE'] = true
        UD['TIMESTAMP'] = Date.now()

        SD(UF, UD)

        return e.reply((e.adapter === 'QQBot') ? [
            '# 已开始模拟跑图',
            `> 每分钟[${CD['d']}]白蜡 | 上限[${CD['c']}]白蜡`,
            segment.at(UID),
            Bot.Button([[
                { label: '结束', callback: '/结束跑图' },
                { label: '信息', callback: '/光遇信息' }
            ]])
        ] : [
            segment.at(UID),
            `\n已开始模拟跑图\n每分钟[${CD['d']}]白蜡 | 上限[${CD['c']}]白蜡`
        ])
    }

    /** 结束跑图 */
    async F_4(e) {
        if (!IEU(e)) return
        const UID = e.user_id
        const UF = `${AUFP}${UID}.json`
        const CD = GCD()

        const UD = JSON.parse(fs.readFileSync(UF, 'utf8'))
        const MAP_DATA = JSON.parse(fs.readFileSync(MFP, 'utf8'))

        if (!UD['SIMULATED_STATE'])
            return e.reply((e.adapter === 'QQBot') ? [
                '# 您当前并没有在跑图呢',
                segment.at(UID),
                Bot.Button([[
                    { label: '跑图', callback: '/模拟跑图' }
                ]])
            ] : [
                segment.at(UID),
                `\n您当前并没有在跑图呢`
            ])

        const TT = GTT(UD['TIMESTAMP'])
        const RM = ML[Math.floor(Math.random() * ML.length)]
        const UL = UD['LOCATION']
        const H = TT['H']
        const M = TT['M']
        const S = TT['S']

        let GC1 = ((H * 60) + M) * CD['d']
        let T = ''
        if (GC1 > CD['c']) {
            T = `理论获得白蜡[${GC1}]，但超出上限，所以`
            GC1 = CD['c']
        }

        UD['SIMULATED_STATE'] = false
        UD['CURRENCY_1'] += GC1
        UD['LOCATION'] = RM
        MAP_DATA[UL] = MAP_DATA[UL].filter(item => item !== UD['ID'])
        MAP_DATA[RM].push(UD['ID'])
        SD(MFP, MAP_DATA)
        SD(UF, UD)

        return e.reply((e.adapter === 'QQBot') ? [
            '# 已结束本次跑图',
            `> 本次跑图抵达[${RM}]`,
            `用时[${H}]时[${M}]分[${S}]秒`, T,
            `获得白蜡[${GC1}]`,
            segment.at(UID),
            Bot.Button([[
                { label: '信息', callback: '/光遇信息' },
                { label: '跑图', callback: '/模拟跑图' }
            ]])
        ] : [
            segment.at(UID),
            `\n已结束本次跑图\n本次跑图抵达[${RM}]\n用时[${H}]时[${M}]分[${S}]秒\n${T}获得白蜡[${GC1}]`
        ])
    }

    /** 跑图状态 */
    async F_5(e) {
        if (!IEU(e)) return
        const UID = e.user_id
        const UF = `${AUFP}${UID}.json`
        const CD = GCD()

        const UD = JSON.parse(fs.readFileSync(UF, 'utf8'))

        if (!UD['SIMULATED_STATE'])
            return e.reply((e.adapter === 'QQBot') ? [
                '# 您当前并没有在跑图呢',
                segment.at(UID),
                Bot.Button([[{ label: '跑图', callback: '/模拟跑图' }]])
            ] : [
                segment.at(UID),
                `\n您当前并没有在跑图呢`
            ])

        const TIME_TAKEN = GTT(UD['TIMESTAMP'])
        const H = TIME_TAKEN['H']
        const M = TIME_TAKEN['M']
        const S = TIME_TAKEN['S']

        return e.reply((e.adapter === 'QQBot') ? [
            '# 正在跑图中',
            `> 已跑图[${H}]时[${M}]分[${S}]秒`,
            `每分钟[${CD['d']}]白蜡 | 上限[${CD['c']}]白蜡`,
            segment.at(UID),
            Bot.Button([[
                { label: '信息', callback: '/光遇信息' },
                { label: '结束', callback: '/结束跑图' }
            ]])
        ] : [
            segment.at(UID),
            `正在跑图中\n已跑图[${H}]时[${M}]分[${S}]秒\n每分钟[${CD['d']}]白蜡 | 上限[${CD['c']}]白蜡`
        ])
    }

    /** 光遇地图 */
    async F_6(e) {
        if (!IEU(e)) return
        // 先执行一遍这个
        addarray()
        const UID = e.user_id
        const UF = `${AUFP}${UID}.json`

        const UD = JSON.parse(fs.readFileSync(UF, 'utf8'))
        const MAP_DATA = JSON.parse(fs.readFileSync(MFP, 'utf8'))

        const USER_LOCATION = UD['LOCATION']
        const LOCATION_NUMBER = MAP_DATA[USER_LOCATION].length - 1
        const MAP_LISTS = ML.filter(item => item !== UD['LOCATION'])

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
            segment.at(UID),
            Bot.Button(BUTTON_LIST['B'])
        ] : [
            segment.at(UID),
            `\n您当前在 [${USER_LOCATION}]\n与您在同一地图的玩家共有[${LOCATION_NUMBER}]位\n其他位置玩家人数\n`,
            ...OTHER_LOCATION_NUMBER
        ])
    }

    /** 传送 */
    async F_7(e) {
        if (!IEU(e)) return
        const UID = e.user_id
        const UF = `${AUFP}${UID}.json`

        const LOCATION = e.msg.match(REG_1)[2].replace(/\s/g, '');
        if (!ML.includes(LOCATION))
            return e.reply((e.adapter === 'QQBot') ? [
                '# 没有这个地图',
                '> 您可以发送[光遇地图]查看可传送地图',
                segment.at(UID),
                Bot.Button(BUTTON_LIST['A'])
            ] : [
                segment.at(UID),
                '\n没有这个地图\n您可以发送[光遇地图]查看可传送地图'
            ])

        const UD = JSON.parse(fs.readFileSync(UF, 'utf8'))
        const MAP_DATA = JSON.parse(fs.readFileSync(MFP, 'utf8'))

        if (UD['SIMULATED_STATE'])
            return e.reply((e.adapter === 'QQBot') ? [
                '> 当前正在模拟跑图，无法传送！',
                segment.at(UID),
                Bot.Button(BUTTON_LIST['A'])
            ] : [
                segment.at(UID),
                '\n当前正在模拟跑图，无法传送！'
            ])
        const USER_LOCATION = UD['LOCATION']
        if (LOCATION === USER_LOCATION)
            return e.reply((e.adapter === 'QQBot') ? [
                '# 您已经在这个地图了',
                '> 您可以发送[光遇地图]查看可传送地图',
                segment.at(UID),
                Bot.Button(BUTTON_LIST['A'])
            ] : [
                segment.at(UID),
                '\n您已经在这个地图了\n您可以发送[光遇地图]查看可传送地图'
            ])

        const TIME = _.random(2000, 6000)

        e.reply((e.adapter === 'QQBot') ? [
            '# 开始传送，请稍等',
            '> ', segment.at(UID),
        ] : [
            segment.at(UID),
            '\n开始传送，请稍等'
        ])

        UD['LOCATION'] = LOCATION
        MAP_DATA[USER_LOCATION] = MAP_DATA[USER_LOCATION].filter(item => item !== UD['ID'])
        MAP_DATA[LOCATION].push(UD['ID'])
        SD(UF, UD)
        SD(MFP, MAP_DATA)

        setTimeout(function () {
            return e.reply((e.adapter === 'QQBot') ? [
                '# 传送成功！',
                `> 您已抵达[${LOCATION}]`,
                `耗时[${(TIME / 1000).toFixed(2)}]秒`,
                segment.at(UID),
                Bot.Button([[
                    { label: '查看玩家', callback: '/查看玩家' }
                ]])
            ] : [
                segment.at(UID),
                `\n传送成功！\n您已抵达[${LOCATION}]\n耗时[${(TIME / 1000).toFixed(2)}]秒`
            ])
        }, TIME);
    }

    /** 设置((团队)昵称) */
    async F_8(e) {
        if (!IEU(e)) return
        const UID = e.user_id
        const UF = `${AUFP}${UID}.json`

        const MATCH = e.msg.match(REG_2)
        const SETTINGS = MATCH[2]
        const SETTINGS_CONTENT = MATCH[6]

        const UD = JSON.parse(fs.readFileSync(UF, 'utf8'))
        if (/^(昵称|名称)/.test(SETTINGS)) {
            if (SETTINGS_CONTENT.length < 2 || SETTINGS_CONTENT.length > 12)
                return e.reply((e.adapter === 'QQBot') ? [
                    '# 设置失败！',
                    '> 昵称长度小于2位或大于12位',
                    '请重新设置',
                    segment.at(UID),
                    Bot.Button([[
                        { label: `重新设置`, data: `设置昵称:${SETTINGS_CONTENT}` }
                    ]])
                ] : [
                    segment.at(UID),
                    `\n设置失败！\n昵称长度小于2位或大于12位\n请重新设置`
                ])

            UD['GAME_NICKNAME'] = SETTINGS_CONTENT
            SD(UF, UD)

            return e.reply((e.adapter === 'QQBot') ? [
                '# 设置成功',
                `> 您的新昵称[${SETTINGS_CONTENT}]`,
                segment.at(UID)
            ] : [
                segment.at(UID),
                `\n设置成功！\n您的新昵称[${SETTINGS_CONTENT}]`
            ])
        } else if (/^团队(昵称|名称)/.test(SETTINGS)) {
            const GROUP_FILE = AGFP + UD['GROUP'] + '.json'

            if (UD['GROUP'] === '') // 无团队
                return e.reply((e.adapter === 'QQBot') ? [
                    '# 您尚未创建团队',
                    '> ', segment.at(UID),
                    Bot.Button([[{ lanel: '创建团队' }]])
                ] : [
                    segment.at(UID),
                    '\n您尚未创建团队'
                ])


            if (SETTINGS_CONTENT.length < 2 || SETTINGS_CONTENT.length > 8)
                return e.reply((e.adapter === 'QQBot') ? [
                    '# 设置失败！',
                    '> 长度小于2位或大于8位',
                    '请重新设置',
                    segment.at(UID),
                    Bot.Button([[{ callback: '重新设置', data: `设置团队昵称:${SETTINGS_CONTENT}` }]])
                ] : [
                    segment.at(UID),
                    `\n设置失败！\n长度小于2位或大于8位\n请重新设置`
                ])

            const GROUP_DATA = JSON.parse(fs.readFileSync(GROUP_FILE, 'utf8'))

            if (GROUP_DATA['LEADER'] !== UID)
                return e.reply((e.adapter === 'QQBot') ? [
                    '# 您不是团长！',
                    '> 无法设置团名',
                    segment.at(UID),
                ] : [
                    segment.at(UID),
                    '\n您不是团长！\n无法设置团名'
                ])

            GROUP_DATA['NACKNAME'] = SETTINGS_CONTENT
            SD(GROUP_FILE, GROUP_DATA)

            return e.reply((e.adapter === 'QQBot') ? [
                '# 设置成功',
                `> 团队新昵称[${SETTINGS_CONTENT}]`,
                segment.at(UID)
            ] : [
                segment.at(UID),
                `\n设置成功！\n团队新昵称[${SETTINGS_CONTENT}]`
            ])
        }
    }

    /** 创建团队 */
    async F_9(e) {
        if (!IEU(e)) return
        const UID = e.user_id
        const UF = `${AUFP}${UID}.json`
        const UD = JSON.parse(fs.readFileSync(UF, 'utf8'))

        if (UD['CURRENCY_1'] < 10000 && UD['CURRENCY_2'] < 320)
            return e.reply((e.adapter === 'QQBot') ? [
                '# 资金不足！',
                '> 需要白蜡[10000] | 季蜡[320]',
                segment.at(UID)
            ] : [
                segment.at(UID),
                '\n资金不足！\n需要白蜡[10000] | 季蜡[320]'
            ])

        if (UD['GROUP'] !== '')
            return e.reply((e.adapter === 'QQBot') ? [
                '# 您已经有团队了',
                '> 请先退出再建立团队',
                segment.at(UID),
                Bot.Button([[{ label: '退出团队' }]])
            ] : [
                segment.at(UID),
                '您已经有团了\n请先退出再建立团队'
            ])

        const GROUP_FILE = AGFP + UID + '.json'
        const GROUP_NUMBER = (fs.readdirSync(AGFP).length) + 1

        UD['CURRENCY_1'] -= 10000
        UD['CURRENCY_2'] -= 320
        UD['GROUP'] = `${UID}`
        SD(UF, UD)
        SD(GROUP_FILE, {
            FOUNDER: UID, // 创建者ID
            LEADER: UID, // 团长ID
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
            segment.at(UID),
            Bot.Button([[{ label: '设置团队昵称', data: '设置团队昵称' }]])
        ] : [
            segment.at(UID),
            `\n创建成功！\n团队编号[${GROUP_NUMBER}]\n团队昵称[未命名团队${GROUP_NUMBER}]\n可用指令[设置团队昵称:(名称)]来设置名称`
        ])
    }

    /** 团队信息 */
    async F_10(e) {
        if (!IEU(e)) return
        const UID = e.user_id
        const UD = JSON.parse(fs.readFileSync(`${AUFP}${UID}.json`, 'utf8'))

        if (UD['GROUP'] === '') return e.reply((e.adapter === 'QQBot') ? [
            '# 您尚未加入(或创建)团队',
            '> ', segment.at(UID)
        ] : [
            segment.at(UID),
            '\n您尚未加入(或创建)团队'
        ])

        const GROUP_DATA = JSON.parse(fs.readFileSync(AGFP + UD['GROUP'] + '.json', 'utf8'))

        let LEADER_NICKNAME = UD['GAME_NICKNAME']
        if (GROUP_DATA['LEADER'] !== UID) {
            const LEADER_DATA = JSON.parse(fs.readFileSync(AUFP + GROUP_DATA['LEADER'] + '.json', 'utf8'))
            LEADER_NICKNAME = LEADER_DATA['GAME_NICKNAME']
        }

        return e.reply((e.adapter === 'QQBot') ? [
            `# [${GROUP_DATA['GROUP_ID']}]${GROUP_DATA['NACKNAME']}`,
            `团长 [${LEADER_NICKNAME}]`,
            `团队成员数量 [${GROUP_DATA['MEMBERS'].length}]位`,
            `贡献池数量 [${GROUP_DATA['CONTRIBUTIONS_POOL']}] | 等级 [${GROUP_DATA['CONTRIBUTIONS_LEVEL']}]`,
            segment.at(UID)
        ] : [
            segment.at(UID),
            `\n[${GROUP_DATA['GROUP_ID']}]${GROUP_DATA['NACKNAME']}`,
            `\n团长 [${LEADER_NICKNAME}]`,
            `\n团队成员数量 [${GROUP_DATA['MEMBERS'].length}]位`,
            `\n贡献池数量 [${GROUP_DATA['CONTRIBUTIONS_POOL']}] | 等级 [${GROUP_DATA['CONTRIBUTIONS_LEVEL']}]`
        ])
    }

    /** 查看玩家 */
    async F_11(e) {
        if (!IEU(e)) return
        const UID = e.user_id
        const UD = JSON.parse(fs.readFileSync(`${AUFP}${UID}.json`, 'utf8'))
        const MAP_DATA = JSON.parse(fs.readFileSync(MFP, 'utf8'))
        const NEARBY_USER = MAP_DATA[UD['LOCATION']]

        if (/^(#|\/)?查看玩家$/.test(e.msg)) {
            let REPLY_ARRAY = []
            let USER_NUMBER = NEARBY_USER.length > 10 ? 10 : NEARBY_USER.length
            for (let i = 0; i < USER_NUMBER; i++) {
                const USER_DATAS = JSON.parse(fs.readFileSync(AUFP + NEARBY_USER[i] + '.json', 'utf8'))
                REPLY_ARRAY.push(`${i + 1}、[${USER_DATAS['GAME_NICKNAME'].replace(/_/, '')}]`)
                if (e.adapter !== 'QQBot') REPLY_ARRAY.push('\n')
            }

            return e.reply((e.adapter === 'QQBot') ? [
                '# 附近玩家(最高展示十位)',
                '> ', ...REPLY_ARRAY,
                Bot.Button([[{ label: '查看玩家+序号', data: '查看玩家1' }]])
            ] : [
                segment.at(UID),
                '\n附近玩家(最高展示十位)\n',
                ...REPLY_ARRAY
            ])
        } else {
            const SERIAL_NUMBER = parseInt(e.msg.replace(/#|\/|查看玩家/, '').replace(/\s/g, '')) - 1

            if (typeof SERIAL_NUMBER !== 'number' && isNaN(SERIAL_NUMBER))
                return e.reply((e.adapter === 'QQBot') ? [
                    '# 请输入纯数字！',
                    '> ', segment.at(UID)
                ] : [
                    segment.at(UID),
                    '请输入纯数字！'
                ])

            const QUERYING_USER_DATA = JSON.parse(fs.readFileSync(AUFP + NEARBY_USER[SERIAL_NUMBER] + '.json', 'utf8'))

            let GROUP_DATA = '暂未加入团队'
            if (QUERYING_USER_DATA['GROUP'] !== '') {
                GROUP_DATA = JSON.parse(fs.readFileSync(AGFP + QUERYING_USER_DATA['GROUP'] + '.json', 'utf8'))
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
                segment.at(UID),
                Bot.Button(BUTTON_LIST['A'])
            ] : [
                segment.at(UID),
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

    async F_12(e) {
        const FL = fs.readdirSync(AUFP);

        let C1 = [];
        let C2 = [];

        FL.forEach(F => {
            if (path.extname(F) === '.json') {
                const FP = path.join(AUFP, F);
                const UD = JSON.parse(fs.readFileSync(FP, 'utf8'));

                const UD_GID = UD['GAME_ID']
                const UD_C1 = UD['CURRENCY_1']
                const UD_C2 = UD['CURRENCY_2']

                C1.push({ UD_GID, UD_C1 });
                C2.push({ UD_GID, UD_C2 })
            }
        });

        C1.sort((a, b) => b.UD_C1 - a.UD_C1);
        C2.sort((a, b) => b.UD_C2 - a.UD_C2);
        C1 = C1.slice(0, 12)
        C2 = C2.slice(0, 12)

        // 返回排名
        const C1SR = C1.map((item, index) => `># No.${index + 1} ➠➠ID: ${item.UD_GID}\n白蜡[${item.UD_C1}]\n`);
        const C2SR = C2.map((item, index) => `># No.${index + 1} ➠➠ID: ${item.UD_GID}\n季蜡[${item.UD_C2}]\n`);

        const RT = e.msg.match(/^(#|\/)?(白蜡|季蜡)排行榜$/)[2]
        if (RT === '光遇') return e.reply([
            '> 选择排行榜查看',
            Bot.Button([[{ label: '白蜡', callback: '白蜡排行榜' }, { label: '季蜡', callback: '季蜡排行榜' }]])
        ])
        if (RT === '白蜡') return FR(e, RT, C1SR)
        if (RT === '季蜡') return FR(e, RT, C2SR)
    }
}

/** 计算用时 */
function GTT(ST) {
    const TD = Date.now() - ST
    const H = Math.floor(TD / 3600000)
    const M = Math.floor((TD % 3600000) / 60000)
    const S = Math.floor((TD % 60000) / 1000)
    return { H, M, S }
}

/** 读取配置 */
function GCD() {
    const DATA = JSON.parse(fs.readFileSync(CFP, 'utf8'))
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
function IEU(e) {
    const UID = e.user_id
    if (!fs.existsSync(`${AUFP}${UID}.json`)) {
        e.reply((e.adapter === 'QQBot') ? [
            '# 没有您的用户信息',
            '> 请先发送[光遇签到]创建',
            segment.at(UID),
            Bot.Button([[{ label: '光遇签到' }]])
        ] : [
            segment.at(UID),
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
function SD(FILE, DATA) { fs.writeFileSync(FILE, JSON.stringify(DATA, null, 4), 'utf8') }

/** 当前日期(YYYY-MM-DD) */
function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function addarray() {
    const MAP_DATA = JSON.parse(fs.readFileSync(MFP, 'utf8'))
    fs.readdir(AUFP, (err, files) => {
        if (err) {
            logger.error('Error reading folder:', err);
            return;
        }

        files.forEach(file => {
            if (path.extname(file) === '.json') {
                const filePath = path.join(AUFP, file);
                const data = fs.readFileSync(filePath, 'utf8');
                const json = JSON.parse(data);

                const location = json.LOCATION;
                const id = json.ID;

                if (!MAP_DATA[location].includes(id)) {
                    MAP_DATA[location].push(id);
                }
            }
        });
        SD(MFP, MAP_DATA)
    });
}

function FR(e, RT, RD) {
    return e.reply((e.adapter === 'QQBot') ? [
        `# ${RT}排行榜`,
        ...RD
    ] : [
        `${RT}排行榜\n`,
        ...RD
    ]);
}
function BT_1(L, C) {
    return { label: L, callback: C }
}
function BT_2(L, D) {
    return { label: L, data: D }
}