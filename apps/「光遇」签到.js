import plugin from '../../../lib/plugins/plugin.js'
import { render , Data } from '../components/index.js'
import lodash from 'lodash'
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
    let 昵称 = e.sender.nickname;
    let msg,msg1,msg2,msg3,msg4 = '';
    let 获得数量,当前数量,连续天数,累计天数 ='';
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
      msg = `签到失败，今日已签`;
      msg1 = `无`
      msg2 = `当前共有${userData[signInIndex].candles}根蜡烛`
      msg3 = `连续签到${userData[signInIndex].continuousDays}天`
      msg4 = `累计签到${accumulatedDays}天`
      获得数量 = `无`
      当前数量 = `${userData[signInIndex].candles}`
      连续天数 = `${userData[signInIndex].continuousDays}`
      累计天数 = `${accumulatedDays}`
    } else {
      let candles = Math.floor(Math.random() * 9) + 15;
      let quantity = candles;
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
      msg = `签到成功`;
      msg1 = `获得${quantity}根蜡烛`
      msg2 = `当前共有${candles}根蜡烛`
      msg3 = `连续签到${continuousDays}天`
      msg4 = `累计签到${accumulatedDays}天`
      获得数量 = `${quantity}`
      当前数量 = `${candles}`
      连续天数 = `${continuousDays}`
      累计天数 = `${accumulatedDays}`
    }
    let data = {
      tx: `https://api.t1qq.com/api/tool/qq/qqtx?key=lHV6bOsaNrsNv2hmegRRVMxOUp&qq=${userId}`,
      msg: msg,
      msg1: msg1,
      msg2: msg2,
      msg3: msg3,
      msg4: msg4,
      qq: 昵称,
      quantity: 获得数量,
      candles: 当前数量,
      continuousDays: 连续天数,
      accumulatedDays: 累计天数
    }
    await render('admin/qd', {
      ...data,
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