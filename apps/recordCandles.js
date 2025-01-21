import { fileExists } from '../function/function.js'
import fs from 'fs'

if (!fileExists('plugins/Tlon-Sky/data/recordCandles')) fs.mkdirSync('plugins/Tlon-Sky/data/recordCandles', { recursive: true })

export class SKY extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]记录蜡烛',
            dsc: '记录蜡烛',
            event: 'message',
            priority: 1,
            rule: [
                { reg: /^[#\/]?记录蜡烛(\d+):(\d+):(\d+):(\d+)$/, fnc: 'handleRecordCandles' },
                { reg: /^[#\/]?添加蜡烛ID\s*(.+)$/, fnc: 'addCandleId' },
                { reg: /^[#\/]?切换蜡烛ID\s*(.+)$/, fnc: 'switchCandleId' },
                { reg: /^[#\/]?删除蜡烛ID\s*(.+)$/, fnc: 'deleteCandleId' },
                { reg: /^[#\/]?蜡烛记录$/, fnc: 'showCandleHistory' },
                { reg: /^[#\/]?蜡烛ID列表$/, fnc: 'listCandleIds' }
            ]
        })
    }

    getUserDataFile(user_id) {
        return `plugins/Tlon-Sky/data/recordCandles/${user_id}.json`
    }

    getUserData(user_id) {
        const file = this.getUserDataFile(user_id)
        if (!fileExists(file)) {
            const initialData = {
                ID: user_id,
                data: {
                    ids: ['默认ID'],
                    currentId: '默认ID',
                    count: 0,
                    data: {}
                }
            }
            fs.writeFileSync(file, JSON.stringify(initialData, null, 2))
            return initialData
        }
        return JSON.parse(fs.readFileSync(file, 'utf8'))
    }

    saveUserData(user_id, userData) {
        const file = this.getUserDataFile(user_id)
        fs.writeFileSync(file, JSON.stringify(userData, null, 2))
    }

    async addCandleId(e) {
        const { user_id } = e
        const newId = e.msg.match(/^[#\/]?添加蜡烛ID\s*(.+)$/)[1].trim()

        let userData = this.getUserData(user_id)

        if (userData.data.ids.includes(newId)) {
            await e.reply(`ID "${newId}" 已存在！`)
            return true
        }

        userData.data.ids.push(newId)
        userData.data.data[newId] = []
        this.saveUserData(user_id, userData)

        await e.reply(`成功添加ID "${newId}"`)
        return true
    }

    async switchCandleId(e) {
        const { user_id } = e
        const targetId = e.msg.match(/^[#\/]?切换蜡烛ID\s*(.+)$/)[1].trim()

        let userData = this.getUserData(user_id)

        if (!userData.data.ids.includes(targetId)) {
            await e.reply(`ID "${targetId}" 不存在！请先添加该ID。`)
            return true
        }

        userData.data.currentId = targetId
        this.saveUserData(user_id, userData)

        await e.reply(`已切换到ID "${targetId}"`)
        return true
    }

    async deleteCandleId(e) {
        const { user_id } = e
        const targetId = e.msg.match(/^[#\/]?删除蜡烛ID\s*(.+)$/)[1].trim()

        let userData = this.getUserData(user_id)

        if (targetId === '默认ID') {
            await e.reply('默认ID不能删除！')
            return true
        }

        if (!userData.data.ids.includes(targetId)) {
            await e.reply(`ID "${targetId}" 不存在！`)
            return true
        }

        if (userData.data.currentId === targetId) {
            userData.data.currentId = '默认ID'
        }

        userData.data.ids = userData.data.ids.filter(id => id !== targetId)
        delete userData.data.data[targetId]
        this.saveUserData(user_id, userData)

        await e.reply(`已删除ID "${targetId}"${userData.data.currentId === '默认ID' ? '\n已切换到默认ID' : ''}`)
        return true
    }

    async showCandleHistory(e) {
        const { user_id } = e
        let userData = this.getUserData(user_id)
        const currentId = userData.data.currentId
        const records = userData.data.data[currentId] || []

        if (records.length === 0) {
            await e.reply(`当前ID "${currentId}" 暂无记录`)
            return true
        }

        const recentRecords = records.slice(-5)
        let reply = `当前ID: ${currentId}\n最近${recentRecords.length}条记录：\n`

        recentRecords.forEach((record, index) => {
            const prevRecord = index > 0 ? recentRecords[index - 1] : null

            reply += `\n${record.date}:`
            reply += `\n白蜡: ${record.candles.white}`
            reply += `\n季蜡: ${record.candles.season}`
            reply += `\n爱心: ${record.candles.heart}`
            reply += `\n红蜡: ${record.candles.red}`

            if (prevRecord) {
                const changes = {
                    white: record.candles.white - prevRecord.candles.white,
                    season: record.candles.season - prevRecord.candles.season,
                    heart: record.candles.heart - prevRecord.candles.heart,
                    red: record.candles.red - prevRecord.candles.red
                }

                reply += '\n变化:'
                reply += `\n白蜡: ${changes.white >= 0 ? '+' : ''}${changes.white}`
                reply += `\n季蜡: ${changes.season >= 0 ? '+' : ''}${changes.season}`
                reply += `\n爱心: ${changes.heart >= 0 ? '+' : ''}${changes.heart}`
                reply += `\n红蜡: ${changes.red >= 0 ? '+' : ''}${changes.red}`
            }
            reply += '\n'
        })

        await e.reply(reply)
        return true
    }

    async listCandleIds(e) {
        const { user_id } = e
        let userData = this.getUserData(user_id)

        let reply = '蜡烛ID列表：\n'
        userData.data.ids.forEach(id => {
            reply += `${id}${id === userData.data.currentId ? ' (当前)' : ''}\n`
        })

        await e.reply(reply)
        return true
    }

    async handleRecordCandles(e) {
        const { user_id, msg } = e
        const [, white, season, heart, red] = msg.match(/^[#\/]?记录蜡烛(\d+):(\d+):(\d+):(\d+)$/)

        const candles = {
            white: parseInt(white),
            season: parseInt(season),
            heart: parseInt(heart),
            red: parseInt(red)
        }

        let userData = this.getUserData(user_id)
        const currentId = userData.data.currentId
        const currentDate = new Date().toISOString().split('T')[0]

        let lastRecord = null
        let daysPassed = 0
        let changes = {
            white: 0,
            season: 0,
            heart: 0,
            red: 0
        }

        if (userData.data.data[currentId]) {
            const records = userData.data.data[currentId]
            lastRecord = records[records.length - 1]

            if (lastRecord) {
                const lastDate = new Date(lastRecord.date)
                const currentDateTime = new Date(currentDate)
                daysPassed = Math.floor((currentDateTime - lastDate) / (1000 * 60 * 60 * 24))

                changes.white = candles.white - lastRecord.candles.white
                changes.season = candles.season - lastRecord.candles.season
                changes.heart = candles.heart - lastRecord.candles.heart
                changes.red = candles.red - lastRecord.candles.red
            }
        }

        if (!userData.data.data[currentId]) {
            userData.data.data[currentId] = []
        }

        userData.data.data[currentId].push({
            date: currentDate,
            candles: {
                white: candles.white,
                season: candles.season,
                heart: candles.heart,
                red: candles.red
            }
        })

        this.saveUserData(user_id, userData)

        let reply = `记录成功！\n当前ID：${currentId}\n`
        reply += `白蜡：${candles.white}\n`
        reply += `季蜡：${candles.season}\n`
        reply += `爱心：${candles.heart}\n`
        reply += `红蜡：${candles.red}`

        if (lastRecord) {
            reply += `\n\n距离上次记录：${daysPassed}天`
            reply += '\n蜡烛变化：'
            reply += `\n白蜡：${changes.white >= 0 ? '+' : ''}${changes.white}`
            reply += `\n季蜡：${changes.season >= 0 ? '+' : ''}${changes.season}`
            reply += `\n爱心：${changes.heart >= 0 ? '+' : ''}${changes.heart}`
            reply += `\n红蜡：${changes.red >= 0 ? '+' : ''}${changes.red}`
        }

        await e.reply(reply)
        return true
    }
}