import path from 'path';
import fs from 'fs/promises';

const Userfile = 'plugins/Tlon-Sky/data/Sky签到';

export async function Leaderboard() {
    try {
        const Allfile = await fs.readdir(Userfile);
        const UserNumber = Allfile.length;
        const ranking = [];
        const rankingKeys = ['白蜡', '季蜡', '亏损', '赚取', '抢蜡烛次数', '被抢次数', '连续签到天数', '累计签到天数'];

        await Promise.all(Allfile.map(async (fileName) => {
            if (fileName.endsWith('.json')) {
                let userId = fileName.split('.')[0]
                if (userId.length > 20) {
                    userId
                } else {
                    userId = parseFloat(userId)
                }
                const filePath = path.join(Userfile, fileName);
                const fileData = await fs.readFile(filePath);
                const data = JSON.parse(fileData.toString());
                const nickname = data?.昵称 || '未读取';
                const Head_shot = data?.头像 || 3620060826;

                const rankingData = {};
                rankingKeys.forEach((key) => {
                    const level = data?.[key] || 0;
                    rankingData[key] = { nickname, level, userId, Head_shot };
                });

                ranking.push(rankingData);
            }
        }));

        const sortAndWriteToFile = async (array, fileName) => {
            array.sort((a, b) => b.level - a.level);
            const topTen = array.slice(0, UserNumber);
            const jsonRanking = JSON.stringify(topTen, null, 2);
            await fs.writeFile(`plugins/Tlon-Sky/data/排行榜/${fileName}.json`, jsonRanking);
        };

        rankingKeys.forEach(async (key) => {
            await sortAndWriteToFile(ranking.map(data => data[key]), key);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}