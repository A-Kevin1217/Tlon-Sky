import fs from 'fs';
import lodash from 'lodash';
import { render } from '../components/index.js';
import { GetData, SaveData } from '../utils/db.js';

const Tlon_Sky_file = 'plugins/Tlon-Sky/data/Sky签到'
const Tlon_Sky_file_data = fs.readdirSync(Tlon_Sky_file)
const Tlon_Sky_user_number = Tlon_Sky_file_data.length

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
          fnc: '光遇签到'
        },
        {
          reg: /^(#|\/)?设置昵称(.*)$/,
          fnc: '设置昵称'
        }
      ]
    })
  }
  async 光遇签到(e) {
    const UserId = e.user_id;
    const UserFile = `plugins/Tlon-Sky/data/Sky签到/${UserId}.json`
    const UserBackpackFile = `plugins/Tlon-Sky/data/背包/${UserId}.json`
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let conversionCode = '';
    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomChar = characters.charAt(randomIndex);
      conversionCode += randomChar;
    }
    if (!fs.existsSync(UserFile)) {
      const Userinfo = {
        [UserId]: {
          昵称: conversionCode, 最后签到日期: null,
          连续签到天数: 0, 累计签到天数: 0,
          能量值: 0, 等级: 0, 白蜡: 0,
          季蜡: 0, 抢蜡烛次数: 0, 被抢次数: 0,
          抢蜡烛总数: 0, 被抢蜡烛总数: 0,
          上次抢蜡烛时间戳: 0, 胜: 0, 负: 0, 平: 0,
          赚取: 0, 亏损: 0, 总赠送数量: 0,
          总收入数量: 0
        }
      }
      const UserBackpack = {
        [UserId]: {
          蜡烛保护卡: 0,
          签到双倍卡: 0
        }
      }
      SaveData(UserFile, Userinfo)
      SaveData(UserBackpackFile, UserBackpack)
      e.reply('"设置昵称[昵称]"指令可设置昵称')
    }

    const UserData = GetData(UserFile)

    if (UserData[UserId]['最后签到日期'] === getCurrentDate()) {
      return e.reply('今日已签')
    }

    const 连签天数 = UserData[UserId]['连续签到天数'] || 0;
    const 累签天数 = UserData[UserId]['累计签到天数'] || 0;

    let is连续签到 = false;
    if (UserData[UserId]['最后签到日期'] === getYesterdayDate()) {
      is连续签到 = true;
    }

    let Get白蜡 = Math.floor(Math.random() * (31 - 20 + 1)) + 20;
    let Get季蜡 = Math.floor(Math.random() * (11 - 5 + 1)) + 5;
    const Get能量值 = Math.floor(Math.random() * 30 - 20 + 1) + 20;

    const UserBackpackData = GetData(UserBackpackFile)

    if (UserBackpackData[UserId]['签到双倍卡'] >= 1) {
      Get白蜡 *= 2
      Get季蜡 *= 2
      e.reply('消耗蜡烛双倍卡，蜡烛翻倍！')
    }

    UserData[UserId]['最后签到日期'] = getCurrentDate()
    UserData[UserId]['连续签到天数'] = is连续签到 ? (连签天数 + 1) : 1
    UserData[UserId]['累计签到天数'] = 累签天数 + 1
    UserData[UserId]['白蜡'] = (UserData[UserId]['白蜡'] || 0) + Get白蜡
    UserData[UserId]['季蜡'] = (UserData[UserId]['季蜡'] || 0) + Get季蜡
    UserData[UserId]['能量值'] = (UserData[UserId]['能量值'] || 0) + Get能量值
    if (UserData[UserId]['能量值'] >= 100) {
      UserData[UserId]['等级'] = (UserData[UserId]['等级'] || 0) + 1
      UserData[UserId]['能量值'] = UserData[UserId]['能量值'] - 100
    }
    SaveData(UserFile, UserData)
    const 累计签到提示 = `你已累计签到 ${累签天数} 天！`
    const 连续签到提示 = is连续签到 ? `你已连续签到 ${连签天数} 天！` : '';
    let html = {
      昵称: UserData[UserId].昵称,
      头像: `https://q.qlogo.cn/g?b=qq&nk=${UserId}&s=640`,
      获得白蜡: Get白蜡,
      数量_白: UserData[UserId]['白蜡'] - Get白蜡,
      获得季蜡: Get季蜡,
      数量_季: UserData[UserId]['季蜡'] - Get季蜡,
      获得能量值: Get能量值,
      数量_能量: UserData[UserId]['能量值'] - Get能量值,
      等级: UserData[UserId].等级,
      累计签到提示: 累计签到提示,
      连续签到提示: 连续签到提示,
      UserNumber: Tlon_Sky_user_number
    }
    await render('admin/签到', { ...html, bg: await rodom() }, { e, scale: 1.4 })
  }

  async 设置昵称(e) {
    const UserId = e.user_id
    const Nickname = e.msg.replace(/#?\/|设置昵称/g, "")
    if (Nickname.length > 7) { return e.reply('昵称长度不可大于七位！') }
    const Userfile = `plugins/Tlon-Sky/data/Sky签到/${UserId}.json`
    const UserJson = GetData(Userfile)
    UserJson[UserId]['昵称'] = Nickname
    SaveData(Userfile, UserJson)
    e.reply(`设置成功 [${Nickname}]`)
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