import plugin from '../../../lib/plugins/plugin.js';

const RW_URL = 'https://api.t1qq.com/api/sky/gy/sc/tlonsky/json/mrrw.jpg';
const JL_URL = 'https://api.t1qq.com/api/sky/gy/sc/tlonsky/json/scjl.jpg';
const DL_URL = 'https://api.t1qq.com/api/sky/gy/sc/tlonsky/json/scdl.jpg';
const MF_URL = 'https://api.t1qq.com/api/sky/gy/sc/json/mf.jpg';
const BigHourName = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子'];
const BigHourType = ['正', '初'];
const BigMinName = ['零', '一', '二', '三', '四'];

export class 光遇_每日功能 extends plugin {
  constructor() {
    super({
      name: '光遇_每日任务&大蜡位置&季蜡位置&今日魔法',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^#?(光遇今日任务|国服今日任务|今日任务|任务)$/,
          fnc: '每日任务',
        },
        {
          reg: /^#?(大蜡烛位置|大蜡位置|大蜡|DL)$/,
          fnc: '大蜡位置',
        },
        {
          reg: /^#?(季蜡|季蜡位置|JL)$/,
          fnc: 'sky_JLWZ',
        },
      ],
    });
  }
  async 每日任务(e) {
    const msg = [
      segment.image(MF_URL),
      '今日任务',
      segment.image(RW_URL),
      '季蜡位置&大蜡烛位置',
      segment.image(JL_URL),
      segment.image(DL_URL),
    ];
    e.reply(msg);
  }

  async 大蜡位置(e) {
    const now = new Date();
    const hourName = BigHourName[Math.floor((now.getHours() + 1) / 2)];
    const hourType = BigHourType[now.getHours() % 2];
    const minName = BigMinName[Math.floor(now.getMinutes() / 15)];
    const msg = [
      segment.image(DL_URL),
      `现在是长安${hourName}${hourType}${minName}刻`,
    ];
    e.reply(msg);
  }

  async 季蜡位置(e) {
    const now = new Date();
    const hour = `0${now.getHours()}`.slice(-2);
    const minutes = `0${now.getMinutes()}`.slice(-2);
    const msg = [
      segment.image(JL_URL),
      '发送时间：',
      hour,
      ':',
      minutes,
    ];
    e.reply(msg);
  }
}