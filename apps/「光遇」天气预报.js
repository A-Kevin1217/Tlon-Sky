import plugin from '../../lib/plugins/plugin.js'
import fetch from 'node-fetch'
import{segment}from'oicq'


export class example extends plugin {
  constructor () {
    super({
      name: '光遇',
      dsc: '光遇天气预报',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^#?天气预报$',
          fnc: 'sky_tqyb'
        },
      ]
    })
  }
  async sky_tqyb(e) {
    let url1 = `https://api.t1qq.com/api/sky/gytq?key=bcVIK8fjrfJzZJtvxwOJMQmLPt`;
    let res = await fetch(url1).catch((err) => logger.error(err));
    res = await res.json();
    const { url } = res.tq[2];
    let num
    if(res.msg === '查询成功'){
      num = [
        segment.image(`${url}`),
      ]
    }
    await this.reply(num, true);
  }
}