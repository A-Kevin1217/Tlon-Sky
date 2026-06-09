import { fileExists } from '../function/function.js'
import { Button } from '../index.js'
import fs from 'fs'
import { render } from './../components/index.js'

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
                { reg: /^[#\/]?蜡烛ID列表$/, fnc: 'listCandleIds' },
                { reg: /^[#\/]?蜡烛记录帮助$/, fnc: 'showHelp' }
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

        const recentRecords = records.slice(-10) 
        const processedRecords = []

        recentRecords.forEach((record, index) => {
            const prevRecord = index > 0 ? recentRecords[index - 1] : null
            let changes = null
            let timeInterval = ''

            if (prevRecord) {
                changes = {
                    white: record.candles.white - prevRecord.candles.white,
                    season: record.candles.season - prevRecord.candles.season,
                    heart: record.candles.heart - prevRecord.candles.heart,
                    red: record.candles.red - prevRecord.candles.red
                }

                
                let currentRecordTimestamp
                if (record.timestamp) {
                    currentRecordTimestamp = record.timestamp
                } else {
                    currentRecordTimestamp = new Date(record.date + 'T00:00:00').getTime()
                }
                
                let prevRecordTimestamp
                if (prevRecord.timestamp) {
                    prevRecordTimestamp = prevRecord.timestamp
                } else {
                    prevRecordTimestamp = new Date(prevRecord.date + 'T00:00:00').getTime()
                }
                
                const timeDiff = currentRecordTimestamp - prevRecordTimestamp
                const totalSeconds = Math.floor(timeDiff / 1000)
                const days = Math.floor(totalSeconds / (24 * 60 * 60))
                const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60))
                const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
                const seconds = totalSeconds % 60

                if (days > 0) {
                    timeInterval = `${days}天${hours}小时${minutes}分钟`
                } else if (hours > 0) {
                    timeInterval = `${hours}小时${minutes}分钟${seconds}秒`
                } else if (minutes > 0) {
                    timeInterval = `${minutes}分钟${seconds}秒`
                } else {
                    timeInterval = `${seconds}秒`
                }
            }

            processedRecords.push({
                date: record.date,
                timestamp: record.timestamp,
                candles: record.candles,
                changes: changes,
                timeInterval: timeInterval
            })
        })

        const renderData = {
            currentId: currentId,
            records: processedRecords.reverse() 
        }

        return render('admin/candleHistory', {
            data: JSON.stringify(renderData)
        }, { e, scale: 1.2 }, null, new Button(e).candleRecord());
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
        const currentDateTime = new Date()
        const currentDate = currentDateTime.toISOString().split('T')[0] 
        const currentDateTimeString = currentDateTime.toISOString().replace('T', ' ').split('.')[0] 
        const currentTimestamp = currentDateTime.getTime()

        let lastRecord = null
        let daysPassed = 0
        let timeInterval = null
        let lastRecordTime = null
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
                
                let lastTimestamp
                if (lastRecord.timestamp) {
                    
                    lastTimestamp = lastRecord.timestamp
                } else {
                    
                    lastTimestamp = new Date(lastRecord.date + 'T00:00:00').getTime()
                }
                const timeDiff = currentTimestamp - lastTimestamp
                
                daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
                
                
                const totalSeconds = Math.floor(timeDiff / 1000)
                const days = Math.floor(totalSeconds / (24 * 60 * 60))
                const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60))
                const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
                const seconds = totalSeconds % 60
                
                timeInterval = {
                    days,
                    hours,
                    minutes,
                    seconds,
                    totalSeconds
                }

                
                if (lastRecord.timestamp) {
                    const lastRecordDate = new Date(lastRecord.timestamp)
                    lastRecordTime = lastRecordDate.toLocaleString('zh-CN', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    })
                } else {
                    
                    lastRecordTime = lastRecord.date
                }

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
            date: currentDateTimeString, 
            timestamp: currentTimestamp,
            candles: {
                white: candles.white,
                season: candles.season,
                heart: candles.heart,
                red: candles.red
            }
        })

        this.saveUserData(user_id, userData)

        const hasChanges = lastRecord !== null
        
        const whiteChange = changes.white >= 0 ? `+${changes.white}` : changes.white.toString()
        const seasonChange = changes.season >= 0 ? `+${changes.season}` : changes.season.toString()
        const heartChange = changes.heart >= 0 ? `+${changes.heart}` : changes.heart.toString()
        const redChange = changes.red >= 0 ? `+${changes.red}` : changes.red.toString()
        
        const whiteChangeClass = changes.white >= 0 ? 'positive' : 'negative'
        const seasonChangeClass = changes.season >= 0 ? 'positive' : 'negative'
        const heartChangeClass = changes.heart >= 0 ? 'positive' : 'negative'
        const redChangeClass = changes.red >= 0 ? 'positive' : 'negative'

        const renderData = {
            currentId,
            white: candles.white,
            season: candles.season,
            heart: candles.heart,
            red: candles.red,
            hasChanges,
            daysPassed,
            timeInterval,
            lastRecordTime,
            whiteChange: hasChanges ? whiteChange : '',
            seasonChange: hasChanges ? seasonChange : '',
            heartChange: hasChanges ? heartChange : '',
            redChange: hasChanges ? redChange : '',
            whiteChangeClass: hasChanges ? whiteChangeClass : '',
            seasonChangeClass: hasChanges ? seasonChangeClass : '',
            heartChangeClass: hasChanges ? heartChangeClass : '',
            redChangeClass: hasChanges ? redChangeClass : ''
        }
        
        return render('admin/candleRecord', {
            data: JSON.stringify(renderData)
        }, { e, scale: 1.5 }, null, new Button(e).candleRecord());
    }

    async showHelp(e) {
        const helpText = `━蜡烛记录功能使用说明━

【功能】
记录蜡烛数据，支持多账号，自动计算变化量

【主要命令】
• 记录： #记录蜡烛<白蜡>:<季蜡>:<爱心>:<红蜡>
  例： #记录蜡烛100:50:20:10

• 查看记录： #蜡烛记录

• 多账号管理：
  #添加蜡烛ID <名称> - 添加新ID
  #切换蜡烛ID <名称> - 切换当前ID
  #蜡烛ID列表 - 查看所有ID
  #删除蜡烛ID <名称> - 删除ID

【使用示例】
#记录蜡烛100:50:20:10
（系统会自动显示距离上次记录天数及变化量）`;

        await e.reply([helpText, new Button(e).candleRecord()])
        return true
    }
}