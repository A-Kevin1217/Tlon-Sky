/** 季节名称 */
const SEASON_NAME = '九色鹿季';
/** 季节毕业所需季蜡数量 */
const graduationWax = 398;
/** 季节开始时间 */
const START_TIME = '2024-01-15 10:00:00';
/** 季节结束时间 */
const END_TIME = '2024-04-07 23:59:59';
export class SEASONAL_INFO_CALCULATION extends plugin {
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
    const START_MS = new Date(START_TIME).getTime();
    const END_MS = new Date(END_TIME).getTime();

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

    return e.reply([
      segment.at(e.user_id),
      '距离' + SEASON_NAME + '结束还剩\n' +
      days + '天' + hours + '小时' + minutes + '分钟' + seconds + '秒\n' +
      '截至至' + END_TIME + '\n' +
      '本季节一共[' + daysBetween + ']天\n' +
      '季蜡还可获得：\n' +
      '[有季卡]：' + seasonWaxWithCard + '季蜡\n' +
      '[无季卡]：' + seasonWaxWithoutCard + '季蜡\n' +
      '本季节毕业需：' + graduationWax + '季蜡\n' +
      '[有季卡]毕业需：' + graduationDaysWithCard + '天\n' +
      '[无季卡]毕业需：' + graduationDaysWithoutCard + '天\n' +
      '(无季卡包括非必要的魔法节点)'
    ]);
  }
}