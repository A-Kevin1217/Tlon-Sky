import fs from 'fs';
import { render } from '../components/index.js';
import { SD, GUD, ITUE } from '../utils/db.js';

export class SKY extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]娱乐:签到',
      dsc: 'Tlon-Sky',
      event: 'message',
      priority: 1,
      rule: [{
        reg: /^(#|\/)?光遇签到$/,
        fnc: 'skyEncounterCheckIn'
      }, {
        reg: /^(#|\/)?设置昵称(.*)$/,
        fnc: 'setNickname'
      }, {
        reg: /^(#|\/)?设置头像(.*)$/,
        fnc: 'setAvatar'
      }]
    })
  }

  async skyEncounterCheckIn(e) {
    // 用户ID和用户文件
    const USER_ID = e.user_id;
    const USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${USER_ID}.json`

    let REPLY = []
    // 用户是否存在
    if (!ITUE(USER_ID)) {
      // 随机昵称
      const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      let RANDOM_NICKNAMES = ''
      for (let i = 0; i < 15; i++) {
        const RANDOM_INDEX = Math.floor(Math.random() * CHARACTERS.length)
        const RANDOM_CHAR = CHARACTERS.charAt(RANDOM_INDEX)
        RANDOM_NICKNAMES += RANDOM_CHAR
      }

      // 用户ID是否为number类型，不是则使用3620060826作为头像
      let AVATAR
      if (typeof USER_ID === 'number') { AVATAR = USER_ID } else { AVATAR = 3620060826 }

      // 存储
      SD(USER_FILE, { ID: USER_ID, 昵称: RANDOM_NICKNAMES, 头像: AVATAR, 最后签到日期: '', 连续签到天数: 0, 累计签到天数: 0, 能量值: 0, 等级: 0, 白蜡: 0, 季蜡: 0, 抢蜡烛次数: 0, 被抢次数: 0, 抢蜡烛总数: 0, 被抢蜡烛总数: 0, 上次抢蜡烛时间戳: 0, 胜: 0, 负: 0, 平: 0, 赚取: 0, 亏损: 0, 总赠送数量: 0, 总收入数量: 0, 背包: { 蜡烛保护卡: 0, 签到双倍卡: 0 } })

      // 是否为QQ机器人，新用户提示
      if (e.adapter === 'QQBot') {
        REPLY = [
          `# 第${(fs.readdirSync('plugins/Tlon-Sky/data/Sky签到')).length}位用户`,
          '> [设置昵称(昵称)]指令可设置昵称\n' +
          '> 示例：设置昵称小秋\n' +
          '> [设置头像(QQ号)]可设置为QQ头像\n' +
          '> 示例：设置头像114514'
        ]
      } else {
        REPLY = [
          segment.at(e.user_id),
          '\n设置昵称[昵称]指令可设置昵称' +
          '\n示例：设置昵称小秋' +
          '\n设置头像[QQ号]可设置为QQ头像' +
          '\n示例：设置头像114514'
        ]
      }
    }

    // 读取用户数据
    const USER_DATA = GUD(USER_ID)

    // 获取相应数据
    const CONSECUTIVE_DAYS = USER_DATA['连续签到天数']
    const CUMULATIVE_DAYS = USER_DATA['累计签到天数']
    const DATE_LAST = USER_DATA['最后签到日期']

    // 今日是否已签到
    if (DATE_LAST === getCurrentDate()) { return e.reply('今日已签，请明日再来') }

    // 是否连续签到
    let IS_CONSECUTIVE = false
    if (DATE_LAST === getYesterdayDate()) IS_CONSECUTIVE = true

    // 今日获得白蜡，季蜡和能量值
    let GET_BL = Math.floor(Math.random() * (31 - 20 + 1)) + 20;
    let GET_JL = Math.floor(Math.random() * (11 - 5 + 1)) + 5;
    const GET_NLZ = Math.floor(Math.random() * 30 - 20 + 1) + 20;

    // 是否双倍
    let IS_DOUBLE = false
    if (USER_DATA['背包']['签到双倍卡'] >= 1) { GET_BL *= 2; GET_JL *= 2; USER_DATA['背包']['签到双倍卡'] -= 1; IS_DOUBLE = true }

    // 数据处理
    USER_DATA['最后签到日期'] = getCurrentDate();
    USER_DATA['连续签到天数'] = IS_CONSECUTIVE ? (CONSECUTIVE_DAYS + 1) : 1;
    USER_DATA['累计签到天数'] = CUMULATIVE_DAYS + 1;
    USER_DATA['白蜡'] += GET_BL;
    USER_DATA['季蜡'] += GET_JL;
    USER_DATA['能量值'] += GET_NLZ;

    // 是否升级
    if (USER_DATA['能量值'] >= 100) { USER_DATA['等级'] = (USER_DATA['等级'] || 0) + 1; USER_DATA['能量值'] = USER_DATA['能量值'] - 100 }

    // 存储
    SD(USER_FILE, USER_DATA);

    // 提示
    const CUMULATIVE_HINT = `你已累计签到 ${CUMULATIVE_DAYS} 天！`;
    const CONSECUTIVE_HINT = IS_CONSECUTIVE ? `你已连续签到 ${CONSECUTIVE_DAYS} 天！` : '';

    // 传入并返回图片
    await render('admin/签到', {
      NICKNAME: USER_DATA['昵称'],
      HEAD_PORTRAIT: `https://q.qlogo.cn/g?b=qq&nk=${USER_DATA['头像']}&s=640`,
      GET_BL,
      GET_JL,
      GET_NLZ,
      LEVEL: USER_DATA['等级'],
      CUMULATIVE_HINT,
      CONSECUTIVE_HINT,
      USER_NUMBER: (fs.readdirSync('plugins/Tlon-Sky/data/Sky签到')).length
    }, { e, scale: 1.4 }, REPLY)
  }

  async setNickname(e) {
    // 用户ID和用户文件
    const USER_ID = e.user_id;
    const USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${USER_ID}.json`

    // 用户是否存在
    if (!ITUE(USER_ID)) { return e.reply('请先发送光遇签到') }

    // 使用正则删除无关字符
    const NICKNAME = e.msg.replace(/#|\/|设置昵称/g, "").replace(/\s/g, '')

    // 昵称长度是否大于15位
    if (NICKNAME.length > 15) { return e.reply('昵称长度不可大于十五位！') }

    // 用户数据
    const USER_DATA = GUD(USER_ID)

    // 数据处理和存储
    USER_DATA['昵称'] = NICKNAME
    SD(USER_FILE, USER_DATA)

    // 告诉用户设置成功
    if (e.adapter === 'QQBot') return e.reply(['> 设置成功!', `# [${NICKNAME}]`])
    e.reply(`设置成功 [${NICKNAME}]`)
  }

  async setAvatar(e) {
    // 用户ID和用户文件
    const USER_ID = e.user_id;
    const USER_FILE = `plugins/Tlon-Sky/data/Sky签到/${USER_ID}.json`

    // 用户是否存在
    if (!ITUE(USER_ID)) { return e.reply('请先发送光遇签到') }

    // 匹配，删除空格并转换为浮点数
    let match = e.msg.match(/^(#|\/)?设置头像(.*)$/);
    let setting = match ? match[2].replace(/\s/g, '') : null;
    let avatar = Number.isNaN(parseFloat(setting)) ? null : parseFloat(setting);

    if (!avatar) { return e.reply('请输入纯数字QQ号!') }

    if (avatar <= 10001) { e.reply('输入QQ号不符合规范，默认设置3620060826为头像'); avatar = 3620060826 }

    // 用户数据
    const USER_DATA = GUD(USER_ID)

    // 数据处理和存储
    USER_DATA['头像'] = avatar
    SD(USER_FILE, USER_DATA)

    // 告诉用户设置成功
    if (e.adapter === 'QQBot') return e.reply(['> 设置成功！', segment.image(`https://q.qlogo.cn/g?b=qq&nk=${avatar}&s=640`)])
    e.reply([segment.at(USER_ID), '设置成功'], true)
    e.reply([segment.image(`https://q.qlogo.cn/g?b=qq&nk=${avatar}&s=640`)], true)
  }
}

// 获取当前日期（YYYY-MM-DD）
function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 获取昨天的日期（YYYY-MM-DD）
function getYesterdayDate() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}