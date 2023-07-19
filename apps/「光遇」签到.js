import plugin from '../../../lib/plugins/plugin.js'
import fs from 'fs'

fs.mkdirSync('plugins/Tlon-Sky/data/Sky签到', { recursive: true });
export class 光遇_签到 extends plugin {
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
  async 光遇签到(e) {
    let msg = '';
    let userId = e.user_id;
    let userData = [];
    let accumulatedDays = 0; // 累计签到天数
    
    try {
      const fileData = fs.readFileSync(`plugins/Tlon-Sky/data/Sky签到/${userId}.json`, 'utf8');
      userData = JSON.parse(fileData);
      accumulatedDays = userData.length; // 获取已有签到数据的长度作为累计签到天数
    } catch (err) {
      fs.writeFileSync(`plugins/Tlon-Sky/data/Sky签到/${userId}.json`, '[]', 'utf8');
    }
    
    const today = new Date().toISOString().slice(0, 10);
    const signInIndex = userData.findIndex(data => data.date === today);
    
    if (signInIndex !== -1) {
      // 用户今天已经签到过了
      msg = `您今天已经签到过了\n当前共有${userData[signInIndex].candles}根蜡烛\n连续签到${userData[signInIndex].continuousDays}天\n累计签到${accumulatedDays}天`;
      e.reply(msg, true);
    } else {
      let candles = Math.floor(Math.random() * 9) + 15;
      let quantity = candles;
      console.error('签到获得：', candles);
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      const yesterdayIndex = userData.findIndex(data => data.date === yesterday);
      let continuousDays = 1;
    
      if (yesterdayIndex !== -1) {
        candles += userData[yesterdayIndex].candles;
        continuousDays = userData[yesterdayIndex].continuousDays + 1;
      }
    
      const signInData = {
        candles,
        date: today,
        continuousDays,
      };
    
      userData.push(signInData);
      fs.writeFileSync(`plugins/Tlon-Sky/data/Sky签到/${userId}.json`, JSON.stringify(userData), 'utf8');
    
      accumulatedDays++; // 更新累计签到天数
    
      // 签到成功，返回签到获得的蜡烛数量、当前蜡烛总数、连续签到天数和累计签到天数
      msg = `签到成功，获得${quantity}根蜡烛\n当前共有${candles}根蜡烛\n连续签到${continuousDays}天\n累计签到${accumulatedDays}天`;
      e.reply(msg, true);
    }
    
  }
}

  