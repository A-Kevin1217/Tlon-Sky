import { Version, Common, render, Data } from '../components/index.js';
import lodash from 'lodash';
import fs from 'fs'

export class SKY extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:菜单',
      event: 'message',
      priority: 1,
      rule: [
        { reg: /^(#|\/)?(sky|光遇)(娱乐)?(帮助|菜单)$/i, fnc: 'SKY_HELP', },
        { reg: /^(#|\/)?(季节|常驻)兑换图列表$/, fnc: 'SKY_HELP' },
        { reg: /^(sky|光遇)版本$/i, fnc: 'SKY_VERSION' }
      ]
    });
  }

  async SKY_HELP(e) {
    const U_MSG = e.msg.replace(/^#|\/|光遇|sky|兑换图列表|帮助|菜单|/ig, '')
    let HELP_TYPE = '';

    if (!U_MSG) HELP_TYPE = 'HELP_1'
    if (U_MSG === '娱乐') HELP_TYPE = 'HELP_2'
    if (U_MSG === '季节') HELP_TYPE = 'HELP_3'
    if (U_MSG === '常驻') HELP_TYPE = 'HELP_4'

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