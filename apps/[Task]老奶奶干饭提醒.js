import common from "../../../lib/common/common.js";
import {
    getPushData,
    getPushTextData,
    storagePushData,
    getCronData
} from '../function/function.js';

const cronData = getCronData()

const regex = /^[#\/]?(开启|关闭)老奶奶干饭提醒$/
export class Ts extends plugin {
    constructor() {
        super({
            name: '[Ts]老奶奶干饭提醒',
            dsc: '老奶奶干饭提醒',
            event: 'message',
            priority: 1,
            rule: [
                { reg: regex, fnc: 'Ts' }
            ]
        })
        this.task = {
            name: '[定时推送]老奶奶干饭提醒',
            fnc: () => this.Push(),
            cron: cronData['老奶奶干饭'],
            log: false
        }
    }

    async Ts(e) {
        if (!e.isGroup || !e.member.is_admin && !e.isMaster) return false
        const ID = e.group_id
        const pushData = await getPushData()

        const [, openOrClose] = e.msg.match(regex)

        if (openOrClose === '开启') {
            pushData['老奶奶干饭'].push(ID)
        } else {
            pushData['老奶奶干饭'] = pushData['老奶奶干饭'].filter(a => a !== ID)
        }

        storagePushData(pushData)
        e.reply([`已[${openOrClose}]本群老奶奶干饭提醒`])
    }

    async Push() {
        const pushData = await getPushData()
        const textData = await getPushTextData()

        const { atAll, text, image } = textData['老奶奶干饭']

        let message = []

        if (atAll) {
            message.push(segment.at('all'))
        }

        if (text) {
            message.push(text)
        }

        if (image) {
            message.push(segment.image(image))
        }

        for (const ID of pushData['老奶奶干饭']) {
            Bot.pickGroup(ID).sendMsg(message);
            common.sleep(1000)
        }
    }
}