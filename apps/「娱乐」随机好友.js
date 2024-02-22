import fs from 'fs';
import { GD, SD } from '../utils/db.js';

const FriendCodeFile = 'plugins/Tlon-Sky/data/FriendCodeFile.json'
const FriendRemarksFile = 'plugins/Tlon-Sky/data/FriendRemarks.json'
const FriendCodeCDFile = 'plugins/Tlon-Sky/data/FriendCodeCD'
if (!fs.existsSync(FriendCodeFile)) {
    const Code = []
    SD(FriendCodeFile, Code); SD(FriendRemarksFile, Code)
}
const CoolingTime = 1 * 60 * 60 * 1000;

export class RandomFriend extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]光遇:随机好友',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: /^(#|\/)?随机(好友|盲盒)$/,
                    fnc: 'RandomFriend'
                },
                {
                    reg: /^(#|\/)?存入盲盒(.*)\*(.*)$/,
                    fnc: 'SaveFriendCode'
                }
            ]
        })
    }

    async RandomFriend(e) {
        const UserCdFile = `${FriendCodeCDFile}/${e.user_id}.json`
        if (!fs.existsSync(UserCdFile)) {
            const Cd = {
                CD: Date.now() - CoolingTime
            }
            SD(UserCdFile, Cd)
        }
        const UserCdData = GD(UserCdFile)
        const UserCd = UserCdData['CD']
        if (Date.now() - UserCd < CoolingTime) {
            const RemainingTimestamp = CoolingTime - (Date.now() - UserCd);
            if (RemainingTimestamp > 0) {
                const hour = Math.floor(RemainingTimestamp / (60 * 60 * 1000));
                const minutes = Math.floor((RemainingTimestamp % (60 * 60 * 1000)) / (60 * 1000));
                const second = Math.floor((RemainingTimestamp % (60 * 1000)) / 1000);

                const EndTimestamp = Date.now() + RemainingTimestamp;
                const EndTime = new Date(EndTimestamp).toLocaleString();

                if (hour === 0) {
                    return e.reply(`盲盒CD中\n请等待 ${minutes} 分钟 ${second} 秒后再开盲盒！\nCD结束时间：${EndTime}`);
                } else if (minutes === 0) {
                    return e.reply(`盲盒CD中\n请等待 ${second} 秒后再开盲盒！\nCD结束时间：${EndTime}`);
                } else {
                    return e.reply(`盲盒CD中\n请等待 ${hour} 小时 ${minutes} 分钟 ${second} 秒后再开盲盒！\nCD结束时间：${EndTime}`)
                }
            }
        }
        const FriendCodeData = GD(FriendCodeFile);
        const FriendRemarksData = GD(FriendRemarksFile);
        const FriendCodeNumber = FriendCodeData.length;

        if (FriendCodeNumber === 0) {
            return e.reply('好友盲盒用完啦，您可以使用指令\n存入盲盒[好友代码]*[备注]\n来存入你的盲盒');
        }

        const RandomNumber = Math.floor(Math.random() * FriendCodeNumber);
        const FriendCode = FriendCodeData.splice(RandomNumber, 1)[0];
        const FriendRemarks = FriendRemarksData.splice(RandomNumber, 1)[0];

        UserCdData['CD'] = Date.now()
        SD(FriendCodeFile, FriendCodeData);
        SD(FriendRemarksFile, FriendRemarksData);
        SD(UserCdFile, UserCdData)
        e.reply(`来咯~请及时添加好友哦~\n好友代码：${FriendCode}\n对方备注：${FriendRemarks}\n防骗提示：盲盒来源网友，请谨防受骗`, true);
        return e.reply(`如果您不需要这个盲盒请添加回去指令：\n存入盲盒${FriendCode}*${FriendRemarks}`, true);
    }

    async SaveFriendCode(e) {
        const UserMsg = e.msg.match(/^(#|\/)?存入盲盒(.*)\*(.*)/)
        const FriendCode = UserMsg[2]
        const FriendRemarks = UserMsg[3]
        const regex = /^[0-9A-Za-z]{4}-[0-9A-Za-z]{4}-[0-9A-Za-z]{4}$/;
        const isValidFormat = regex.test(FriendCode);
        if (!isValidFormat) {
            return e.reply('好友代码不符合格式要求\n示例：\n存入盲盒xxxx-xxxx-xxxx*国服|备注小光|平常晚上在线');
        }

        const FriendCodeData = GD(FriendCodeFile);
        const FriendRemarksData = GD(FriendRemarksFile);

        FriendCodeData.push(FriendCode);
        FriendRemarksData.push(FriendRemarks);

        SD(FriendCodeFile, FriendCodeData);
        SD(FriendRemarksFile, FriendRemarksData);

        return e.reply('好友代码已存入盲盒！', true);
    }
}
