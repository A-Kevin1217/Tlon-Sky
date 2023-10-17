import { render, Version, Common, Data } from '../components/index.js';
import plugin from '../../../lib/plugins/plugin.js';
import lodash from 'lodash';
import fs from 'fs';

export class 光遇_菜单 extends plugin {
  constructor() {
    super({
      name: '光遇_菜单',
      event: 'message',
      priority: 1145,
      rule: [
        {
          reg: /^#?(SKY|Sky|sky|光遇)(帮助|菜单|使用说明)$/,
          fnc: '光遇菜单',
        },
        {
          reg: /^#?(Sky|sky|光遇)版本$/,
          fnc: '光遇版本',
        },
        {
          reg: /^#?(SKY|Sky|sky|光遇)娱乐(帮助|菜单|使用说明)$/,
          fnc: '光遇娱乐菜单'
        }
      ],
    });
  }

  async 光遇菜单() {
    return await help(this.e);
  }

  async 光遇版本(e) {
    return await Common.render('help/version-info', {
      currentVersion: Version.version,
      changelogs: Version.changelogs,
      elem: 'dendro',
    }, { e, scale: 1.2 });
  }

  async 光遇娱乐菜单() {
    return await 娱乐help(this.e);
  }
}

async function 娱乐help(e) {
  let custom = {};
  let help = {};

  let { diyCfg, sysCfg } = await Data.importCfg_('help');
  custom = help;

  let helpConfig = lodash.defaults(diyCfg.helpCfg || {}, custom.helpCfg, sysCfg.helpCfg);

  let helpList = diyCfg.helpList || custom.helpList || sysCfg.helpList;

  let helpGroup = [];

  for (let group of helpList) {
    if (group.auth && group.auth === 'master' && !e.isMaster) {
      continue;
    }
    for (let help of group.list) {
      let icon = help.icon * 1;

      if (!icon) {
        help.css = 'display:none';
      } else {
        let x = (icon - 1) % 10;
        let y = (icon - x - 1) / 10;
        help.css = `background-position:-${x * 50}px -${y * 50}px`;
      }
    }
    helpGroup.push(group);
  }

  let bg = await rodom();

  let colCount = 3;

  return await render('admin/娱乐help', {
    helpCfg: helpConfig,
    helpGroup,
    bg,
    colCount,
    element: 'default',
  }, {
    e,
    scale: 2.0,
  });
}

async function help(e) {
  let custom = {};
  let help = {};

  let { diyCfg, sysCfg } = await Data.importCfg('help');
  custom = help;

  let helpConfig = lodash.defaults(diyCfg.helpCfg || {}, custom.helpCfg, sysCfg.helpCfg);

  let helpList = diyCfg.helpList || custom.helpList || sysCfg.helpList;

  let helpGroup = [];

  for (let group of helpList) {
    if (group.auth && group.auth === 'master' && !e.isMaster) {
      continue;
    }
    for (let help of group.list) {
      let icon = help.icon * 1;

      if (!icon) {
        help.css = 'display:none';
      } else {
        let x = (icon - 1) % 10;
        let y = (icon - x - 1) / 10;
        help.css = `background-position:-${x * 50}px -${y * 50}px`;
      }
    }
    helpGroup.push(group);
  }

  let bg = await rodom();

  let colCount = 3;

  return await render('help/index', {
    helpCfg: helpConfig,
    helpGroup,
    bg,
    colCount,
    element: 'default',
  }, {
    e,
    scale: 2.0,
  });
}

async function rodom() {
  let image = fs.readdirSync('./plugins/Tlon-Sky/resource/help/theme/');

  let list_img = Array.from(image);

  let theme = list_img.length == 1 ? list_img[0] : list_img[lodash.random(0, list_img.length - 1)];

  return theme;
}
