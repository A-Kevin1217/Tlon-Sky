import fs from 'fs';

const PERMANENT_REGEX = /^(#|\/)?(晨岛|云野|雨林|峡谷|霞谷|暮土|禁阁)兑换图$/
const SEASON_REGEX = /^(#|\/)?(AURORA|表演|风行|感恩|归巢|归属|九色鹿|梦想|魔法|破晓|潜海|圣岛|拾光|小王子|夜行|音韵|预言|重组|追光|追忆|欧若拉|集结|凌冬)季兑换图$/
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
        }
      ]
    })
  }

  async PERMANENT_EXCHANGE_PICTURE(e) {
    const match = e.msg.match(PERMANENT_REGEX);
    const imgreply = `${PICTURE_RESOURCE}/Exchange picture/Permanent/${match[2]}.png`;
    if (!fs.existsSync(imgreply)) { return e.reply('无此常驻兑换图，请检查名称是否正确\n晨岛丨云野丨雨林丨霞谷丨暮土丨禁阁'); }
    return e.reply(segment.image(imgreply), true)
  }

  async SEASON_EXCHANGE_PICTURE(e) {
    const match = e.msg.match(SEASON_REGEX);
    let season = match[2];
    const seasonMapping = { '欧若拉': 'AURORA', '集结': '重组', '凌冬': '音韵' };
    if (seasonMapping.hasOwnProperty(season)) { season = seasonMapping[season]; }
    const imgreply = `${PICTURE_RESOURCE}/Exchange picture/Season/${season}季.png`;
    if (!fs.existsSync(imgreply)) { return e.reply('无此季节兑换图，请检查名称是否正确'); }
    return e.reply(segment.image(imgreply), true)
  }

  async RETURN_EXCHANGE_PICTURE(e) {
    e.reply('仅供参考,以正式上线为准', false, { recallMsg: 10 })
    return e.reply(segment.image('https://gitee.com/Tloml-Starry/Tlon-Sky-reprint/raw/master/image/Reprint.png'), true)
  }
}