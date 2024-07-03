import fs from 'fs';

const RFF = 'plugins/Tlon-Sky/data/Random friends.json'
const CDF = 'plugins/Tlon-Sky/data/Random friends CD.json'
if (!fs.existsSync(RFF)) { SD(RFF, []); SD(CDF, {}) }

const R = /^(#|\/)?存入盲盒(.*)\*(国|国际|测试)服$/i

export class SKY extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]光遇:随机好友',
            event: 'message',
            priority: 1,
            rule: [
                { reg: R, fnc: 'F1' },
                { reg: /^(#|\/)?随机好友$/, fnc: 'F2' }
            ]
        })
    }

    async F1(e) {
        const UID = e.user_id
        const GET_CONTENT = e.msg.match(R)
        const CODE = GET_CONTENT[2]
        const SERVER = GET_CONTENT[3]

        if (!/^[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}$/.test(CODE)) return e.reply((e.adapter === 'QQBot') ? [
            '# 格式错误！请按照以下格式添加',
            '> 存入盲盒[好友代码]\*[服务器]',
            '如：存入盲盒ABCD-EFGH-IJKL\*国服',
            Bot.Button([[{ label: '重新输入', data: `存入盲盒${CODE}*${LABELS}` }]])
        ] : [
            '格式错误！请按照以下格式添加\n' +
            '存入盲盒[好友代码]*[服务器]\n' +
            '如：存入盲盒ABCD-EFGH-IJKL*国服'
        ])

        const RFD = await GD1()
        RFD.push({ UID: UID, C: CODE, S: SERVER })
        SD(RFF, RFD)

        return e.reply((e.adapter === 'QQBot') ? [
            '# 存入成功!',
            '***',
            `# 好友码: ${CODE}`,
            `> 服务器: ${SERVER}服`
        ] : [
            segment.at(UID),
            '存入成功！\n' +
            `好友码: ${CODE}\n` +
            `服务器: ${SERVER}服`
        ])
    }

    async F2(e) {
        const UID = e.user_id
        const CDD = await GD2()

        if (CDD[UID] === GCD()) return e.reply('今日已获取过盲盒，请与明日再来')

        let RFD = await GD1()
        if (RFD.length === 0) return e.reply((e.adapter === 'QQBot') ? ['盲盒库已无盲盒，请添加一些再来吧~', Bot.Button([[{ label: '添加', data: '存入盲盒[好友代码]*国服' }]])] : ['盲盒库已无盲盒，请添加一些再来吧~'])
        const RANDOM_FRIENDS_DATA = RFD[Math.floor(Math.random() * RFD.length)];

        RFD = RFD.filter(item => item !== RANDOM_FRIENDS_DATA)
        CDD[UID] = GCD()

        SD(RFF, RFD)
        SD(CDF, CDD)

        e.reply((e.adapter === 'QQBot') ? [
            '# 您的盲盒~',
            '***',
            `# 好友代码: ${RANDOM_FRIENDS_DATA['C']}`,
            `> 服务器: ${RANDOM_FRIENDS_DATA['S']}服`,
            Bot.Button([[{ label: '不需要？放回去', data: `存入盲盒${RANDOM_FRIENDS_DATA['C']}*${RANDOM_FRIENDS_DATA['S']}服` }]])
        ] : [
            '您的盲盒~' +
            `好友代码: ${RANDOM_FRIENDS_DATA['C']}` +
            `服务器: ${RANDOM_FRIENDS_DATA['S']}服`
        ])
    }
}

function SD(FILE, DATA) { fs.writeFileSync(FILE, JSON.stringify(DATA, null, 4), 'utf8') }
async function GD1() { return JSON.parse(fs.readFileSync(RFF, 'utf8')) }
async function GD2() { return JSON.parse(fs.readFileSync(CDF, 'utf8')) }
function GCD() {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}-${day}`;
}