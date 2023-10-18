import plugin from '../../../lib/plugins/plugin.js';
import fs from 'fs';

const DIR_PATH = "plugins/Tlon-Sky/data/id";
const FILE_NAME = `Sky ID.json`;

if (!fs.existsSync(DIR_PATH)) {
  fs.mkdirSync(DIR_PATH);
}

const jsonFilePath = `${DIR_PATH}/${FILE_NAME}`;
const json = fs.existsSync(jsonFilePath) ? JSON.parse(fs.readFileSync(jsonFilePath, "utf8")) : {};

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

  async 绑定光遇id(e) {
    const { msg, user_id: id } = e;
    const skyId = msg.replace(/#|绑定光遇id/g, "").trim();
    const data = {
      "skyId": skyId,
    }

    json[id] = data;
    fs.writeFileSync(jsonFilePath, JSON.stringify(json, null, "\t"));

    const replyMessage = json.hasOwnProperty(id) ? "重新绑定成功" : "绑定成功";
    await this.reply(replyMessage);
  }
}
