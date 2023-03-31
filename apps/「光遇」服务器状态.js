import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';

export class wenan extends plugin {
  constructor () {
    super({
      name: '光遇_服务器状态',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: `^#?((SKY|sky|Sky)服务器状态|(sky|SKY|Sky)状态)$`,
          fnc: 'sky_FWQZT'
        },
      ]
    })
  }
  async sky_FWQZT(e) { 
    let response = await fetch(`https://live-queue-sky-merge.game.163.com/queue?type=json`);
    let res = await response.json();
    let num;
    if(res.ret === 0){
      num = `查询结果：未炸服~`;
    } else if(res.ret === 1){
      num = `查询结果：炸服力~\n当前排队人数:「${res.pos}」\n预计所需时间:「${res.wait_time}」`;
    }
    e.reply(num, true);
  }  
}