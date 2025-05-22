export default class Button {
  static getButtonInstance() {
    return typeof Bot.Button === 'function' ? Bot.Button : segment?.button;
  }
  
  constructor() {
    this.prefix = '';
    // 在构造时获取ButtonInstance并保存
    this.buttonInstance = Button.getButtonInstance();
    // 判断按钮类型
    this.isMiaoBot = typeof Bot.Button === 'function';
  }
  
  help() {
    if (!this.buttonInstance) return null;
    
    if (this.isMiaoBot) {
      // 喵崽按钮格式 (使用label和data)
      return this.buttonInstance([
        { label: '每日任务', data: '每日任务' },
        { label: '代币位置', data: '代币位置' },
        { label: 'sky状态', data: 'sky状态' }
      ],[
        { label: '光遇进度', data: '光遇进度' },
        { label: '今日碎石', data: '今日碎石' },
        { label: '复刻兑换图', data: '复刻兑换图' }
      ]);
    } else {
      // TRSS按钮格式 (使用text和callback)
      return this.buttonInstance(
        [
          { text: '每日任务', callback: '每日任务' },
          { text: '代币位置', callback: '代币位置' },
          { text: 'sky状态', callback: 'sky状态' }
        ],
        [
          { text: '光遇进度', callback: '光遇进度' },
          { text: '今日碎石', callback: '今日碎石' },
          { text: '复刻兑换图', callback: '复刻兑换图' }
        ]
      );
    }
  }

  Records() {
    if (!this.buttonInstance) return null;
    
    if (this.isMiaoBot) {
      // 喵崽按钮格式
      return this.buttonInstance([
        { label: "20年记录", data: `/20年复刻记录` },
        { label: "21年记录", data: `/21年复刻记录` },
        { label: "22年记录", data: `/22年复刻记录` }
      ],[
        { label: "23年记录", data: `/23年复刻记录` },
        { label: "24年记录", data: `/24年复刻记录` },
        { label: "25年记录", data: `/25年复刻记录` }
      ]);
    } else {
      // TRSS按钮格式
      return this.buttonInstance(
        [
          { text: "20年记录", callback: `/20年复刻记录` },
          { text: "21年记录", callback: `/21年复刻记录` },
          { text: "22年记录", callback: `/22年复刻记录` }
        ],[
          { text: "23年记录", callback: `/23年复刻记录` },
          { text: "24年记录", callback: `/24年复刻记录` },
          { text: "25年记录", callback: `/25年复刻记录` }
        ]
      );
    }
  }
  
  serverStatus() {
    if (!this.buttonInstance) return null;
    
    if (this.isMiaoBot) {
      // 喵崽按钮格式
      return this.buttonInstance([
        { label: '再次查询', data: '光遇服务器状态' }
      ]);
    } else {
      // TRSS按钮格式
      return this.buttonInstance(
        [
          { text: '再次查询', callback: '光遇服务器状态' }
        ]
      );
    }
  }
  
  downloadLinks(links) {
    if (!this.buttonInstance) return null;
    
    if (this.isMiaoBot) {
      // 喵崽按钮格式
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
      // TRSS按钮格式
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
  