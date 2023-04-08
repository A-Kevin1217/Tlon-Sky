import plugin from '../../../lib/plugins/plugin.js';

export class 光遇_季节兑换图 extends plugin {
  constructor () {
    super({
      name: '光遇_季节兑换图',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^#?感恩季兑换图$',
          fnc: 'sky_GEJ'
        },
        {
          reg: '^#?追光季兑换图$',
          fnc: 'sky_ZGJ'
        },
        {
          reg: '^#?归属季兑换图$',
          fnc: 'sky_GSJ'
        },
        {
          reg: '^#?(音韵|凛冬)季兑换图$',
          fnc: 'sky_LDJ'
        },
        {
          reg: '^#?魔法季兑换图$',
          fnc: 'sky_MFJ'
        },
        {
          reg: '^#?圣岛季兑换图$',
          fnc: 'sky_SDJ'
        },
        {
          reg: '^#?预言季兑换图$',
          fnc: 'sky_YYJ'
        },
        {
          reg: '^#?梦想季兑换图$',
          fnc: 'sky_MXJ'
        },
        {
          reg: '^#?(重组|集结)季兑换图$',
          fnc: 'sky_CZJ'
        },
        {
          reg: '^#?小王子季兑换图$',
          fnc: 'sky_XWZJ'
        },
        {
          reg: '^#?风行季兑换图$',
          fnc: 'sky_FXJ'
        },
        {
          reg: '^#?潜海季兑换图$',
          fnc: 'sky_QHJ'
        },
        {
          reg: '^#?表演季兑换图$',
          fnc: 'sky_BYJ'
        },
        {
          reg: '^#?破晓季兑换图$',
          fnc: 'sky_PXJ'
        },
        {
          reg: '^#?(欧若拉|AURORA|aurora)季兑换图$',
          fnc: 'sky_ORL'
        },
        {
          reg: '^#?追忆季兑换图$',
          fnc: 'sky_ZYJ'
        },
        {
            reg: '^#?夜行季兑换图',
            fnc: 'sky_YXJ'
        },
        {
          reg: '^#?查询(帮助|教程)$',
          fnc: 'sky_cxbz'
        }
      ]
    })
  }
  async sky_GEJ (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/感恩季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async sky_ZGJ (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/追光季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async sky_GSJ (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/归属季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async sky_LDJ (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/音韵季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async sky_MFJ (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/魔法季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async sky_SDJ(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/圣岛季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async sky_YYJ (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/预言季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async sky_MXJ (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/梦想季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async sky_CZJ (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/重组季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async sky_XWZJ (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/小王子季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async sky_FXJ (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/风行季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async sky_QHJ (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/潜海季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async sky_BYJ (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/表演季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async sky_PXJ (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/破晓季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async sky_ORL (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/AURORA季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async sky_ZYJ(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/追忆季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async sky_YXJ(e) {
      const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/航行季.png'
      await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async sky_cxbz(e) {
    const Textreply = '首先,你需要[上传角色+id]\n然后使用获取的id查询';
    const imgreply = 'plugins/Tlon-Sky/resource/统计及其他/教程.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
      Textreply ? Textreply : "",
    ])
  }
}