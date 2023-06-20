import plugin from '../../lib/plugins/plugin.js';
import fetch from "node-fetch";
import fs from 'fs'

const dirpath = "plugins/Tlon-Sky/data/id"
const 使用次数文件夹 = "plugins/Tlon-Sky/data/使用次数"
let filename = 'Sky UID.json'
let 使用次数文件 = '身高查询使用次数.json'
// 没有则自动创建
if (!fs.existsSync(dirpath)){fs.mkdirSync(dirpath);}
if (!fs.existsSync(使用次数文件夹)){fs.mkdirSync(使用次数文件夹);}
if (!fs.existsSync(dirpath + "/" + filename)) {fs.writeFileSync(dirpath + "/" + filename, JSON.stringify({}))}
if (!fs.existsSync(使用次数文件夹 + "/" + 使用次数文件)) {fs.writeFileSync(使用次数文件夹 + "/" + 使用次数文件, JSON.stringify({}))}
let 秘钥 = ''
export class 光遇_身高查询 extends plugin {
  constructor() {
    super({
      name: '光遇_身高查询',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [{
        reg: /^#?绑定身高id(.*)$/,
        fnc: '绑定身高id'
      },{
        reg: /^#?身高查询$/,
        fnc: '身高查询'
      },{
        reg: /^#?填写身高密钥(.*)$/,
        fnc: '填写密钥'
      },{
        reg: /^#?获取密钥$/,
        fnc: '获取密钥'
      }]
    });
  }

  async 获取密钥(e) {
    await this.reply('声明：密钥与本插件无关，插件只负责调用数据，您想用就买，不想用也可以不买去白嫖，请保管好您的密钥，以下是购买地址')
  }

  async 填写密钥(e) {
    const msg = e.msg;
    秘钥 = msg.replace(/#|填写身高密钥/g, "").trim();
    await this.reply(`填写成功，密钥${秘钥}`)
  }

  async 绑定身高id(e) {
    const msg = e.msg;
    const Sky_Uid = msg.replace(/#|绑定身高id/g, "").trim();
    const data = { Sky_Uid };
    const qq = e.user_id;
    const json = JSON.parse(fs.readFileSync(dirpath + "/" + filename, "utf8"));
    json[qq] = data;
    fs.writeFileSync(`${dirpath}/${filename}`, JSON.stringify(json, null, "\t"));
    const 消息 = json.hasOwnProperty(qq) ? "重新绑定成功" : "绑定成功\n您可使用'#身高查询'查询身高";
    await this.reply(消息);
  }
  
  async 身高查询(e) { // 定义一个名为身高查询的异步函数
    let userCounts = JSON.parse(fs.readFileSync(使用次数文件夹 + "/" + 使用次数文件, "utf8"));  // 读取使用次数文件，获取每个用户使用次数的统计信息
    const 用户QQ = e.user_id  // 获取用户的QQ号
    const 用户昵称 = e.sender.nickname  // 获取用户的昵称
    const 用户群昵称 = e.sender.card  // 获取用户在群内的昵称
    const 使用群昵称 = e.group_name // 获取使用命令的群的名称
    const 使用群号 = e.guild_id // 获取使用命令的群的号码
    const { 使用次数: userCount, 用户信息: userInfo } = userCounts[用户QQ] || { 使用次数: 0, 用户信息: {} };  // 获取用户的使用次数和相关信息
    const newCount = userCount + 1; // 将用户的使用次数加1
    userCounts[用户QQ] = { 
        使用次数: newCount,
        用户信息: {
            ...userInfo,
            "用户QQ": 用户QQ,
            "用户昵称": 用户昵称,
            "用户群昵称": 用户群昵称,
            "使用群昵称": 使用群昵称,
            "使用群号": 使用群号,
        }
    };  // 更新用户的使用次数和相关信息
    fs.writeFileSync(使用次数文件夹 + "/" + 使用次数文件, JSON.stringify(userCounts, null, "\t"));  // 将更新后的使用次数信息写入文件
    const json = JSON.parse(fs.readFileSync(dirpath + "/" + filename, "utf8")); // 读取用户身高ID的JSON数据
    if (json.hasOwnProperty(用户QQ)) {  // 判断用户是否已经绑定身高ID
      const 打开使用次数文件 = JSON.parse(fs.readFileSync(使用次数文件夹 + "/" + 使用次数文件, "utf8"));
      const 使用次数 = 打开使用次数文件[`${用户QQ}`]["使用次数"]  // 获取用户的使用次数
      const 文字 = 'id已收录，正在查询...\n官频：Tlon-Sky'  // 拼接提示信息
      const 图片 = 'plugins/Tlon-Sky/resource/统计及其他/官频.png'
      const 消息 = [
        文字 ? 文字 : "",
        图片 ? segment.image(图片) : ""
      ] // 将文字和图片组合成一个消息数组
      await e.reply(消息, false, { recallMsg: 20 }, true);  // 向用户发送消息
      const Sky_Uid = json[用户QQ].Sky_Uid; // 获取用户绑定的身高ID
      const response = await fetch(`https://ws.lightstar.top/sky/getHeights/${秘钥}&${Sky_Uid}`);  // 发送HTTP请求，获取身高信息
      const data = await response.json(); // 将返回的JSON数据解析为JavaScript对象
      if (data.code === 200) {  // 判断是否成功获取身高信息
        const { scale, height, maxHeight, minHeight, currentHeight } = data.data; // 解析身高信息
        const 最高 = Math.floor(maxHeight * 100) / 100; // 将最高身高保留两位小数
        const 最矮 = Math.floor(minHeight * 100) / 100; // 将最矮身高保留两位小数
        const 当前 = Math.floor(currentHeight * 100) / 100;  // 将当前身高保留两位小数
        const 文字 = `\n体型 S 值是：\n${scale}\n身高 H 值是：\n${height}\n最高是：${最高.toFixed(3)}号\n最矮是：${最矮.toFixed(3)}号\n目前身高：${当前.toFixed(3)}号\n使用次数：${使用次数}`;  // 拼接身高信息
        const 消息 = [segment.at(e.user_id), 文字 ? 文字 : ""]; // 将文字和艾特用户组合成一个消息数组
        await this.reply(消息); // 向用户发送消息
      } else if (data.code === 201) { // 判断是否身高ID错误
        const 文字 = '绑定id错误,请重新绑定';
        const 消息 = [文字 ? 文字 : ""];  // 将文字组成一个消息数组
        await this.reply(消息); // 向用户发送消息
      } else if (data.code === 400) { // 判断秘钥是否错误
        const 文字 = '秘钥错误或尚未填写密钥请使用#填写身高密钥<密钥>来使用\n无密钥请发送#获取密钥'
        const 消息 = [文字 ? 文字 : ""];  // 将文字组成一个消息数组
        await this.reply(消息); // 向用户发送消息
      }
    } else {  // 用户没有绑定身高ID
      await e.reply('您还未绑定id');
    }
  }
}