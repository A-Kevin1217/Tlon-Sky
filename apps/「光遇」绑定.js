import plugin from '../../../lib/plugins/plugin.js';
import fs from 'fs'

const dirpath = "plugins/Tlon-Sky/data/id"
let filename = `Sky ID.json`
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
}
