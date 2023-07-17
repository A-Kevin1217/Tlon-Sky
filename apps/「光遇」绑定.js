import plugin from '../../../lib/plugins/plugin.js';
import fs from 'fs'

const dirpath = "plugins/Tlon-Sky/data/id"
let filename = `Sky ID.json`
let 身高ID = 'Sky UID.json'
if (!fs.existsSync(dirpath)) {
  fs.mkdirSync(dirpath);
}
if (!fs.existsSync(dirpath + "/" + filename)) {
  fs.writeFileSync(dirpath + "/" + filename, JSON.stringify({
  }))
}
export class 光遇_绑定 extends plugin {
  constructor() {
    super({
      name: '光遇_绑定',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^#?绑定光遇id(.*)$/,
          fnc: '绑定光遇id'
        },{
          reg: /^#?绑定身高id(.*)$/,
          fnc: '绑定身高id'
        }
      ]
    });
  }

  async 绑定光遇id(e){
    let msg = e.msg;
    let Sky_id = msg.replace(/#|绑定光遇id/g, "").trim();
    let data = {
      "Sky_id": Sky_id,
    }
    const id = e.user_id
    let json = JSON.parse(fs.readFileSync(dirpath + "/" + filename, "utf8"));
    if(!json.hasOwnProperty(id)) {
      json[id] = data
      fs.writeFileSync(dirpath + "/" + filename, JSON.stringify(json, null, "\t"));
      await this.reply("绑定成功")
    }
    else{
      json[id] = data
      fs.writeFileSync(dirpath + "/" + filename, JSON.stringify(json, null, "\t"));
      await this.reply("重新绑定成功")
    }
  }

  async 绑定身高id(e) {
    const msg = e.msg;
    const Sky_Uid = msg.replace(/#|绑定身高id/g, "").trim();
    const data = {
      Sky_Uid
    }
    const qq = e.user_id;
    const json = JSON.parse(fs.readFileSync(dirpath + "/" + 身高ID, "utf8"));
    json[qq] = data;
    fs.writeFileSync(dirpath + "/" + 身高ID, JSON.stringify(json, null, "\t"));
    const 消息 = json.hasOwnProperty(qq) ? "重新绑定成功" : "绑定成功\n您可使用'#身高查询'查询身高";
    await this.reply(消息);
  }
}
