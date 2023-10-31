import plugin from '../../../lib/plugins/plugin.js'
import { render } from '../components/index.js'
import lodash from 'lodash'
import fs from 'fs'

fs.mkdirSync('plugins/Tlon-Sky/data/Sky签到', { recursive: true });
export class 娱乐_签到 extends plugin {
  constructor() {
    super({
      name: '娱乐_签到',
      dsc: '娱乐',
      event: 'message',
      priority: 1,
      rule: [
        {
          reg: /^#?(光遇签到|冒泡)$/,
          fnc: '光遇签到'
        },
        {
          reg: /^#?设置昵称(.*)$/,
          fnc: '设置昵称'
        }
      ]
    })
  }
  async 光遇签到(e) {
    let 昵称 = null
    let userId = e.user_id;
    const fileName = (`plugins/Tlon-Sky/data/Sky签到/${userId}.json`);

    // 判断是否存在用户存档
    if (!fs.existsSync(fileName)) {
      const 用户ID = e.user_id
      let 信息 = {}
      fs.writeFileSync(`plugins/Tlon-Sky/data/Sky签到/${用户ID}.json`, JSON.stringify(信息, null, 4))

      const 用户Data = fs.readFileSync(`plugins/Tlon-Sky/data/Sky签到/${用户ID}.json`)
      const 用户JSON = JSON.parse(用户Data.toString())
      用户JSON[用户ID] = {
        昵称: '未命名',
        最后签到日期: null,
        连续签到天数: 0,
        累计签到天数: 0,
        能量值: 0,
        等级: 0,
        白蜡: 0,
        季蜡: 0,
        抢蜡烛次数: 0,
        被抢次数: 0,
        抢蜡烛总数: 0,
        被抢蜡烛总数: 0,
        上次抢蜡烛时间戳: 0,
        胜: 0,
        负: 0,
        平: 0,
        赚取: 0,
        亏损: 0,
        总赠送数量: 0,
        总收入数量: 0
      }
      fs.writeFileSync(`plugins/Tlon-Sky/data/Sky签到/${用户ID}.json`, JSON.stringify(用户JSON, null, 4));
      e.reply('用户第一次执行光遇签到\n创建基础信息成功！\n使用"设置昵称+内容"可设置昵称呦~')
    }

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
    const 用户背包文件 = `plugins/Tlon-Sky/data/背包/${被抢用户ID}.json`
    if (!fs.existsSync(用户背包文件)) {
      let 背包信息 = {}
      fs.writeFileSync(用户背包文件, JSON.stringify(背包信息, null, 4))
      const _用户背包文件Data = fs.readFileSync(用户背包文件)
      const _用户背包文件Json = JSON.parse(_用户背包文件Data.toString())
      _用户背包文件Json[userId] = {
        蜡烛保护卡: 0,
        签到双倍卡: 0
      }
      fs.writeFileSync(用户背包文件, JSON.stringify(_用户背包文件Json, null, 4))
      logger.mark(`\n已为用户${userId}\n创建背包信息`)
    }
    const 用户背包文件Data = await fs.promises.readFile(用户背包文件)
    const 用户背包文件Json = JSON.parse(用户背包文件Data.toString())
    // 更新签到数据
    data[userId].最后签到日期 = getCurrentDate()
    data[userId].连续签到天数 = is连续签到 ? (连续签到天数 + 1) : 1
    data[userId].累计签到天数 = 累计签到天数 + 1
    data[userId].能量值 = (data[userId]?.能量值 || 0) + 能量值
    if (用户背包文件Json[userId]['签到双倍卡'] >= 1) {
      data[userId].白蜡 = (data[userId]?.白蜡 || 0) + 白蜡 * 2
      data[userId].季蜡 = (data[userId]?.季蜡 || 0) + 季蜡 * 2
      e.reply('消耗蜡烛双倍卡，蜡烛翻倍！')
    } else {
      data[userId].白蜡 = (data[userId]?.白蜡 || 0) + 白蜡
      data[userId].季蜡 = (data[userId]?.季蜡 || 0) + 季蜡
      data[userId].能量值 = (data[userId]?.能量值 || 0) + 能量值
    }
    // 判断是否升级
    if (data[userId].能量值 >= 100) {
      data[userId].等级 = (data[userId]?.等级 || 0) + 1;
      data[userId].能量值 = data[userId].能量值 - 100;
    }

    // 将数据保存到JSON文件中并回复用户
    try {
      fs.writeFileSync(fileName, JSON.stringify(data, null, 4));
      const 累计签到提示 = `你已累计签到 ${data[userId].累计签到天数} 天！`
      const 连续签到提示 = is连续签到 ? `你已连续签到 ${data[userId].连续签到天数} 天！` : '';
      let html = {
        昵称: data[userId].昵称,
        头像: `https://api.t1qq.com/api/tool/qq/qqtx?key=lHV6bOsaNrsNv2hmegRRVMxOUp&qq=${userId}`,
        获得白蜡: 白蜡,
        数量_白: data[userId].白蜡 - 白蜡,
        获得季蜡: 季蜡,
        数量_季: data[userId].季蜡 - 季蜡,
        获得能量值: 能量值,
        数量_能量: data[userId].能量值 - 能量值,
        等级: data[userId].等级,
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
      logger.mark('保存数据失败:', error);
      e.reply('签到失败，请稍后再试！');
    }
  }

  async 设置昵称(e) {
    const 用户ID = e.user_id
    const 昵称 = e.msg.replace(/#|设置昵称/g, "")
    const 用户文件 = `plugins/Tlon-Sky/data/Sky签到/${用户ID}.json`
    const 用户文件Data = await fs.promises.readFile(用户文件)
    const 用户文件Json = JSON.parse(用户文件Data.toString())

    用户文件Json[用户ID]['昵称'] = 昵称
    fs.writeFileSync(用户文件, JSON.stringify(用户文件Json, null, 4))
    e.reply(`设置成功，昵称：${昵称}`)
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