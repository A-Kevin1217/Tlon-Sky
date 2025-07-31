import { Version, Common, render, Data } from '../components/index.js';
import puppeteer from '../../../lib/puppeteer/puppeteer.js'
import lodash from 'lodash';
import fs from 'fs'
import { getPlatformInfo } from './../function/function.js'
import Button from '../model/Button.js'

export class SKY extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:菜单',
      event: 'message',
      priority: 1,
      rule: [
        { reg: /^(#|\/)?(sky|光遇)(帮助|菜单)$/i, fnc: 'help', },
        { reg: /^[#\/]?季节列表$/, fnc: 'seasonList' },
        { reg: /^(#|\/)?(季节|常驻)兑换图列表$/, fnc: 'SKY_HELP' },
        { reg: /^(sky|光遇)版本$/i, fnc: 'SKY_VERSION' }
      ]
    });
  }

  async help(e) {
    const image = await puppeteer.screenshot('help', {
      tplFile: 'plugins/Tlon-Sky/resources/admin/SkyHelp.html'
    })

    const { isQQBot } = getPlatformInfo(e)
    const message = [image]

    if (isQQBot) {
      const buttonHelp = new Button().help()
      if (buttonHelp) message.push(buttonHelp)
    }

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

  async SKY_HELP(e) {
    const userMsg = e.msg.replace(/^#|\/|光遇|sky|兑换图列表|帮助|菜单|/ig, '');
    
    // 使用映射简化判断逻辑
    const helpTypeMap = {
      '': 'HELP_1',
      '季节': 'HELP_3',
      '常驻': 'HELP_4'
    };
    
    const HELP_TYPE = helpTypeMap[userMsg] || 'HELP_1';

    let help = {};
    const { diyCfg, sysCfg } = await Data.importCfg(HELP_TYPE);
    const custom = help;

    const helpConfig = lodash.defaults(diyCfg.helpCfg || {}, custom.helpCfg, sysCfg.helpCfg);
    const helpList = diyCfg.helpList || custom.helpList || sysCfg.helpList || [];

    const helpGroup = helpList
      .filter(group => !group.auth || (group.auth === 'master' && e.isMaster))
      .map(group => {
        return {
          ...group,
          list: group.list.map(help => {
            const icon = help.icon * 1;
            if (!icon) {
              return { ...help, css: 'display:none' };
            } else {
              const x = (icon - 1) % 10;
              const y = (icon - x - 1) / 10;
              return { ...help, css: `background-position:-${x * 50}px -${y * 50}px` };
            }
          })
        };
      });

    const image = await fs.promises.readdir('./plugins/Tlon-Sky/resources/help/theme/');
    const list_img = Array.from(image);
    const theme = list_img.length === 1 ? list_img[0] : list_img[lodash.random(0, list_img.length - 1)];

    const colCount = 3;
    return await render(`help/HELP`, { helpCfg: helpConfig, helpGroup, bg: theme, colCount, element: 'default' }, { e, scale: 2.0 });
  }
  
  async SKY_VERSION(e) {
    return await Common.render('help/version-info', {
      currentVersion: Version.version,
      changelogs: Version.changelogs,
      elem: 'dendro'
    }, { e, scale: 1.2 })
  }
}