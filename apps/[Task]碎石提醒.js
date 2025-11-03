import common from "../../../lib/common/common.js";
import {
    getPushData,
    getPushTextData,
    storagePushData,
    getCronData
} from '../function/function.js';

const cronData = getCronData();

const regex = /^[#\/]?(开启|关闭)碎石提醒$/;

export class StoneReminderPlugin extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]碎石提醒',
            dsc: '碎石提醒',
            event: 'message',
            priority: 1,
            rule: [
                { reg: regex, fnc: 'togglePush' }
            ]
        });

        this.task = [
            {
                name: '[定时推送]碎石提醒',
                fnc: () => this.push(),
                cron: cronData['碎石提醒'],
                log: false
            },
            {
                name: '[定时推送]碎石坠落前提醒',
                fnc: () => this.pushBeforeFall(),
                cron: cronData['碎石坠落前提醒'],
                log: false
            }
        ];
    }

    async togglePush(e) {
        if (!e.isGroup || (!e.member.is_admin && !e.isMaster)) {
            return false;
        }

        const groupId = e.group_id;
        const pushData = await getPushData();
        const [, action] = e.msg.match(regex);

        if (action === '开启') {
            pushData['碎石提醒'].push(groupId);
        } else {
            pushData['碎石提醒'] = pushData['碎石提醒'].filter(id => id !== groupId);
        }

        storagePushData(pushData);
        return e.reply(`已[${action}]本群碎石提醒`);
    }

    
    hasStone(date = new Date()) {
        const day = date.getDay();
        const dateNum = date.getDate();

        
        
        if (dateNum <= 15) {
            return [2, 6, 0].includes(day);
        } else {
            return [3, 5, 0].includes(day);
        }
    }

    
    getStoneType(date = new Date()) {
        const day = date.getDay();
        const dateNum = date.getDate();

        if (dateNum <= 15) {
            return day === 2 ? '黑石' : '红石';
        } else {
            return day === 3 ? '黑石' : '红石';
        }
    }

    
    getMap(date = new Date()) {
        const maps = ['暮土', '禁阁', '云野', '雨林', '霞谷'];
        const mapIndex = (date.getDate() - 1) % maps.length;
        return maps[mapIndex];
    }

    
    getLocation(map, dayOfWeek) {
        const locations = {
            '云野': { 2: '蝴蝶平原', 3: '仙乡', 5: '云顶浮石', 6: '幽光山洞', 0: '圣岛' },
            '雨林': { 2: '荧光森林', 3: '密林遗迹', 5: '大树屋', 6: '雨林神殿', 0: '秘密花园' },
            '霞谷': { 2: '滑冰场', 3: '滑冰场', 5: '圆梦村', 6: '圆梦村', 0: '雪隐峰' },
            '暮土': { 2: '边陲荒漠', 3: '远古战场', 5: '黑水港湾', 6: '巨兽荒原', 0: '失落方舟' },
            '禁阁': { 2: '星光沙漠', 3: '星光沙漠', 5: '星光沙漠·一隅', 6: '星光沙漠·一隅', 0: '星光沙漠·一隅' },
        };
        return locations[map]?.[dayOfWeek] || '';
    }

    
    getFallTimes(date = new Date()) {
        const dayOfWeek = date.getDay();

        
        if (dayOfWeek === 0) {
            return ['07:08', '13:08', '19:08'];
        }

        const stoneType = this.getStoneType(date);
        const dateNum = date.getDate();

        if (dateNum <= 15) {
            return stoneType === '红石' ? ['10:08', '14:08', '22:08'] : ['09:08', '14:08', '19:08'];
        } else {
            return stoneType === '红石' ? ['11:08', '17:08', '23:08'] : ['09:08', '15:08', '21:08'];
        }
    }

    async push() {
        const pushData = await getPushData();
        const textData = await getPushTextData();

        
        const today = new Date();
        if (!this.hasStone(today)) {
            return; 
        }

        const stoneType = this.getStoneType(today);
        const map = this.getMap(today);
        const location = this.getLocation(map, today.getDay());
        const fallTimes = this.getFallTimes(today);

        
        const text = `✨ 碎石提醒 ✨\n\n` +
            `类型：${stoneType}\n` +
            `地图：${map}\n` +
            `位置：${location}\n` +
            `坠落时间：${fallTimes.join(', ')}\n\n` +
            `记得去收集哦~` +
            '实时查看碎石信息可发送「今日碎石」或「本月碎石」\n' +
            '查询指定月份的碎石可发送「2026年5月碎石」更改日期即可指定月份';

        const message = [text];

        for (const groupId of pushData['碎石提醒']) {
            Bot.pickGroup(groupId).sendMsg(message);
            await common.sleep(1000);
        }
    }

    
    async pushBeforeFall() {
        const pushData = await getPushData();

        
        const today = new Date();
        if (!this.hasStone(today)) {
            return; 
        }

        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const fallTimes = this.getFallTimes(today);

        
        let shouldRemind = false;
        let nextFallTime = '';

        for (const fallTime of fallTimes) {
            const fallHour = parseInt(fallTime.split(':')[0]);
            const fallMin = parseInt(fallTime.split(':')[1]);
            const currentHour = now.getHours();
            const currentMin = now.getMinutes();

            
            let reminderHour = fallHour;
            let reminderMin = fallMin - 10;

            
            if (reminderMin < 0) {
                reminderHour -= 1;
                reminderMin += 60;
            }

            
            if (reminderHour < 0) {
                reminderHour += 24;
            }

            
            if (currentHour === reminderHour && currentMin === reminderMin) {
                shouldRemind = true;
                nextFallTime = fallTime;
                break;
            }
        }

        if (!shouldRemind) {
            return; 
        }

        const stoneType = this.getStoneType(today);
        const map = this.getMap(today);
        const location = this.getLocation(map, today.getDay());

        
        const text = `⏰ 碎石坠落提醒 ⏰\n\n` +
            `还有10分钟就开始啦！\n\n` +
            `类型：${stoneType}\n` +
            `地图：${map}\n` +
            `位置：${location}\n` +
            `坠落时间：${nextFallTime}\n\n` +
            `赶快前往准备吧！\n` +
            '实时查看碎石信息可发送「今日碎石」或「本月碎石」\n' +
            '查询指定月份的碎石可发送「2026年5月碎石」更改日期即可指定月份';

        const message = [text];

        for (const groupId of pushData['碎石提醒']) {
            Bot.pickGroup(groupId).sendMsg(message);
            await common.sleep(1000);
        }
    }
}
