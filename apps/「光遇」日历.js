import plugin from '../../../lib/plugins/plugin.js'
import fetch from 'node-fetch'

export class 光遇_日历 extends plugin {
    constructor () {
      super({
        name: '[Tlon-Sky]光遇:日历',
        dsc: '光遇日历',
        event: 'message',
        priority: 5000,
        rule: [
            {
              reg: /^(#|\/)?(光遇)?日历$/,
              fnc: '光遇日历'
            }
        ]
    })
}
async 光遇日历(e) {
  const url = `https://api.t1qq.com/api/sky/sc/hdrl?key=lHV6bOsaNrsNv2hmegRRVMxOUp&type=json`;
  let res = await fetch(url).catch((err) => logger.error(err))
  res = await res.json()
  const img = res.img
  await e.reply(segment.image(img));
  return true;
}
}