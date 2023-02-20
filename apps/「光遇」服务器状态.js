import fetch from "node-fetch";
// 引入插件基础类
import plugin from '../../../lib/plugins/plugin.js';

// 增加插件类
export class wenan extends plugin {
  constructor () {
    super({
      // 插件名称
      name: '查询光遇服务器状态',
      // 插件描述
      dsc: '看看网易的破服务器有没有炸服',
      // 插件事件
      event: 'message',
      // 优先级
      priority: 5000,
      rule: [
        {
          // 正则表达式匹配
          reg: `^#?((SKY|sky|Sky)服务器状态|(sky|SKY|Sky)状态)$`,
          // 匹配成功后执行的函数
          fnc: 'skyfwq'
        },
      ]
    })
  }
  async skyfwq(e) { 
    // 获取服务器状态信息
    let response = await fetch(`https://live-queue-sky-merge.game.163.com/queue?type=json`);
    let res = await response.json();
    let num;
    // 判断服务器状态
    if(res.ret === 0){
      num = `查询结果：未炸服~`;
    } else if(res.ret === 1){
      num = `查询结果：炸服力~\n当前排队人数:「${res.pos}」\n预计所需时间:「${res.wait_time}」`;
    }
    let msg = [`${num}`];
    // 回复消息
    e.reply(msg, true);
  }  
}