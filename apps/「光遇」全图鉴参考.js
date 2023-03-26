import plugin from '../../../lib/plugins/plugin.js';

export class example extends plugin {
    constructor () {
      super({
        name: '光遇_全图鉴参考',
        dsc: '光遇',
        event: 'message',
        priority: 5000,
        rule: [
          {
            reg: '^#?全图鉴参考$',
            fnc: 'sky_qtjck'
          },
        ]
      })
    }
    async sky_qtjck (e) {
        const imgreply = 'https://gchat.qpic.cn/gchatpic_new/1947425850/3882665563-2449909976-AAC4FDBB5C48636E45CAA739EC907081/0?term=3&is_origin=1'
        logger.info('[SKY]', e.msg)
        let msg = [
            imgreply ? segment.image(imgreply) : "",
            `国际服全图鉴,国服仅供参考`
        ]
        e.reply(msg, true)
        return true;
    }
}