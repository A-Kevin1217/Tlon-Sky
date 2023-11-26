import plugin from '../../../lib/plugins/plugin.js';
import { render } from '../components/index.js';
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
        },
        {
          reg: '^(#|\/)?赌博次数排行',
          fnc: '赌博次数排行'
        }
      ]
    });
  }

  async 蜡烛排行(e) {
    const result_白 = await 白蜡排行数据();
    logger.mark('白蜡排行写入成功', result_白);
    const result_季 = await 季蜡排行数据();
    logger.mark('季蜡排行写入成功', result_季);

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
      Top1_nickname_白: Top_nickname_白[0], Top2_nickname_白: Top_nickname_白[1],
      Top3_nickname_白: Top_nickname_白[2], Top4_nickname_白: Top_nickname_白[3],
      Top5_nickname_白: Top_nickname_白[4], Top6_nickname_白: Top_nickname_白[5],
      Top7_nickname_白: Top_nickname_白[6], Top8_nickname_白: Top_nickname_白[7],
      Top9_nickname_白: Top_nickname_白[8], Top10_nickname_白: Top_nickname_白[9],
      Top1_nickname_季: Top_nickname_季[0], Top2_nickname_季: Top_nickname_季[1],
      Top3_nickname_季: Top_nickname_季[2], Top4_nickname_季: Top_nickname_季[3],
      Top5_nickname_季: Top_nickname_季[4], Top6_nickname_季: Top_nickname_季[5],
      Top7_nickname_季: Top_nickname_季[6], Top8_nickname_季: Top_nickname_季[7],
      Top9_nickname_季: Top_nickname_季[8], Top10_nickname_季: Top_nickname_季[9],
      Top1_白蜡: Top_白蜡[0], Top2_白蜡: Top_白蜡[1],
      Top3_白蜡: Top_白蜡[2], Top4_白蜡: Top_白蜡[3],
      Top5_白蜡: Top_白蜡[4], Top6_白蜡: Top_白蜡[5],
      Top7_白蜡: Top_白蜡[6], Top8_白蜡: Top_白蜡[7],
      Top9_白蜡: Top_白蜡[8], Top10_白蜡: Top_白蜡[9],
      Top1_季蜡: Top_季蜡[0], Top2_季蜡: Top_季蜡[1],
      Top3_季蜡: Top_季蜡[2], Top4_季蜡: Top_季蜡[3],
      Top5_季蜡: Top_季蜡[4], Top6_季蜡: Top_季蜡[5],
      Top7_季蜡: Top_季蜡[6], Top8_季蜡: Top_季蜡[7],
      Top9_季蜡: Top_季蜡[8], Top10_季蜡: Top_季蜡[9],
      Top1_ID_白: Top_ID_白[0], Top2_ID_白: Top_ID_白[1],
      Top3_ID_白: Top_ID_白[2], Top4_ID_白: Top_ID_白[3],
      Top5_ID_白: Top_ID_白[4], Top6_ID_白: Top_ID_白[5],
      Top7_ID_白: Top_ID_白[6], Top8_ID_白: Top_ID_白[7],
      Top9_ID_白: Top_ID_白[8], Top10_ID_白: Top_ID_白[9],
      Top1_ID_季: Top_ID_季[0], Top2_ID_季: Top_ID_季[1],
      Top3_ID_季: Top_ID_季[2], Top4_ID_季: Top_ID_季[3],
      Top5_ID_季: Top_ID_季[4], Top6_ID_季: Top_ID_季[5],
      Top7_ID_季: Top_ID_季[6], Top8_ID_季: Top_ID_季[7],
      Top9_ID_季: Top_ID_季[8], Top10_ID_季: Top_ID_季[9]
    }

    await render('admin/蜡烛排行榜', {
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
      Top1_nickname_赚取: Top_nickname_赚取[0],Top2_nickname_赚取: Top_nickname_赚取[1],
      Top3_nickname_赚取: Top_nickname_赚取[2],Top4_nickname_赚取: Top_nickname_赚取[3],
      Top5_nickname_赚取: Top_nickname_赚取[4],Top6_nickname_赚取: Top_nickname_赚取[5],
      Top7_nickname_赚取: Top_nickname_赚取[6],Top8_nickname_赚取: Top_nickname_赚取[7],
      Top9_nickname_赚取: Top_nickname_赚取[8],Top10_nickname_赚取: Top_nickname_赚取[9],
      Top1_nickname_亏损: Top_nickname_亏损[0],Top2_nickname_亏损: Top_nickname_亏损[1],
      Top3_nickname_亏损: Top_nickname_亏损[2],Top4_nickname_亏损: Top_nickname_亏损[3],
      Top5_nickname_亏损: Top_nickname_亏损[4],Top6_nickname_亏损: Top_nickname_亏损[5],
      Top7_nickname_亏损: Top_nickname_亏损[6],Top8_nickname_亏损: Top_nickname_亏损[7],
      Top9_nickname_亏损: Top_nickname_亏损[8],Top10_nickname_亏损: Top_nickname_亏损[9],
      Top1_赚取: Top_赚取[0], Top2_赚取: Top_赚取[1],
      Top3_赚取: Top_赚取[2], Top4_赚取: Top_赚取[3],
      Top5_赚取: Top_赚取[4], Top6_赚取: Top_赚取[5],
      Top7_赚取: Top_赚取[6], Top8_赚取: Top_赚取[7],
      Top9_赚取: Top_赚取[8], Top10_赚取: Top_赚取[9],
      Top1_亏损: Top_亏损[0], Top2_亏损: Top_亏损[1],
      Top3_亏损: Top_亏损[2], Top4_亏损: Top_亏损[3],
      Top5_亏损: Top_亏损[4], Top6_亏损: Top_亏损[5],
      Top7_亏损: Top_亏损[6], Top8_亏损: Top_亏损[7],
      Top9_亏损: Top_亏损[8], Top10_亏损: Top_亏损[9],
      Top1_ID_赚取: Top_ID_赚取[0], Top2_ID_赚取: Top_ID_赚取[1],
      Top3_ID_赚取: Top_ID_赚取[2], Top4_ID_赚取: Top_ID_赚取[3],
      Top5_ID_赚取: Top_ID_赚取[4], Top6_ID_赚取: Top_ID_赚取[5],
      Top7_ID_赚取: Top_ID_赚取[6], Top8_ID_赚取: Top_ID_赚取[7],
      Top9_ID_赚取: Top_ID_赚取[8], Top10_ID_赚取: Top_ID_赚取[9],
      Top1_ID_亏损: Top_ID_亏损[0], Top2_ID_亏损: Top_ID_亏损[1],
      Top3_ID_亏损: Top_ID_亏损[2], Top4_ID_亏损: Top_ID_亏损[3],
      Top5_ID_亏损: Top_ID_亏损[4], Top6_ID_亏损: Top_ID_亏损[5],
      Top7_ID_亏损: Top_ID_亏损[6], Top8_ID_亏损: Top_ID_亏损[7],
      Top9_ID_亏损: Top_ID_亏损[8], Top10_ID_亏损: Top_ID_亏损[9]
    }

    await render('admin/赌博排行榜', {
      ...html
    }, {
      e,
      scale: 1.4
    })
  }

  async 赌博次数排行(e) {
    const result_次数 = await 次数排行数据();
    logger.mark('次数排行写入成功', result_次数);

    const 排行信息_次数 = 'plugins/Tlon-Sky/data/排行榜/次数.json'
    const 排行信息Data_次数 = await fs.promises.readFile(排行信息_次数)
    const 排行信息Json_次数 = JSON.parse(排行信息Data_次数.toString())
    const Top_nickname_次数 = 排行信息Json_次数.slice(0, 10).map(item => item.nickname);
    const Top_次数 = 排行信息Json_次数.slice(0, 10).map(item => item.level);
    const Top_ID_次数 = [];
    for (let i = 0; i < 10; i++) {
      Top_ID_次数[i] = `https://q.qlogo.cn/g?b=qq&nk=${排行信息Json_次数[i].userId}&s=640`;
    }

    let html = {
      Top1_nickname_次数: Top_nickname_次数[0], Top2_nickname_次数: Top_nickname_次数[1],
      Top3_nickname_次数: Top_nickname_次数[2], Top4_nickname_次数: Top_nickname_次数[3],
      Top5_nickname_次数: Top_nickname_次数[4], Top6_nickname_次数: Top_nickname_次数[5],
      Top7_nickname_次数: Top_nickname_次数[6], Top8_nickname_次数: Top_nickname_次数[7],
      Top9_nickname_次数: Top_nickname_次数[8], Top10_nickname_次数: Top_nickname_次数[9],
      Top1_次数: Top_次数[0], Top2_次数: Top_次数[1],
      Top3_次数: Top_次数[2], Top4_次数: Top_次数[3],
      Top5_次数: Top_次数[4], Top6_次数: Top_次数[5],
      Top7_次数: Top_次数[6], Top8_次数: Top_次数[7],
      Top9_次数: Top_次数[8], Top10_次数: Top_次数[9],
      Top1_ID_次数: Top_ID_次数[0], Top2_ID_次数: Top_ID_次数[1],
      Top3_ID_次数: Top_ID_次数[2], Top4_ID_次数: Top_ID_次数[3],
      Top5_ID_次数: Top_ID_次数[4], Top6_ID_次数: Top_ID_次数[5],
      Top7_ID_次数: Top_ID_次数[6], Top8_ID_次数: Top_ID_次数[7],
      Top9_ID_次数: Top_ID_次数[8], Top10_ID_次数: Top_ID_次数[9]
    }

    await render('admin/赌博次数排行榜', {
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