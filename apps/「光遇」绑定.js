import plugin from '../../../lib/plugins/plugin.js';
import fs from 'fs'

const dirpath = "plugins/Tlon-Sky/data/id"
var filename = `Sky ID.json`
if (!fs.existsSync(dirpath)) {//如果文件夹不存在
  fs.mkdirSync(dirpath);//创建文件夹
}
if (!fs.existsSync(dirpath + "/" + filename)) {//文件不存在
  fs.writeFileSync(dirpath + "/" + filename, JSON.stringify({//创建文件
  }))
}
export class wenan extends plugin {
  constructor() {
    super({
      name: '光遇_绑定',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^#?绑定光遇id(.*)$/,
          fnc: 'sky_bdid'
        },{
          reg: /^#?查询光遇id$/,
          fnc: 'sky_cxid'
        }
      ]
    });
  }

  async sky_bdid(e){
    let msg = e.msg;
    var Sky_id = msg.replace(/#|绑定光遇id/g, "").trim();
    var data = {
      "Sky_id": Sky_id,
    }
    const id = e.user_id
    var json = JSON.parse(fs.readFileSync(dirpath + "/" + filename, "utf8"));//读取文件
    if(!json.hasOwnProperty(id)) {//如果json中不存在该用户
      json[id] = data
      fs.writeFileSync(dirpath + "/" + filename, JSON.stringify(json, null, "\t"));//写入文件
      await this.reply("绑定成功")
    }
    else{
      json[id] = data
      fs.writeFileSync(dirpath + "/" + filename, JSON.stringify(json, null, "\t"));//写入文件
      await this.reply("重新绑定成功")
    }
  }

  async sky_cxid(e){
    var json = JSON.parse(fs.readFileSync(dirpath + "/" + filename, "utf8"));//读取文件
    var id = e.user_id
    let num
    if(json.hasOwnProperty(id)) {//如果json中存在该用户
      num = `您的id为：\n${JSON.stringify(json[id].Sky_id).slice(1, -1)}`
    }
    else{
      num = "您还未绑定id"
    }
    await this.reply(num)
  }
}
