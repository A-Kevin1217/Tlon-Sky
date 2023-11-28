import fs from 'fs';
import plugin from '../../../lib/plugins/plugin.js';
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
          fnc: '抢蜡烛'
        }
      ]
    });
  }

  async 抢蜡烛(e) {
    const UserId = e.user_id
    if (!UserFiles(UserId)) { return e.reply('请先发送光遇签到') }
    const CoolingTime = 2 * 60 * 60 * 1000;
    const NowDate = Date.now();
    const AllUserFileLocations = 'plugins/Tlon-Sky/data/Sky签到/';
    const UserFile = `${AllUserFileLocations}${UserId}.json`;

    if (e.atme === true) {
      return e.reply('机器人不可被抢哦')
    }
    let Users = null;
    if (e.at === undefined || e.at === null) {

      const AllUserFile = fs.readdirSync(AllUserFileLocations);
      const RandomFile = AllUserFile[Math.floor(Math.random() * AllUserFile.length)];
      const RandomFileName = RandomFile.replace(/.json/g, "");
      Users = RandomFileName
    } else {
      Users = e.at
    }
    if (e.at === UserId) {
      return e.reply('不可自己抢自己')
    }

    const UserData = GetData(UserFile)
    const LastExecutionTime = UserData[UserId]['上次抢蜡烛时间戳'] || 0;

    if (NowDate - LastExecutionTime < CoolingTime) {
      const RemainingTimestamp = CoolingTime - (NowDate - LastExecutionTime);
      if (RemainingTimestamp > 0) {
        const hour = Math.floor(RemainingTimestamp / (60 * 60 * 1000));
        const minutes = Math.floor((RemainingTimestamp % (60 * 60 * 1000)) / (60 * 1000));
        const second = Math.floor((RemainingTimestamp % (60 * 1000)) / 1000);

        const EndTimestamp = NowDate + RemainingTimestamp;
        const EndTime = new Date(EndTimestamp).toLocaleString();

        if (hour === 0) {
          return e.reply(`抢蜡烛CD中！\n请等待 ${minutes} 分钟 ${second} 秒后再试！\nCD结束时间：${EndTime}`);
        } else if (minutes === 0) {
          return e.reply(`抢蜡烛CD中！\n请等待 ${second} 秒后再试！\nCD结束时间：${EndTime}`);
        } else {
          return e.reply(`抢蜡烛CD中！\n请等待 ${hour} 小时 ${minutes} 分钟 ${second} 秒后再试！\nCD结束时间：${EndTime}`)
        }
      }
    }
    const UsersBackpackFile = `plugins/Tlon-Sky/data/背包/${Users}.json`
    if (!fs.existsSync(UsersBackpackFile)) {
      const UserBackpack = {
        [UserId]: {
          蜡烛保护卡: 0,
          签到双倍卡: 0
        }
      }
      SaveData(UsersBackpackFile, UserBackpack)
    }
    const UsersBackpackData = GetData(UsersBackpackFile)
    let State = 0
    if (UsersBackpackData[Users]['蜡烛保护卡'] >= 1) {
      UsersBackpackData[Users]['蜡烛保护卡'] -= 1

      UserData[UserId]['上次抢蜡烛时间戳'] = NowDate

      SaveData(UsersBackpackFile, UsersBackpackData)
      SaveData(UserFile, UserData)
      State += 1
    }

    const UsersFile = `${AllUserFileLocations}${Users}.json`;
    const UsersData = GetData(UsersFile)
    const UsersNickname = UsersData[Users]['昵称']

    let UsersNumber;
    if (UsersData[Users]['白蜡'] < 30) {
      UsersNumber = Math.floor(Math.random() * UsersData[Users]['白蜡']) + 1;
    } else {
      UsersNumber = Math.floor(Math.random() * 30) + 1;
    }

    State = (State === 0) ? '' : '抢蜡烛失败，对方有保护卡';

    if (UsersData[Users]['白蜡'] >= UsersNumber) {//  被抢人蜡烛足够，继续向下
      UsersData[Users]['白蜡'] -= UsersNumber;
      UsersData[Users]['被抢次数'] += 1;
      UsersData[Users]['被抢蜡烛总数'] += UsersNumber;

      UserData[UserId]['白蜡'] += UsersNumber;
      UserData[UserId]['抢蜡烛次数'] += 1;
      UserData[UserId]['抢蜡烛总数'] += UsersNumber;
      UserData[UserId]['上次抢蜡烛时间戳'] = NowDate;
      let html = {
        抢蜡烛状态: State,
        头像: `https://q.qlogo.cn/g?b=qq&nk=${UserId}&s=640`,
        被抢人头像: `https://q.qlogo.cn/g?b=qq&nk=${Users}&s=640`,
        用户ID: UserId,
        被抢用户ID: Users,
        昵称: UserData[UserId]['昵称'],
        被抢人昵称: UsersNickname,
        当前蜡烛: UserData[UserId]['白蜡'] - UsersNumber,
        被抢人当前蜡烛: UsersData[Users]['白蜡'] + UsersNumber,
        当前抢蜡烛次数: UserData[UserId]['抢蜡烛次数'] - 1,
        当前被抢次数: UsersData[Users]['被抢次数'] - 1,
        抢得蜡烛: UsersNumber
      }

      SaveData(UsersFile, UsersData)
      SaveData(UserFile, UserData)

      await render('admin/抢蜡烛', { ...html }, { e, scale: 1.4 })
    } else {
      return e.reply(`对不起，被抢的人蜡烛数量不足！\n【${UsersNickname}】 仅剩「${UsersData[Users]['白蜡']}」个白蜡\n无法被抢走「${UsersNumber}」个白蜡，请再次发送抢蜡烛`, true, { recallMsg: 15 });
    }
  }
}