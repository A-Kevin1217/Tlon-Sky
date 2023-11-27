import plugin from '../../../lib/plugins/plugin.js';
import { render } from '../components/index.js';
import { Leaderboard } from '../utils/db.js';
import path from 'path';
import fs from 'fs';

const 用户位置 = 'plugins/Tlon-Sky/data/Sky签到';
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
    const result_赚取 = await 赚取排行数据();
    logger.mark('赚取排行写入成功', result_赚取);
    const result_亏损 = await 亏损排行数据();
    logger.mark('亏损排行写入成功', result_亏损);

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
}

const 白蜡排行数据 = async function () {
  const files = fs.readdirSync(用户位置); // 读取目录下的所有文件
  const ranking = [];

  // 遍历所有文件
  files.forEach((fileName) => {
    if (fileName.endsWith('.json')) {
      const userId = fileName.split('.')[0];
      const filePath = path.join(用户位置, fileName);
      const fileData = fs.readFileSync(filePath);
      const data = JSON.parse(fileData.toString());
      const level = data[userId]?.白蜡 || 0;
      const nickname = data[userId]?.昵称 || '未读取';

      ranking.push({ nickname, level, userId });
    }
  });

  ranking.sort((a, b) => b.level - a.level);

  const topTen = ranking.slice(0, 10);
  // 将排行信息储存为 JSON 文件
  const jsonRanking = JSON.stringify(topTen, null, 2); // 格式化 JSON，使其更易读

  fs.writeFileSync('plugins/Tlon-Sky/data/排行榜/白蜡.json', jsonRanking);
}

const 季蜡排行数据 = async function () {
  const files = fs.readdirSync(用户位置);
  const ranking = [];

  files.forEach((fileName) => {
    if (fileName.endsWith('.json')) {
      const userId = fileName.split('.')[0];
      const filePath = path.join(用户位置, fileName);
      const fileData = fs.readFileSync(filePath);
      const data = JSON.parse(fileData.toString());
      const level = data[userId]?.季蜡 || 0;
      const nickname = data[userId]?.昵称 || '未读取';

      ranking.push({ nickname, level, userId });
    }
  });

  ranking.sort((a, b) => b.level - a.level);

  const topTen = ranking.slice(0, 10);

  const jsonRanking = JSON.stringify(topTen, null, 2);

  fs.writeFileSync('plugins/Tlon-Sky/data/排行榜/季蜡.json', jsonRanking);
}

const 赚取排行数据 = async function () {
  const files = fs.readdirSync(用户位置);
  const ranking = [];

  files.forEach((fileName) => {
    if (fileName.endsWith('.json')) {
      const userId = fileName.split('.')[0];
      const filePath = path.join(用户位置, fileName);
      const fileData = fs.readFileSync(filePath);
      const data = JSON.parse(fileData.toString());
      const level = data[userId]?.赚取 || 0;
      const nickname = data[userId]?.昵称 || '未读取';

      ranking.push({ nickname, level, userId });
    }
  });

  ranking.sort((a, b) => b.level - a.level);

  const topTen = ranking.slice(0, 50);

  const jsonRanking = JSON.stringify(topTen, null, 2);

  fs.writeFileSync('plugins/Tlon-Sky/data/排行榜/赚取.json', jsonRanking);
}

const 亏损排行数据 = async function () {
  const files = fs.readdirSync(用户位置);
  const ranking = [];

  files.forEach((fileName) => {
    if (fileName.endsWith('.json')) {
      const userId = fileName.split('.')[0];
      const filePath = path.join(用户位置, fileName);
      const fileData = fs.readFileSync(filePath);
      const data = JSON.parse(fileData.toString());
      const level = data[userId]?.亏损 || 0;
      const nickname = data[userId]?.昵称 || '未读取';

      ranking.push({ nickname, level, userId });
    }
  });

  ranking.sort((a, b) => b.level - a.level);

  const topTen = ranking.slice(0, 50);

  const jsonRanking = JSON.stringify(topTen, null, 2);

  fs.writeFileSync('plugins/Tlon-Sky/data/排行榜/亏损.json', jsonRanking);
}

const 次数排行数据 = async function () {
  const files = fs.readdirSync(用户位置);
  const ranking = [];

  files.forEach((fileName) => {
    if (fileName.endsWith('.json')) {
      const userId = fileName.split('.')[0];
      const filePath = path.join(用户位置, fileName);
      const fileData = fs.readFileSync(filePath);
      const data = JSON.parse(fileData.toString());
      let 赢 = data[userId]?.胜 || 0;
      let 输 = data[userId]?.负 || 0;
      let 平 = data[userId]?.平 || 0;
      const level = 赢 + 输 + 平;
      const nickname = data[userId]?.昵称 || '未读取';

      ranking.push({ nickname, level, userId });
    }
  });

  ranking.sort((a, b) => b.level - a.level);

  const topTen = ranking.slice(0, 50);

  const jsonRanking = JSON.stringify(topTen, null, 2);

  fs.writeFileSync('plugins/Tlon-Sky/data/排行榜/次数.json', jsonRanking);
}