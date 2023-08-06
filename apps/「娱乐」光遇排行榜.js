import plugin from '../../../lib/plugins/plugin.js';
import { render } from '../components/index.js'
import lodash from 'lodash'
import fs from 'fs';
import path from 'path';

export class 娱乐_光遇排行榜 extends plugin {
  constructor() {
    super({
      name: '娱乐_光遇排行榜',
      dsc: '娱乐',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^#?光遇排行榜$',
          fnc: '光遇排行'
        }
      ]
    });
  }
  
  async 光遇排行(e) {
    let 等级信息 = await 等级排行()
    let 白蜡信息 = await 白蜡排行()
    let 季蜡信息 = await 季蜡排行()
    
    let html = {
        等级信息,
        白蜡信息,
        季蜡信息
    }

    await render('admin/光遇排行榜', {
        ...html,
        bg: await rodom()
    }, {
        e,
        scale: 1.4
    })
  }
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

const 等级排行 = async function () {
    const directoryPath = 'plugins/Tlon-Sky/data/Sky签到'
    const files = fs.readdirSync(directoryPath); // 读取目录下的所有文件
    const ranking = [];
    
    // 遍历所有文件
    files.forEach((fileName) => {
        if (fileName.endsWith('.json')) {
            const userId = fileName.split('.')[0];
            const filePath = path.join(directoryPath, fileName);
            const fileData = fs.readFileSync(filePath);
            const data = JSON.parse(fileData.toString());
            const level = data[userId]?.等级 || 0;
            const nickname = data[userId]?.昵称 || 0;
        
            ranking.push({ nickname, level });
        }
    });
    
    ranking.sort((a, b) => b.level - a.level);

    const topTen = ranking.slice(0, 5);

    // 生成排行榜消息
    let message = '';
    topTen.forEach((info, index) => {
        const rank = index + 1;
        message += `Top${rank}：\n昵称：${info.nickname}\n当前等级：${info.level}\n\n`;
    });
    return message
}

const 白蜡排行 = async function () {
    const directoryPath = 'plugins/Tlon-Sky/data/Sky签到'
    const files = fs.readdirSync(directoryPath); // 读取目录下的所有文件
    const ranking = [];
    
    // 遍历所有文件
    files.forEach((fileName) => {
        if (fileName.endsWith('.json')) {
            const userId = fileName.split('.')[0];
            const filePath = path.join(directoryPath, fileName);
            const fileData = fs.readFileSync(filePath);
            const data = JSON.parse(fileData.toString());
            const level = data[userId]?.白蜡 || 0;
            const nickname = data[userId]?.昵称 || 0;
        
            ranking.push({ nickname, level });
        }
    });
    
    ranking.sort((a, b) => b.level - a.level);

    const topTen = ranking.slice(0, 5);

    // 生成排行榜消息
    let message = '';
    topTen.forEach((info, index) => {
        const rank = index + 1;
        message += `Top${rank}：\n昵称：${info.nickname}\n当前白蜡：${info.level}\n\n`;
    });
    return message
}

const 季蜡排行 = async function () {
    const directoryPath = 'plugins/Tlon-Sky/data/Sky签到'
    const files = fs.readdirSync(directoryPath); // 读取目录下的所有文件
    const ranking = [];
    
    // 遍历所有文件
    files.forEach((fileName) => {
        if (fileName.endsWith('.json')) {
            const userId = fileName.split('.')[0];
            const filePath = path.join(directoryPath, fileName);
            const fileData = fs.readFileSync(filePath);
            const data = JSON.parse(fileData.toString());
            const level = data[userId]?.季蜡 || 0;
            const nickname = data[userId]?.昵称 || 0;
        
            ranking.push({ nickname, level });
        }
    });
    
    ranking.sort((a, b) => b.level - a.level);

    const topTen = ranking.slice(0, 5);

    // 生成排行榜消息
    let message = '';
    topTen.forEach((info, index) => {
        const rank = index + 1;
        message += `Top${rank}：\n昵称：${info.nickname}\n当前季蜡：${info.level}\n\n`;
    });
    return message
}