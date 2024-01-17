import fs from 'fs';
import { render } from '../components/index.js';
import { GetData, UserFiles, SaveData } from '../utils/db.js';

export class 娱乐_抢蜡烛 extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]娱乐:抢蜡烛',
      dsc: '娱乐抢蜡烛',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^(#|\/)?抢蜡烛$/,
          fnc: 'ROD'
        },
        {
          reg: /^图片测试$/,
          fnc: 'test'
        }
      ]
    });
  }

  async ROD(e) {
    const USER_ID = e.user_id;
    if (!UserFiles(USER_ID)) { return e.reply('请先发送光遇签到'); }

    const COOLING_TIME = 2 * 60 * 60 * 1000;

    const NOW_DATE = Date.now();

    const ALL_USER_FILE_LOCATION = 'plugins/Tlon-Sky/data/Sky签到/';
    const USER_FILE = `${ALL_USER_FILE_LOCATION}${USER_ID}.json`;

    if (e.at === USER_ID) { return e.reply('不可自己抢自己'); }

    let OBJECTS_USER_ID;
    if (e.atme === true || e.at === undefined || e.at === null) {
      const ALL_USER_FILE_LISTS = fs.readdirSync(ALL_USER_FILE_LOCATION);
      const RANDOM_FILE = ALL_USER_FILE_LISTS[Math.floor(Math.random() * ALL_USER_FILE_LISTS.length)];
      const RANDOM_FILENAME = RANDOM_FILE.replace(/.json/g, "");
      OBJECTS_USER_ID = RANDOM_FILENAME;
    } else { OBJECTS_USER_ID = e.at; }

    const USER_DATA = GetData(USER_FILE);
    const LAST_EXECUTION_TIME = USER_DATA['上次抢蜡烛时间戳'] || 0;

    if (NOW_DATE - LAST_EXECUTION_TIME < COOLING_TIME) {
      const REMAINING_TIME = COOLING_TIME - (NOW_DATE - LAST_EXECUTION_TIME);
      if (REMAINING_TIME > 0) {
        const HOUR = Math.floor(REMAINING_TIME / (60 * 60 * 1000));
        const MINUTES = Math.floor((REMAINING_TIME % (60 * 60 * 1000)) / (60 * 1000));
        const SECOND = Math.floor((REMAINING_TIME % (60 * 1000)) / 1000);

        const END_TIME_STAMP = NOW_DATE + REMAINING_TIME;
        const END_TIME = new Date(END_TIME_STAMP).toLocaleString();

        if (HOUR === 0) {
          return e.reply(`抢蜡烛CD中！\n请等待 ${MINUTES} 分钟 ${SECOND} 秒后再试！\nCD结束时间：${END_TIME}`);
        } else if (MINUTES === 0) {
          return e.reply(`抢蜡烛CD中！\n请等待 ${SECOND} 秒后再试！\nCD结束时间：${END_TIME}`);
        } else {
          return e.reply(`抢蜡烛CD中！\n请等待 ${HOUR} 小时 ${MINUTES} 分钟 ${SECOND} 秒后再试！\nCD结束时间：${END_TIME}`);
        }
      }
    }

    const OBJECTS_USER_FILE = `${ALL_USER_FILE_LOCATION}${OBJECTS_USER_ID}.json`;
    const OBJECTS_USER_DATA = GetData(OBJECTS_USER_FILE);

    let STATE = 0;
    if (OBJECTS_USER_DATA['背包']['蜡烛保护卡'] >= 1) {
      OBJECTS_USER_DATA['背包']['蜡烛保护卡'] -= 1;
      USER_DATA['上次抢蜡烛时间戳'] = NOW_DATE;
      SaveData(USER_FILE, USER_DATA);
      STATE = 1;
    }

    let QUANTITY;
    if (OBJECTS_USER_DATA['白蜡'] < 30) {
      QUANTITY = Math.floor(Math.random() * OBJECTS_USER_DATA['白蜡']) + 1;
    } else {
      QUANTITY = Math.floor(Math.random() * 30) + 1;
    }

    if (STATE === 1) { STATE = '抢蜡烛失败，对方有保护卡'; QUANTITY = 0; } else { STATE = ''; }

    if (OBJECTS_USER_DATA['白蜡'] >= QUANTITY) {
      OBJECTS_USER_DATA['白蜡'] -= QUANTITY;
      OBJECTS_USER_DATA['被抢次数'] += 1;
      OBJECTS_USER_DATA['被抢蜡烛总数'] += QUANTITY;

      USER_DATA['白蜡'] += QUANTITY;
      USER_DATA['抢蜡烛次数'] += 1;
      USER_DATA['抢蜡烛总数'] += QUANTITY;
      USER_DATA['上次抢蜡烛时间戳'] = NOW_DATE;

      let html = {
        抢蜡烛状态: STATE,
        头像: `https://q.qlogo.cn/g?b=qq&nk=${USER_DATA['头像']}&s=640`,
        被抢人头像: `https://q.qlogo.cn/g?b=qq&nk=${OBJECTS_USER_DATA['头像']}&s=640`,
        用户ID: USER_ID,
        被抢用户ID: OBJECTS_USER_ID,
        昵称: USER_DATA['昵称'],
        被抢人昵称: OBJECTS_USER_DATA['昵称'],
        当前蜡烛: USER_DATA['白蜡'] - QUANTITY,
        被抢人当前蜡烛: OBJECTS_USER_DATA['白蜡'] + QUANTITY,
        当前抢蜡烛次数: USER_DATA['抢蜡烛次数'] - 1,
        当前被抢次数: OBJECTS_USER_DATA['被抢次数'] - 1,
        抢得蜡烛: QUANTITY
      }

      SaveData(OBJECTS_USER_FILE, OBJECTS_USER_DATA);
      SaveData(USER_FILE, USER_DATA);

      await render('admin/抢蜡烛', { ...html }, { e, scale: 1.4 });
    } else {
      const REPLY = [
        '对不起，被抢的人蜡烛数量不足！\n' +
        '【' + OBJECTS_USER_DATA['昵称'] + '】仅剩「' + OBJECTS_USER_DATA['白蜡'] + '」个白蜡\n' +
        '无法被抢走「' + QUANTITY + '」个白蜡，请再次发送抢蜡烛'
      ];
      return e.reply(REPLY, true, { recallMsg: 15 });
    }
  }

  async test(e) {
    const html = {
      抢蜡烛状态: '',
      头像: `https://q.qlogo.cn/g?b=qq&nk=3620060826&s=640`,
      被抢人头像: `https://q.qlogo.cn/g?b=qq&nk=1947425850&s=640`,
      用户ID: 3620060826,
      被抢用户ID: 1947425850,
      昵称: 'Tloml-Starry',
      被抢人昵称: '傅卿何',
      当前蜡烛: 100,
      被抢人当前蜡烛: 100,
      当前抢蜡烛次数: 10,
      当前被抢次数: 10,
      抢得蜡烛: 10
    }
    await render('admin/抢蜡烛', { ...html }, { e, scale: 1.4 });
  }
}