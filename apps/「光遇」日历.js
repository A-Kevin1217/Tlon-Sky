import plugin from '../../../lib/plugins/plugin.js'
import puppeteer from '../../../lib/puppeteer/puppeteer.js'

export class 光遇_日历 extends plugin {
    constructor () {
      super({
        name: '光遇_日历',
        dsc: '日历',
        event: 'message',
        priority: 5000,
        rule: [
            {
              reg: /^#?(光遇)?日历$/,
              fnc: 'rl'
            }
        ]
    })
}
async rl(e) {
	const browser = await puppeteer.browserInit();
	const page = await browser.newPage();
	await page.setViewport({width: 650,height: 2000});
  await page.goto('https://www.guoping123.com/hykb_tools/guangyu/rwgl/index.php');
  const buff = await page.screenshot({
    clip: {
      x: 31, y: 645, width: 591, height: 439
    }
  });
  await page.close();
  await e.reply( segment.image(buff) );
  return true;
}
}