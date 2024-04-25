import fetch from "node-fetch"

export class SKY extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:剩余时间',
      dsc: '光遇剩余时间',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^(#|\/)?季节剩余$/,
          fnc: 'SEASONAL_INFO_CALCULATION'
        }
      ]
    })
  }

  async SEASONAL_INFO_CALCULATION(e) {
    const URL_DATA = await (await fetch('https://gitee.com/Tloml-Starry/resources/raw/master/resources/json/季节剩余.json')).json()

    const START_MS = new Date(URL_DATA['start']).getTime();
    const END_MS = new Date(URL_DATA['end']).getTime();
    const SEASON_NAME = URL_DATA['name'];
    const graduationWax = URL_DATA['number'];

    const GET_TIME = Date.now();
    const MILLISECOND = END_MS - GET_TIME;

    if (MILLISECOND <= 0) { return e.reply([segment.at(e.user_id), SEASON_NAME + '已结束！请等待下个季节到来.']) };

    const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
    const daysBetween = (Math.floor((END_MS - START_MS) / DAY_IN_MILLISECONDS) + 1);

    // 季节剩余时间计算
    const { days, hours, minutes, seconds } = {
      days: Math.floor(MILLISECOND / (24 * 60 * 60 * 1000)),
      hours: Math.floor((MILLISECOND % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)),
      minutes: Math.floor((MILLISECOND % (60 * 60 * 1000)) / (60 * 1000)),
      seconds: Math.floor((MILLISECOND % (60 * 1000)) / 1000)
    };

    // 可获得季蜡计算
    const seasonWaxWithCard = (days + 1) * 6;
    const seasonWaxWithoutCard = (days + 1) * 5;

    // 毕业需要时间计算
    const graduationDaysWithCard = Math.ceil((graduationWax - 30) / 6);
    const graduationDaysWithoutCard = Math.ceil((graduationWax - 12) / 5);

    return e.reply((e.adapter === 'QQBot') ? [
      `# 当前季节【${SEASON_NAME}】`,
      '> 距离季节结束还剩',
      `${days}天${hours}小时${minutes}分钟${seconds}秒`,
      `截至至${URL_DATA['end']}`,
      `本季节一共[${daysBetween}]天`,
      '季蜡还可获得：',
      `[有季卡]：${seasonWaxWithCard}季蜡`,
      `[无季卡]：${seasonWaxWithoutCard}季蜡`,
      `本季节毕业需：${graduationWax}季蜡`,
      `[有季卡]毕业需：${graduationDaysWithCard}天`,
      `[无季卡]毕业需：${graduationDaysWithoutCard}天`,
      '(无季卡包括非必要的魔法节点)',
      Bot.Button([[
        { label: '再看一次', callback: '/季节剩余' },
        { label: '光遇公告', enter: true },
        { label: '光遇菜单', enter: true }
      ]])
    ] : [
      segment.at(e.user_id),
      `\n距离${SEASON_NAME}结束还剩`,
      `\n${days}天${hours}小时${minutes}分钟${seconds}秒`,
      `\n截至至${URL_DATA['end']}`,
      `\n本季节一共${daysBetween}天`,
      '\n季蜡还可获得：',
      `\n[有季卡]：${seasonWaxWithCard}季蜡`,
      `\n[无季卡]：${seasonWaxWithoutCard}季蜡`,
      `\n本季节毕业需：${graduationWax}季蜡`,
      `\n[有季卡]毕业需：${graduationDaysWithCard}天`,
      `\n[无季卡]毕业需：${graduationDaysWithoutCard}天`,
      '\n(无季卡包括非必要的魔法节点)'
    ])
  }
}