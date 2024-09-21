const SEARCH_PATTERNS = [
  /^(#|\/)?((季节|好友树|复刻|晨岛|云野|雨林|峡谷|霞谷|暮土|禁阁|AURORA|表演|风行|感恩|归(巢|属)|九色鹿|梦想|魔法|破晓|潜海|圣岛|拾光|小王子|夜行|音韵|预言|重组|追(光|忆)|欧若拉|集结|凌冬|筑巢|二重奏|姆明)(季)?兑换图)$/i,
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
        { reg: SEARCH_PATTERNS[0], fnc: 'handleImageQuery' },
        { reg: SEARCH_PATTERNS[1], fnc: 'handleImageQuery' },
      ]
    })
  }

  async handleImageQuery(e) {
    const CATEGORIES = {
      LOCATIONS: ['晨岛', '云野', '雨林', '霞谷', '暮土', '禁阁'],
      SEASONS: [
        '感恩', '追光', '归属', '音韵', '魔法', '圣岛', '预言',
        '梦想', '集结', '小王子', '风行', '潜海', '表演', '破晓',
        '欧若拉', '追忆', '夜行', '拾光', '归巢', '九色鹿', '筑巢',
        '二重奏', '姆明'
      ],
      OTHER: ['好友树', '全图鉴参考', '身高图', '身高透明图', '身高进阶知识', '蜡烛合成机制', '身高测量规则', '测量规则'],
      YEARS: ['20', '21', '22', '23', '24'],
      SPECIAL: ['复刻', '国服复刻', '节']
    }

    let queryText = e.msg.replace(/#|\/|兑换图|季/g, '')

    let imageType = ''
    if (CATEGORIES.LOCATIONS.includes(queryText)) {
      imageType = '常驻兑换图'
    } else if (CATEGORIES.SEASONS.includes(queryText) || /aurora|重组|凌冬/i.test(queryText)) {
      imageType = '季节兑换图'
      queryText = this.normalizeSeasonName(queryText)
    } else if (CATEGORIES.SPECIAL.includes(queryText)) {
      imageType = '当前'
      queryText = queryText === '节' ? '当前季节兑换图' : '当前复刻'
    } else if (CATEGORIES.OTHER.includes(queryText)) {
      imageType = '其他'
      queryText = this.normalizeOtherQuery(queryText)
    } else if (CATEGORIES.YEARS.includes(queryText.replace(/年复刻记录/g, ''))) {
      imageType = '复刻记录'
    }

    return e.reply([segment.image(`${SKY_IMAGE_URL['A']}${imageType}/${queryText}.${queryText === '身高透明图' ? 'png' : 'jpg'}`)])
  }

  normalizeSeasonName(name) {
    if (/aurora/i.test(name)) return '欧若拉季'
    if (name === '重组') return '集结季'
    if (name === '凌冬') return '音韵季'
    return name + '季'
  }

  normalizeOtherQuery(query) {
    if (query === '全图鉴') return '全图鉴参考'
    if (query === '好友树') return '好友树兑换图'
    return query
  }
}