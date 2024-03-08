import fs from 'fs';
import { render } from '../components/index.js';
import { GUD, ITUE, SD } from '../utils/db.js';

export class SKY extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]娱乐:抢蜡烛',
      dsc: 'Tlon-Sky',
      event: 'message',
      priority: 1,
      rule: [{
        reg: /^(#|\/)?抢蜡烛$/,
        fnc: 'grabCandle'
      }]
    })
  }

  async grabCandle(e) {
    const USER_ID = e.user_id

    if (!ITUE(USER_ID)) { return e.reply((e.adapter === 'QQBot') ? ['> 请先发送光遇签到', Bot.Button([[{ label: '光遇签到', callback: '/光遇签到' }]])] : '请先发送光遇签到') }
    if (e.at === USER_ID) { return e.reply((e.adapter === 'QQBot') ? ['> 不可自己抢自己！', Bot.Botton([[{ label: '抢蜡烛', callback: '/抢蜡烛' }]])] : '不可自己抢自己！') }

    const COOLING_TIME = (2 * 60 * 60 * 1000) - 10000;

    const NOW_DATE = Date.now();

    const ALL_USER_FILE_LOCATION = 'plugins/Tlon-Sky/data/Sky签到/';
    const USER_FILE = `${ALL_USER_FILE_LOCATION}${USER_ID}.json`;

    const USER_DATA = GUD(USER_ID)
    const LAST_EXECUTION_TIME = USER_DATA['上次抢蜡烛时间戳']

    if (NOW_DATE - LAST_EXECUTION_TIME < COOLING_TIME) {
      const REMAINING_TIME = COOLING_TIME - (NOW_DATE - LAST_EXECUTION_TIME)
      if (REMAINING_TIME > 0) {
        const HOUR = Math.floor(REMAINING_TIME / (60 * 60 * 1000));
        const MINUTES = Math.floor((REMAINING_TIME % (60 * 60 * 1000)) / (60 * 1000));
        const SECOND = Math.floor((REMAINING_TIME % (60 * 1000)) / 1000);

        const END_TIME_STAMP = NOW_DATE + REMAINING_TIME;
        const END_TIME = new Date(END_TIME_STAMP).toLocaleString();

        let Reply
        if (HOUR === 0 && MINUTES === 0) { Reply = (e.adapter === 'QQBot') ? ['# CD中...', `> 请等待${SECOND}秒后再试`, `CD结束时间：**${END_TIME}**`] : `CD中...\n请等待 ${SECOND} 秒后再试！\nCD结束时间：${END_TIME}` }
        else if (HOUR === 0 && MINUTES !== 0) { Reply = (e.adapter === 'QQBot') ? ['# CD中...', `> 请等待${MINUTES}分钟${SECOND}秒后再试`, `CD结束时间：**${END_TIME}**`] : `CD中...\n请等待 ${MINUTES} 分钟 ${SECOND} 秒后再试！\nCD结束时间：${END_TIME}` }
        else if (HOUR !== 0 && MINUTES !== 0) { Reply = (e.adapter === 'QQBot') ? ['# CD中...', `> 请等待${HOUR}小时${MINUTES}分钟${SECOND}秒后再试`, `CD结束时间：**${END_TIME}**`] : `CD中...\n请等待 ${HOUR} 小时 ${MINUTES} 分钟 ${SECOND} 秒后再试！\nCD结束时间：${END_TIME}` }
        return e.reply(Reply)
      }
    }

    let OBJECTS_USER_ID
    if (e.atme || !e.at) {
      const ALL_USER_FILE_LISTS = fs.readdirSync(ALL_USER_FILE_LOCATION)
      const RANDOM_FILE = ALL_USER_FILE_LISTS[Math.floor(Math.random() * ALL_USER_FILE_LISTS.length)]
      OBJECTS_USER_ID = RANDOM_FILE.replace(/.json/g, "")
    } else { OBJECTS_USER_ID = e.at }

    const OBJECTS_USER_FILE = `${ALL_USER_FILE_LOCATION}${OBJECTS_USER_ID}.json`

    if (!ITUE(OBJECTS_USER_ID)) { return e.reply('对方没有存档，无法抢蜡烛') }

    const OBJECTS_USER_DATA = GUD(OBJECTS_USER_ID);
    const OBJECTS_BL = OBJECTS_USER_DATA['白蜡']

    let IS_PROTECTION = false
    if (OBJECTS_USER_DATA['背包']['蜡烛保护卡'] >= 1) { OBJECTS_USER_DATA['背包']['蜡烛保护卡'] -= 1; IS_PROTECTION = true }

    let QUANTITY
    if (OBJECTS_BL < 30) { QUANTITY = Math.floor(Math.random() * OBJECTS_BL) + 1 } else { QUANTITY = Math.floor(Math.random() * 30) + 1 }


    if (IS_PROTECTION) { IS_PROTECTION = '抢蜡烛失败，对方有保护卡'; QUANTITY = 0; } else { IS_PROTECTION = '' }

    if (OBJECTS_BL < QUANTITY) return e.reply((e.adapter === 'QQBot') ? ['# 被抢用户太穷啦~', `> 对方仅剩[${OBJECTS_BL}]个白蜡`, `无法被抢走[${QUANTITY}]个白蜡，请再次发送抢蜡烛`, Bot.Button([[{ label: '抢蜡烛', callback: '/抢蜡烛' }]])] : `被抢用户太穷啦~\n对方仅剩[${OBJECTS_BL}]个白蜡\n无法被抢走[${QUANTITY}]个白蜡，请再次发送抢蜡烛`)

    OBJECTS_USER_DATA['白蜡'] -= QUANTITY
    OBJECTS_USER_DATA['被抢次数'] += 1
    OBJECTS_USER_DATA['被抢蜡烛总数'] += QUANTITY
    USER_DATA['白蜡'] += QUANTITY
    USER_DATA['抢蜡烛次数'] += 1
    USER_DATA['抢蜡烛总数'] += QUANTITY
    USER_DATA['上次抢蜡烛时间戳'] = NOW_DATE
    SD(OBJECTS_USER_FILE, OBJECTS_USER_DATA)
    SD(USER_FILE, USER_DATA)

    await render('admin/抢蜡烛', {
      抢蜡烛状态: IS_PROTECTION,
      头像: `https://q.qlogo.cn/g?b=qq&nk=${USER_DATA['头像']}&s=640`,
      被抢人头像: `https://q.qlogo.cn/g?b=qq&nk=${OBJECTS_USER_DATA['头像']}&s=640`,
      用户ID: USER_ID,
      被抢用户ID: OBJECTS_USER_ID,
      昵称: USER_DATA['昵称'],
      被抢人昵称: OBJECTS_USER_DATA['昵称'],
      当前蜡烛: USER_DATA['白蜡'] - QUANTITY,
      被抢人当前蜡烛: OBJECTS_BL,
      当前抢蜡烛次数: USER_DATA['抢蜡烛次数'] - 1,
      当前被抢次数: OBJECTS_USER_DATA['被抢次数'] - 1,
      抢得蜡烛: QUANTITY
    }, { e, scale: 1.4 })
    return Bot.Button([[
      { label: '我抢！', callback: '/抢蜡烛' },
      { label: '光遇信息', callback: '/光遇信息' },
      { label: '签到', callback: '/光遇签到' }
    ]])
  }
}