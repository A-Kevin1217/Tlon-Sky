import { render, Data } from '../components/index.js';
import lodash from 'lodash';
import fs from 'fs';

const REGEX = /^(#|\/)?((S|s)(K|k)(Y|y)|光遇)(娱乐)?(帮助|菜单)$/;
export class SKY_HELP extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:菜单',
      event: 'message',
      priority: 1,
      rule: [
        {
          reg: REGEX,
          fnc: 'SKY_HELP',
        }, {
          reg: /^(#|\/)?(季节|常驻)兑换图列表$/,
          fmc: 'SKY_HELP'
        }
      ]
    })
  }
  async SKY_HELP(e) { return await HELP(e); }
}

async function HELP(e) {
  let HELP_FILE = 'HELP_1'
  if (REGEX.test(e.msg)) {
    const match = e.msg.match(REGEX);
    if (match[6] === '娱乐') { HELP_FILE = 'HELP_2' }
  } else if (/^(#|\/)?季节兑换图列表$/.test(e.msg)) {
    HELP_FILE = 'HELP_3'
  } else if (/^(#|\/)?常驻兑换图列表$/.test(e.msg)) {
    HELP_FILE = 'HELP_4'
  }


  let help = {};
  const { diyCfg, sysCfg } = await Data.importCfg(HELP_FILE);
  const custom = help;

  const helpConfig = lodash.defaults(diyCfg.helpCfg || {}, custom.helpCfg, sysCfg.helpCfg);
  const helpList = diyCfg.helpList || custom.helpList || sysCfg.helpList;

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

  const bg = await rodom();
  const colCount = 3;
  return await render(`help/HELP`, { helpCfg: helpConfig, helpGroup, bg, colCount, element: 'default' }, { e, scale: 2.0 });
}

async function rodom() {
  const image = await fs.promises.readdir('./plugins/Tlon-Sky/resource/help/theme/');
  const list_img = Array.from(image);
  const theme = list_img.length === 1 ? list_img[0] : list_img[lodash.random(0, list_img.length - 1)];
  return theme;
}
