import common from '../../../lib/common/common.js';
import {
    getPushData,
    getPushTextData,
    storagePushData,
    getCronData
} from '../function/function.js';

const cronData = getCronData();
const PUSH_REGEX = /^[#\/]?(开启|关闭)每日任务推送$/;

export class TaskPushPlugin extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]每日任务推送',
            dsc: '每日任务推送',
            event: 'message',
            priority: 1,
            rule: [
                { reg: PUSH_REGEX, fnc: 'togglePush' }
            ]
        });

        this.task = {
            name: '[定时推送]每日任务推送',
            fnc: () => this.push(),
            cron: cronData['每日任务'],
            log: false
        };
    }

    async togglePush(e) {
        if (!e.isGroup || (!e.member.is_admin && !e.isMaster)) {
            return false;
        }

        const groupId = e.group_id;
        const pushData = await getPushData();
        const [, action] = e.msg.match(PUSH_REGEX);

        if (action === '开启') {
            pushData['每日任务'].push(groupId);
        } else {
            pushData['每日任务'] = pushData['每日任务'].filter(id => id !== groupId);
        }

        storagePushData(pushData);
        return e.reply(`已[${action}]本群每日任务推送`);
    }

    async push() {
        const pushData = await getPushData();
        const textData = await getPushTextData();
        const { atAll, text, image } = textData['每日任务'];

        const message = [];
        if (atAll) message.push(segment.at('all'));
        if (text) message.push(text);
        if (image) message.push(segment.image(image));

        for (const groupId of pushData['每日任务']) {
            Bot.pickGroup(groupId).sendMsg(message);
            await common.sleep(1000);
        }
    }
}