import plugin from '../../../lib/plugins/plugin.js'

export class 光遇_剩余时间 extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:剩余时间',
      dsc: '光遇剩余时间',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^(#|\/)?季节剩余$/,
          fnc: '季节剩余'
        }, {
          reg: /^(#|\/)?季节结束时间$/,
          fnc: '季节结束时间'
        }
      ]
    })
  }
  async 季节剩余(e) {
    const END_TIME = new Date('2024-01-10 23:59:59').getTime();
    let msg = '';

    function countdown() {
      const GET_TIME = Date.now();
      const MILLISECOND = END_TIME - GET_TIME;

      if (MILLISECOND <= 0) {
        msg = '归巢季已结束！请等待下个季节到来.';
        return;
      }

      const DAY = Math.floor(MILLISECOND / (24 * 60 * 60 * 1000));
      const HOUR = Math.floor((MILLISECOND % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      const MINUTE = Math.floor((MILLISECOND % (60 * 60 * 1000)) / (60 * 1000));
      const SECOND = Math.floor((MILLISECOND % (60 * 1000)) / 1000);

      msg = [
        `距离归巢季结束还剩\n`,
        `${DAY} 天 ${HOUR} 小时 ${MINUTE} 分钟 ${SECOND} 秒\n`,
        `截止至2024-01-10 23:59:59\n`,
        `季蜡还可获得\n`,
        `[有季卡]：${DAY * 6}季蜡\n`,
        `[无季卡]：${DAY * 5}季蜡\n`,
        `本季节毕业需：396季蜡\n`,
        `[有季卡]毕业需：${((396 - 30) / 6).toFixed(1)}\n`,
        `[无季卡]毕业需：${(396 / 5).toFixed(1)}`
      ]
      setTimeout(countdown, 1000);
    }
    countdown();
    await this.reply(msg, true);
    return;
  }
  
  async 季节结束时间(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/统计及其他/季节结束时间.png'
    await this.reply([imgreply ? segment.image(imgreply) : ""], true)
  }
}