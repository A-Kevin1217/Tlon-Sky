import fs from 'fs';
import { SD } from "../utils/db.js";

export class oss extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]工具:整理',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^(#|\/)?光遇存档整理$',
                    fnc: 'oss'
                }
            ]
        });
    }

    async oss() {
        const USER_FOLDER = 'plugins/Tlon-Sky/data/Sky签到';
        const USER_FILE_DIRECTORY = fs.readdirSync(USER_FOLDER);

        USER_FILE_DIRECTORY.forEach((FILE_NAME) => {
            const USER_FILE = `${USER_FOLDER}/${FILE_NAME}`;
            const GET_USER_FILE = fs.readFileSync(USER_FILE, 'utf8');
            const USER_DATA = JSON.parse(GET_USER_FILE);

            const USER_ID = FILE_NAME.replace(/.json/g, "");

            const New_USER_DATA = {
                ID: USER_ID,
                昵称: (USER_DATA[USER_ID]['昵称'] || null),
                头像: 3620060826,
                最后签到日期: (USER_DATA[USER_ID]['最后签到日期'] || null),
                连续签到天数: (USER_DATA[USER_ID]['连续签到天数'] || 0),
                累计签到天数: (USER_DATA[USER_ID]['累计签到天数'] || 0),
                能量值: (USER_DATA[USER_ID]['能量值'] || 0),
                等级: (USER_DATA[USER_ID]['等级'] || 0),
                白蜡: (USER_DATA[USER_ID]['白蜡'] || 0),
                季蜡: (USER_DATA[USER_ID]['季蜡'] || 0),
                代币: (USER_DATA[USER_ID]['代币'] || 0),
                抢蜡烛次数: (USER_DATA[USER_ID]['抢蜡烛次数'] || 0),
                被抢次数: (USER_DATA[USER_ID]['被抢次数'] || 0),
                抢蜡烛总数: (USER_DATA[USER_ID]['抢蜡烛总数'] || 0),
                被抢蜡烛总数: (USER_DATA[USER_ID]['被抢蜡烛总数'] || 0),
                上次抢蜡烛时间戳: (USER_DATA[USER_ID]['上次抢蜡烛时间戳'] || 0),
                胜: (USER_DATA[USER_ID]['胜'] || 0),
                负: (USER_DATA[USER_ID]['负'] || 0),
                平: (USER_DATA[USER_ID]['平'] || 0),
                赚取: (USER_DATA[USER_ID]['赚取'] || 0),
                亏损: (USER_DATA[USER_ID]['亏损'] || 0),
                总赠送数量: (USER_DATA[USER_ID]['总赠送数量'] || 0),
                总收入数量: (USER_DATA[USER_ID]['总收入数量'] || 0),
                背包: {
                    蜡烛保护卡: (USER_DATA[USER_ID]['蜡烛保护卡'] || 0),
                    签到双倍卡: (USER_DATA[USER_ID]['签到双倍卡'] || 0),
                }
            }
            SD(USER_FILE, New_USER_DATA);
            logger.mark('已整理文件' + FILE_NAME);
        });
        return this.e.reply('整理完成');
    }
}