import plugin from '../../../lib/plugins/plugin.js'

const 感恩 = [
  { name: '刁蛮浪者', date: new Date('2021-11-08') },
  { name: '挑衅艺伎', date: new Date('2023-05-22') },
  { name: '敬礼护卫', date: new Date('2023-03-27') },
  { name: '舒展大师', date: new Date('2021-11-22') },
  { name: '跳跃舞者', date: new Date('2023-04-24') },
  { name: '拳礼武僧', date: new Date('2023-02-13') }
];
const 追光 = [
  { name: '随性拓荒者', date: new Date('2023-05-08')},
  { name: '击掌光农', date: new Date('2023-03-13')},
  { name: '肩背追光', date: new Date('2023-02-27')},
  { name: '静光学者', date: new Date('2022-04-11')},
  { name: '螺旋舞冠', date: new Date('2021-05-10')},
  { name: '蟹语者', date: new Date('2022-05-09') }
];
const 归属 = [
  { name: '蓬头青年', date: new Date('2023-01-25')},
  { name: '不舍家长', date: new Date('2023-01-17')},
  { name: '踏舞孩童', date: new Date('2022-12-28')},
  { name: '彩纸表亲', date: new Date('2022-10-05')},
  { name: '火花家长', date: new Date('2022-01-31')},
  { name: '智慧长者', date: new Date('2021-12-29')}
];
const 音韵 = [
  { name: '致敬钢琴家', date: new Date('2022-03-28')},
  { name: '迎宾侍者', date: new Date('2022-05-23')},
  { name: '献情演员', date: new Date('2022-08-16')},
  { name: '抛球杂耍', date: new Date('2023-06-26')},
  { name: '沉思编导', date: new Date('2022-09-27')},
  { name: '旋转舞者', date: new Date('2022-10-10')}
];
const 魔法 = [
  { name: '稻草人农夫', date: new Date('2022-08-29')},
  { name: '赞许壁画及', date: new Date('2022-06-21')},
  { name: '情绪草药师', date: new Date('2023-06-19')},
  { name: '瞌睡木匠', date: new Date('2022-12-07')},
  { name: '冷漠术士', date: new Date('2022-03-14')},
  { name: '蟹舞者', date: new Date('2021-04-12')}
];
const 圣岛 = [
  { name: '放松日浴者', date: new Date('2022-09-13')},
  { name: '鸣谢收藏家', date: new Date('2022-06-06')},
  { name: '固执登山者', date: new Date('2023-04-10')},
  { name: '热血运动员', date: new Date('2022-07-04')},
  { name: '内秀书虫', date: new Date('2022-10-25')},
  { name: '母语者', date: new Date('2022-08-01')}
];
const 预言 = [
  { name: '水先知', date: new Date('2022-12-19')},
  { name: '土先知', date: new Date('2021-12-06')},
  { name: '风先知', date: new Date('2021-09-13')},
  { name: '火先知', date: new Date('2023-06-05')}
];
const 梦想 = [
  { name: '偷窥邮差', date: new Date('2022-02-14')},
  { name: '熊抱雪人', date: new Date('2022-02-28')},
  { name: '回旋大师', date: new Date('2022-05-04')},
  //{ name: '跳舞艺人', date: new Date('')}
];
const 集结 = [
  { name: '白日梦森林人', date: new Date('2022-11-22')},
  //{ name: '茫然植物学生', date: new Date('')},
  { name: '正步冒险家', date: new Date('2022-07-19')},
  //{ name: '傻笑童子军', date: new Date('')},
  { name: '管事小队长', date: new Date('2023-05-03')},
  { name: '胆小鬼学员', date: new Date('2022-12-05')}
];
const 小王子 = [
  { name: '沾沾自喜的自恋狂', date: new Date('2023-01-02')},
  { name: '发号施令的统治者', date: new Date('2023-07-03')},
  //{ name: '打喷嚏的地理学家', date: new Date('')},
  //{ name: '被逼无奈的掌灯人', date: new Date('')},
  { name: '萎靡不振的士兵', date: new Date('2023-01-30')},
  //{ name: '星光收藏家', date: new Date('')}
];
export class 光遇_先祖多久未复刻查询 extends plugin {
    constructor () {
      super({
        name: '光遇_先祖多久未复刻查询',
        event: 'message',
        priority: 5000,
        rule: [
            {
              reg: /^#?感恩季多久未复刻$/,
              fnc: 'sky_感恩'
            },{
              reg: /^#?追光季多久未复刻$/,
              fnc: 'sky_追光'
            },{
              reg: /^#?归属季多久未复刻$/,
              fnc: 'sky_归属'
            },{
              reg: /^#?(音韵|凌冬)季多久未复刻$/,
              fnc: 'sky_音韵'
            },{
              reg: /^#?魔法季多久未复刻$/,
              fnc: 'sky_魔法'
            },{
              reg: /^#?圣岛季多久未复刻/,
              fnc: 'sky_圣岛'
            },{
              reg: /^#?预言季多久未复刻$/,
              fnc: 'sky_预言'
            },{
              reg: /^#?梦想季多久未复刻$/,
              fnc: 'sky_梦想'
            },{
              reg: /^#?集结季多久未复刻$/,
              fnc: 'sky_集结'
            },{
              reg: /^#?小王子季多久未复刻$/,
              fnc: 'sky_小王子'
            }
        ]
    })
}
async sky_感恩 ( e ) {
  let msg = '感恩季数据更新时间：2023-05-16\n';
  const today = new Date();

  for (const role of 感恩) {
    const timeDiff = today.getTime() - role.date.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)).toString().padStart(3, '0');
    msg += `${role.name}已[ ${dayDiff} ]天！未复刻\n`;
  }
  await e.reply(msg.trim());
}
async sky_追光 ( e ) {
  let msg = '追光季数据更新时间：2023-05-02\n';
  const today = new Date();

  for (const role of 追光) {
    const timeDiff = today.getTime() - role.date.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)).toString().padStart(3, '0');
    msg += `${role.name}已[ ${dayDiff} ]天！未复刻\n`;
  }
  await e.reply(msg.trim());
}
async sky_归属 ( e ) {
  let msg = '归属季数据更新时间：2023-04-20\n';
  const today = new Date();

  for (const role of 归属) {
    const timeDiff = today.getTime() - role.date.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)).toString().padStart(3, '0');
    msg += `${role.name}已[ ${dayDiff} ]天！未复刻\n`;
  }
  await e.reply(msg.trim());
}
async sky_音韵 ( e ) {
  let msg = '音韵季数据更新时间：2023-04-20\n';
  const today = new Date();

  for (const role of 音韵) {
    const timeDiff = today.getTime() - role.date.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)).toString().padStart(3, '0');
    msg += `${role.name}已[ ${dayDiff} ]天！未复刻\n`;
  }
  await e.reply(msg.trim());
}
async sky_魔法 ( e ) {
  let msg = '魔法季数据更新时间：2023-04-20\n';
  const today = new Date();

  for (const role of 魔法) {
    const timeDiff = today.getTime() - role.date.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)).toString().padStart(3, '0');
    msg += `${role.name}已[ ${dayDiff} ]天！未复刻\n`;
  }
  await e.reply(msg.trim());
}
async sky_圣岛 ( e ) {
  let msg = '圣岛季数据更新时间：2023-04-20\n';
  const today = new Date();

  for (const role of 圣岛) {
    const timeDiff = today.getTime() - role.date.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)).toString().padStart(3, '0');
    msg += `${role.name}已[ ${dayDiff} ]天！未复刻\n`;
  }
  await e.reply(msg.trim());
}
async sky_预言 ( e ) {
  let msg = '预言季数据更新时间：2023-04-20\n';
  const today = new Date();

  for (const role of 预言) {
    const timeDiff = today.getTime() - role.date.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)).toString().padStart(3, '0');
    msg += `${role.name}已[ ${dayDiff} ]天！未复刻\n`;
  }
  await e.reply(msg.trim());
}
async sky_梦想 ( e ) {
  let msg = '梦想季数据更新时间：2023-04-20\n';
  const today = new Date();

  for (const role of 梦想) {
    const timeDiff = today.getTime() - role.date.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)).toString().padStart(3, '0');
    msg += `${role.name}已[ ${dayDiff} ]天！未复刻\n`;
  }
  await e.reply(msg.trim());
}
async sky_集结 ( e ) {
  let msg = '集结季数据更新时间：2023-04-20\n';
  const today = new Date();

  for (const role of 集结) {
    const timeDiff = today.getTime() - role.date.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)).toString().padStart(3, '0');
    msg += `${role.name}已[ ${dayDiff} ]天！未复刻\n`;
  }
  await e.reply(msg.trim());
}
async sky_小王子 ( e ) {
  let msg = '小王子季数据更新时间：2023-04-20\n';
  const today = new Date();

  for (const role of 小王子) {
    const timeDiff = today.getTime() - role.date.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)).toString().padStart(3, '0');
    msg += `${role.name}已[ ${dayDiff} ]天！未复刻\n`;
  }
  await e.reply(msg.trim());
}
}