//由@xin-closing-fuse提供
//反馈qq:2859204298
//交流「宣群」q群:657862057 (大爷来玩呀)
import plugin from '../../../lib/plugins/plugin.js'
import { segment } from "oicq";
import puppeteer from '../../../lib/puppeteer/puppeteer.js'

export class example extends plugin {
    constructor () {
      super({
        name: '任务',
        dsc: '光遇任务',
        event: 'message',
        priority: 5000,
        rule: [
            {
              reg: '^(光遇)?(今日|每日)?任务$',
              fnc: 'rw'
            }
        ]
    })
}
  async rw(e) {
		const browser = await puppeteer.browserInit();
		const page = await browser.newPage();
		await page.setViewport({
			width: 1280,
			height: 1320
		});
		await page.goto('https://www.onebiji.com/hykb_tools/guangyu/rwgl/index.php');
		let buff = null
		
		buff = await page.screenshot({
			clip: {
			  x: 300,
			  y: 1450,
			  width: 675,
			  height: 1800
			}
		});
		
		page.close().catch((err) => logger.error(err));
		
	await e.reply(segment.image(buff));
	return true;
  }
}