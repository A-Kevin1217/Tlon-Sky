import fs from 'fs';
import { render } from '../components/index.js';
import { SD, GUD, ITUE, GD } from '../utils/db.js';

const NOSUT_FILE = 'plugins/Tlon-Sky/data/NOSUT.json'
if (!fs.existsSync(NOSUT_FILE)) fs.writeFileSync(NOSUT_FILE, JSON.stringify({}, null, 4))
export class SKY extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]娱乐:签到',
      dsc: 'Tlon-Sky',
      event: 'message',
      priority: 1,
      rule: [{
        reg: /^(#|\/)?光遇签到$/,
        fnc: 'skyEncounterCheckIn'
      }, {
        reg: /^(#|\/)?设置昵称(.*)$/,
        fnc: 'setNickname'
      }, {
        reg: /^(#|\/)?设置头像(.*)$/,
        fnc: 'setAvatar'
      }]
    })
  }

  async skyEncounterCheckIn(e) {
    const USER_ID = e.user_id;
    const USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${USER_ID}.json`

    let REPLY = []
    if (!ITUE(USER_ID)) REPLY = newUser(e)

    const USER_DATA = GUD(USER_ID)
    const NOSUT_DATA = GD(NOSUT_FILE)

    const CONSECUTIVE_DAYS = USER_DATA['连续签到天数']
    const DATE_LAST = USER_DATA['最后签到日期']
    const TODAY_TIME = getCurrentDate()

    if (DATE_LAST === TODAY_TIME) {
      return e.reply((e.adapter === 'QQBot') ? [
        '> 今日已签，请明日再来',
        Bot.Button([[{ label: '光遇信息', callback: '/光遇信息' }]])
      ] : [
        segment.at(USER_ID),
        '今日已签，请明日再来'
      ])
    }

    let IS_CONSECUTIVE = false
    if (DATE_LAST === getYesterdayDate()) IS_CONSECUTIVE = true

    let GET_BL = Math.floor(Math.random() * (31 - 20 + 1)) + 20;
    let GET_JL = Math.floor(Math.random() * (11 - 5 + 1)) + 5;
    const GET_NLZ = Math.floor(Math.random() * 30 - 20 + 1) + 20;

    let IS_DOUBLE = false
    if (USER_DATA['背包']['签到双倍卡'] >= 1) {
      GET_BL *= 2; GET_JL *= 2; IS_DOUBLE = true
      USER_DATA['背包']['签到双倍卡'] -= 1;
    }

    NOSUT_DATA[TODAY_TIME] = (NOSUT_DATA[TODAY_TIME] || 0) + 1

    USER_DATA['最后签到日期'] = TODAY_TIME;
    USER_DATA['连续签到天数'] = IS_CONSECUTIVE ? (CONSECUTIVE_DAYS + 1) : 1;
    USER_DATA['累计签到天数'] += 1;
    USER_DATA['白蜡'] += GET_BL;
    USER_DATA['季蜡'] += GET_JL;
    USER_DATA['能量值'] += GET_NLZ;

    if (USER_DATA['能量值'] >= 100) {
      USER_DATA['等级'] += 1;
      USER_DATA['能量值'] -= 100
    }

    SD(USER_FILE, USER_DATA);
    SD(NOSUT_FILE, NOSUT_DATA)

    let BUTTON = ''
    if (e.adapter === 'QQBot') BUTTON = [[
      { label: '光遇信息', callback: '/光遇信息' }
    ], [
      { label: '设置昵称', data: '/设置昵称' },
      { label: '设置头像', data: '/设置头像' }
    ]]

    await render('admin/签到', {
      NICKNAME: USER_DATA['昵称'],
      HEAD_PORTRAIT: `https://q.qlogo.cn/g?b=qq&nk=${USER_DATA['头像']}&s=640`,
      GET_BL,
      GET_JL,
      GET_NLZ,
      LEVEL: USER_DATA['等级'],
      CUMULATIVE_HINT: `你已累计签到 ${USER_DATA['累计签到天数']} 天！`,
      CONSECUTIVE_HINT: IS_CONSECUTIVE ? `你已连续签到 ${CONSECUTIVE_DAYS} 天！` : '',
      USER_NUMBER: (fs.readdirSync('plugins/Tlon-Sky/data/Sky签到')).length,
      OTD: NOSUT_DATA[TODAY_TIME]
    }, { e, scale: 1.4 }, REPLY, BUTTON)
  }

  async setNickname(e) {
    const USER_ID = e.user_id;
    const USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${USER_ID}.json`

    if (!ITUE(USER_ID)) {
      return e.reply((e.adapter === 'QQBot') ? [
        '> 请先发送光遇签到',
        Bot.Button([[{ label: '光遇签到', callback: '/光遇签到' }]])
      ] : [
        segment.at(USER_ID),
        '\n请先发送光遇签到'
      ])
    }

    const NICKNAME = e.msg.replace(/#|\/|设置昵称/g, "").replace(/\s/g, '').replace(/_/g, '')

    if (NICKNAME.length === 0) return e.reply((e.adapter === 'QQBot') ? [
      '# 请在指令后附带需要设置的昵称',
      '> 如：/设置昵称**小秋**',
      Bot.Button([[{ label: '重新设置', data: '/设置昵称' }]])
    ] : [
      segment.at(USER_ID),
      '\n请在指令后附带需要设置的昵称！',
      '\n如：设置昵称小秋'
    ])

    if (NICKNAME.length > 15) return e.reply((e.adapter === 'QQBot') ? [
      '# 昵称长度不可大于十五位！',
      Bot.Button([[{ label: '重新设置', data: '/设置昵称' }]])
    ] : [
      segment.at(USER_ID),
      '\n昵称长度不可大于十五位！'
    ])

    if (NICKNAME.length < 2) return e.reply((e.adapter === 'QQBot') ? [
      '# 昵称长度不可小于两位！',
      Bot.Button([[{ label: '重新设置', data: '/设置昵称' }]])
    ] : [
      segment.at(USER_ID),
      '\n昵称长度不可小于两位！'
    ])

    const USER_DATA = GUD(USER_ID)

    USER_DATA['昵称'] = NICKNAME
    SD(USER_FILE, USER_DATA)

    e.reply((e.adapter === 'QQBot') ? [
      '# 设置成功!',
      `> 您的昵称：**${NICKNAME}**`,
      Bot.Button([[{ label: '设置头像', data: '/设置头像' }]])
    ] : [
      segment.at(USER_ID),
      '\n设置成功！',
      `\n您的昵称：${NICKNAME}`
    ])
  }

  async setAvatar(e) {
    const USER_ID = e.user_id;
    const USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${USER_ID}.json`

    if (!ITUE(USER_ID)) {
      return e.reply((e.adapter === 'QQBot') ? [
        '> 请先发送光遇签到',
        Bot.Button([[{ label: '光遇签到', callback: '/光遇签到' }]])
      ] : [
        segment.at(USER_ID),
        '\n请先发送光遇签到'
      ])
    }

    let match = e.msg.match(/^(#|\/)?设置头像(.*)$/);
    let setting = match ? match[2].replace(/\s/g, '') : null;
    let avatar = Number.isNaN(parseFloat(setting)) ? null : parseFloat(setting);

    if (!avatar) {
      return e.reply((e.adapter === 'QQBot') ? [
        '# 未输入QQ号',
        '> 请附带QQ号，如：/设置头像3620060826',
        Bot.Button([[{ label: '重新设置', data: '/设置头像' }]])
      ] : [
        segment.at(USER_ID),
        '\n请输入纯数字QQ号!'
      ])
    }

    if (avatar <= 10001) {
      e.reply((e.adapter === 'QQBot') ? [
        '# 输入QQ号低于10001',
        `> 默认设置3620060826为头像`,
        Bot.Button([[{ label: '重新设置', data: '/设置头像' }]])
      ] : [
        segment.at(USER_ID),
        '\n输入QQ号不符合规范，默认设置3620060826为头像'
      ]);
      avatar = 3620060826
    }

    const USER_DATA = GUD(USER_ID)

    USER_DATA['头像'] = avatar
    SD(USER_FILE, USER_DATA)

    e.reply((e.adapter === 'QQBot') ? [
      '> 设置成功！',
      segment.image(`https://q.qlogo.cn/g?b=qq&nk=${avatar}&s=640`)
    ] : [
      segment.at(USER_ID),
      '\n设置成功！',
      segment.image(`https://q.qlogo.cn/g?b=qq&nk=${avatar}&s=640`)
    ])
  }
}

// 获取当前日期（YYYY-MM-DD）
function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 获取昨天的日期（YYYY-MM-DD）
function getYesterdayDate() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function newUser(e) {
  const USER_ID = e.user_id
  const USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${USER_ID}.json`
  if (!ITUE(USER_ID)) {
    const CHARACTER = [
      '0', '1', '2', '3', '4', '5',
      '6', '7', '8', '9', 'Q', 'W',
      'E', 'R', 'T', 'Y', 'U', 'I',
      'O', 'P', 'A', 'S', 'D', 'F',
      'G', 'H', 'J', 'K', 'L', 'Z',
      'X', 'C', 'V', 'B', 'N', 'M',
      '※', '★', '❁', '✦', '❂', '♧'
    ]

    let RANDOM_NICKNAMES = ''
    for (let i = 0; i < 7; i++) {
      RANDOM_NICKNAMES += CHARACTER[Math.floor(Math.random() * CHARACTER.length)];
    }

    let AVATAR
    if (typeof USER_ID === 'number') AVATAR = USER_ID
    if (typeof USER_ID !== 'number') AVATAR = Bot.uin

    SD(USER_FILE, {
      ID: USER_ID,
      昵称: RANDOM_NICKNAMES,
      头像: AVATAR,
      最后签到日期: '',
      连续签到天数: 0, 累计签到天数: 0,
      能量值: 0, 等级: 0, 白蜡: 0, 季蜡: 0,
      抢蜡烛次数: 0, 被抢次数: 0,
      抢蜡烛总数: 0, 被抢蜡烛总数: 0,
      上次抢蜡烛时间戳: 0,
      胜: 0, 负: 0, 平: 0,
      赚取: 0, 亏损: 0,
      总赠送数量: 0, 总收入数量: 0,
      背包: { 蜡烛保护卡: 0, 签到双倍卡: 0 }
    })

    let REPLY = []
    const TNOU = (fs.readdirSync('plugins/Tlon-Sky/data/Sky签到')).length
    if (e.adapter === 'QQBot') {
      REPLY = [
        `# 您是第${TNOU}位用户`,
        '> 设置昵称(昵称)丨可设置昵称',
        '设置头像(QQ号)丨可设置为QQ头像',
        '指令示例：',
        '设置昵称小秋',
        '设置头像114514'
      ]
    } else {
      REPLY = [
        segment.at(e.user_id),
        `\n您是第${TNOU}位用户`,
        '\n设置昵称[Nickname]可设置昵称',
        '\n设置头像[QQ号]可设置为QQ头像',
      ]
    }
    return REPLY
  }
}