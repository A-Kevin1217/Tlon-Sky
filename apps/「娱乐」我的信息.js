import plugin from '../../../lib/plugins/plugin.js';
import { render } from '../components/index.js'
import lodash from 'lodash'
import fs from 'fs';

export class 我的信息 extends plugin {
    constructor() {
        super({
            name: '光遇_我的信息',
            dsc: '光遇',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^#?光遇信息$',
                    fnc: '光遇信息'
                }
            ]
        });
    }

    async 光遇信息(e) {
        const userId = e.user_id;
        const filePath = `plugins/Tlon-Sky/data/Sky签到/${userId}.json`;

        try {
            const userData = await fs.promises.readFile(filePath);
            const userJson = JSON.parse(userData.toString());

            const 昵称 = userJson[userId]['昵称']
            const 最后签到日期 = userJson[userId]['最后签到日期']
            const 连续签到天数 = userJson[userId]['连续签到天数']
            const 累计签到天数 = userJson[userId]['累计签到天数']
            const 白蜡数 = userJson[userId]['白蜡']
            const 季蜡数 = userJson[userId]['季蜡']
            const 能量值 = userJson[userId]['能量值']
            const 等级 = userJson[userId]['等级']

            const html昵称 = `昵称：${昵称}`
            const html等级 = `等级：${等级}`
            const html能量值 = `能量值：${能量值}/100`
            const html白蜡数 = `白蜡数：${白蜡数}`
            const html季蜡数 = `季蜡数：${季蜡数}`
            const html连续签到 = `连续签到：${连续签到天数}天`
            const html累计签到 = `累计签到：${累计签到天数}天`
            const html最后签到日期 = `最后签到日期：${最后签到日期}`
            let html = {
                昵称: html昵称,
                头像: `https://api.t1qq.com/api/tool/qq/qqtx?key=lHV6bOsaNrsNv2hmegRRVMxOUp&qq=${userId}`,
                等级: html等级,
                能量值: html能量值,
                白蜡数: html白蜡数,
                季蜡数: html季蜡数,
                连续签到: html连续签到,
                累计签到: html累计签到,
                最后签到日期: html最后签到日期
              }
              await render('admin/光遇信息', {
                ...html,
                bg: await rodom()
              }, {
                e,
                scale: 1.4
              })
        } catch (err) {
            logger.mark(err);
            e.reply('无法找到用户数据\n请先发送"光遇签到"');
        }
    }
}

const rodom = async function () {
    let image = fs.readdirSync('./plugins/Tlon-Sky/resource/admin/imgs/bg')
    let listImg = []
    for (let val of image) {
      listImg.push(val)
    }
    let imgs = listImg.length == 1 ? listImg[0] : listImg[lodash.random(0, listImg.length - 1)]
    return imgs
  }