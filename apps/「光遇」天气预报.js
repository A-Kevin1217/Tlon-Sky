import plugin from '../../../lib/plugins/plugin.js'
import fetch from 'node-fetch'


export class 光遇_天气预报 extends plugin {
  constructor () {
    super({
      name: '光遇_天气预报',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^#?天气预报$/,
          fnc: '天气预报'
        },
      ]
    })
  }
  async 天气预报(e) {
    let url1 = `https://api.t1qq.com/api/sky/gytq?key=gLlkn4wsi7O4wxayt2UeJocBmk`;
    let res = await fetch(url1).catch((err) => logger.error(err));
    res = await res.json();
    if (res.code === 200 ) {
      const img0 = res.data.img0
      const img1 = res.data.img1
      const img2 = res.data.img2
      const img3 = res.data.img3
      const msg = [
        segment.image(img0),
        segment.image(img1),
        segment.image(img2),
        segment.image(img3),
        "数据来源：光遇小精灵"
      ]
      await this.reply(msg, true);
    } else if ( res,code !== 200 ) {
      await this.reply('获取失败！')
    }
  }
}