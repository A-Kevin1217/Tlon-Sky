import plugin from '../../../lib/plugins/plugin.js';
import { segment } from "oicq";
export class example extends plugin {
  constructor () {
    super({
      name: '光遇攻略',
      dsc: '光遇攻略',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^感恩季兑换图$',
          fnc: 'ganejdht'
        },
        {
          reg: '^追光季兑换图$',
          fnc: 'zhuigjdht'
        },
        {
          reg: '^归属季兑换图$',
          fnc: 'guisjdht'
        },
        {
          reg: '^(音韵|凛冬)季兑换图$',
          fnc: 'yinyjdht'
        },
        {
          reg: '^魔法季兑换图$',
          fnc: 'mofjdht'
        },
        {
          reg: '^圣岛季兑换图$',
          fnc: 'shengdjdht'
        },
        {
          reg: '^预言季兑换图$',
          fnc: 'yuyjdht'
        },
        {
          reg: '^梦想季兑换图$',
          fnc: 'mengxjdht'
        },
        {
          reg: '^(重组|集结)季兑换图$',
          fnc: 'chonzjijjdht'
        },
        {
          reg: '^小王子季兑换图$',
          fnc: 'xiaowzjdht'
        },
        {
          reg: '^风行季兑换图$',
          fnc: 'fengxjdht'
        },
        {
          reg: '^潜海季兑换图$',
          fnc: 'qianhjdht'
        },
        {
          reg: '^表演季兑换图$',
          fnc: 'biaoyjdht'
        },
        {
          reg: '^破晓季兑换图$',
          fnc: 'poxiaojidht'
        },
        {
          reg: '^(欧若拉|AURORA|aurora)季兑换图$',
          fnc: 'ourljdht'
        },
        {
          reg: '^追忆季兑换图$',
          fnc: 'zhuiyjdht'
        },
        {
          reg: '^查询(帮助|教程)$',
          fnc: 'sky_cxbz'
        }
      ]
    })
  }
  async ganejdht (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/感恩季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async zhuigjdht (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/追光季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async guisjdht (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/归属季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async yinyjdht (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/音韵季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async mofjdht (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/魔法季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async shengdjdht(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/圣岛季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async yuyjdht (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/预言季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async mengxjdht (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/梦想季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async chonzjijjdht (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/重组季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async xiaowzjdht (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/小王子季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async fengxjdht (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/风行季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async qianhjdht (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/潜海季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async biaoyjdht (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/表演季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async poxiaojidht (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/破晓季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async ourljdht (e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/AURORA季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async zhuiyjdht(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/季节兑换图/追忆季.png'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
  async sky_cxbz(e) {
    const imgreply = 'https://gchat.qpic.cn/gchatpic_new/3591203536/3882665563-2933672716-752D64627CEA1AE9F750F11C934579BD/0?term=3&is_origin=0'
    await this.reply([
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ])
  }
}