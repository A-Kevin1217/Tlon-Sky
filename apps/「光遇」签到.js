import plugin from '../../../lib/plugins/plugin.js'
import fs from 'fs'

fs.mkdirSync('plugins/Sky/data/Sky签到', { recursive: true });
export class Sky_Signin extends plugin {
  constructor () {
    super({
      name: '光遇_签到',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^#?光遇签到$/,
          fnc: '光遇签到'
        }
      ]
    })
  }
}

async function Sky_Signin(e) {
    let msg = '';
    let userId = e.msg.author.id;
    // 读取本地JSON数据
    let userData = [];
    try {
      const fileData = fs.readFileSync(`plugins/Sky/data/Sky签到/${userId}.json`, 'utf8');
      userData = JSON.parse(fileData);
    } catch (err) {
      // 如果文件不存在，则创建一个空的JSON文件
      fs.writeFileSync(`${userId}.json`, '[]', 'utf8');
    }
  
    // 查找匹配的签到数据
    const today = new Date().toISOString().slice(0, 10);
    const signInIndex = userData.findIndex(data => data.date === today);
  
    if (signInIndex !== -1) {
      msg = `您今天已经签到过了`;
      e.reply(msg, segment.reply(e.msg.id));
    } else {
      // 更新用户的蜡烛数量
      var candles = Math.floor(Math.random() * 9) + 15;
      var quantity = candles;
      console.error('签到获得：',candles);
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      const yesterdayIndex = userData.findIndex(data => data.date === yesterday);
      if (yesterdayIndex !== -1) {
        candles += userData[yesterdayIndex].candles;
      }
      const signInData = {
        candles,
        date: today,
      };
      userData.push(signInData);
      // 保存更新后的数据到本地
      fs.writeFileSync(`plugins/Sky/data/Sky签到/${userId}.json`, JSON.stringify(userData), 'utf8');
      msg = `签到成功，获得${quantity}根蜡烛\n当前共有${candles}根蜡烛`;
      e.reply(msg, segment.reply(e.msg.id));
    }
  }
  