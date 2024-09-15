const REGEX = [
  /^(#|\/)?(季节|好友树|复刻|晨岛|云野|雨林|峡谷|霞谷|暮土|禁阁|AURORA|表演|风行|感恩|归(巢|属)|九色鹿|梦想|魔法|破晓|潜海|圣岛|拾光|小王子|夜行|音韵|预言|重组|追(光|忆)|欧若拉|集结|凌冬|筑巢|二重奏|姆明)(季)?兑换图$/i,
  /^(#|\/)?(国服复刻|全图鉴参考|身高((透明)?图|进阶知识)|蜡烛合成机制|(身高)?测量规则|(20|21|22|23|24)年复刻记录)$/
]
export class SKY extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:图鉴',
      dsc: '光遇图鉴查询',
      event: 'message',
      priority: 1,
      rule: [
        { reg: REGEX[0], fnc: 'F1' },
        { reg: REGEX[1], fnc: 'F1' },
      ]
    })
  }

  async F1(e) {
    const ARRAY = [
      ['晨岛', '云野', '雨林', '霞谷', '暮土', '禁阁'],
      [
        '感恩', '追光', '归属', '音韵', '魔法', '圣岛', '预言',
        '梦想', '集结', '小王子', '风行', '潜海', '表演', '破晓',
        '欧若拉', '追忆', '夜行', '拾光', '归巢', '九色鹿', '筑巢',
        '二重奏', '姆明'
      ],
      ['好友树', '全图鉴参考', '身高图', '身高透明图', '身高进阶知识', '蜡烛合成机制', '身高测量规则', '测量规则'],
      ['20', '21', '22', '23', '24'],
      ['复刻', '国服复刻', '节']
    ]
    let U_MSG = e.msg.replace(/#|\/|兑换图|季/g, '')

    let TYPE = ''
    if (ARRAY[0].includes(U_MSG)) {
      TYPE = '常驻兑换图'
    } else if (ARRAY[1].includes(U_MSG) || /aurora|重组|凌冬/i.test(U_MSG)) {
      TYPE = '季节兑换图'
      if (/aurora/i.test(U_MSG)) U_MSG = '欧若拉'
      if (U_MSG === '重组') U_MSG = '集结'
      if (U_MSG === '凌冬') U_MSG = '音韵'
      U_MSG = U_MSG + '季'
    } else if (ARRAY[4].includes(U_MSG)) {
      TYPE = '当前'
      if (U_MSG === '节') { U_MSG = '当前季节兑换图' } else { U_MSG = '当前复刻' }
    } else if (ARRAY[2].includes(U_MSG)) {
      TYPE = '其他'
      if (U_MSG === '全图鉴') U_MSG = '全图鉴参考'
      if (U_MSG === '好友树') U_MSG = '好友树兑换图'
    } else if (ARRAY[3].includes(U_MSG.replace(/年复刻记录/g, ''))) {
      TYPE = '复刻记录'
    }

    return e.reply([segment.image(`${SKY_IMAGE_URL['A']}${TYPE}/${U_MSG}.${U_MSG === '身高透明图' ? 'png' : 'jpg'}`)])
  }
}