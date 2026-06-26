import { render } from './../components/index.js'
import fetch from 'node-fetch'
import Button from '../model/Button.js'

export class SKY extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:图鉴',
      dsc: '光遇图鉴查询',
      event: 'message',
      priority: 1,
      rule: [
        { reg: /^[#\/]?全图鉴参考$/, fnc: 'handleImageQuery' },
        { reg: /^[#\/]?(全部|(20|21|22|23|24|25|26))年复刻记录$/i, fnc: 'regressionRecords' }
      ]
    })
  }

  async regressionRecords(e) {
    const baseUrl = 'https://raw.gitcode.com/Kevin1217/resources/raw/master/resources/json/SkyChildrenoftheLight/';
    let regressionRecordsData = await (await fetch(`${baseUrl}RegressionRecords.json`)).json();
    const seasonalSpiritsData = await (await fetch(`${baseUrl}SeasonalSpirits.json`)).json();

    let [, showAll, yearStr] = e.msg.match(/^[#\/]?(全部|(20|21|22|23|24|25|26))年复刻记录$/);

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

      const generatePlatformDetails = (platform, data) => {
        return `
          <div class="platform-detail ${platform}">
            <h3>${platform === 'ios' ? 'iOS' : '安卓'}复刻详情 <span class="total">(${data.total})</span></h3>
            <div class="count-list">
              ${Object.entries(data.counts)
            .sort(([a], [b]) => parseInt(a) - parseInt(b))
            .map(([count, num]) => `
                  <div class="count-item">
                    <span class="count">${count}次</span>
                    <span class="number">${num}位</span>
                  </div>
                `).join('')}
            </div>
          </div>
        `;
      };

      const statsHtml = `
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
              ${['all', 'ios', 'android'].map(platform => `
                <div class="platform-item">
                  <span class="platform-icon ${platform}">
                    ${platform === 'all' ? '📱' : platform === 'ios' ? '🍎' : '🤖'}
                  </span>
                  <span class="platform-name">
                    ${platform === 'all' ? '全平台' : platform === 'ios' ? '仅iOS' : '仅安卓'}
                  </span>
                  <span class="platform-count">${stats.summary.platforms[platform]}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="stats-card platform-details">
            ${generatePlatformDetails('ios', stats.platforms.ios)}
            ${generatePlatformDetails('android', stats.platforms.android)}
          </div>

          <div class="stats-card season-stats">
            <h3>季节分布</h3>
            <div class="season-list">
              ${stats.seasons.mostFrequent
          .concat(Array(3).fill({ season: '-', count: 0 }))
          .slice(0, 3)
          .map(({ season, count }, index) => `
                  <div class="season-item rank-${index + 1}">
                    <span class="rank">${index + 1}</span>
                    <span class="season-name">${season}</span>
                    <span class="season-count">${count || '-'}位</span>
                  </div>
                `).join('')}
            </div>
          </div>

          <div class="stats-card footer-note">
            <p><span class="highlight">数据说明：</span></p>
            <p>• 复刻记录不计入集体复刻，请知悉</p>
            <p>• 数据更新不及时属正常现象，过几天再次查看即可</p>
            <p>• <span class="warning">数据仅供参考，具体以游戏内为准</span></p>
            <p>Created by Tlon-Sky</p>
          </div>
        </div>
      `;

      const recordsHtml = sortedYearRecord.map(({ month, monthRecord }, monthIndex) => {
        return monthRecord.map(({ day, platform, name, count, price }, recordIndex) => {
          const seasonEntry = seasonalSpiritsData.find(({ spirits }) =>
            Array.isArray(spirits) && spirits.some(spirit =>
              typeof spirit === 'string' ? spirit === name : spirit.name === name
            )
          );
          const season = seasonEntry?.name || '未匹配';
          const spiritData = seasonEntry?.spirits?.find(s => s.name === name)
          const icon = spiritData?.icon || []

          let img = ''
          for (let i = 0; i < icon.length; i++) {
            img += `<img src="${SKY_IMAGE_URL.A}AncestorDressUp/${icon[i]}">`
          }

          return `
        <tr>
          ${monthIndex === 0 && recordIndex === 0 ? `<td rowspan="${yearCounts[year]}">${year}</td>` : ''}
          ${recordIndex === 0 ? `<td rowspan="${monthRecord.length}">${month}</td>` : ''}
          <td>${day}</td>
          ${platform === 'All' ? `<td colspan="2">${name}</td>` : ''}
          ${platform === 'IOS' && day === 19 ? `<td>${name}</td><td rowspan="9" class="count-0">未开服</td>` : ''}
          ${platform === 'IOS' && day !== 19 ? `<td>${name}</td>` : ''}
          ${platform !== 'All' && platform !== 'IOS' ? `<td class="count-0">——</td><td>${name}</td>` : ''}
          <td><div class="image-container">${img}</div></td>
          <td class="count-${count.i}">${count.i || '——'}</td>
          <td class="count-${count.a}">${count.a || '——'}</td>
          <td>${price['🕯']}</td>
          <td>${price['❤️']}</td>
          <td><div class="image-container"><img src="${SKY_IMAGE_URL.A}AncestorDressUp/${seasonEntry?.seasonIcon || ''}"></div></td>
        </tr>
      `;
        }).join('');
      }).join('');

      return `
    <div class="container" style="display: flex !important; flex-direction: row !important;">
      <div class="records-table" style="flex: 3 !important; order: 1 !important; min-width: 70% !important;">
        <h2>${year}年复刻记录</h2>
        <table>
          <thead>
            <tr>
              <th>年份</th>
              <th>月份</th>
              <th>日期</th>
              <th colspan="2">先祖</th>
              <th>先祖物品</th>
              <th>iOS</th>
              <th>安卓</th>
              <th>蜡烛</th>
              <th>爱心</th>
              <th>季节</th>
            </tr>
          </thead>
          <tbody>
            ${recordsHtml}
          </tbody>
        </table>
      </div>
      <div class="year-stats" style="flex: 1 !important; order: 2 !important; max-width: 30% !important;">
        ${statsHtml}
      </div>
    </div>
  `;
    }).join('');

    const finalHtml = `
  <style>
    body {
      width: 1400px;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      background: #f5f7fa;
    }
    
    .container {
      display: flex !important;
      flex-direction: row !important;
      gap: 20px;
      align-items: flex-start;
      max-width: 1400px;
      margin: 0 auto;
    }

    .records-table {
      flex: 3 !important;
      order: 1 !important;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      overflow: auto;
      min-width: 75% !important;
      width: 75% !important;
    }

    .year-stats {
      flex: 1 !important;
      order: 2 !important;
      position: sticky;
      top: 20px;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      max-width: 25% !important;
      width: 25% !important;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.95rem;
    }

    th, td {
      padding: 10px 8px;
      text-align: center;
      border-bottom: 1px solid #eee;
      vertical-align: middle;
      white-space: nowrap;
    }

    th {
      background: #f5f7fa;
      font-weight: bold;
      color: #444;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .image-container {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      gap: 5px;
      padding: 3px;
      overflow-x: auto;
    }

    .image-container img {
      width: 45px;
      height: 45px;
      border-radius: 4px;
      object-fit: contain;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .stats-header h2 {
      font-size: 20px;
      margin: 0 0 16px 0;
    }

    .total-spirits .number {
      font-size: 28px;
      color: #4a90e2;
      font-weight: bold;
    }

    .stats-card {
      padding: 12px;
      background: #f5f7fa;
      border-radius: 8px;
    }

    .platform-item {
      padding: 6px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .count-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }

    .count-item {
      padding: 6px;
      background: white;
      border-radius: 4px;
      text-align: center;
    }

    .season-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      background: white;
      border-radius: 4px;
    }

    /* 保持原有的count相关样式 */
    .count-0 { background-color: #00ffa6; }
    .count-1 { background-color: #e6f3ff; }
    .count-2 { background-color: #b3d9ff; }
    .count-3 { background-color: #80bfff; }
    .count-4 { background-color: #4da6ff; }
  </style>
  ${html}
`;

    return render('admin/复刻记录', { html: finalHtml }, { e, scale: 1.4 }, null, new Button(e).regressionRecords())
  }

  async handleImageQuery(e) {
    return e.reply([segment.image(`${SKY_IMAGE_URL['A']}其他/全图鉴参考.jpg`), new Button(e).collection()])
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
        Array.isArray(spirits) && spirits.some(spirit =>
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