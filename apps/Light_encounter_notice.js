import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';
//消息风控处理来源小飞插件，未获得原作者许可 (别骂我
//侵权删除

export class wenan extends plugin {
    constructor () {
      super({
        name: '查询光遇公告',
        dsc: '最近光遇公告',
        event: 'message',
        priority: 5000,
        rule: [
          {
            reg: `^光遇公告$`,
            fnc: 'skygg'
          },
        ]
      })
    }

    async skygg(e) { 
      let url = `https://ma75.update.netease.com/game_notice/announcement_live.json`;
      let res = await fetch(url).catch((err) => logger.error(err))
      res = await res.json()
      await this.reply(`${res.Title}\n${res.OtherChannelMessage}`)
    }
    async accept() {
      let old_reply = this.e.reply;
      this.e.reply = async function (msgs, quote, data) {
        if (!msgs) return false;
        if (!Array.isArray(msgs)) msgs = [msgs];
        let result = await old_reply(msgs, quote, data);
        if (!result || !result.message_id) {
          let isxml = false;
          for (let msg of msgs) {
            if (msg && msg?.type == 'xml' && msg?.data) {
              msg.data = msg.data.replace(/^<\?xml.*version=.*?>/g, '<?xml version="1.0" encoding="utf-8" ?>');
              isxml = true;
            }
          }
          if (isxml) {
            result = await old_reply(msgs, quote, data);
          } else {
            let MsgList = [{
              message: msgs,
              nickname: Bot.nickname,
              user_id: Bot.uin
            }];
            let forwardMsg = await Bot.makeForwardMsg(MsgList);
            forwardMsg.data = forwardMsg.data
              .replace('<?xml version="1.0" encoding="utf-8"?>', '<?xml version="1.0" encoding="utf-8" ?>')
              .replace(/\n/g, '')
              .replace(/<title color="#777777" size="26">(.+?)<\/title>/g, '___')
              .replace(/___+/, '<title color="#777777" size="26">请点击查看内容</title>');
            msgs = forwardMsg;
            result = await old_reply(msgs, quote, data);
          }
          if (!result || !result.message_id) {
            logger.error('风控消息处理失败，请登录手机QQ查看是否可手动解除风控！');
          }
        }
        return result;
      }
    }
}
