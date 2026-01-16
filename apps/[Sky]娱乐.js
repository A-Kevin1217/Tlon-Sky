import lodash from 'lodash';
import { fileExists, storageData, readJsonData } from '../function/function.js';

const randomFriendsFilePaths = [
    'plugins/Tlon-Sky/data/RandomFriends.json',
    'plugins/Tlon-Sky/data/RandomFriendsCD.json'
];

if (!fileExists(randomFriendsFilePaths[0])) {
    storageData([randomFriendsFilePaths[0], randomFriendsFilePaths[1]], [[], {}]);
}

const blindBoxRegexPattern = /^[#\/]?存入盲盒(.*)\*(国|国际|测试)服$/i;

export class EntertainmentPlugin extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]娱乐',
            dsc: 'Tlon-Sky',
            event: 'message',
            priority: 1,
            rule: [
                { reg: /^[#\/]?(光遇)?(绘[画图]分享)$/, fnc: 'shareDrawing' },
                { reg: blindBoxRegexPattern, fnc: 'storeBlindBox' },
                { reg: /^[#\/]?随机好友(盲盒)?$/, fnc: 'getRandomFriend' }
            ]
        });
    }

    async shareDrawing(e) {
        return e.reply([
            segment.image(`${SKY_IMAGE_URL['A']}绘画分享/${lodash.random(0, 720)}.jpg`)
        ]);
    }

    async storeBlindBox(e) {
        if (e.isGroup) return e.reply('请私聊添加盲盒');
        const { user_id: userId, msg } = e;
        const matchedContent = msg.match(blindBoxRegexPattern);
        const [ , code, server ] = matchedContent;

        if (!/^[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}$/.test(code)) {
            return e.reply([
                '格式错误！请按照以下格式添加\n' +
                '存入盲盒[好友代码]*[服务器]\n' +
                '如：存入盲盒ABCD-EFGH-IJKL*国服'
            ]);
        }

        const randomFriendsData = await readJsonData(randomFriendsFilePaths[0]);
        randomFriendsData.push({ UID: userId, C: code, S: server });
        storageData(randomFriendsFilePaths[0], randomFriendsData);

        return e.reply([
            segment.at(userId),
            '存入成功！' +
            `\n好友码: ${code}` +
            `\n服务器: ${server}服`
        ]);
    }

    async getRandomFriend(e) {
        const { user_id: userId } = e;
        const dailyData = await readJsonData(randomFriendsFilePaths[1]);
        const today = new Date().toISOString().slice(5, 10);

        if (dailyData[userId] === today) return e.reply('今日已获取过盲盒，请与明日再来');

        let randomFriendsData = await readJsonData(randomFriendsFilePaths[0]);
        if (!randomFriendsData.length) return e.reply(['盲盒库已无盲盒，请添加一些再来吧~']);
        const selectedFriendData = lodash.sample(randomFriendsData);

        randomFriendsData = randomFriendsData.filter(item => item !== selectedFriendData);
        dailyData[userId] = today;

        storageData([randomFriendsFilePaths[0], randomFriendsFilePaths[1]], [randomFriendsData, dailyData]);

        e.reply([
            '您的盲盒~' +
            `\n好友代码: ${selectedFriendData['C']}` +
            `\n服务器: ${selectedFriendData['S']}服`
        ]);
    }
}