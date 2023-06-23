 import plugin from '../../../lib/plugins/plugin.js';
import fetch from "node-fetch";
import fs from 'fs'

const dirpath = "plugins/Tlon-Sky/data/id"
const 使用次数文件夹 = "plugins/Tlon-Sky/data/使用次数"
const filename = 'Sky UID.json'
const 使用次数文件 = '身高查询使用次数.json'
const 密钥文件夹 = 'plugins/Tlon-Sky/data'
const 密钥 = '密钥.json'
if (!fs.existsSync(dirpath)){fs.mkdirSync(dirpath);}
if (!fs.existsSync(使用次数文件夹)){fs.mkdirSync(使用次数文件夹);}
if (!fs.existsSync(dirpath + "/" + filename)) {fs.writeFileSync(dirpath + "/" + filename, JSON.stringify({}))}
if (!fs.existsSync(使用次数文件夹 + "/" + 使用次数文件)) {fs.writeFileSync(使用次数文件夹 + "/" + 使用次数文件, JSON.stringify({}))}
if (!fs.existsSync(密钥文件夹 + "/" + 密钥)) {fs.writeFileSync(密钥文件夹 + "/" + 密钥, JSON.stringify({}))}

export class 光遇_身高查询 extends plugin {
  constructor() {
    super({
      name: '光遇_身高查询',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [{
        reg: /^#?(身高查询|查询身高)$/,
        fnc: '身高查询'
      },{
        reg: /^#?填写身高密钥(.*)$/,
        fnc: '填写密钥'
      },{
        reg: /^#?获取密钥$/,
        fnc: '获取密钥'
      },{
        reg: /^#?查询身高密钥$/,
        fnc: '查询密钥'
      }]
    });
  }

  async 查询密钥(e) {
    const 密钥文件 = JSON.parse(fs.readFileSync(密钥文件夹 + "/" + 密钥, "utf8"));
    const 用户密钥 = 密钥文件["密钥"]["用户密钥"]
    await this.reply(`您的密钥是${用户密钥}`)
  }

  async 获取密钥(e) {
    await this.reply('声明：密钥与本插件无关，插件只负责调用数据，您想用就买，不想用也可以不买去白嫖，请保管好您的密钥，以下是购买地址\nQQ：1448717612')
  }

  async 填写密钥(e) {
    const msg = e.msg;
    const 用户密钥 = msg.replace(/#|填写身高密钥/g, "").trim();
    const data = { 用户密钥 };
    const 数据 = '密钥';
    const json = JSON.parse(fs.readFileSync(密钥文件夹 + "/" + 密钥, "utf8"));
    json[数据] = data;
    fs.writeFileSync(密钥文件夹 + "/" + 密钥, JSON.stringify(json, null, "\t"));
    const 消息 = json.hasOwnProperty(数据) ? "重新填写成功" : "填写成功";
    await this.reply(消息);
  }
  
  async 身高查询(e) {
    const 使用次数文件路径 = 使用次数文件夹 + "/" + 使用次数文件;
    const userCounts = JSON.parse(fs.readFileSync(使用次数文件路径, "utf8"));
    const 用户QQ = e.user_id;
    const 用户昵称 = e.sender.nickname;
    const 用户群昵称 = e.sender.card;
    const 使用群昵称 = e.group_name;
    const 使用群号 = e.guild_id;
    const { 使用次数: userCount, 用户信息: userInfo } = userCounts[用户QQ] || { 使用次数: 0, 用户信息: {} };
    const newCount = userCount + 1
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
    };
    fs.writeFileSync(使用次数文件路径, JSON.stringify(userCounts, null, "\t"));
    const json = JSON.parse(fs.readFileSync(dirpath + "/" + filename, "utf8"));
    const id = e.user_id;
    if (json.hasOwnProperty(id)) {
      const 文字 = 'id已收录，正在查询...\n官频：Tlon-Sky'
      const 图片 = 'plugins/Tlon-Sky/resource/统计及其他/官频.png'
      const 消息 = [
        文字 ? 文字 : "",
        图片 ? segment.image(图片) : ""
      ];
      await e.reply(消息, false, { recallMsg: 20 }, true);
      const Sky_Uid = json[id].Sky_Uid;
      const response = await fetch(`https://ws.lightstar.top/sky/getHeights/${用户密钥}&${Sky_Uid}`);
      const data = await response.json();
      if (data.code === 200) {
        const 打开使用次数文件 = JSON.parse(fs.readFileSync(使用次数文件路径, "utf8"));
        const 使用次数 = 打开使用次数文件[id]["总使用次数"];
        const { scale, height, maxHeight, minHeight, currentHeight } = data.data;
        const 最高 = Math.floor(maxHeight * 100) / 100;
        const 最矮 = Math.floor(minHeight * 100) / 100;
        const 当前 = Math.floor(currentHeight * 100) / 100;
        const 消息 = [
          segment.at(e.user_id),
          '\n体型 S 值是：\n',scale,
          '\n身高 H 值是：\n',height,
          '\n最高是：',最高.toFixed(3),
          '号\n最矮是：',最矮.toFixed(3),
          '号\n目前身高：',当前.toFixed(3),
          '号\n总使用次数：',使用次数.toString()
        ];
        await e.reply(消息);
      } else if (data.code === 201) {
        const 文字 = '绑定id错误,请重新绑定';
        const 图片 = 'plugins/Tlon-Sky/resource/身高教程.png'
        const 消息 = [文字 ? 文字 : "",图片 ? segment.image(图片) : ""];
        await e.reply(消息);
      }
    } else {
      const 文字 = '您还未绑定id';
      const 图片 = 'plugins/Tlon-Sky/resource/身高教程.png'
      const 消息 = [文字 ? 文字 : "",图片 ? segment.image(图片) : ""];
      await e.reply(消息);
    }
  }
  }