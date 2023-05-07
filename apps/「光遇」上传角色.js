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
    await this.reply(`请前往\n[api.t1qq.com/api/sky/bd.html]\n上传角色`)
    }
}