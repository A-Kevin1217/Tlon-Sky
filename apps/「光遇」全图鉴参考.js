import plugin from '../../../lib/plugins/plugin.js';

export class 光遇_全图鉴参考 extends plugin {
    constructor () {
      super({
        name: '光遇_全图鉴参考',
        dsc: '光遇',
        event: 'message',
        priority: 5000,
        rule: [
          {
            reg: /^#?全图鉴参考$/,
            fnc: '全图鉴参考'
          },
        ]
      })
    }
    async 全图鉴参考(e) {
      const imgreply = 'plugins/Tlon-Sky/resource/统计及其他/全图鉴参考.png'
      let msg = [
        segment.at(this.e.user_id),
        imgreply ? segment.image(imgreply) : "",
        `国际服全图鉴,国服仅供参考`
      ]
      e.reply( msg )
      return true;
    }
}