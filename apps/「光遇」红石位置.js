import plugin from '../../lib/plugins/plugin.js'
import fetch from 'node-fetch'
import{segment}from'oicq'


export class example extends plugin {
  constructor () {
    super({
      name: '光遇',
      dsc: '光遇红石位置',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^#?红石位置$',
          fnc: 'sky_hswz'
        },
      ]
    })
  }
  async sky_hswz(e) {
    const imgreply = 'https://gchat.qpic.cn/gchatpic_new/1947425850/3882665563-2271260242-C76BCD49DA8CC0C154C62C405CD9E432/0?term=2&is_origin=0'
    let url1 = `https://api.t1qq.com/api/sky/gytq?key=bcVIK8fjrfJzZJtvxwOJMQmLPt`;
    let res = await fetch(url1).catch((err) => logger.error(err));
    res = await res.json();
    const { url } = res.tq[3];
    let num
    if(res.msg === '查询成功'){
      num = [
        imgreply ? segment.image(imgreply) : "",
        segment.image(`${url}`),
      ]
    }
    await this.reply(num, true);
  }
}