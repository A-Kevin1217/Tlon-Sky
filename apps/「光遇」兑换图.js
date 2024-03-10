import fetch from "node-fetch"

const PERMANENT_REGEX = /^(#|\/)?(晨岛|云野|雨林|峡谷|霞谷|暮土|禁阁)兑换图$/
const SEASON_REGEX = /^(#|\/)?(AURORA|表演|风行|感恩|归巢|归属|九色鹿|梦想|魔法|破晓|潜海|圣岛|拾光|小王子|夜行|音韵|预言|重组|追光|追忆|欧若拉|集结|凌冬)(季)?兑换图$/
const PICTURE_RESOURCE = 'plugins/Tlon-Sky/resource/Picture'
export class SKY_EXCHANGE_PICTURE extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:兑换图',
      dsc: '光遇兑换图',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: PERMANENT_REGEX,
          fnc: 'PERMANENT_EXCHANGE_PICTURE'
        },
        {
          reg: SEASON_REGEX,
          fnc: 'SEASON_EXCHANGE_PICTURE'
        },
        {
          reg: /^(#|\/)?(复刻兑换图|国服复刻)$/,
          fnc: 'RETURN_EXCHANGE_PICTURE'
        },
        {
          reg: /^(#|\/)?季节兑换图$/,
          fnc: 'CURRENT_SEASON_EXCHANGE_PICTURE'
        }
      ]
    })
  }

  async PERMANENT_EXCHANGE_PICTURE(e) {
    const match = e.msg.match(PERMANENT_REGEX)
    const imgreply = `${PICTURE_RESOURCE}/Exchange picture/Permanent/${match[2]}.png`
    return e.reply([segment.image(imgreply)])
  }

  async SEASON_EXCHANGE_PICTURE(e) {
    const name = e.msg.match(SEASON_REGEX)
    let season = name[2]

    if (season === '欧若拉') {
      season = 'AURORA'
    } else if (season === '重组') {
      season = '集结'
    } else if (season === '凌冬') {
      season = '音韵'
    }

    if (!name[3] || name[3] === '季') { season += '季' }

    const imgreply = `${PICTURE_RESOURCE}/Exchange picture/Season/${season}.png`

    return e.reply([segment.image(imgreply)])
  }

  async RETURN_EXCHANGE_PICTURE(e) {
    const URL_DATA = await (await fetch('https://gitee.com/Tloml-Starry/resources/raw/master/复刻结束时间.json')).json()
    const CURRENT_DATE = new Date();
    const SPECIFIED_DATE = new Date(URL_DATA['endTime']);
    if (CURRENT_DATE > SPECIFIED_DATE || CURRENT_DATE.toISOString() === SPECIFIED_DATE.toISOString()) {
      return e.reply([segment.image('https://gitee.com/Tloml-Starry/resources/raw/master/resources/img/当前/当前复刻.jpg')])
    } else {
      return e.reply([segment.image('https://gitee.com/Tloml-Starry/resources/raw/master/resources/img/当前复刻.jpg')])
    }
  }

  async CURRENT_SEASON_EXCHANGE_PICTURE(e) { return e.reply([segment.image(`${PICTURE_RESOURCE}/Exchange picture/Season/九色鹿季.png`)]) }
}