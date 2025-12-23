export default class Button {
  static getButtonInstance() {
    return typeof Bot.Button === 'function' ? Bot.Button : segment?.button;
  }
  
  constructor() {
    this.prefix = '';
    
    this.buttonInstance = Button.getButtonInstance();
    
    this.isMiaoBot = typeof Bot.Button === 'function';
  }
  
  createButton(button) {
    if (!this.buttonInstance || !button) return null;
    return this.buttonInstance(button);
  }
  
  
  renderButton(cmd, params = {}) {
    if (!this.buttonInstance) return null;
    
    
    switch (cmd) {
      case 'help':
        return this.help();
      case 'regressionRecords':
        return this.Records();
      case 'checkServerStatus':
        return this.serverStatus();
      case 'gameDownloadLink':
        return this.downloadLinks(params);
      case 'handleDynamic':
        return this.handleDynamic();
      default:
        // 如果是字符串数组，尝试创建自定义按钮
        if (typeof cmd === 'string' && cmd.includes(',')) {
          const buttons = cmd.split(',').map(item => item.trim());
          if (this.isMiaoBot) {
            return this.buttonInstance(buttons.map(btn => ({ label: btn, data: btn })));
          } else {
            return this.buttonInstance(buttons.map(btn => ({ text: btn, callback: btn })));
          }
        }
        
        if (typeof cmd === 'object') {
          return this.createButton(cmd);
        }
        return null;
    }
  }
  
  help() {
    if (!this.buttonInstance) return null;
    
    if (this.isMiaoBot) {
      
      return this.buttonInstance([
        { label: '每日任务', data: '/每日任务' },
        { label: 'sky状态', data: '/sky状态' }
      ],[
        { label: '光遇进度', data: '/光遇进度' },
        { label: '今日碎石', data: '/今日碎石' },
        { label: '复刻兑换图', data: '/复刻兑换图' }
      ],[
        { label: '蜡烛记录', data: '/蜡烛记录' },
        { label: '蜡烛记录帮助', data: '/蜡烛记录帮助' }
      ]);
    } else {
      
      return this.buttonInstance(
        [
          { text: '每日任务', callback: '/每日任务' },
          { text: 'sky状态', callback: '/sky状态' }
        ],
        [
          { text: '光遇进度', callback: '/光遇进度' },
          { text: '今日碎石', callback: '/今日碎石' },
          { text: '复刻兑换图', callback: '/复刻兑换图' }
        ],
        [
          { text: '蜡烛记录', callback: '/蜡烛记录' },
          { text: '蜡烛记录帮助', callback: '/蜡烛记录帮助' }
        ]
      );
    }
  }
  shareDrawing() {
    if (!this.buttonInstance) return null;
    
    if (this.isMiaoBot) {
      
      return this.buttonInstance([
        { label: '再来一张', data: '/绘画分享' }
      ]);
    } else {
      
      return this.buttonInstance(
        [
          { text: '再来一张', callback: '/绘画分享' }
        ]
      );
    }
  }

  Records() {
    if (!this.buttonInstance) return null;
    
    if (this.isMiaoBot) {
      
      return this.buttonInstance([
        { label: "20年记录", data: `/20年复刻记录` },
        { label: "21年记录", data: `/21年复刻记录` },
        { label: "22年记录", data: `/22年复刻记录` }
      ],[
        { label: "23年记录", data: `/23年复刻记录` },
        { label: "24年记录", data: `/24年复刻记录` },
        { label: "25年记录", data: `/25年复刻记录` }
      ],[
        { label: "全部复刻记录", data: `/全部复刻记录` }
      ]);
    } else {
      
      return this.buttonInstance(
        [
          { text: "20年记录", callback: `/20年复刻记录` },
          { text: "21年记录", callback: `/21年复刻记录` },
          { text: "22年记录", callback: `/22年复刻记录` }
        ],[
          { text: "23年记录", callback: `/23年复刻记录` },
          { text: "24年记录", callback: `/24年复刻记录` },
          { text: "25年记录", callback: `/25年复刻记录` }
        ],
        [
          { text: "全部复刻记录", callback: `/全部复刻记录` }
        ]
      );
    }
  }

  TodayShards(){
    if (!this.buttonInstance) return null;
    
    if (this.isMiaoBot) {
      
      return this.buttonInstance([
        { label: '碎石路线图', data: '/碎石路线图' }
      ]);
    } else {
      
      return this.buttonInstance(
        [
          { text: '碎石路线图', callback: '/碎石路线图' }
        ]
      );
    }
  }
  
  serverStatus() {
    if (!this.buttonInstance) return null;
    
    if (this.isMiaoBot) {
      
      return this.buttonInstance([
        { label: '再次查询', data: '/光遇服务器状态' }
      ]);
    } else {
      
      return this.buttonInstance(
        [
          { text: '再次查询', callback: '/光遇服务器状态' }
        ]
      );
    }
  }
  handleDynamic(){
    if (!this.buttonInstance) return null;
    
    if (this.isMiaoBot) {
      
      return this.buttonInstance([
        { label: '任务图', data: '/任务图' }
      ]);
    } else {
      
      return this.buttonInstance(
        [
          { text: '任务图', callback: '/任务图' }
        ]
      );
    }
  }
  
  downloadLinks(links) {
    if (!this.buttonInstance) return null;
    
    if (this.isMiaoBot) {
      
      return this.buttonInstance([
        { label: '官服', link: links.官服 },
        { label: '4399', link: links.四三九九 }
      ],[
        { label: 'OPPO', link: links.OPPO },
        { label: 'BiliBili', link: links.BiliBili },
        { label: 'VIVO', link: links.VIVO }
      ],[
        { label: '华为', link: links.华为 },
        { label: '小米', link: links.小米 },
        { label: '应用宝', link: links.应用宝 }
      ]);
    } else {
      
      return this.buttonInstance(
        [
          { text: '官服', link: links.官服 },
          { text: '4399', link: links.四三九九 }
        ],
        [
          { text: 'OPPO', link: links.OPPO },
          { text: 'BiliBili', link: links.BiliBili },
          { text: 'VIVO', link: links.VIVO }
        ],
        [
          { text: '华为', link: links.华为 },
          { text: '小米', link: links.小米 },
          { text: '应用宝', link: links.应用宝 }
        ]
      );
    }
  }
}
  