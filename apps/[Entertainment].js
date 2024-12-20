import lodash from 'lodash';
import { IS_EXIST, STORAGE_JSON_DATA, GET_JSON_DATA } from '../model/Tools.js';

const filePaths = [
    'plugins/Tlon-Sky/data/RandomFriends.json',
    'plugins/Tlon-Sky/data/RandomFriendsCD.json'
];

if (!IS_EXIST(filePaths[0])) {
    STORAGE_JSON_DATA([filePaths[0], filePaths[1]], [[], {}]);
}

const REGEX_PATTERN = /^(#|\/)?存入盲盒(.*)\*(国|国际|测试)服$/i;

export class EntertainmentPlugin extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]娱乐',
            dsc: 'Tlon-Sky',
            event: 'message',
            priority: 1,
            rule: [
                { reg: /^(#|\/)?复刻预测$/, fnc: 'predictRecreation' },
                { reg: /^(#|\/)?(绘画|绘画分享|绘图分享)$/, fnc: 'shareDrawing' },
                { reg: REGEX_PATTERN, fnc: 'storeBlindBox' },
                { reg: /^(#|\/)?随机好友$/, fnc: 'getRandomFriend' }
            ]
        });
    }

    async predictRecreation(e) {
        const namePool = [
            '火先知', '水先知', '土先知', '风先知',
            '刁蛮浪者', '挑衅艺伎', '敬礼护卫', '舒展大师', '跳跃舞者', '拳礼武僧',
            '蟹语者', '击掌光农', '随性拓荒者', '肩背追光', '静光学者', '螺旋舞冠',
            '不舍家长', '彩纸表亲', '智慧长者', '蓬头青年', '火花家长', '踏舞孩童',
            '沉思编导', '致敬钢琴家', '抛球杂耍', '迎宾侍者', '旋转舞者', '献情演员',
            '冷漠术士', '蟹舞者', '瞌睡木匠', '情绪草药师', '赞许壁画家', '稻草人农夫',
            '放松日浴者', '鸣谢收藏家', '母语者', '固执登山者', '内秀书虫', '热血运动员',
            '偷窥邮差', '熊抱雪人', '回旋大师', '跳舞艺人',
            '正步冒险家', '傻笑童子军', '白日梦森林人', '管事小队长', '茫然植物学生', '胆小鬼学员',
            '呼风唤雨的统治者', '沾沾自喜的自恋狂', '萎靡不振的士兵', '星光收藏家', '被逼无奈的掌灯人', '打喷嚏的地理学家',
            '风行领航员', '风铃修补匠', '光之低语者', '天才建筑师',
            '退休将领', '嬉笑炮手', '焦虑渔夫', '笨拙水手',
            '老练音乐家', '健忘叙事者', '谦虚舞者', '忙碌舞台管理员',
            //'远古光辉上','远古光辉下','远古冥暗上','远古冥暗下',
            //'希望之种','爱之战士','细心矿工','奔离旅行者',
            //'负伤战士','丧子老兵','乞求孩童','嗫足沏茶师',
            //'活跃优等生','忧郁自艾者','古怪边缘人','翻滚捣蛋鬼',
        ];

        const firstRandomName = lodash.sample(namePool);
        const secondRandomName = lodash.sample(namePool.filter(name => name !== firstRandomName));

        e.reply([`以下是我猜的复刻\r[${firstRandomName}] | [${secondRandomName}]\r功能仅供娱乐`]);
    }

    async shareDrawing(e) {
        return e.reply([
            segment.at(e.user_id),
            segment.image(`${SKY_IMAGE_URL['A']}绘画分享/${lodash.random(0, 720)}.jpg`)
        ]);
    }

    async storeBlindBox(e) {
        const userId = e.user_id;
        const matchedContent = e.msg.match(REGEX_PATTERN);
        const code = matchedContent[2];
        const server = matchedContent[3];

        if (!/^[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}$/.test(code)) {
            return e.reply([
                '格式错误！请按照以下格式添加\n' +
                '存入盲盒[好友代码]*[服务器]\n' +
                '如：存入盲盒ABCD-EFGH-IJKL*国服'
            ]);
        }

        const randomFriendsData = await GET_JSON_DATA(filePaths[0]);
        randomFriendsData.push({ UID: userId, C: code, S: server });
        STORAGE_JSON_DATA(filePaths[0], randomFriendsData);

        return e.reply([
            segment.at(userId),
            '存入成功！' +
            `\n好友码: ${code}` +
            `\n服务器: ${server}服`
        ]);
    }

    async getRandomFriend(e) {
        const userId = e.user_id;
        const dailyData = await GET_JSON_DATA(filePaths[1]);
        const currentDate = new Date();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const today = `${month}-${day}`;

        if (dailyData[userId] === today) return e.reply('今日已获取过盲盒，请与明日再来');

        let randomFriendsData = await GET_JSON_DATA(filePaths[0]);
        if (randomFriendsData.length === 0) return e.reply(['盲盒库已无盲盒，请添加一些再来吧~']);
        const selectedFriendData = randomFriendsData[Math.floor(Math.random() * randomFriendsData.length)];

        randomFriendsData = randomFriendsData.filter(item => item !== selectedFriendData);
        dailyData[userId] = today;

        STORAGE_JSON_DATA([filePaths[0], filePaths[1]], [randomFriendsData, dailyData]);

        e.reply([
            '您的盲盒~' +
            `\n好友代码: ${selectedFriendData['C']}` +
            `\n服务器: ${selectedFriendData['S']}服`
        ]);
    }
}