import plugin from '../../../lib/plugins/plugin.js';
import fetch from "node-fetch";
import fs from 'fs'

const dirpath = "plugins/Tlon-Sky/data/id"
const 使用次数文件夹 = "plugins/Tlon-Sky/data/使用次数"
const filename = 'Sky UID.json'
const 使用次数文件 = '身高查询使用次数.json'
if (!fs.existsSync(dirpath)){fs.mkdirSync(dirpath);}
if (!fs.existsSync(使用次数文件夹)){fs.mkdirSync(使用次数文件夹);}
if (!fs.existsSync(dirpath + "/" + filename)) {fs.writeFileSync(dirpath + "/" + filename, JSON.stringify({}))}
if (!fs.existsSync(使用次数文件夹 + "/" + 使用次数文件)) {fs.writeFileSync(使用次数文件夹 + "/" + 使用次数文件, JSON.stringify({}))}

export class 光遇_身高查询 extends plugin {
  constructor() {
    super({
      name: '光遇_身高查询',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^#?(身高查询|查询身高|我的角色)$/,
          fnc: '身高查询'
        }
      ]
    });
  }

  async 身高查询(e) {
    const currentDate = new Date().toISOString().slice(0, 10);
    const 使用次数文件路径 = 使用次数文件夹 + "/" + 使用次数文件;
    const userCounts = JSON.parse(fs.readFileSync(使用次数文件路径, "utf8"));
    const 用户QQ = e.user_id;
    const 用户昵称 = e.sender.nickname;
    const 用户群昵称 = e.sender.card;
    const 使用群昵称 = e.group_name;
    const 使用群号 = e.guild_id;
    const { 
      限制次数: userCount限制 = 0,
      总使用次数: userCount = 0,
      用户信息: userInfo = {},
      日期: userDate = ""
    } = userCounts[用户QQ] || {};
    if (userDate && userDate === currentDate && userCount限制 >= 7) {
      await e.reply('您已达到每日使用次数限制');
      return;
    }
    const newCount限制 = userCount限制 + 1; const newCount = userCount + 1; userCounts[用户QQ] = {
      限制次数: newCount限制, 总使用次数: newCount, 用户信息:
      {
        ...userInfo, 
        "用户QQ": 用户QQ, 
        "用户昵称": 用户昵称, 
        "用户群昵称": 用户群昵称, 
        "使用群昵称": 使用群昵称, 
        "使用群号": 使用群号
      },
      日期: currentDate
    };
    fs.writeFileSync(使用次数文件路径, JSON.stringify(userCounts, null, "\t"));
    const json = JSON.parse(fs.readFileSync(dirpath + "/" + filename, "utf8"));
    if (json.hasOwnProperty(用户QQ)) {
      const Sky_Uid = json[用户QQ].Sky_Uid;
      try {
        const response = await fetch(`https://api.t1qq.com/api/sky/sc/adorn.php?cx=${Sky_Uid}&qq=${用户QQ}&nc=${用户昵称}`);
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            // 处理返回的 JSON 数据
          } else if (contentType && contentType.includes('image')) {
            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
            await e.reply(imageUrl)
          } else {
            // 处理其他类型的响应
          }
        } else if (response.code === 201){
          const 文字 = '绑定id错误';
          const 图片 = 'plugins/Tlon-Sky/resource/身高教程.png'
          const 消息 = [文字 ? 文字 : "",图片 ? segment.image(图片) : ""];
          e.reply(消息)
          // 处理请求失败的情况
        }
      } catch (error) {
        // 处理请求异常
      }
      
      const response = await fetch(`https://api.t1qq.com/api/sky/sc/adorn.php?cx=${Sky_Uid}&qq=${用户QQ}&nc=${用户昵称}`);
        const 消息 = [
          response ? segment.image(response) : ""
        ];
        await e.reply(消息);
    } else {
      const 文字 = '您还未绑定id';
      const 图片 = 'plugins/Tlon-Sky/resource/身高教程.png'
      const 消息 = [文字 ? 文字 : "",图片 ? segment.image(图片) : ""];
      await e.reply(消息);
    }
  }
  }