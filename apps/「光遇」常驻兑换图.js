import plugin from '../../../lib/plugins/plugin.js'

export class 光遇_常驻兑换图 extends plugin {
    constructor () {
      super({
        name: '光遇_常驻兑换图',
        dsc: '光遇',
        event: 'message',
        priority: 5000,
        rule: [
            {
                reg: '^#?晨岛兑换图$',
                fnc: 'sky_CD'
            },
            {
                reg: '^#?云野兑换图$',
                fnc: 'sky_YY'
            },
            {
                reg: '^#?雨林兑换图$',
                fnc: 'sky_YL'
            },
            {
                reg: '^#?(峡谷|霞谷)兑换图$',
                fnc: 'sky_XG'
            },
            {
                reg: '^#?暮土兑换图$',
                fnc: 'sky_MT'
            },
            {
                reg: '^#?禁阁兑换图$',
                fnc: 'sky_JG'
            },
            {
                reg: '^#?墓土兑换图',
                fnc: 'sky_xxx'
            }
        ]
    })
}
  async sky_CD(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/常驻先祖兑换图/晨岛.png';
      logger.info('[SKY]', e.msg)
      let msg = [
        imgreply ? segment.image(imgreply) : "",
                ]
      e.reply(msg, true)
      return true;
  }
  async sky_YY(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/常驻先祖兑换图/云野.png';
      logger.info('[SKY]', e.msg)
      let msg = [
        imgreply ? segment.image(imgreply) : "",
                ]
      e.reply(msg, true)
      return true;
  }
  async sky_YL(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/常驻先祖兑换图/雨林.png';
      logger.info('[SKY]', e.msg)
      let msg = [
        imgreply ? segment.image(imgreply) : "",
                ]
      e.reply(msg, true)
      return true;
  }
  async sky_XG(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/常驻先祖兑换图/霞谷.png';
      logger.info('[SKY]', e.msg)
      let msg = [
        imgreply ? segment.image(imgreply) : "",
                ]
      e.reply(msg, true)
      return true;
  }
  async sky_MT(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/常驻先祖兑换图/暮土.png';
      logger.info('[SKY]', e.msg)
      let msg = [
        imgreply ? segment.image(imgreply) : "",
                ]
      e.reply(msg, true)
      return true;
  }
  async sky_JG(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/常驻先祖兑换图/禁阁.png';
      logger.info('[SKY]', e.msg)
      let msg = [
        imgreply ? segment.image(imgreply) : "",
                ]
      e.reply(msg, true)
      return true;
  }
  async sky_xxx(e) {
    const Textreply = '不是"墓"土哦亲，是"暮"土';
    logger.info('[SKY]', e.msg)
      let msg = [
        segment.at(this.e.user_id),'\n',
        Textreply ? Textreply : "",
                ]
      e.reply(msg, true)
      return true;
  }
}