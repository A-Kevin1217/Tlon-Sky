import plugin from '../../../../lib/plugins/plugin.js'
import { render } from '../../components/index.js'
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
    let 签到状态,获得白蜡,获得季蜡,获得能量值,等级,当前能量值,累计签到提示 = '';
    let userId = e.user_id;
    const fileName = (`plugins/Tlon-Sky/data/Sky签到/${userId}.json`, 'utf8');

    // 检查文件是否存在
    const fileExists = fs.existsSync(fileName);
    let data = {};

    if (fileExists) {
      // 读取保存数据的JSON文件
      try {
        const fileData = fs.readFileSync(fileName);
        data = JSON.parse(fileData.toString());
      } catch (error) {
          console.error('读取数据失败:', error);
      }
    }
  
    // 检查是否已经签到过
    if (data[userId] && data[userId].最后签到日期 === getCurrentDate()) {
      return e.reply('你今天已经签到过了！');
    }
  
    // 获取连续签到天数和累计签到天数
    const 连续签到天数 = (data[userId] && data[userId].连续签到天数) || 0;
    const 累计签到天数 = (data[userId] && data[userId].累计签到天数) || 0;

    // 检查是否是连续签到
    let is连续签到 = false;
    if (data[userId] && data[userId].最后签到日期 === getYesterdayDate()) {
      is连续签到 = true;
    }
  
    // 生成随机数 使用Math.floor(Math.random() * (max - min + 1)) + min可以生成指定范围内的随机整数，其中max是范围的上界，min是范围的下界
    const 白蜡 = Math.floor(Math.random() * (31 - 20 + 1)) + 20;
    const 季蜡 = Math.floor(Math.random() * (11 - 5 + 1)) + 5;
    const 能量值 = Math.floor(Math.random() * 30 - 20 + 1) + 20;

    // 获取之前保存的等级数据
    const 当前等级 = (data[userId] && data[userId].等级) || 0;
    // 更新签到数据
    data[userId] = {
      昵称: e.msg.author.username,
      最后签到日期: getCurrentDate(),
      连续签到天数: is连续签到 ? (连续签到天数 + 1) : 1,
      累计签到天数: 累计签到天数 + 1,
      白蜡: (data[userId]?.白蜡 || 0) + 白蜡,
      季蜡: (data[userId]?.季蜡 || 0) + 季蜡,
      能量值: (data[userId]?.能量值 || 0) + 能量值,
      等级: 当前等级,
    };
    // 判断是否升级
    if (data[userId].能量值 >= 100) {
      data[userId].等级 = (data[userId]?.等级 || 0) + 1;
      data[userId].能量值 = data[userId].能量值 - 100;
    }
  
    // 将数据保存到JSON文件中
    try {
      fs.writeFileSync(fileName, JSON.stringify(data, null, 4));
      签到状态 = '签到成功！'
      获得白蜡 = `你获得了白蜡：${白蜡}`
      获得季蜡 = `你获得了季蜡：${季蜡}`
      获得能量值 = `你获得了能力值：${能量值}`
      等级 = `当前等级: ${data[userId].等级 || 0}`
      当前能量值 = `能量值: ${data[userId].能量值}`
      累计签到提示 = `你已累计签到 ${data[userId].累计签到天数} 天！`
      const 连续签到提示 = is连续签到 ? `你已连续签到 ${data[userId].连续签到天数} 天！` : '';
      let html = {
        QQ昵称: 昵称,
        tx: `https://api.t1qq.com/api/tool/qq/qqtx?key=lHV6bOsaNrsNv2hmegRRVMxOUp&qq=${userId}`,
        签到状态: 签到状态,
        获得白蜡: 获得白蜡,
        获得季蜡: 获得季蜡,
        获得能量值: 获得能量值,
        等级: 等级,
        当前能量值: 当前能量值,
        累计签到提示: 累计签到提示,
        连续签到提示: 连续签到提示
      }
      await render('admin/签到', {
        ...html,
        bg: await rodom()
      }, {
        e,
        scale: 1.4
      })
    } catch (error) {
      console.error('保存数据失败:', error);
      签到状态 = '签到失败，请稍后再试！'
      let html = {
        QQ昵称: 昵称,
        tx: `https://api.t1qq.com/api/tool/qq/qqtx?key=lHV6bOsaNrsNv2hmegRRVMxOUp&qq=${userId}`,
        签到状态: 签到状态,
      }
      await render('admin/签到', {
        ...html,
        bg: await rodom()
      }, {
        e,
        scale: 1.4
      })
    }
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