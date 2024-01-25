import fetch from "node-fetch"

export class SERVER_STATUS extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:服务器状态',
      dsc: '光遇服务器状态',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^(#|\/)?(S|s)(K|k)(Y|y)(服务器)?状态$/,
          fnc: 'SERVER_STATUS'
        },
      ]
    })
  }
  async SERVER_STATUS(e) {
    try {
      const FETCH_DATA = await fetch('https://live-queue-sky-merge.game.163.com/queue?type=json')
      const JSON = await FETCH_DATA.json()
      const RET = JSON.ret
      const POS = JSON.pos
      const WAIT_TIME = JSON.wait_time
      if (RET === 0) {
        return e.reply('当前未排队')
      } else if (RET === 1) {
        return e.reply([segment.at(e.user_id), `当前排队中\n排队人数：${POS} 位\n等待时间：${WAIT_TIME} 秒`])
      }
    } catch (err) {
      return e.reply('查询失败，光遇服务器异常\n可能正在维护更新')
    }
  }
}