export default class Button {
  constructor(e = {}) {
    this.e = e;
    this.prefix = '';
  }

  /** 帮助菜单 */
  help() {
    return segment.button(
      [
        { text: '每日任务', callback: '/每日任务' },
        { text: 'sky状态', callback: '/sky状态' }
      ],
      [
        { text: '光遇进度', callback: '/光遇进度' },
        { text: '今日碎石', callback: '/今日碎石' },
      ],
      [
        { text: '蜡烛记录', callback: '/蜡烛记录' },
        { text: '蜡烛记录帮助', callback: '/蜡烛记录帮助' }
      ]
    );
  }

  /** 绘画分享 */
  shareDrawing() {
    return segment.button([
      { text: '再来一张', callback: '/绘画分享' }
    ]);
  }

  /** 复刻记录 */
  regressionRecords() {
    return segment.button(
      [
        { text: "20年记录", callback: `/20年复刻记录` },
        { text: "21年记录", callback: `/21年复刻记录` },
        { text: "22年记录", callback: `/22年复刻记录` }
      ],
      [
        { text: "23年记录", callback: `/23年复刻记录` },
        { text: "24年记录", callback: `/24年复刻记录` },
        { text: "25年记录", callback: `/25年复刻记录` }
      ],
      [
        { text: "全部复刻记录", callback: `/全部复刻记录` }
      ]
    );
  }

  /** 今日碎石 */
  todayShards() {
    return segment.button([
      { text: '碎石路线图', callback: '/碎石路线图' }
    ]);
  }

  /** 服务器状态 */
  serverStatus() {
    return segment.button([
      { text: '再次查询', callback: '/光遇服务器状态' }
    ]);
  }

  /** 攻略相关 */
  dailyTask() {
    return segment.button([
      { text: '任务图', callback: '/任务图' }
    ]);
  }

  /** 下载链接 */
  downloadLinks(links) {
    return segment.button(
      [
        { text: '官服', link: links.官服 },
        { text: '4399', link: links['四三九九'] || links['4399'] }
      ],
      [
        { text: 'BiliBili', link: links.BiliBili },
        { text: 'VIVO', link: links.VIVO },
        { text: '233乐园', link: links['233'] }
      ],
      [
        { text: '华为', link: links.华为 },
        { text: '应用宝', link: links.应用宝 }
      ]
    );
  }

  /** 光翼查询 */
  wingQuery() {
    return segment.button(
      [
        { text: '光翼查询', callback: '/光翼查询' },
        { text: '光翼详情', callback: '/光翼详情' },
      ],
      [
        { text: '光遇ID列表', callback: '/光遇ID列表' }
      ]
    );
  }

  /** 蜡烛记录 */
  candleRecord() {
    return segment.button([
      { text: '蜡烛记录', callback: '/蜡烛记录' },
      { text: '记录帮助', callback: '/蜡烛记录帮助' }
    ]);
  }

  /** 信息查询 */
  information() {
    return segment.button(
      [
        { text: '服务器状态', callback: '/sky状态' },
      ],
      [
        { text: '光翼统计', callback: '/光翼统计' },
        { text: '季节进度', callback: '/季节进度' }
      ]
    );
  }

  /** 图鉴相关 */
  collection() {
    return segment.button([
      { text: '全图鉴参考', callback: '/全图鉴参考' },
      { text: '全部复刻记录', callback: '/全部复刻记录' }
    ]);
  }

  /** 攻略 */
  strategy() {
    return segment.button(
      [
        { text: '今日任务', callback: '/今日任务' },
        { text: '今日碎石', callback: '/今日碎石' },
      ],
      [
        { text: '碎石路线图', callback: '/碎石路线图' }
      ]
    );
  }

  /** 国服礼包 */
  giftQuery() {
    return segment.button(
      [
        { text: '礼包查询', callback: '/国服礼包查询' },
        { text: '查询帮助', callback: '/礼包查询帮助' }
      ]
    );
  }
}
