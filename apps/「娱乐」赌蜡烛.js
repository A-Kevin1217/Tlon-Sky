import fs from 'fs';
import yaml from 'yaml';
import { render } from '../components/index.js';
import { GetData, SaveData, UserFiles } from '../utils/db.js';

const AWGSFile = `plugins/Tlon-Sky/data/秋风赌坊.json`;
const GroupYaml = 'plugins/Tlon-Sky/config/Gambling.yaml'

export class 娱乐_赌蜡烛 extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]娱乐:赌蜡烛',
            dsc: '娱乐赌蜡烛',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: /^(#|\/)?dlz(.*)$/,
                    fnc: '赌蜡烛'
                }, {
                    reg: /^(#|\/)?押注(.*)$/,
                    fnc: '押注'
                }, {
                    reg: /^(#|\/)?(赌坊信息|秋风赌坊)$/,
                    fnc: '赌坊信息'
                }, {
                    reg: /^(#|\/)?开启赌蜡烛$/,
                    fnc: 'StartGambling'
                }, {
                    reg: /^(#|\/)?关闭赌蜡烛$/,
                    fnc: 'OffGambling'
                }
            ]
        });
    }

    async 赌蜡烛(e) {
        const CoolingTime = 30 * 60 * 1000;
        const NowDate = Date.now();
        let data = yaml.parse(fs.readFileSync(GroupYaml, 'utf-8'))
        if (!data.group.includes(e.group_id)) { return e.reply('该群尚未开启赌蜡烛功能') }
        const UserPunches = e.msg.replace(/#?\/|dlz/g, "")
        const UserID = e.user_id;
        if (!UserFiles(UserID)) { return e.reply('请先发送光遇签到') }
        const UserDatas = GetData(`plugins/Tlon-Sky/data/Sky签到/${UserID}.json`)
        const LastExecutionTime = UserDatas['上次赌蜡烛时间戳'] || 0;
        const ROCK = '石头';
        const PAPER = '布';
        const SCISSORS = '剪刀';
        if (NowDate - LastExecutionTime < CoolingTime) {
            const RemainingTimestamp = CoolingTime - (NowDate - LastExecutionTime);
            if (RemainingTimestamp > 0) {
                const hour = Math.floor(RemainingTimestamp / (60 * 60 * 1000));
                const minutes = Math.floor((RemainingTimestamp % (60 * 60 * 1000)) / (60 * 1000));
                const second = Math.floor((RemainingTimestamp % (60 * 1000)) / 1000);

                const EndTimestamp = NowDate + RemainingTimestamp;
                const EndTime = new Date(EndTimestamp).toLocaleString();

                if (hour === 0) {
                    return e.reply(`赌蜡烛CD中！\n请等待 ${minutes} 分钟 ${second} 秒！\nCD结束时间：${EndTime}`);
                } else if (minutes === 0) {
                    return e.reply(`赌蜡烛CD中！\n请等待 ${second} 秒！\nCD结束时间：${EndTime}`);
                }
            }
        }
        if (UserPunches === '剪刀' || UserPunches === '石头' || UserPunches === '布') {

            const BetFile = `plugins/Tlon-Sky/data/押注信息/${UserID}.json`;
            if (!fs.existsSync(BetFile)) { return e.reply('您尚未押注，请先押注') }
            const BetData = GetData(BetFile)

            const UserFile = `plugins/Tlon-Sky/data/Sky签到/${UserID}.json`;
            const UserData = GetData(UserFile)

            const AWGSData = GetData(AWGSFile)

            //  判断是否押注
            if (BetData[UserID]['押注金额'] > 0) {

                const PG = ['剪刀', '石头', '布']
                const Random = Math.floor(Math.random() * PG.length);
                const SPunches = PG[Random];

                if (UserPunches === SPunches) {
                    重置押注信息(e)
                    UserData['白蜡'] = (UserData['白蜡']) + (BetData[UserID]['押注金额'])
                    UserData['平'] = (UserData['平'] || 0) + 1
                    UserData['上次赌蜡烛时间戳'] = NowDate
                    SaveData(UserFile, UserData)

                    AWGSData['平'] += 1
                    SaveData(AWGSFile, AWGSData)
                    return e.reply(`平局！你和系统都选择了${SPunches}\n赌注已全部返还用户`)
                } else if (
                    (UserPunches === ROCK && SPunches === SCISSORS) ||
                    (UserPunches === PAPER && SPunches === ROCK) ||
                    (UserPunches === SCISSORS && SPunches === PAPER)
                ) {
                    重置押注信息(e)
                    const GetAmount = BetData[UserID]['押注金额'] * BetData[UserID]['倍率']
                    const NetProfit = BetData[UserID]['押注金额'] * (BetData[UserID]['倍率'] - 1)

                    UserData['胜'] = (UserData['胜'] || 0) + 1
                    UserData['赚取'] = (UserData['赚取'] || 0) + NetProfit
                    UserData['白蜡'] = (UserData['白蜡']) + GetAmount
                    UserData['上次赌蜡烛时间戳'] = NowDate
                    SaveData(UserFile, UserData)

                    AWGSData['赔'] = AWGSData['赔'] + NetProfit
                    AWGSData['负'] += 1
                    SaveData(AWGSFile, AWGSData)
                    return e.reply(`用户出拳：${UserPunches}\n系统出拳：${SPunches}\n出拳结果：赢\n赚取蜡烛数量：${NetProfit}根`)
                } else {
                    重置押注信息(e)
                    UserData['负'] = (UserData['负'] || 0) + 1
                    UserData['亏损'] = (UserData['亏损'] || 0) + BetData[UserID]['押注金额']
                    UserData['上次赌蜡烛时间戳'] = NowDate
                    SaveData(UserFile, UserData)

                    //  秋风信息处理
                    AWGSData['赚'] = (AWGSData['赚']) + BetData[UserID]['押注金额']
                    AWGSData['胜'] += 1
                    SaveData(AWGSFile, AWGSData)
                    return e.reply(`用户出拳：${UserPunches}\n系统出拳：${SPunches}\n出拳结果：输\n损失蜡烛数量：${BetData[UserID]['押注金额']}根`)
                }
            } else {
                return e.reply('您尚未押注，请先押注')
            }
        } else {
            return e.reply('请输入正确，"剪刀","石头","布"')
        }
    }


    async 押注(e) {
        let data = yaml.parse(fs.readFileSync(GroupYaml, 'utf-8'))
        if (!data.group.includes(e.group_id)) { return e.reply('该群尚未开启赌蜡烛功能') }
        const GetAmount = e.msg.replace(/#?\/|押注/g, "");
        const GetNumber = parseFloat(GetAmount);
        if (isNaN(GetNumber) || GetNumber <= 0 || !Number.isInteger(GetNumber)) {
            return e.reply('请输入有效的整数押注金额。');
        }

        const UserID = e.user_id;
        const UserFile = `plugins/Tlon-Sky/data/Sky签到/${UserID}.json`;
        const UserData = GetData(UserFile)

        const GetFile = `plugins/Tlon-Sky/data/押注信息/${UserID}.json`

        if (!fs.existsSync(GetFile)) {
            const GetDatas = {
                [UserID]: {
                    押注金额: 0,
                    倍率: null
                }
            }
            SaveData(GetFile, GetDatas)
        }

        let GetDatas = GetData(GetFile)

        if (UserData['白蜡'] > GetNumber) {
            UserData['白蜡'] = UserData['白蜡'] - GetNumber
            SaveData(UserFile, UserData)

            const X = Math.min(1.5 + (Math.floor(GetNumber / 1000) * 0.5), 2.0);
            GetDatas = { 押注金额: GetDatas['押注金额'] + GetNumber, 倍率: X }
            SaveData(GetFile, GetDatas)
            e.reply(`你已成功押注 ${GetNumber}根白蜡，倍率为 ${X}。`);
        } else {
            return e.reply('白蜡不足！')
        }
    }

    async 赌坊信息(e) {
        const AWGSData = GetData(AWGSFile)
        let html = {
            秋风赌坊: 'plugins/Tlon-Sky/resource/Tlon-Sky.png',
            赢: `赢：${AWGSData['胜']} 次`,
            输: `输：${AWGSData['负']} 次`,
            平: `平：${AWGSData['平']} 次`,
            总赚取: `总赚取：${AWGSData['赚']} 根白蜡`,
            总亏损: `总亏损：${AWGSData['赔']} 根白蜡`,
        }
        await render('admin/秋风赌坊', {
            ...html
        }, {
            e,
            scale: 1.4
        })
    }

    async StartGambling(e) {
        if (!e.isMaster) return false
        let data = yaml.parse(fs.readFileSync(GroupYaml, 'utf-8'))
        if (!data.group.includes(e.group_id)) {
            data.group.push(e.group_id * 1)
            fs.writeFileSync(GroupYaml, yaml.stringify(data))
        }
        e.reply(`群[${e.group_id}]已开启赌蜡烛`)
    }

    async OffGambling(e) {
        if (!e.isMaster) return false
        let data = yaml.parse(fs.readFileSync(GroupYaml, 'utf-8'))
        if (data.group.includes(e.group_id)) {
            data.group = data.group.filter(groupId => groupId !== e.group_id)
            fs.writeFileSync(GroupYaml, yaml.stringify(data))
        }
        e.reply(`群[${e.group_id}]已关闭赌蜡烛`)
    }
}

const 重置押注信息 = async function (e) {
    //  获取用户ID
    const UserID = e.user_id;

    //  读取押注信息
    const 押注信息 = `plugins/Tlon-Sky/data/押注信息/${UserID}.json`;
    const 押注信息Data = await fs.promises.readFile(押注信息);
    const 押注信息Json = JSON.parse(押注信息Data.toString());

    //  重置
    押注信息Json[UserID]['押注金额'] = 0
    押注信息Json[UserID]['倍率'] = null
    fs.writeFileSync(押注信息, JSON.stringify(押注信息Json, null, 4));
}