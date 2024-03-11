const PERMANENT_REGEX = /^(#|\/)?(晨岛|云野|雨林|峡谷|霞谷|暮土|禁阁)兑换图$/
const SEASON_REGEX = /^(#|\/)?(AURORA|表演|风行|感恩|归巢|归属|九色鹿|梦想|魔法|破晓|潜海|圣岛|拾光|小王子|夜行|音韵|预言|重组|追光|追忆|欧若拉|集结|凌冬)(季)?兑换图$/

const URL = 'https://gitee.com/Tloml-Starry/resources/raw/master/resources/img/光遇/'
export class SKY_EXCHANGE_PICTURE extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:兑换图',
      dsc: '光遇兑换图',
      event: 'message',
      priority: 5000,
      rule: [{
        reg: PERMANENT_REGEX,
        fnc: 'PERMANENT_EXCHANGE_PICTURE'
      }, {
        reg: SEASON_REGEX,
        fnc: 'SEASON_EXCHANGE_PICTURE'
      }, {
        reg: /^(#|\/)?(复刻兑换图|国服复刻)$/,
        fnc: 'RETURN_EXCHANGE_PICTURE'
      }, {
        reg: /^(#|\/)?季节兑换图$/,
        fnc: 'CURRENT_SEASON_EXCHANGE_PICTURE'
      }, {
        reg: /^(#|\/)?好友树兑换图$/,
        fnc: 'F1'
      }]
    })
  }

  async PERMANENT_EXCHANGE_PICTURE(e) {
    const DI_TU_MING = e.msg.match(PERMANENT_REGEX)[2]
    return e.reply([
      segment.image(`${URL}常驻兑换图/${DI_TU_MING}.jpg`)
    ])
  }

  async SEASON_EXCHANGE_PICTURE(e) {
    const MATCHING = e.msg.match(SEASON_REGEX)
    let JI_JIE_MING = MATCHING[2]
    let IS_JI = MATCHING[3]

    if (JI_JIE_MING === 'AURORA') JI_JIE_MING = '欧若拉'
    if (JI_JIE_MING === '重组') JI_JIE_MING = '集结'
    if (JI_JIE_MING === '凌冬') JI_JIE_MING = '音韵'

    if (!IS_JI) IS_JI = '季'

    return e.reply([
      segment.image(`${URL}季节兑换图/${JI_JIE_MING}${IS_JI}.jpg`)
    ])
  }

  async RETURN_EXCHANGE_PICTURE(e) {
    return e.reply([
      segment.image(`${URL}当前/当前复刻.jpg`)
    ])
  }

  async CURRENT_SEASON_EXCHANGE_PICTURE(e) {
    return e.reply([
      segment.image(`${URL}当前/当前季节兑换图.jpg`)
    ])
  }

  async F1(e) {
    return e.reply([
      segment.image(`${URL}其他/好友树兑换图.jpg`)
    ])
  }
}