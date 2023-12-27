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
        }
      ]
    })
  }

  async 季节剩余(e) {
    const START_TIME = new Date('2023-10-19 10:00:00').getTime();
    const END_TIME = new Date('2024-01-10 23:59:59').getTime();
    let msg = '';

    const countdown = () => {
      const GET_TIME = Date.now();
      const MILLISECOND = END_TIME - GET_TIME;

      if (MILLISECOND <= 0) {
        msg = '归巢季已结束！请等待下个季节到来.';
        return;
      }

      const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
      const daysBetween = Math.floor((END_TIME - START_TIME) / DAY_IN_MILLISECONDS);

      const { days, hours, minutes, seconds } = {
        days: Math.floor(MILLISECOND / (24 * 60 * 60 * 1000)),
        hours: Math.floor((MILLISECOND % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)),
        minutes: Math.floor((MILLISECOND % (60 * 60 * 1000)) / (60 * 1000)),
        seconds: Math.floor((MILLISECOND % (60 * 1000)) / 1000)
      };

      const graduationWax = 396;
      const seasonWaxWithCard = days * 6;
      const seasonWaxWithoutCard = days * 5;
      const graduationDaysWithCard = Math.ceil((graduationWax - 30) / 6);
      const graduationDaysWithoutCard = Math.ceil((graduationWax - 12) / 5);

      msg = `距离归巢季结束还剩
${days} 天 ${hours} 小时 ${minutes} 分钟 ${seconds} 秒
截止至2024-01-10 23:59:59
本季节一共[${daysBetween}]天
季蜡还可获得
[有季卡]：${seasonWaxWithCard}季蜡
[无季卡]：${seasonWaxWithoutCard}季蜡
本季节毕业需：${graduationWax}季蜡
[有季卡]毕业需：${graduationDaysWithCard}天
[无季卡]毕业需：${graduationDaysWithoutCard}天
(包括非必要的魔法节点)`;

      setTimeout(countdown, 1000);
    };

    countdown();
    await e.reply(msg, true);
    return;
  }
}