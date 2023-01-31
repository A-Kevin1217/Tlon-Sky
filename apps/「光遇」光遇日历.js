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
              reg: '^(光遇)?日历$',
              fnc: 'rl'
            }
        ]
    })
}
  async rl(e) {
		const browser = await puppeteer.browserInit();
		const page = await browser.newPage();
		await page.setViewport({
			width: 650,
			height: 2000
		});
		await page.goto('https://www.onebiji.com/hykb_tools/guangyu/rwgl/index.php');
		let buff = null
		
		buff = await page.screenshot({
			clip: {
			  x: 31,
			  y: 645,
			  width: 591,
			  height: 439,
			}
		});
		
		page.close().catch((err) => logger.error(err));
		
	await e.reply(segment.image(buff));
	return true;
  }
}