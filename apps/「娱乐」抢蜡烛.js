import plugin from '../../../lib/plugins/plugin.js';
import { render } from '../components/index.js';
import fs from 'fs';

// 设定蜡烛CD时间（2小时的毫秒数）
const CD时间 = 2 * 60 * 60 * 1000;

export class 娱乐_抢蜡烛 extends plugin {
  constructor() {
    super({
      name: '娱乐_抢蜡烛',
      dsc: '娱乐',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^抢蜡烛(.*)$/,
          fnc: '抢蜡烛'
        }
      ]
    });
  }

  async 抢蜡烛(e) {
    const 用户ID = e.user_id
    const 当前时间戳 = Date.now();
    const 用户文件位置 = 'plugins/Tlon-Sky/data/Sky签到/';
    const 用户文件 = `${用户文件位置}${用户ID}.json`;
    if (!fs.existsSync(用户文件)) {
      return e.reply('抢蜡烛失败！您尚未拥有存档\n请您发送"光遇签到"')
    }
    if (e.atme === true) {
      e.at = Bot.uin
    }
    if (e.at === undefined || e.at === null) {
      //  未at，执行随机抢
      try {
        const 用户文件Data = await fs.promises.readFile(用户文件);
        const 用户文件Json = JSON.parse(用户文件Data.toString());

        const 上次抢蜡烛时间戳 = 用户文件Json[用户ID]['上次抢蜡烛时间戳'] || 0;
        //  判断CD
        if (当前时间戳 - 上次抢蜡烛时间戳 < CD时间) {
          const 还需等待时间 = CD时间 - (当前时间戳 - 上次抢蜡烛时间戳);
          if (还需等待时间 > 0) {
            const 剩余小时 = Math.floor(还需等待时间 / (60 * 60 * 1000));
            const 剩余分钟 = Math.floor((还需等待时间 % (60 * 60 * 1000)) / (60 * 1000));
            const 剩余秒钟 = Math.floor((还需等待时间 % (60 * 1000)) / 1000);
            // 计算CD结束时间
            const CD结束时间戳 = 当前时间戳 + 还需等待时间;
            const CD结束时间 = new Date(CD结束时间戳).toLocaleString();  // 将结束时间转换为可读格式
            return e.reply(`抢蜡烛CD中！\n请等待 ${剩余小时} 小时 ${剩余分钟} 分钟 ${剩余秒钟} 秒后再试！\nCD结束时间：${CD结束时间}`);
          }
        }
        const 所有用户文件 = fs.readdirSync(用户文件位置);

        const 随机文件名 = 所有用户文件[Math.floor(Math.random() * 所有用户文件.length)];
        const 被抢用户 = `${用户文件位置}${随机文件名}`;

        const 被抢用户Data = await fs.promises.readFile(被抢用户);
        const 被抢用户Json = JSON.parse(被抢用户Data.toString());
        const 被抢用户ID = 随机文件名.replace(/.json/g, "");
        const 被抢用户昵称 = 被抢用户Json[被抢用户ID]['昵称'];
        const 被抢蜡烛数量 = Math.floor(Math.random() * 30) + 1;

        if (被抢用户Json[被抢用户ID]['白蜡'] >= 被抢蜡烛数量) {//  被抢人蜡烛足够，继续向下
          const 用户背包文件 = `plugins/Tlon-Sky/data/背包/${被抢用户ID}.json`
          if (!fs.existsSync(用户背包文件)) {
            let 背包信息 = {}
            fs.writeFileSync(用户背包文件, JSON.stringify(背包信息, null, 4))
            const _用户背包文件Data = fs.readFileSync(用户背包文件)
            const _用户背包文件Json = JSON.parse(_用户背包文件Data.toString())
            _用户背包文件Json[被抢用户ID] = {
              蜡烛保护卡: 0,
              签到双倍卡: 0
            }
            fs.writeFileSync(用户背包文件, JSON.stringify(_用户背包文件Json, null, 4))
            logger.mark(`\n已为用户${被抢用户ID}\n创建背包信息`)
          }
          const 用户背包文件Data = await fs.promises.readFile(用户背包文件)
          const 用户背包文件Json = JSON.parse(用户背包文件Data.toString())
          if (用户背包文件Json[被抢用户ID]['蜡烛保护卡'] >= 1) {
            用户背包文件Json[被抢用户ID]['蜡烛保护卡'] -= 1
            用户文件Json[用户ID]['上次抢蜡烛时间戳'] = 当前时间戳
            fs.writeFileSync(用户文件, JSON.stringify(用户文件Json, null, 4));
            fs.writeFileSync(用户背包文件, JSON.stringify(用户背包文件Json, null, 4))
            let html = {
              头像: `https://api.t1qq.com/api/tool/qq/qqtx?key=lHV6bOsaNrsNv2hmegRRVMxOUp&qq=${用户ID}`,
              被抢人头像: `https://api.t1qq.com/api/tool/qq/qqtx?key=lHV6bOsaNrsNv2hmegRRVMxOUp&qq=${被抢用户ID}`,
              用户ID: 用户ID,
              被抢用户ID: 被抢用户ID,
              昵称: 用户文件Json[用户ID]['昵称'],
              被抢人昵称: 被抢用户昵称,
              当前蜡烛: 用户文件Json[用户ID]['白蜡'],
              被抢人当前蜡烛: 被抢用户Json[被抢用户ID]['白蜡'],
              当前抢蜡烛次数: 用户文件Json[用户ID]['抢蜡烛次数'],
              当前被抢次数: 被抢用户Json[被抢用户ID]['被抢次数'],
            }
            return await render('admin/抢蜡烛失败', {
              ...html
            }, {
              e,
              scale: 1.4
            })
          }
          //  更新被抢人信息
          被抢用户Json[被抢用户ID]['白蜡'] -= 被抢蜡烛数量;
          被抢用户Json[被抢用户ID]['被抢次数'] += 1;
          被抢用户Json[被抢用户ID]['被抢蜡烛总数'] += 被抢蜡烛数量;

          //  更新用户信息
          用户文件Json[用户ID]['白蜡'] += 被抢蜡烛数量;
          用户文件Json[用户ID]['抢蜡烛次数'] += 1;
          用户文件Json[用户ID]['抢蜡烛总数'] += 被抢蜡烛数量;
          用户文件Json[用户ID]['上次抢蜡烛时间戳'] = 当前时间戳;
          let html = {
            头像: `https://api.t1qq.com/api/tool/qq/qqtx?key=lHV6bOsaNrsNv2hmegRRVMxOUp&qq=${用户ID}`,
            被抢人头像: `https://api.t1qq.com/api/tool/qq/qqtx?key=lHV6bOsaNrsNv2hmegRRVMxOUp&qq=${被抢用户ID}`,
            用户ID: 用户ID,
            被抢用户ID: 被抢用户ID,
            昵称: 用户文件Json[用户ID]['昵称'],
            被抢人昵称: 被抢用户昵称,
            当前蜡烛: 用户文件Json[用户ID]['白蜡'] - 被抢蜡烛数量,
            被抢人当前蜡烛: 被抢用户Json[被抢用户ID]['白蜡'] + 被抢蜡烛数量,
            当前抢蜡烛次数: 用户文件Json[用户ID]['抢蜡烛次数'] - 1,
            当前被抢次数: 被抢用户Json[被抢用户ID]['被抢次数'] - 1,
            抢得蜡烛: 被抢蜡烛数量
          }
          //  存储两位用户信息
          fs.writeFileSync(被抢用户, JSON.stringify(被抢用户Json, null, 4));
          fs.writeFileSync(用户文件, JSON.stringify(用户文件Json, null, 4));


          await render('admin/抢蜡烛', {
            ...html
          }, {
            e,
            scale: 1.4
          })
        } else {
          return e.reply(`对不起，被抢的人蜡烛数量不足！\n【${被抢用户昵称}】 仅剩「${被抢用户Json[被抢用户ID]['白蜡']}」个白蜡\n无法被抢走「${被抢蜡烛数量}」个白蜡，请再次发送抢蜡烛`, true, { recallMsg: 15 })
        }
      } catch (error) {
        return e.reply('出现错误了，请联系机器人主人查看错误~')
      }
    } else {
      //  at了，指定用户抢蜡烛
      if (e.at === 用户ID) {
        return e.reply('不可自己抢自己')
      }
      try {
        const 用户文件Data = await fs.promises.readFile(用户文件);
        const 用户文件Json = JSON.parse(用户文件Data.toString());

        const 上次抢蜡烛时间戳 = 用户文件Json[用户ID]['上次抢蜡烛时间戳'] || 0;
        //  判断CD
        if (当前时间戳 - 上次抢蜡烛时间戳 < CD时间) {
          const 还需等待时间 = CD时间 - (当前时间戳 - 上次抢蜡烛时间戳);
          if (还需等待时间 > 0) {
            const 剩余小时 = Math.floor(还需等待时间 / (60 * 60 * 1000));
            const 剩余分钟 = Math.floor((还需等待时间 % (60 * 60 * 1000)) / (60 * 1000));
            const 剩余秒钟 = Math.floor((还需等待时间 % (60 * 1000)) / 1000);
            // 计算CD结束时间
            const CD结束时间戳 = 当前时间戳 + 还需等待时间;
            const CD结束时间 = new Date(CD结束时间戳).toLocaleString();  // 将结束时间转换为可读格式
            return e.reply(`抢蜡烛CD中！\n请等待 ${剩余小时} 小时 ${剩余分钟} 分钟 ${剩余秒钟} 秒后再试！\nCD结束时间：${CD结束时间}`);
          }
        }
        const 用户背包文件 = `plugins/Tlon-Sky/data/背包/${e.at}.json`
        if (!fs.existsSync(用户背包文件)) {
          let 背包信息 = {}
          fs.writeFileSync(用户背包文件, JSON.stringify(背包信息, null, 4))
          const _用户背包文件Data = fs.readFileSync(用户背包文件)
          const _用户背包文件Json = JSON.parse(_用户背包文件Data.toString())
          _用户背包文件Json[e.at] = {
            蜡烛保护卡: 0
          }
          fs.writeFileSync(用户背包文件, JSON.stringify(_用户背包文件Json, null, 4))
          logger.mark(`\n已为用户${e.at}\n创建背包信息`)
        }
        const 用户背包文件Data = await fs.promises.readFile(用户背包文件)
        const 用户背包文件Json = JSON.parse(用户背包文件Data.toString())
        if (用户背包文件Json[e.at]['蜡烛保护卡'] >= 1) {
          用户背包文件Json[e.at]['蜡烛保护卡'] -= 1
          用户文件Json[用户ID]['上次抢蜡烛时间戳'] = 当前时间戳
          fs.writeFileSync(用户文件, JSON.stringify(用户文件Json, null, 4));
          fs.writeFileSync(用户背包文件, JSON.stringify(用户背包文件Json, null, 4))
          let html = {
            头像: `https://api.t1qq.com/api/tool/qq/qqtx?key=lHV6bOsaNrsNv2hmegRRVMxOUp&qq=${用户ID}`,
            被抢人头像: `https://api.t1qq.com/api/tool/qq/qqtx?key=lHV6bOsaNrsNv2hmegRRVMxOUp&qq=${e.at}`,
            用户ID: 用户ID,
            被抢用户ID: e.at,
            昵称: 用户文件Json[用户ID]['昵称'],
            被抢人昵称: 被抢用户昵称,
            当前蜡烛: 用户文件Json[用户ID]['白蜡'],
            被抢人当前蜡烛: 被抢用户Json[e.at]['白蜡'],
            当前抢蜡烛次数: 用户文件Json[用户ID]['抢蜡烛次数'],
            当前被抢次数: 被抢用户Json[被抢e.at用户ID]['被抢次数'],
          }
          return await render('admin/抢蜡烛失败', {
            ...html
          }, {
            e,
            scale: 1.4
          })
        }
        // 读取被抢用户的数据
        const 被抢文件 = `${e.at}.json`
        const 被抢用户 = `${用户文件位置}${被抢文件}`;
        const 被抢用户Data = await fs.promises.readFile(被抢用户);
        const 被抢用户Json = JSON.parse(被抢用户Data.toString());
        const 被抢用户ID = e.at
        const 被抢用户昵称 = 被抢用户Json[被抢用户ID]['昵称']

        let 被抢蜡烛数量;
        // 随机抢蜡烛数量（在1~30之间）
        if (被抢用户Json[被抢用户ID]['白蜡'] < 30) {
          被抢蜡烛数量 = Math.floor(Math.random() * 被抢用户Json[被抢用户ID]['白蜡']) + 1;
        } else {
          被抢蜡烛数量 = Math.floor(Math.random() * 30) + 1;
        }

        if (被抢用户Json[被抢用户ID]['白蜡'] >= 被抢蜡烛数量) {//  被抢人蜡烛足够，继续向下
          //  更新被抢人信息
          被抢用户Json[被抢用户ID]['白蜡'] -= 被抢蜡烛数量;
          被抢用户Json[被抢用户ID]['被抢次数'] += 1;
          被抢用户Json[被抢用户ID]['被抢蜡烛总数'] += 被抢蜡烛数量;

          //  更新用户信息
          用户文件Json[用户ID]['白蜡'] += 被抢蜡烛数量;
          用户文件Json[用户ID]['抢蜡烛次数'] += 1;
          用户文件Json[用户ID]['抢蜡烛总数'] += 被抢蜡烛数量;
          用户文件Json[用户ID]['上次抢蜡烛时间戳'] = 当前时间戳;
          let html = {
            头像: `https://api.t1qq.com/api/tool/qq/qqtx?key=lHV6bOsaNrsNv2hmegRRVMxOUp&qq=${用户ID}`,
            被抢人头像: `https://api.t1qq.com/api/tool/qq/qqtx?key=lHV6bOsaNrsNv2hmegRRVMxOUp&qq=${被抢用户ID}`,
            用户ID: 用户ID,
            被抢用户ID: 被抢用户ID,
            昵称: 用户文件Json[用户ID]['昵称'],
            被抢人昵称: 被抢用户昵称,
            当前蜡烛: 用户文件Json[用户ID]['白蜡'] - 被抢蜡烛数量,
            被抢人当前蜡烛: 被抢用户Json[被抢用户ID]['白蜡'] + 被抢蜡烛数量,
            当前抢蜡烛次数: 用户文件Json[用户ID]['抢蜡烛次数'] - 1,
            当前被抢次数: 被抢用户Json[被抢用户ID]['被抢次数'] - 1,
            抢得蜡烛: 被抢蜡烛数量
          }
          //  存储两位用户信息
          fs.writeFileSync(被抢用户, JSON.stringify(被抢用户Json, null, 4));
          fs.writeFileSync(用户文件, JSON.stringify(用户文件Json, null, 4));


          await render('admin/抢蜡烛', {
            ...html
          }, {
            e,
            scale: 1.4
          })
        } else {
          return e.reply(`对不起，被抢的人蜡烛数量不足！\n【${被抢用户昵称}】 仅剩「${被抢用户Json[被抢用户ID]['白蜡']}」个白蜡\n无法被抢走「${被抢蜡烛数量}」个白蜡，请再次发送抢蜡烛`, true, { recallMsg: 15 });
        }
      } catch (error) {
        return e.reply('抢蜡烛失败！可能有以下原因：\n1.您尚未拥有存档\n2.被抢人尚未拥有存档\n3.出现错误了，请联系机器人主人查看错误~')
      }
    }
  }
}