import puppeteer from '../../../lib/puppeteer/puppeteer.js'
import Button from '../model/Button.js'

export class SKY extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:菜单',
      event: 'message',
      priority: 1,
      rule: [
        { reg: /^[#\/]?(sky|光遇)(帮助|菜单)$/i, fnc: 'help', },
        { reg: /^[#\/]?季节列表$/, fnc: 'seasonList' }
      ]
    });
  }

  async help(e) {
    const image = await puppeteer.screenshot('help', {
      tplFile: 'plugins/Tlon-Sky/resources/admin/SkyHelp.html'
    })

    const message = [image, new Button(e).help()]

    await e.reply(message)
  }

  async seasonList(e) {
    try {
      const response = await fetch('https://ghfast.top/https://raw.githubusercontent.com/A-Kevin1217/resources/master/resources/json/SkyChildrenoftheLight/SeasonalSpirits.json');
      if (!response.ok) {
        throw new Error(`网络请求失败: ${response.status}`);
      }
      const res = await response.json();
      let images = [];

      for (const item of res) {
        const src = `https://ghfast.top/https://raw.githubusercontent.com/A-Kevin1217/resources/master/resources/img/%E5%85%89%E9%81%87/AncestorDressUp/${item.seasonIcon}`;
        const name = item.name;
        images.push({ src, name });
      }
      
      const image = await puppeteer.screenshot('seasonList', {
        tplFile: 'plugins/Tlon-Sky/resources/admin/seasonList.html',
        images: JSON.stringify(images)
      });

      await e.reply(image);
    } catch (error) {
      logger.error(`seasonList获取失败: ${error.message}`);
      await e.reply('获取季节列表失败，请稍后再试');
    }
  }
}