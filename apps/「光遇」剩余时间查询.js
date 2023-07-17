import plugin from '../../../lib/plugins/plugin.js'

export class 光遇_剩余时间 extends plugin {
    constructor () {
      super({
        name: '光遇_剩余时间',
        dsc: '日历',
        event: 'message',
        priority: 5000,
        rule: [
            {
              reg: /^#?季节剩余$/,
              fnc: '季节剩余'
            },{
              reg: /^#?活动剩余$/,
              fnc: '活动剩余'
            },{
              reg: /^#?季节结束时间$/,
              fnc: '季节结束时间'
            }
        ]
    })
}
async 季节剩余(e) {
  let 季节指定时间 = new Date('2023-7-19 12:00:00').getTime();
  let msg = '';

  function countdown() {
    let 现在时间 = Date.now();
    let 季节剩余时间_毫秒 = 季节指定时间 - 现在时间;

    if (季节剩余时间_毫秒 <= 0) {
      msg = '夜行季已结束！请等待下个季节到来.';
      return;
    }

    let 季节剩余时间_天 = Math.floor(季节剩余时间_毫秒 / (24 * 60 * 60 * 1000));
    let 季节剩余时间_小时 = Math.floor((季节剩余时间_毫秒 % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    let 季节剩余时间_分钟 = Math.floor((季节剩余时间_毫秒 % (60 * 60 * 1000)) / (60 * 1000));
    let 季节剩余时间_秒 = Math.floor((季节剩余时间_毫秒 % (60 * 1000)) / 1000);

    msg = `距离夜行季结束还剩\n${季节剩余时间_天} 天 ${季节剩余时间_小时} 小时 ${季节剩余时间_分钟} 分钟 ${季节剩余时间_秒} 秒\n截止至2023-7-19 12:00:00`;
    setTimeout(countdown, 1000);
  }
  countdown();
  await this.reply(msg, true);
  return;
}
async 活动剩余(e) {
  let 活动指定时间 = new Date('2023-7-26 23:59:59').getTime();
  let msg = '';

  function countdown() {
    let 现在时间 = Date.now();
    let 活动剩余时间_毫秒 = 活动指定时间 - 现在时间;
    if (活动剩余时间_毫秒 < 0) {
      msg = '缤纷飞行日已结束！';
      return;
    }
    let 活动剩余时间_天 = Math.floor(活动剩余时间_毫秒 / (24 * 60 * 60 * 1000));
    let 活动剩余时间_小时 = Math.floor((活动剩余时间_毫秒 % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    let 活动剩余时间_分钟 = Math.floor((活动剩余时间_毫秒 % (60 * 60 * 1000)) / (60 * 1000));
    let 活动剩余时间_秒 = Math.floor((活动剩余时间_毫秒 % (60 * 1000)) / 1000);
    msg = `距离缤纷飞行日结束还剩\n${活动剩余时间_天} 天 ${活动剩余时间_小时} 小时 ${活动剩余时间_分钟} 分钟 ${活动剩余时间_秒} 秒\n截止至2023-7-26 23:59:59`;
    setTimeout(countdown, 1000);
  }
  countdown();
  await this.reply(msg, true);
  return;
}
async 季节结束时间(e){
  const imgreply = 'plugins/Tlon-Sky/resource/统计及其他/季节结束时间.png'
  await this.reply([imgreply ? segment.image(imgreply) : ""],true)
}
}