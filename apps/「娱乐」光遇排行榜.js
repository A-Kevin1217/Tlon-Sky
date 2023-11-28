import plugin from '../../../lib/plugins/plugin.js';
import { render } from '../components/index.js';
import { Leaderboard } from '../utils/Leaderboard.js';
import fs from 'fs';

export class 娱乐_光遇排行榜 extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]娱乐:光遇排行榜',
      dsc: '娱乐光遇排行榜',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^(#|\/)?蜡烛排行$',
          fnc: '蜡烛排行'
        },
        {
          reg: '^(#|\/)?赌博排行$',
          fnc: '赌博排行'
        },
        {
          reg: '^(#|\/)?抢蜡排行$',
          fnc: '抢蜡排行'
        },
        {
          reg: '^(#|\/)?签到排行$',
          fnc: '签到排行'
        }
      ]
    });
  }

  async 蜡烛排行(e) {
    Leaderboard()
    const 排行信息_白 = 'plugins/Tlon-Sky/data/排行榜/白蜡.json'
    const 排行信息Data_白 = await fs.promises.readFile(排行信息_白)
    const 排行信息Json_白 = JSON.parse(排行信息Data_白.toString())

    const 排行信息_季 = 'plugins/Tlon-Sky/data/排行榜/季蜡.json'
    const 排行信息Data_季 = await fs.promises.readFile(排行信息_季)
    const 排行信息Json_季 = JSON.parse(排行信息Data_季.toString())
    //  读取昵称
    const Top_nickname_白 = 排行信息Json_白.slice(0, 10).map(item => item.nickname);
    const Top_nickname_季 = 排行信息Json_季.slice(0, 10).map(item => item.nickname);
    //  读取数量
    const Top_白蜡 = 排行信息Json_白.slice(0, 10).map(item => item.level);
    const Top_季蜡 = 排行信息Json_季.slice(0, 10).map(item => item.level);
    // 读取ID
    const Top_ID_白 = [];
    for (let i = 0; i < 10; i++) {
      Top_ID_白[i] = `https://q.qlogo.cn/g?b=qq&nk=${排行信息Json_白[i].userId}&s=640`;
    }
    const Top_ID_季 = [];
    for (let i = 0; i < 10; i++) {
      Top_ID_季[i] = `https://q.qlogo.cn/g?b=qq&nk=${排行信息Json_季[i].userId}&s=640`;
    }

    let html = {
      Title1: '白蜡排行', Title2: '季蜡排行',
      NicknameTop1: Top_nickname_白[0], NicknameTop2: Top_nickname_白[1],
      NicknameTop3: Top_nickname_白[2], NicknameTop4: Top_nickname_白[3],
      NicknameTop5: Top_nickname_白[4], NicknameTop6: Top_nickname_白[5],
      NicknameTop7: Top_nickname_白[6], NicknameTop8: Top_nickname_白[7],
      NicknameTop9: Top_nickname_白[8], NicknameTop10: Top_nickname_白[9],
      _NicknameTop1: Top_nickname_季[0], _NicknameTop2: Top_nickname_季[1],
      _NicknameTop3: Top_nickname_季[2], _NicknameTop4: Top_nickname_季[3],
      _NicknameTop5: Top_nickname_季[4], _NicknameTop6: Top_nickname_季[5],
      _NicknameTop7: Top_nickname_季[6], _NicknameTop8: Top_nickname_季[7],
      _NicknameTop9: Top_nickname_季[8], _NicknameTop10: Top_nickname_季[9],
      NumberTop1: Top_白蜡[0], NumberTop2: Top_白蜡[1],
      NumberTop3: Top_白蜡[2], NumberTop4: Top_白蜡[3],
      NumberTop5: Top_白蜡[4], NumberTop6: Top_白蜡[5],
      NumberTop7: Top_白蜡[6], NumberTop8: Top_白蜡[7],
      NumberTop9: Top_白蜡[8], NumberTop10: Top_白蜡[9],
      _NumberTop1: Top_季蜡[0], _NumberTop2: Top_季蜡[1],
      _NumberTop3: Top_季蜡[2], _NumberTop4: Top_季蜡[3],
      _NumberTop5: Top_季蜡[4], _NumberTop6: Top_季蜡[5],
      _NumberTop7: Top_季蜡[6], _NumberTop8: Top_季蜡[7],
      _NumberTop9: Top_季蜡[8], _NumberTop10: Top_季蜡[9],
      AvatarTop1: Top_ID_白[0], AvatarTop2: Top_ID_白[1],
      AvatarTop3: Top_ID_白[2], AvatarTop4: Top_ID_白[3],
      AvatarTop5: Top_ID_白[4], AvatarTop6: Top_ID_白[5],
      AvatarTop7: Top_ID_白[6], AvatarTop8: Top_ID_白[7],
      AvatarTop9: Top_ID_白[8], AvatarTop10: Top_ID_白[9],
      _AvatarTop1: Top_ID_季[0], _AvatarTop2: Top_ID_季[1],
      _AvatarTop3: Top_ID_季[2], _AvatarTop4: Top_ID_季[3],
      _AvatarTop5: Top_ID_季[4], _AvatarTop6: Top_ID_季[5],
      _AvatarTop7: Top_ID_季[6], _AvatarTop8: Top_ID_季[7],
      _AvatarTop9: Top_ID_季[8], _AvatarTop10: Top_ID_季[9]
    }

    await render('admin/Leaderboard', {
      ...html
    }, {
      e,
      scale: 1.4
    })
  }

  async 赌博排行(e) {
    Leaderboard()
    const 排行信息_赚取 = 'plugins/Tlon-Sky/data/排行榜/赚取.json'
    const 排行信息Data_赚取 = await fs.promises.readFile(排行信息_赚取)
    const 排行信息Json_赚取 = JSON.parse(排行信息Data_赚取.toString())

    const 排行信息_亏损 = 'plugins/Tlon-Sky/data/排行榜/亏损.json'
    const 排行信息Data_亏损 = await fs.promises.readFile(排行信息_亏损)
    const 排行信息Json_亏损 = JSON.parse(排行信息Data_亏损.toString())

    //  读取昵称
    const Top_nickname_赚取 = 排行信息Json_赚取.slice(0, 10).map(item => item.nickname);
    const Top_nickname_亏损 = 排行信息Json_亏损.slice(0, 10).map(item => item.nickname);
    //  读取数量与次数
    const Top_赚取 = 排行信息Json_赚取.slice(0, 10).map(item => item.level);
    const Top_亏损 = 排行信息Json_亏损.slice(0, 10).map(item => item.level);
    //  读取ID
    const Top_ID_赚取 = [];
    for (let i = 0; i < 10; i++) {
      Top_ID_赚取[i] = `https://q.qlogo.cn/g?b=qq&nk=${排行信息Json_赚取[i].userId}&s=640`;
    }
    const Top_ID_亏损 = [];
    for (let i = 0; i < 10; i++) {
      Top_ID_亏损[i] = `https://q.qlogo.cn/g?b=qq&nk=${排行信息Json_亏损[i].userId}&s=640`;
    }

    let html = {
      Title1: '赚取排行', Title2: '亏损排行',
      NicknameTop1: Top_nickname_赚取[0], NicknameTop2: Top_nickname_赚取[1],
      NicknameTop3: Top_nickname_赚取[2], NicknameTop4: Top_nickname_赚取[3],
      NicknameTop5: Top_nickname_赚取[4], NicknameTop6: Top_nickname_赚取[5],
      NicknameTop7: Top_nickname_赚取[6], NicknameTop8: Top_nickname_赚取[7],
      NicknameTop9: Top_nickname_赚取[8], NicknameTop10: Top_nickname_赚取[9],
      _NicknameTop1: Top_nickname_亏损[0], _NicknameTop2: Top_nickname_亏损[1],
      _NicknameTop3: Top_nickname_亏损[2], _NicknameTop4: Top_nickname_亏损[3],
      _NicknameTop5: Top_nickname_亏损[4], _NicknameTop6: Top_nickname_亏损[5],
      _NicknameTop7: Top_nickname_亏损[6], _NicknameTop8: Top_nickname_亏损[7],
      _NicknameTop9: Top_nickname_亏损[8], _NicknameTop10: Top_nickname_亏损[9],
      NumberTop1: Top_赚取[0], NumberTop2: Top_赚取[1],
      NumberTop3: Top_赚取[2], NumberTop4: Top_赚取[3],
      NumberTop5: Top_赚取[4], NumberTop6: Top_赚取[5],
      NumberTop7: Top_赚取[6], NumberTop7: Top_赚取[7],
      NumberTop9: Top_赚取[8], NumberTop10: Top_赚取[9],
      _NumberTop1: Top_亏损[0], _NumberTop2: Top_亏损[1],
      _NumberTop3: Top_亏损[2], _NumberTop4: Top_亏损[3],
      _NumberTop5: Top_亏损[4], _NumberTop6: Top_亏损[5],
      _NumberTop7: Top_亏损[6], _NumberTop8: Top_亏损[7],
      _NumberTop9: Top_亏损[8], _NumberTop10: Top_亏损[9],
      AvatarTop1: Top_ID_赚取[0], AvatarTop2: Top_ID_赚取[1],
      AvatarTop3: Top_ID_赚取[2], AvatarTop4: Top_ID_赚取[3],
      AvatarTop5: Top_ID_赚取[4], AvatarTop6: Top_ID_赚取[5],
      AvatarTop7: Top_ID_赚取[6], AvatarTop8: Top_ID_赚取[7],
      AvatarTop9: Top_ID_赚取[8], AvatarTop10: Top_ID_赚取[9],
      _AvatarTop1: Top_ID_亏损[0], _AvatarTop2: Top_ID_亏损[1],
      _AvatarTop3: Top_ID_亏损[2], _AvatarTop4: Top_ID_亏损[3],
      _AvatarTop5: Top_ID_亏损[4], _AvatarTop6: Top_ID_亏损[5],
      _AvatarTop7: Top_ID_亏损[6], _AvatarTop8: Top_ID_亏损[7],
      _AvatarTop9: Top_ID_亏损[8], _AvatarTop10: Top_ID_亏损[9]
    }

    await render('admin/Leaderboard', {
      ...html
    }, {
      e,
      scale: 1.4
    })
  }

  async 抢蜡排行(e) {
    Leaderboard()
    const 排行信息_抢蜡 = 'plugins/Tlon-Sky/data/排行榜/抢蜡烛次数.json'
    const 排行信息Data_抢蜡 = await fs.promises.readFile(排行信息_抢蜡)
    const 排行信息Json_抢蜡 = JSON.parse(排行信息Data_抢蜡.toString())

    const 排行信息_被抢 = 'plugins/Tlon-Sky/data/排行榜/被抢次数.json'
    const 排行信息Data_被抢 = await fs.promises.readFile(排行信息_被抢)
    const 排行信息Json_被抢 = JSON.parse(排行信息Data_被抢.toString())

    //  读取昵称
    const Top_nickname_抢蜡 = 排行信息Json_抢蜡.slice(0, 10).map(item => item.nickname);
    const Top_nickname_被抢 = 排行信息Json_被抢.slice(0, 10).map(item => item.nickname);
    //  读取数量与次数
    const Top_抢蜡 = 排行信息Json_抢蜡.slice(0, 10).map(item => item.level);
    const Top_被抢 = 排行信息Json_被抢.slice(0, 10).map(item => item.level);
    //  读取ID
    const Top_ID_抢蜡 = [];
    for (let i = 0; i < 10; i++) {
      Top_ID_抢蜡[i] = `https://q.qlogo.cn/g?b=qq&nk=${排行信息Json_抢蜡[i].userId}&s=640`;
    }
    const Top_ID_被抢 = [];
    for (let i = 0; i < 10; i++) {
      Top_ID_被抢[i] = `https://q.qlogo.cn/g?b=qq&nk=${排行信息Json_被抢[i].userId}&s=640`;
    }

    let html = {
      Title1: '抢蜡排行', Title2: '被抢排行',
      NicknameTop1: Top_nickname_抢蜡[0], NicknameTop2: Top_nickname_抢蜡[1],
      NicknameTop3: Top_nickname_抢蜡[2], NicknameTop4: Top_nickname_抢蜡[3],
      NicknameTop5: Top_nickname_抢蜡[4], NicknameTop6: Top_nickname_抢蜡[5],
      NicknameTop7: Top_nickname_抢蜡[6], NicknameTop8: Top_nickname_抢蜡[7],
      NicknameTop9: Top_nickname_抢蜡[8], NicknameTop10: Top_nickname_抢蜡[9],
      _NicknameTop1: Top_nickname_被抢[0], _NicknameTop2: Top_nickname_被抢[1],
      _NicknameTop3: Top_nickname_被抢[2], _NicknameTop4: Top_nickname_被抢[3],
      _NicknameTop5: Top_nickname_被抢[4], _NicknameTop6: Top_nickname_被抢[5],
      _NicknameTop7: Top_nickname_被抢[6], _NicknameTop8: Top_nickname_被抢[7],
      _NicknameTop9: Top_nickname_被抢[8], _NicknameTop10: Top_nickname_被抢[9],
      NumberTop1: Top_抢蜡[0], NumberTop2: Top_抢蜡[1],
      NumberTop3: Top_抢蜡[2], NumberTop4: Top_抢蜡[3],
      NumberTop5: Top_抢蜡[4], NumberTop6: Top_抢蜡[5],
      NumberTop7: Top_抢蜡[6], NumberTop7: Top_抢蜡[7],
      NumberTop9: Top_抢蜡[8], NumberTop10: Top_抢蜡[9],
      _NumberTop1: Top_被抢[0], _NumberTop2: Top_被抢[1],
      _NumberTop3: Top_被抢[2], _NumberTop4: Top_被抢[3],
      _NumberTop5: Top_被抢[4], _NumberTop6: Top_被抢[5],
      _NumberTop7: Top_被抢[6], _NumberTop8: Top_被抢[7],
      _NumberTop9: Top_被抢[8], _NumberTop10: Top_被抢[9],
      AvatarTop1: Top_ID_抢蜡[0], AvatarTop2: Top_ID_抢蜡[1],
      AvatarTop3: Top_ID_抢蜡[2], AvatarTop4: Top_ID_抢蜡[3],
      AvatarTop5: Top_ID_抢蜡[4], AvatarTop6: Top_ID_抢蜡[5],
      AvatarTop7: Top_ID_抢蜡[6], AvatarTop8: Top_ID_抢蜡[7],
      AvatarTop9: Top_ID_抢蜡[8], AvatarTop10: Top_ID_抢蜡[9],
      _AvatarTop1: Top_ID_被抢[0], _AvatarTop2: Top_ID_被抢[1],
      _AvatarTop3: Top_ID_被抢[2], _AvatarTop4: Top_ID_被抢[3],
      _AvatarTop5: Top_ID_被抢[4], _AvatarTop6: Top_ID_被抢[5],
      _AvatarTop7: Top_ID_被抢[6], _AvatarTop8: Top_ID_被抢[7],
      _AvatarTop9: Top_ID_被抢[8], _AvatarTop10: Top_ID_被抢[9]
    }

    await render('admin/Leaderboard', {
      ...html
    }, {
      e,
      scale: 1.4
    })
  }

  async 签到排行(e) {
    Leaderboard()
    const 排行信息_累签 = 'plugins/Tlon-Sky/data/排行榜/累计签到天数.json'
    const 排行信息Data_累签 = await fs.promises.readFile(排行信息_累签)
    const 排行信息Json_累签 = JSON.parse(排行信息Data_累签.toString())

    const 排行信息_连签 = 'plugins/Tlon-Sky/data/排行榜/连续签到天数.json'
    const 排行信息Data_连签 = await fs.promises.readFile(排行信息_连签)
    const 排行信息Json_连签 = JSON.parse(排行信息Data_连签.toString())

    //  读取昵称
    const Top_nickname_累签 = 排行信息Json_累签.slice(0, 10).map(item => item.nickname);
    const Top_nickname_连签 = 排行信息Json_连签.slice(0, 10).map(item => item.nickname);
    //  读取数量与次数
    const Top_累签 = 排行信息Json_累签.slice(0, 10).map(item => item.level);
    const Top_连签 = 排行信息Json_连签.slice(0, 10).map(item => item.level);
    //  读取ID
    const Top_ID_累签 = [];
    for (let i = 0; i < 10; i++) {
      Top_ID_累签[i] = `https://q.qlogo.cn/g?b=qq&nk=${排行信息Json_累签[i].userId}&s=640`;
    }
    const Top_ID_连签 = [];
    for (let i = 0; i < 10; i++) {
      Top_ID_连签[i] = `https://q.qlogo.cn/g?b=qq&nk=${排行信息Json_连签[i].userId}&s=640`;
    }

    let html = {
      Title1: '累签排行', Title2: '连签排行',
      NicknameTop1: Top_nickname_累签[0], NicknameTop2: Top_nickname_累签[1],
      NicknameTop3: Top_nickname_累签[2], NicknameTop4: Top_nickname_累签[3],
      NicknameTop5: Top_nickname_累签[4], NicknameTop6: Top_nickname_累签[5],
      NicknameTop7: Top_nickname_累签[6], NicknameTop8: Top_nickname_累签[7],
      NicknameTop9: Top_nickname_累签[8], NicknameTop10: Top_nickname_累签[9],
      _NicknameTop1: Top_nickname_连签[0], _NicknameTop2: Top_nickname_连签[1],
      _NicknameTop3: Top_nickname_连签[2], _NicknameTop4: Top_nickname_连签[3],
      _NicknameTop5: Top_nickname_连签[4], _NicknameTop6: Top_nickname_连签[5],
      _NicknameTop7: Top_nickname_连签[6], _NicknameTop8: Top_nickname_连签[7],
      _NicknameTop9: Top_nickname_连签[8], _NicknameTop10: Top_nickname_连签[9],
      NumberTop1: Top_累签[0], NumberTop2: Top_累签[1],
      NumberTop3: Top_累签[2], NumberTop4: Top_累签[3],
      NumberTop5: Top_累签[4], NumberTop6: Top_累签[5],
      NumberTop7: Top_累签[6], NumberTop7: Top_累签[7],
      NumberTop9: Top_累签[8], NumberTop10: Top_累签[9],
      _NumberTop1: Top_连签[0], _NumberTop2: Top_连签[1],
      _NumberTop3: Top_连签[2], _NumberTop4: Top_连签[3],
      _NumberTop5: Top_连签[4], _NumberTop6: Top_连签[5],
      _NumberTop7: Top_连签[6], _NumberTop8: Top_连签[7],
      _NumberTop9: Top_连签[8], _NumberTop10: Top_连签[9],
      AvatarTop1: Top_ID_累签[0], AvatarTop2: Top_ID_累签[1],
      AvatarTop3: Top_ID_累签[2], AvatarTop4: Top_ID_累签[3],
      AvatarTop5: Top_ID_累签[4], AvatarTop6: Top_ID_累签[5],
      AvatarTop7: Top_ID_累签[6], AvatarTop8: Top_ID_累签[7],
      AvatarTop9: Top_ID_累签[8], AvatarTop10: Top_ID_累签[9],
      _AvatarTop1: Top_ID_连签[0], _AvatarTop2: Top_ID_连签[1],
      _AvatarTop3: Top_ID_连签[2], _AvatarTop4: Top_ID_连签[3],
      _AvatarTop5: Top_ID_连签[4], _AvatarTop6: Top_ID_连签[5],
      _AvatarTop7: Top_ID_连签[6], _AvatarTop8: Top_ID_连签[7],
      _AvatarTop9: Top_ID_连签[8], _AvatarTop10: Top_ID_连签[9]
    }

    await render('admin/Leaderboard', {
      ...html
    }, {
      e,
      scale: 1.4
    })
  }
}