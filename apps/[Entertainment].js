import lodash from 'lodash';
import { IS_EXIST, STORAGE_JSON_DATA, GET_JSON_DATA } from '../model/Tools.js'
const FILE = [
    'plugins/Tlon-Sky/data/Random friends.json',
    'plugins/Tlon-Sky/data/Random friends CD.json'
]
if (!IS_EXIST(FILE[0])) { STORAGE_JSON_DATA([FILE[0], FILE[1]], [[], {}]) }

const REGEX = /^(#|\/)?存入盲盒(.*)\*(国|国际|测试)服$/i

export class SKY extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]娱乐',
            dsc: 'Tlon-Sky',
            event: 'message',
            priority: 1,
            rule: [
                { reg: /^(#|\/)?复刻预测$/, fnc: 'F1' },
                { reg: /^(#|\/)?(绘画|绘画分享|绘图分享)$/, fnc: 'F2' },
                { reg: REGEX, fnc: 'F3' },
                { reg: /^(#|\/)?随机好友$/, fnc: 'F4' }
            ]
        })
    }

    async F1(e) {
        let name = [
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
            //'退休将领','嬉笑炮手','焦虑渔夫','笨拙水手',
            //'老练音乐家','健忘叙事者','谦虚舞者','忙碌舞台管理员',
            //'远古光辉上','远古光辉下','远古冥暗上','远古冥暗下',
            //'希望之种','爱之战士','细心矿工','奔离旅行者',
            //'负伤战士','丧子老兵','乞求孩童','嗫足沏茶师',
            //'活跃优等生','忧郁自艾者','古怪边缘人','翻滚捣蛋鬼',
        ]

        const RANDOM_NUMBER_1 = Math.ceil(Math.random() * name.length - 1)
        name.splice(RANDOM_NUMBER_1, 1)

        e.reply([`[${name[RANDOM_NUMBER_1]}] || [${name[Math.ceil(Math.random() * name.length - 1)]}]`])
    }

    async F2(e) {
        return e.reply([
            segment.at(e.user_id),
            segment.image(`${SKY_IMAGE_URL['A']}绘画分享/${lodash.random(0, 720)}.jpg`)
        ])
    }

    async F3(e) {
        const UID = e.user_id
        const GET_CONTENT = e.msg.match(REGEX)
        const CODE = GET_CONTENT[2]
        const SERVER = GET_CONTENT[3]

        if (!/^[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}$/.test(CODE)) {
            return e.reply([
                '格式错误！请按照以下格式添加\n' +
                '存入盲盒[好友代码]*[服务器]\n' +
                '如：存入盲盒ABCD-EFGH-IJKL*国服'
            ])
        }

        const RFD = await await GET_JSON_DATA(FILE[0])
        RFD.push({ UID: UID, C: CODE, S: SERVER })
        STORAGE_JSON_DATA(FILE[0], RFD)

        return e.reply([
            segment.at(UID),
            '存入成功！' +
            `\n好友码: ${CODE}` +
            `\n服务器: ${SERVER}服`
        ])
    }

    async F4(e) {
        const UID = e.user_id
        const CDD = await GET_JSON_DATA(FILE[1])
        const date = new Date();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const Today = `${month}-${day}`

        if (CDD[UID] === Today) return e.reply('今日已获取过盲盒，请与明日再来')

        let RFD = await GET_JSON_DATA(FILE[0])
        if (RFD.length === 0) return e.reply(['盲盒库已无盲盒，请添加一些再来吧~'])
        const RANDOM_FRIENDS_DATA = RFD[Math.floor(Math.random() * RFD.length)];

        RFD = RFD.filter(item => item !== RANDOM_FRIENDS_DATA)
        CDD[UID] = Today

        STORAGE_JSON_DATA([FILE[0], FILE[1]], [RFD, CDD])

        e.reply([
            '您的盲盒~' +
            `\n好友代码: ${RANDOM_FRIENDS_DATA['C']}` +
            `\n服务器: ${RANDOM_FRIENDS_DATA['S']}服`
        ])
    }
}