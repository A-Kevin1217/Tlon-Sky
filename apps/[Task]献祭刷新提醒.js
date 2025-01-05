import common from "../../../lib/common/common.js";
import {
    getPushData,
    getPushTextData,
    storagePushData,
    getCronData
} from '../function/function.js';

const cronData = getCronData()

const regex = /^[#\/]?(开启|关闭)献祭刷新提醒$/
export class Ts extends plugin {
    constructor() {
        super({
            name: '[Ts]献祭刷新提醒',
            dsc: '献祭刷新提醒',
            event: 'message',
            priority: 1,
            rule: [
                { reg: regex, fnc: 'Ts' }
            ]
        })
        this.task = {
            name: '[定时推送]献祭刷新提醒',
            fnc: () => this.Push(),
            cron: cronData['献祭刷新'],
            log: false
        }
    }

    async Ts(e) {
        if (!e.isGroup || !e.member.is_admin && !e.isMaster) return false
        const ID = e.group_id
        const pushData = await getPushData()

        const [, openOrClose] = e.msg.match(regex)

        if (openOrClose === '开启') {
            pushData['献祭刷新'].push(ID)
        } else {
            pushData['献祭刷新'] = pushData['献祭刷新'].filter(a => a !== ID)
        }

        storagePushData(pushData)
        e.reply([`已[${openOrClose}]本群献祭刷新提醒`])
    }

    async Push() {
        const pushData = await getPushData()
        const textData = await getPushTextData()

        const { atAll, text, image } = textData['献祭刷新']

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

        for (const ID of pushData['献祭刷新']) {
            Bot.pickGroup(ID).sendMsg(message);
            common.sleep(1000)
        }
    }
}