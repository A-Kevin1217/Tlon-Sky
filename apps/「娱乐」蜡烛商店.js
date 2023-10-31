import plugin from '../../../lib/plugins/plugin.js'
import { render } from '../components/index.js'
import fs from 'fs'

export class 娱乐_蜡烛商店 extends plugin {
    constructor() {
        super({
            name: '娱乐_蜡烛商店',
            dsc: '娱乐',
            event: 'message',
            priority: 1,
            rule: [
                {
                    reg: /^#?蜡烛商店$/,
                    fnc: '蜡烛商店'
                },
                {
                    reg: /^#购买(.*)$/,
                    fnc: '购买'
                }
            ]
        })
    }

    async 蜡烛商店(e) {
        const 秋风商店 = 'plugins/Tlon-Sky/data/商店/秋风商店.json'
        if (!fs.existsSync(秋风商店)) {
            let 信息 = {}
            fs.writeFileSync(秋风商店, JSON.stringify(信息, null, 4))
            const _秋风商店Data = fs.readFileSync(秋风商店)
            const _秋风商店Json = JSON.parse(_秋风商店Data.toString())
            _秋风商店Json = {
                蜡烛保护卡: 0,
                签到双倍卡: 0
            }
            fs.writeFileSync(秋风商店, JSON.stringify(_秋风商店Json, null, 4))
            logger.mark(`已创建秋风商店信息`)
        }
        const 秋风商店Data = fs.readFileSync(秋风商店)
        const 秋风商店Json = JSON.parse(秋风商店Data.toString())
        let html = {
            蜡烛保护卡: 秋风商店Json['蜡烛保护卡'],
            签到双倍卡: 秋风商店Json['签到双倍卡']
        }
        await render('admin/蜡烛商店', {
            ...html
        }, {
            e,
            scale: 1.4
        })
    }

    async 购买(e) {
        const 购买物品 = e.msg.replace(/#|购买/g, "")
        const 用户ID = e.user_id
        const 用户背包文件 = `plugins/Tlon-Sky/data/背包/${用户ID}.json`
        const 用户文件 = `plugins/Tlon-Sky/data/Sky签到/${用户ID}.json`
        const 秋风商店 = 'plugins/Tlon-Sky/data/商店/秋风商店.json'
        if (!fs.existsSync(用户背包文件)) {
            let 背包信息 = {}
            fs.writeFileSync(用户背包文件, JSON.stringify(背包信息, null, 4))
            const _用户背包文件Data = fs.readFileSync(用户背包文件)
            const _用户背包文件Json = JSON.parse(_用户背包文件Data.toString())
            _用户背包文件Json[用户ID] = {
                蜡烛保护卡: 0,
                签到双倍卡: 0,
            }
            fs.writeFileSync(用户背包文件, JSON.stringify(_用户背包文件Json, null, 4))
            logger.mark(`\n已为用户${用户ID}\n创建背包信息`)
        }
        const 用户背包文件Data = await fs.promises.readFile(用户背包文件)
        const 用户背包文件Json = JSON.parse(用户背包文件Data.toString())
        const 用户文件Data = await fs.promises.readFile(用户文件)
        const 用户文件Json = JSON.parse(用户文件Data.toString())
        const 秋风商店Data = fs.readFileSync(秋风商店)
        const 秋风商店Json = JSON.parse(秋风商店Data.toString())
        if (购买物品 === '蜡烛保护卡') {
            if (用户文件Json[用户ID]['季蜡'] >= 10) {
                用户文件Json[用户ID]['季蜡'] -= 10
                用户背包文件Json[用户ID]['蜡烛保护卡'] += 1
                秋风商店Json['蜡烛保护卡'] += 1
                fs.writeFileSync(用户文件, JSON.stringify(用户文件Json, null, 4))
                fs.writeFileSync(秋风商店, JSON.stringify(秋风商店Json, null, 4))
                fs.writeFileSync(用户背包文件, JSON.stringify(用户背包文件Json, null, 4))
                return e.reply(`购买成功！消耗季蜡：10\n剩余季蜡：${用户文件Json[用户ID]['季蜡']} 根\n蜡烛保护卡：${用户背包文件Json[用户ID]['蜡烛保护卡']} 张`)
            } else {
                return e.reply('季蜡不足！')
            }
        } else if (购买物品 === '签到双倍卡') {
            if (用户文件Json[用户ID]['季蜡'] >= 30) {
                用户文件Json[用户ID]['季蜡'] -= 30
                用户背包文件Json[用户ID]['签到双倍卡'] += 1
                秋风商店Json['签到双倍卡'] += 1
                fs.writeFileSync(用户文件, JSON.stringify(用户文件Json, null, 4))
                fs.writeFileSync(秋风商店, JSON.stringify(秋风商店Json, null, 4))
                fs.writeFileSync(用户背包文件, JSON.stringify(用户背包文件Json, null, 4))
                return e.reply(`购买成功！消耗季蜡：30\n剩余季蜡：${用户文件Json[用户ID]['季蜡']} 根\n签到双倍卡：${用户背包文件Json[用户ID]['签到双倍卡']} 张`)
            } else {
                return e.reply('季蜡不足！')
            }
        } else {
            return e.reply('购买物品错误，商店无此物品')
        }
    }
}