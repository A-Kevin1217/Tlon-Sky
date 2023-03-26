// 引入插件基础类
import plugin from '../../../lib/plugins/plugin.js'
// 引入 puppeteer 模块
import puppeteer from '../../../lib/puppeteer/puppeteer.js'
// 定义 example 类，继承自 plugin 类
export class example extends plugin {
    // 构造函数
    constructor () {
      super({
      // 插件名称
        name: '光遇_日历',
      // 插件描述
        dsc: '日历',
        // 事件类型       
        event: 'message',
        // 优先级
        priority: 5000,
        
      // 规则数组
        rule: [
            {
              // 正则表达式
              reg: '^#?(光遇)?日历$',
              // 触发的函数名称
              fnc: 'rl'
            }
        ]
    })
}
// rl 函数，在规则匹配成功时被触发
async rl(e) {
  // 使用 puppeteer 库初始化浏览器
	const browser = await puppeteer.browserInit();
  // 打开一个新页面
	const page = await browser.newPage();
  // 设置页面大小
	await page.setViewport({width: 650,height: 2000});
  // 导航到特定 URL
  await page.goto('https://www.guoping123.com/hykb_tools/guangyu/rwgl/index.php');
  // 截取页面图像
  const buff = await page.screenshot({
    clip: {
      x: 31, y: 645, width: 591, height: 439
    }
  });
  // 关闭页面
  await page.close();
  // 回复图像数据
  await e.reply(segment.image(buff));
  // 返回 true
  return true;
}
}