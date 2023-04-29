import plugin from '../../../lib/plugins/plugin.js'

export class 光遇_往期复刻 extends plugin {
  constructor () {
    super({
      name: '光遇_往期复刻',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^#?(2020|20)年复刻记录$/,
          fnc: 'sky_20FK'
        },{
          reg: /^#?(2021|21)年复刻记录$/,
          fnc: 'sky_21FK'
        },{
          reg: /^#?(2022|22)年复刻记录$/,
          fnc: 'sky_22FK'
        },{
          reg: /^#?(2023|23)年复刻记录$/,
          fnc: 'sky_23FK'
        }
      ]
    })
  }
  async sky_20FK(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/复刻记录/2020年光遇复刻记录.png';
    let msg = [
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ]
    e.reply( msg )
    return true;
  }
  async sky_21FK(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/复刻记录/2021年光遇复刻记录.png'
    let msg = [
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ]
    e.reply( msg )
    return true;
  }
  async sky_22FK(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/复刻记录/2022年光遇复刻记录.png'
    let msg = [
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
    ]
    e.reply( msg )
    return true;
  }
  async sky_23FK(e) {
    const imgreply = 'plugins/Tlon-Sky/resource/复刻记录/2023年光遇复刻记录.png'
    let msg = [
      segment.at(this.e.user_id),
      imgreply ? segment.image(imgreply) : "",
      `未更新属正常现象(懒`
    ]
    e.reply( msg )
    return true;
  }
}