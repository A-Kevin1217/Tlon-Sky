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
    let regressionRecordsData = await (await fetch(`${baseUrl}RegressionRecords.json`)).json();
    const seasonalSpiritsData = await (await fetch(`${baseUrl}SeasonalSpirits.json`)).json();

    let [, , showAll, yearStr] = e.msg.match(/^(#|\/)?(全部|(20|21|22|23|24)年)复刻记录$/);

    let statistics = {};
    let filteredData;

    if (showAll !== '全部') {
      const year = yearStr.length === 2 ? 2000 + parseInt(yearStr) : parseInt(yearStr);
      const yearData = regressionRecordsData.find(data => data.year === year);

      if (!yearData) {
        return e.reply(`暂无${year}年的复刻记录数据`);
      }

      statistics[year] = calculateYearStatistics(yearData, seasonalSpiritsData);
      filteredData = [yearData];
    } else {
      filteredData = regressionRecordsData
        .filter(data => data && data.year)
        .sort((a, b) => b.year - a.year);

      filteredData.forEach(yearData => {
        statistics[yearData.year] = calculateYearStatistics(yearData, seasonalSpiritsData);
      });
    }

    if (filteredData.length === 0) {
      return e.reply('暂无复刻记录数据');
    }

    const yearCounts = filteredData.reduce((acc, { year, yearRecord }) => {
      acc[year] = yearRecord.reduce((sum, { monthRecord }) => sum + monthRecord.length, 0);
      return acc;
    }, {});

    const html = filteredData.map(({ year, yearRecord }) => {
      const stats = statistics[year];
      const sortedYearRecord = [...yearRecord].sort((a, b) => a.month - b.month);

      const recordsHtml = `
        <div class="records-table">
          <h2>${year}年复刻记录</h2>
          <table>
            <thead>
              <tr>
                <th>年份</th>
                <th>月份</th>
                <th>日期</th>
                <th colspan="2">先祖</th>
                <th>iOS</th>
                <th>安卓</th>
                <th>蜡烛</th>
                <th>爱心</th>
                <th>季节</th>
              </tr>
            </thead>
            <tbody>
              ${sortedYearRecord.map(({ month, monthRecord }, monthIndex) => {
                return monthRecord.map(({ day, platform, name, count, price }, recordIndex) => {
                  const season = seasonalSpiritsData.find(({ spirits }) =>
                    spirits.some(spirit =>
                      typeof spirit === 'string' ? spirit === name : spirit.name === name
                    )
                  )?.name || '未匹配';

                  return `
                    <tr>
                      ${monthIndex === 0 && recordIndex === 0 ? `<td rowspan="${yearCounts[year]}">${year}</td>` : ''}
                      ${recordIndex === 0 ? `<td rowspan="${monthRecord.length}">${month}</td>` : ''}
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
              }).join('')}
            </tbody>
          </table>
        </div>
      `;

      const statsHtml = `
        <div class="year-stats">
          <div class="stats-header">
            <h2>${year}年复刻统计</h2>
            <div class="total-spirits">
              <span class="number">${stats.summary.total}</span>
              <span class="label">总复刻先祖</span>
            </div>
          </div>
          
          <div class="stats-grid">
            <div class="stats-card platform-stats">
              <h3>平台分布</h3>
              <div class="platform-list">
                <div class="platform-item">
                  <span class="platform-icon all">📱</span>
                  <span class="platform-name">全平台</span>
                  <span class="platform-count">${stats.summary.platforms.all}</span>
                </div>
                <div class="platform-item">
                  <span class="platform-icon ios">🍎</span>
                  <span class="platform-name">仅iOS</span>
                  <span class="platform-count">${stats.summary.platforms.ios}</span>
                </div>
                <div class="platform-item">
                  <span class="platform-icon android">🤖</span>
                  <span class="platform-name">仅安卓</span>
                  <span class="platform-count">${stats.summary.platforms.android}</span>
                </div>
              </div>
            </div>

            <div class="stats-card platform-details">
              <div class="platform-detail ios">
                <h3>iOS复刻详情 <span class="total">(${stats.platforms.ios.total})</span></h3>
                <div class="count-list">
                  ${Object.entries(stats.platforms.ios.counts)
                    .sort(([a,], [b,]) => parseInt(a) - parseInt(b))
                    .map(([count, num]) => `
                      <div class="count-item">
                        <span class="count">${count}次</span>
                        <span class="number">${num}位</span>
                      </div>
                    `).join('')}
                </div>
              </div>
              <div class="platform-detail android">
                <h3>安卓复刻详情 <span class="total">(${stats.platforms.android.total})</span></h3>
                <div class="count-list">
                  ${Object.entries(stats.platforms.android.counts)
                    .sort(([a,], [b,]) => parseInt(a) - parseInt(b))
                    .map(([count, num]) => `
                      <div class="count-item">
                        <span class="count">${count}次</span>
                        <span class="number">${num}位</span>
                      </div>
                    `).join('')}
                </div>
              </div>
            </div>

            <div class="stats-card season-stats">
              <h3>热门季节 Top 3</h3>
              <div class="season-list">
                ${stats.seasons.mostFrequent.slice(0, 3)
                  .map(({ season, count }, index) => `
                    <div class="season-item rank-${index + 1}">
                      <span class="rank">${index + 1}</span>
                      <span class="season-name">${season}</span>
                      <span class="season-count">${count}位</span>
                    </div>
                  `).join('')}
              </div>
            </div>
          </div>
        </div>
      `;

      return recordsHtml + statsHtml;
    }).join('');

    const finalHtml = `
      <style>
        .container {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .records-table {
          flex: 2;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .year-stats {
          flex: 1;
          position: sticky;
          top: 20px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .stats-header h2 {
          font-size: 20px;
        }

        .total-spirits .number {
          font-size: 28px;
        }

        .stats-card {
          padding: 12px;
        }

        .stats-card h3 {
          font-size: 16px;
          margin-bottom: 12px;
        }

        .platform-item {
          padding: 6px;
        }

        .platform-icon {
          font-size: 16px;
        }

        .count-list {
          grid-template-columns: repeat(2, 1fr);
        }

        .count-item {
          padding: 6px;
        }

        .records-table h2 {
          font-size: 24px;
          color: #333;
          margin: 0 0 20px 0;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 8px;
          overflow: hidden;
        }

        th, td {
          padding: 12px;
          text-align: center;
          border-bottom: 1px solid #eee;
          vertical-align: middle;
        }

        th {
          background: #f5f7fa;
          font-weight: bold;
          color: #444;
        }

        tr:hover {
          background: #f8f9fa;
        }

        .year-stats {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .stats-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .stats-header h2 {
          font-size: 24px;
          color: #333;
          margin: 0;
        }

        .total-spirits {
          text-align: center;
        }

        .total-spirits .number {
          font-size: 32px;
          font-weight: bold;
          color: #4a90e2;
          display: block;
        }

        .total-spirits .label {
          font-size: 14px;
          color: #666;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .stats-card {
          background: #fff;
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .stats-card h3 {
          font-size: 18px;
          color: #333;
          margin: 0 0 16px 0;
        }

        .platform-list {
          display: grid;
          gap: 12px;
        }

        .platform-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px;
          border-radius: 8px;
          background: #f5f7fa;
        }

        .platform-icon {
          font-size: 20px;
        }

        .platform-name {
          flex: 1;
          color: #444;
        }

        .platform-count {
          font-weight: bold;
          color: #4a90e2;
        }

        .count-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 8px;
        }

        .count-item {
          background: #f5f7fa;
          padding: 8px;
          border-radius: 6px;
          text-align: center;
        }

        .count-item .count {
          display: block;
          font-size: 14px;
          color: #666;
        }

        .count-item .number {
          display: block;
          font-weight: bold;
          color: #4a90e2;
        }

        .season-list {
          display: grid;
          gap: 12px;
        }

        .season-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px;
          border-radius: 8px;
          background: #f5f7fa;
        }

        .season-item .rank {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #4a90e2;
          color: white;
          font-weight: bold;
        }

        .season-item .season-name {
          flex: 1;
          color: #444;
        }

        .season-item .season-count {
          font-weight: bold;
          color: #4a90e2;
        }

        .rank-1 { background: #fff4e5; }
        .rank-1 .rank { background: #ff9800; }
        
        .rank-2 { background: #f5f5f5; }
        .rank-2 .rank { background: #9e9e9e; }
        
        .rank-3 { background: #fff0e9; }
        .rank-3 .rank { background: #ff5722; }
      </style>
      <div class="container">
        <div class="records-table">
          <h2>${year}年复刻记录</h2>
          ${recordsHtml}
        </div>
        <div class="year-stats">
          ${statsHtml}
        </div>
      </div>
    `;

    return render('admin/复刻记录', { html: finalHtml }, { e, scale: 1.4 });
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

function calculateYearStatistics(yearData, seasonalSpiritsData) {
  const stats = {
    summary: {
      total: 0,
      platforms: {
        all: 0,
        ios: 0,
        android: 0
      }
    },
    platforms: {
      ios: {
        spirits: {},
        counts: {},
        total: 0
      },
      android: {
        spirits: {},
        counts: {},
        total: 0
      }
    },
    seasons: {
      stats: {},
      mostFrequent: []
    }
  };

  yearData.yearRecord.forEach(({ monthRecord }) => {
    monthRecord.forEach(({ platform, name, count }) => {
      stats.summary.total++;
      if (platform === 'All') {
        stats.summary.platforms.all++;
      } else if (platform === 'IOS') {
        stats.summary.platforms.ios++;
      } else if (platform === 'Android') {
        stats.summary.platforms.android++;
      }

      if (count.i > 0) {
        stats.platforms.ios.spirits[name] = count.i;
        stats.platforms.ios.counts[count.i] = (stats.platforms.ios.counts[count.i] || 0) + 1;
        stats.platforms.ios.total++;
      }

      if (count.a > 0) {
        stats.platforms.android.spirits[name] = count.a;
        stats.platforms.android.counts[count.a] = (stats.platforms.android.counts[count.a] || 0) + 1;
        stats.platforms.android.total++;
      }

      const season = seasonalSpiritsData.find(({ spirits }) =>
        spirits.some(spirit =>
          typeof spirit === 'string' ? spirit === name : spirit.name === name
        )
      )?.name || '未知季节';
      stats.seasons.stats[season] = (stats.seasons.stats[season] || 0) + 1;
    });
  });

  stats.seasons.mostFrequent = Object.entries(stats.seasons.stats)
    .sort(([, a], [, b]) => b - a)
    .map(([season, count]) => ({ season, count }));

  return stats;
}