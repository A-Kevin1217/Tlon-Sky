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
                reg: /^#?晨岛兑换图$/,
                fnc: '晨岛兑换图'
            },
            {
                reg: /^#?云野兑换图$/,
                fnc: '云野兑换图'
            },
            {
                reg: /^#?雨林兑换图$/,
                fnc: 'sky_YL'
            },
            {
                reg: /^#?(峡谷|霞谷)兑换图$/,
                fnc: '霞谷兑换图'
            },
            {
                reg: /^#?暮土兑换图$/,
                fnc: '暮土兑换图'
            },
            {
                reg: /^#?禁阁兑换图$/,
                fnc: '禁阁兑换图'
            },
            {
                reg: /^#?墓土兑换图/,
                fnc: '错误名称'
            }
        ]
    })
}
  async 晨岛兑换图(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/常驻先祖兑换图/晨岛.png';
      let msg = [
        imgreply ? segment.image(imgreply) : "",
                ]
      e.reply(msg, true)
      return true;
  }
  async 云野兑换图(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/常驻先祖兑换图/云野.png';
      let msg = [
        imgreply ? segment.image(imgreply) : "",
                ]
      e.reply(msg, true)
      return true;
  }
  async 雨林兑换图(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/常驻先祖兑换图/雨林.png';
      let msg = [
        imgreply ? segment.image(imgreply) : "",
                ]
      e.reply(msg, true)
      return true;
  }
  async 霞谷兑换图(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/常驻先祖兑换图/霞谷.png';
      let msg = [
        imgreply ? segment.image(imgreply) : "",
                ]
      e.reply(msg, true)
      return true;
  }
  async 暮土兑换图(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/常驻先祖兑换图/暮土.png';
      let msg = [
        imgreply ? segment.image(imgreply) : "",
                ]
      e.reply(msg, true)
      return true;
  }
  async 禁阁兑换图(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/常驻先祖兑换图/禁阁.png';
      let msg = [
        imgreply ? segment.image(imgreply) : "",
                ]
      e.reply(msg, true)
      return true;
  }
  async 错误名称(e) {
    const Textreply = '不是"墓"土哦亲，是"暮"土';
      let msg = [
        segment.at(this.e.user_id),'\n',
        Textreply ? Textreply : "",
                ]
      e.reply(msg, true)
      return true;
  }
}