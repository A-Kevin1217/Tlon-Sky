import fs from 'fs';
import lodash from 'lodash';
import { render } from '../components/index.js';
import { GetData, SaveData } from '../utils/db.js';

export class 娱乐_签到 extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]娱乐:签到',
      dsc: '娱乐签到',
      event: 'message',
      priority: 1,
      rule: [
        {
          reg: /^(#|\/)?(光遇签到|冒泡)$/,
          fnc: 'SIGN_IN'
        },
        {
          reg: /^(#|\/)?设置昵称(.*)$/,
          fnc: 'SETTING_A_NICKNAME'
        },
        {
          reg: /^(#|\/)?设置头像(\d+)$/,
          fnc: 'SETTING_THE_AVATAR'
        }
      ]
    })
  }
  async SIGN_IN(e) {
    const USER_ID = e.user_id;

    const USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${USER_ID}.json`;

    if (!fs.existsSync(USER_FILE)) {
      const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let RANDOM_NICKNAMES = '';
      for (let i = 0; i < 15; i++) {
        const RANDOM_INDEX = Math.floor(Math.random() * CHARACTERS.length);
        const RANDOM_CHAR = CHARACTERS.charAt(RANDOM_INDEX);
        RANDOM_NICKNAMES += RANDOM_CHAR;
      }
      const USER_INFO = {
        ID: USER_ID,
        昵称: RANDOM_NICKNAMES,
        头像: 3620060826,
        最后签到日期: null,
        连续签到天数: 0,
        累计签到天数: 0,
        能量值: 0,
        等级: 0,
        白蜡: 0,
        季蜡: 0,
        抢蜡烛次数: 0,
        被抢次数: 0,
        抢蜡烛总数: 0,
        被抢蜡烛总数: 0,
        上次抢蜡烛时间戳: 0,
        胜: 0,
        负: 0,
        平: 0,
        赚取: 0,
        亏损: 0,
        总赠送数量: 0,
        总收入数量: 0,
        背包: {
          蜡烛保护卡: 0,
          签到双倍卡: 0
        }
      }
      SaveData(USER_FILE, USER_INFO);
      const REPLY = [
        '“设置昵称[昵称]”指令可设置昵称\n' +
        '“设置头像[QQ号]”可设置头像为QQ头像\n' +
        '中括号不用带!'
      ];
      e.reply(REPLY);
    }

    const USER_DATA = GetData(USER_FILE);

    if (USER_DATA['最后签到日期'] === getCurrentDate()) { return e.reply('今日已签'); }

    const 连签天数 = USER_DATA['连续签到天数'] || 0;
    const 累签天数 = USER_DATA['累计签到天数'] || 0;

    let is连续签到 = false;
    if (USER_DATA['最后签到日期'] === getYesterdayDate()) { is连续签到 = true; }

    let Get白蜡 = Math.floor(Math.random() * (31 - 20 + 1)) + 20;
    let Get季蜡 = Math.floor(Math.random() * (11 - 5 + 1)) + 5;
    const Get能量值 = Math.floor(Math.random() * 30 - 20 + 1) + 20;

    if (USER_DATA['背包']['签到双倍卡'] >= 1) {
      Get白蜡 *= 2;
      Get季蜡 *= 2;
      e.reply('消耗蜡烛双倍卡，蜡烛翻倍！');
    }

    USER_DATA['最后签到日期'] = getCurrentDate();
    USER_DATA['连续签到天数'] = is连续签到 ? (连签天数 + 1) : 1;
    USER_DATA['累计签到天数'] = 累签天数 + 1;
    USER_DATA['白蜡'] = (USER_DATA['白蜡'] || 0) + Get白蜡;
    USER_DATA['季蜡'] = (USER_DATA['季蜡'] || 0) + Get季蜡;;
    USER_DATA['能量值'] = (USER_DATA['能量值'] || 0) + Get能量值
    if (USER_DATA['能量值'] >= 100) {
      USER_DATA['等级'] = (USER_DATA['等级'] || 0) + 1;
      USER_DATA['能量值'] = USER_DATA['能量值'] - 100;
    }

    SaveData(USER_FILE, USER_DATA);

    const 累计签到提示 = `你已累计签到 ${累签天数} 天！`;
    const 连续签到提示 = is连续签到 ? `你已连续签到 ${连签天数} 天！` : '';

    const Tlon_Sky_file = 'plugins/Tlon-Sky/data/Sky签到'
    const Tlon_Sky_file_data = fs.readdirSync(Tlon_Sky_file)
    const Tlon_Sky_user_number = Tlon_Sky_file_data.length

    const html = {
      昵称: USER_DATA['昵称'],
      头像: `https://q.qlogo.cn/g?b=qq&nk=${USER_DATA['头像']}&s=640`,
      获得白蜡: Get白蜡,
      数量_白: USER_DATA['白蜡'] - Get白蜡,
      获得季蜡: Get季蜡,
      数量_季: USER_DATA['季蜡'] - Get季蜡,
      获得能量值: Get能量值,
      数量_能量: USER_DATA['能量值'] - Get能量值,
      等级: USER_DATA['等级'],
      累计签到提示: 累计签到提示,
      连续签到提示: 连续签到提示,
      UserNumber: Tlon_Sky_user_number
    }
    await render('admin/签到', { ...html, bg: await rodom() }, { e, scale: 1.4 });
  }

  async SETTING_A_NICKNAME(e) {
    const USER_ID = e.user_id;
    const NICKNAME = e.msg.replace(/#?\/|设置昵称/g, "");
    if (NICKNAME.length > 15) { return e.reply('昵称长度不可大于十五位！'); }
    const USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${USER_ID}.json`;
    const USER_DATA = GetData(USER_FILE);
    USER_DATA['昵称'] = NICKNAME;
    SaveData(USER_FILE, USER_DATA);
    e.reply(`设置成功 [${NICKNAME}]`);
  }

  async SETTING_THE_AVATAR(e) {
    const USER_ID = e.user_id;
    const MATCH = e.msg.match(/^(#|\/)?设置头像(\d+)$/);
    const USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${USER_ID}.json`;
    const USER_DATA = GetData(USER_FILE);
    USER_DATA['头像'] = MATCH[2];
    SaveData(USER_FILE, USER_DATA);
    const REPLY = [
      '设置成功',
      segment.image(`https://q.qlogo.cn/g?b=qq&nk=${MATCH[2]}&s=640`),

    ];
    e.reply(REPLY);
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

const rodom = async function () {
  let image = fs.readdirSync('./plugins/Tlon-Sky/resource/admin/imgs/bg')
  let listImg = []
  for (let val of image) {
    listImg.push(val)
  }
  let imgs = listImg.length == 1 ? listImg[0] : listImg[lodash.random(0, listImg.length - 1)]
  return imgs
}