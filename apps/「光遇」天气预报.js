import plugin from '../../../lib/plugins/plugin.js'
import axios from 'axios';


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
    axios.get(`https://api.t1qq.com/api/sky/gytq?key=gLlkn4wsi7O4wxayt2UeJocBmk`)
    .then(ronespse => {
    if (ronespse.data.code === 200 ) {
      const img0 = ronespse.data.data.img0
      const img1 = ronespse.data.data.img1
      const img2 = ronespse.data.data.img2
      const img3 = ronespse.data.data.img3
      const msg = [
        segment.image(img0),
        segment.image(img1),
        segment.image(img2),
        segment.image(img3),
        "数据来源：光遇小精灵"
      ]
      e.reply(msg, true);
    } else if ( res,code !== 200 ) {
      e.reply('获取失败！')
    }
  })
  }
}