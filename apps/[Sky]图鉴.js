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
    const baseUrl = 'https://gitee.com/Tloml-Starry/resources/raw/master/resources/json/SkyChildrenoftheLight/';
    const regressionRecordsData = await (await fetch(`${baseUrl}RegressionRecords.json`)).json();
    const seasonalSpiritsData = await (await fetch(`${baseUrl}SeasonalSpirits.json`)).json();

    let [, , showAll, year] = e.msg.match(/^(#|\/)?(全部|(20|21|22|23|24)年)复刻记录$/);
    if (showAll !== '全部') {
      year = parseInt(year) - 20;
      regressionRecordsData = [regressionRecordsData[year]];
    }

    const yearCounts = regressionRecordsData.reduce((acc, { year, yearRecord }) => {
      acc[year] = yearRecord.reduce((sum, { monthRecord }) => sum + monthRecord.length, 0);
      return acc;
    }, {});

    const html = regressionRecordsData.map(({ year, yearRecord }) => {
      return yearRecord.map(({ month, monthRecord }, j) => {
        return monthRecord.map((dayData, k) => {
          const { day, platform, name, count, price } = dayData;
          const season = seasonalSpiritsData.find(({ spirits }) => spirits.includes(name))?.name || '未匹配';

          return `
            <tr>
              ${j === 0 && k === 0 ? `<td rowspan="${yearCounts[year]}">${year}</td>` : ''}
              ${k === 0 ? `<td rowspan="${monthRecord.length}">${month}</td>` : ''}
              <td>${day}</td>
              ${platform === 'All' ? `<td colspan="2">${name}</td>` : ''}
              ${platform === 'IOS' && day === 19 ? `<td>${name}</td><td rowspan="9" class="count-0">未开服</td>` : ''}
              ${platform === 'IOS' && day !== 19 ? `<td>${name}</td>` : ''}
              ${platform !== 'All' && platform !== 'IOS' ? `<td class="count-0">——</td><td>${name}</td>` : ''}
              <td class="count-${count.i}">${count.i || '——'}</td>
              <td class="count-${count.a}">${count.a || '——'}</td>
              <td>${price['🕯']}</td>
              <td>${price['❤️']}</td>
              <td>${season}</td>
            </tr>
          `;
        }).join('');
      }).join('');
    }).join('');

    return render('admin/复刻记录', { html }, { e, scale: 1.4 });
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