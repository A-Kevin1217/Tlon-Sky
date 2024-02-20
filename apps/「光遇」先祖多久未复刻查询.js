const REGEX = /^(#|\/)?(.*)季多久未复刻$/
export class 光遇_先祖多久未复刻查询 extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:先祖多久未复刻查询',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: REGEX,
          fnc: 'snrd'
        }
      ]
    })
  }

  getDayDiff(date) {
    const today = new Date()
    const timeDiff = today.getTime() - date.getTime()
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24)).toString().padStart(3, '0')
  }

  async snrd(e) {
    const SEASON_NAME = (e.msg.match(REGEX))[2]
    let msg = '数据更新时间：2024-02-19\n此表不计入集体复刻\n'
    if (!seasons[SEASON_NAME]) { return e.reply('不存在该季节,请输入以下季节名：\n感恩丨追光丨归属丨音韵\n魔法丨圣岛丨预言丨梦想\n集结丨小王子丨风行') }
    for (const role of seasons[SEASON_NAME]) {
      const dayDiff = this.getDayDiff(role.date)
      msg += `${role.name}已[ ${dayDiff} ]天！未复刻\n`
    }
    return e.reply(msg.trim());
  }
}

const seasons = {
  '感恩': [ // 1
    { name: '刁蛮浪者', date: new Date('2023-12-18') },
    { name: '挑衅艺伎', date: new Date('2023-05-22') },
    { name: '敬礼护卫', date: new Date('2023-03-27') },
    { name: '舒展大师', date: new Date('2021-11-22') },
    { name: '跳跃舞者', date: new Date('2023-04-24') },
    { name: '拳礼武僧', date: new Date('2023-02-13') }
  ],
  '追光': [ // 2
    { name: '随性拓荒者', date: new Date('2023-05-08') },
    { name: '击掌光农', date: new Date('2023-03-13') },
    { name: '肩背追光', date: new Date('2023-02-27') },
    { name: '静光学者', date: new Date('2022-04-11') },
    { name: '螺旋舞冠', date: new Date('2021-05-10') },
    { name: '蟹语者', date: new Date('2022-05-09') }
  ],
  '归属': [ // 3
    { name: '蓬头青年', date: new Date('2024-02-19') },
    { name: '不舍家长', date: new Date('2023-01-17') },
    { name: '踏舞孩童', date: new Date('2023-12-27') },
    { name: '彩纸表亲', date: new Date('2024-01-15') },
    { name: '火花家长', date: new Date('2022-01-31') },
    { name: '智慧长者', date: new Date('2021-12-29') }
  ],
  '音韵': [ // 4
    { name: '致敬钢琴家', date: new Date('2022-03-28') },
    { name: '迎宾侍者', date: new Date('2022-05-23') },
    { name: '献情演员', date: new Date('2022-08-16') },
    { name: '抛球杂耍', date: new Date('2023-06-26') },
    { name: '沉思编导', date: new Date('2022-09-27') },
    { name: '旋转舞者', date: new Date('2024-02-12') }
  ],
  '魔法': [ // 5
    { name: '稻草人农夫', date: new Date('2022-08-29') },
    { name: '赞许壁画及', date: new Date('2022-06-21') },
    { name: '情绪草药师', date: new Date('2023-06-19') },
    { name: '瞌睡木匠', date: new Date('2022-12-07') },
    { name: '冷漠术士', date: new Date('2023-08-28') },
    { name: '蟹舞者', date: new Date('2021-04-12') }
  ],
  '圣岛': [ // 6
    { name: '放松日浴者', date: new Date('2023-11-20') },
    { name: '鸣谢收藏家', date: new Date('2023-10-03') },
    { name: '固执登山者', date: new Date('2023-04-10') },
    { name: '热血运动员', date: new Date('2023-09-11') },
    { name: '内秀书虫', date: new Date('2022-10-25') },
    { name: '母语者', date: new Date('2022-08-01') }
  ],
  '预言': [ // 7
    { name: '水先知', date: new Date('2022-12-19') },
    { name: '土先知', date: new Date('2021-12-06') },
    { name: '风先知', date: new Date('2021-09-13') },
    { name: '火先知', date: new Date('2023-06-05') }
  ],
  '梦想': [ // 8
    { name: '偷窥邮差', date: new Date('2023-10-09') },
    { name: '熊抱雪人', date: new Date('2023-12-11') },
    { name: '回旋大师', date: new Date('2023-07-31') },
    { name: '跳舞艺人', date: new Date('2023-10-23') }
  ],
  '集结': [ // 9
    { name: '白日梦森林人', date: new Date('2023-08-14') },
    //{ name: '茫然植物学生', date: new Date('')},
    { name: '正步冒险家', date: new Date('2022-07-19') },
    //{ name: '傻笑童子军', date: new Date('')},
    { name: '管事小队长', date: new Date('2023-05-03') },
    { name: '胆小鬼学员', date: new Date('2022-12-05') }
  ],
  '小王子': [ // 10
    { name: '沾沾自喜的自恋狂', date: new Date('2023-01-02') },
    { name: '发号施令的统治者', date: new Date('2023-07-03') },
    { name: '打喷嚏的地理学家', date: new Date('2023-09-25') },
    //{ name: '被逼无奈的掌灯人', date: new Date('')},
    { name: '萎靡不振的士兵', date: new Date('2023-01-30') },
    { name: '星光收藏家', date: new Date('2023-07-17') }
  ],
  '风行': [ // 11
    { name: '风铃修补匠', date: new Date('2023-12-04') },
    { name: '天才建筑者', date: new Date('2024-01-01') },
    { name: '风行领航员', data: new Date('2024-01-29') }
  ]
};

// { name: '', data: new Date('2024-01-01') }