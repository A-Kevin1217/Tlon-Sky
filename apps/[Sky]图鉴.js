import { render } from './../components/index.js'
import fetch from 'node-fetch'
const SEARCH_PATTERNS = [
  /^(#|\/)?((?:季节|好友树|复刻|晨岛|云野|雨林|峡谷|霞谷|暮土|禁阁|AURORA|表演|风行|感恩|归(?:巢|属)|九色鹿|梦想|魔法|破晓|潜海|圣岛|拾光|小王子|夜行|音韵|预言|重组|追(?:光|忆)|欧若拉|集结|凌冬|筑巢|二重奏|姆明)(?:季)?兑换图)$/i,
  /^(#|\/)?(国服复刻|全图鉴参考|身高(?:(?:透明)?图|进阶知识)|蜡烛合成机制|(?:身高)?测量规则)$/
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
        { reg: /^(#|\/)?(全部|(20|21|22|23|24)年)复刻记录$/, fnc: 'regressionRecords' }
      ]
    })

    this.CATEGORIES = {
      LOCATIONS: ['晨岛', '云野', '雨林', '霞谷', '暮土', '禁阁'],
      SEASONS: [
        '感恩', '追光', '归属', '音韵', '魔法', '圣岛', '预言',
        '梦想', '集结', '小王子', '风行', '潜海', '表演', '破晓',
        '欧若拉', '追忆', '夜行', '拾光', '归巢', '九色鹿', '筑巢',
        '二重奏', '姆明'
      ],
      OTHER: ['好友树', '全图鉴参考', '身高图', '身高透明图', '身高进阶知识', '蜡烛合成机制', '身高测量规则', '测量规则'],
      SPECIAL: ['复刻', '国服复刻', '节']
    }
  }

  async regressionRecords(e) {
    const link = 'https://gitee.com/Tloml-Starry/resources/raw/master/resources/json/SkyChildrenoftheLight/'
    let regressionRecordsData = await (await fetch(link + 'RegressionRecords.json')).json()
    const seasonalSpiritsData = await (await fetch(link + 'SeasonalSpirits.json')).json()

    let [, , showAll, year] = e.msg.match(/^(#|\/)?(全部|(20|21|22|23|24)年)复刻记录$/)

    if (showAll !== '全部') {
      year = parseInt(year)
      if (year >= 20) {
        year -= 20
        regressionRecordsData = [regressionRecordsData[year]]
      }
    }
    let html = '';
    regressionRecordsData.forEach(yearData => {
      yearData.yearRecord.forEach((monthData, j) => {
        monthData.monthRecord.forEach((dayData, k) => {
          html += `<tr>`;
          if (j === 0 && k === 0) html += `<td rowspan="${yearData.count}">${yearData.year}</td>`;
          if (k === 0) html += `<td rowspan="${monthData.monthRecord.length}">${monthData.month}</td>`;
          html += `<td>${dayData.day}</td>`;

          const { platform } = dayData
          if (platform === 'All') {
            html += `<td colspan="2">${dayData.name}</td>`
          } else if (platform === 'IOS' && dayData.day === 19) {
            html += `<td>${dayData.name}</td><td rowspan="9" class="count-0">未开服</td>`
          } else if (platform === 'IOS') {
            html += `<td>${dayData.name}</td>`
          } else {
            html += `<td class="count-0">——</td><td>${dayData.name}</td>`
          }

          html += `<td class="count-${dayData.count.i}">${dayData.count.i || '——'}</td>`;
          html += `<td class="count-${dayData.count.a}">${dayData.count.a || '——'}</td>`;
          html += `<td>${dayData.price['🕯']}</td>`;
          html += `<td>${dayData.price['❤️']}</td>`;

          let season = ''
          for (let i = 0; i < seasonalSpiritsData.length; i++) {
            if (seasonalSpiritsData[i].spirits.includes(dayData.name)) {
              season = seasonalSpiritsData[i].name
              break
            }
            season = '未匹配'
          }
          html += `<td>${season}</td>`;
          html += `</tr>`;
        });
      });
    });

    return render('admin/复刻记录', {
      html
    }, { e, scale: 1.4 })
  }

  async handleImageQuery(e) {
    const queryText = e.msg.replace(/#|\/|兑换图|季/g, '')
    const imageInfo = this.getImageInfo(queryText)

    if (!imageInfo) {
      return e.reply('未找到相关图鉴')
    }

    const { type, name, extension } = imageInfo
    return e.reply([segment.image(`${SKY_IMAGE_URL['A']}${type}/${name}.${extension}`)])
  }

  getImageInfo(queryText) {
    if (this.CATEGORIES.LOCATIONS.includes(queryText)) {
      return { type: '常驻兑换图', name: queryText, extension: 'jpg' }
    }

    if (this.CATEGORIES.SEASONS.includes(queryText) || /aurora|重组|凌冬/i.test(queryText)) {
      return { type: '季节兑换图', name: this.normalizeSeasonName(queryText), extension: 'jpg' }
    }

    if (this.CATEGORIES.SPECIAL.includes(queryText)) {
      const name = queryText === '节' ? '当前季节兑换图' : '当前复刻'
      return { type: '当前', name, extension: 'jpg' }
    }

    if (this.CATEGORIES.OTHER.includes(queryText)) {
      const name = this.normalizeOtherQuery(queryText)
      const extension = name === '身高透明图' ? 'png' : 'jpg'
      return { type: '其他', name, extension }
    }

    return null
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