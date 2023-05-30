import plugin from '../../../lib/plugins/plugin.js';
import fetch from 'node-fetch'

export class 光遇_上传id extends plugin {
  constructor() {
    super({
      name: '光遇_上传id',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: `^#?上传角色`,
          fnc: 'sky_scid'
        }
      ]
    });
  }

  async sky_scid(e) {
    let url = 'https://gitee.com/Tloml-Starry/Tlon-picture/raw/master/上传角色二维码.png'
    await this.reply(`请扫码获取光遇id`,segment.image(url))
    }
}