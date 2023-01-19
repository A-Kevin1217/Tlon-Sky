import fetch from "node-fetch";
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
      ]
    })
  }
  async ganejdht (e) {
    let url = 'https://gchat.qpic.cn/gchatpic_new/3620060826/658312780-2889894068-C676965E13402EC4601B1E24FF3B1414/0?term=2&is_origin=0'
    let res = await fetch(url).catch((err) => logger.error(err))
    await this.reply([
      segment.at(this.e.user_id),
      segment.image(url)
    ])
  }
  async zhuigjdht (e) {
    let url = 'https://gchat.qpic.cn/gchatpic_new/3620060826/2054658697-3069178944-CE2E443A56F5606D49F03FE08F1F47E3/0?term=2&is_origin=0'
    let res = await fetch(url).catch((err) => logger.error(err))
    await this.reply([
      segment.at(this.e.user_id),
      segment.image(url)
    ])
  }
  async guisjdht (e) {
    let url = 'https://gchat.qpic.cn/gchatpic_new/3620060826/2054658697-3055385050-46FECE528C99FB1E70F81F5C4ED02CCA/0?term=2&is_origin=0'
    let res = await fetch(url).catch((err) => logger.error(err))
    await this.reply([
      segment.at(this.e.user_id),
      segment.image(url)
    ])
  }
  async yinyjdht (e) {
    let url = 'https://gchat.qpic.cn/gchatpic_new/3620060826/2054658697-2243376476-4E6BB94CB5E6FFB60F2D5485AAF3398B/0?term=2&is_origin=0'
    let res = await fetch(url).catch((err) => logger.error(err))
    await this.reply([
      segment.at(this.e.user_id),
      segment.image(url)
    ])
  }
  async mofjdht (e) {
    let url = 'https://gchat.qpic.cn/gchatpic_new/3620060826/2054658697-2203977974-78E9C75BF35D641AC9C4F45FD35FC308/0?term=2&is_origin=0'
    let res = await fetch(url).catch((err) => logger.error(err))
    await this.reply([
      segment.at(this.e.user_id),
      segment.image(url)
    ])
  }
  async shengdjdht(e) {
    let url = 'https://gchat.qpic.cn/gchatpic_new/3620060826/2054658697-2654089708-0568FCC61B0853FF63FE13F968E6983C/0?term=3&is_origin=0'
    let res = await fetch(url).catch((err) => logger.errro(err))
    await this.reply([
      segment,at(this.e.user_id),
      segment.image(url)
    ])
  }
  async yuyjdht (e) {
    let url = 'https://gchat.qpic.cn/gchatpic_new/3620060826/2054658697-2568075824-5FA0C6FB0D28A7CE83000FF67C4EFA69/0?term=2&is_origin=0'
    let res = await fetch(url).catch((err) => logger.error(err))
    await this.reply([
      segment.at(this.e.user_id),
      segment.image(url)
    ])
  }
  async mengxjdht (e) {
    let url = 'https://gchat.qpic.cn/gchatpic_new/3620060826/2054658697-2151948210-800AE36D1C035F961FEAFFE6EF10672E/0?term=2&is_origin=0'
    let res = await fetch(url).catch((err) => logger.error(err))
    await this.reply([
      segment.at(this.e.user_id),
      segment.image(url)
    ])
  }
  async chonzjijjdht (e) {
    let url = 'https://gchat.qpic.cn/gchatpic_new/3620060826/2054658697-2657134776-9603A1778BDD3F782A895636430F6489/0?term=2&is_origin=0'
    let res = await fetch(url).catch((err) => logger.error(err))
    await this.reply([
      segment.at(this.e.user_id),
      segment.image(url)
    ])
  }
  async xiaowzjdht (e) {
    let url = 'https://gchat.qpic.cn/gchatpic_new/3620060826/2054658697-2924563578-E6E341E4A9D217BD072C5AD306197954/0?term=2&is_origin=0'
    let res = await fetch(url).catch((err) => logger.error(err))
    await this.reply([
      segment.at(this.e.user_id),
      segment.image(url)
    ])
  }
  async fengxjdht (e) {
    let url = 'https://gchat.qpic.cn/gchatpic_new/3620060826/2054658697-3128279012-9FBFDFF4A2DA0B46B506F012E82E2728/0?term=2&is_origin=0'
    let res = await fetch(url).catch((err) => logger.error(err))
    await this.reply([
      segment.at(this.e.user_id),
      segment.image(url)
    ])
  }
  async qianhjdht (e) {
    let url = 'https://gchat.qpic.cn/gchatpic_new/3620060826/2054658697-2776940988-C34C0591A29FE3A7A1EACA35676659B8/0?term=2&is_origin=0'
    let res = await fetch(url).catch((err) => logger.error(err))
    await this.reply([
      segment.at(this.e.user_id),
      segment.image(url)
    ])
  }
  async biaoyjdht (e) {
    let url = 'https://gchat.qpic.cn/gchatpic_new/3620060826/2054658697-2564301330-79AA364705336321435234E1FC051816/0?term=2&is_origin=0'
    let res = await fetch(url).catch((err) => logger.error(err))
    await this.reply([
      segment.at(this.e.user_id),
      segment.image(url)
    ])
  }
  async poxiaojidht (e) {
    let url = 'https://gchat.qpic.cn/gchatpic_new/3620060826/2054658697-3113721606-06A81A737CB362DE6394318AD99CF87F/0?term=2&is_origin=0'
    let res = await fetch(url).catch((err) => logger.error(err))
    await this.reply([
      segment.at(this.e.user_id),
      segment.image(url)
    ])
  }
  async ourljdht (e) {
    let url = 'https://gchat.qpic.cn/gchatpic_new/3620060826/2054658697-2820943540-92FE008D8491831D866009655F129F26/0?term=2&is_origin=0'
    let res = await fetch(url).catch((err) => logger.error(err))
    await this.reply([
      segment.at(this.e.user_id),
      segment.image(url)
    ])
  }
  async zhuiyjdht(e){
    let url = 'https://gchat.qpic.cn/gchatpic_new/3620060826/2054658697-3031257384-AB9730DD20EF2ABF792597B7181D94EB/0?term=3&is_origin=0'
    let res = await fetch(url).catch((err) => logger.error(err))
    await yhis.reply([
      segment.at(this.e.user_id),
      segment.image(url)
    ])
  }
}