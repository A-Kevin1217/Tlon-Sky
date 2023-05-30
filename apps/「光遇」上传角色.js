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
    await this.reply(`请扫码获取光遇id`,segment.image('https://gitee.com/Tloml-Starry/Tlon-picture/raw/master/%E4%B8%8A%E4%BC%A0%E8%A7%92%E8%89%B2%E4%BA%8C%E7%BB%B4%E7%A0%81.png'))
    }
}