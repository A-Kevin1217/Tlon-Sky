import path from 'path';
import fs from 'fs';

const Userfile = 'plugins/Tlon-Sky/data/Sky签到';

export function Leaderboard() {
    const Allfile = fs.readdirSync(Userfile);
    const UserNumber = Allfile.length;
    const ranking = [];
    const rankings = [];
    const rankingss = [];
    const rankingsss = [];
    const rankingssss = [];
    const rankingsssss = [];
    const rankingssssss = [];
    const rankingsssssss = [];

    Allfile.forEach((fileName) => {
        if (fileName.endsWith('.json')) {
            const userId = parseFloat(fileName.split('.')[0]);
            const filePath = path.join(Userfile, fileName);
            const fileData = fs.readFileSync(filePath);
            const data = JSON.parse(fileData.toString());
            const nickname = data[userId]?.昵称 || '未读取';

            const level = data[userId]?.白蜡 || 0;
            ranking.push({ nickname, level, userId });

            const level2 = data[userId]?.季蜡 || 0;
            rankings.push({ nickname, level: level2, userId });

            const level3 = data[userId]?.亏损 || 0;
            rankingss.push({ nickname, level: level3, userId });

            const level4 = data[userId]?.赚取 || 0;
            rankingsss.push({ nickname, level: level4, userId });

            const level5 = data[userId]?.抢蜡烛次数 || 0;
            rankingssss.push({ nickname, level: level5, userId });

            const level6 = data[userId]?.被抢次数 || 0;
            rankingsssss.push({ nickname, level: level6, userId });

            const level7 = data[userId]?.连续签到天数 || 0;
            rankingssssss.push({ nickname, level: level7, userId });

            const level8 = data[userId]?.累计签到天数 || 0;
            rankingsssssss.push({ nickname, level: level8, userId });
        }
    });

    const sortAndWriteToFile = (array, fileName) => {
        array.sort((a, b) => b.level - a.level);
        const topTen = array.slice(0, UserNumber);
        const jsonRanking = JSON.stringify(topTen, null, 2);
        fs.writeFileSync(`plugins/Tlon-Sky/data/排行榜/${fileName}.json`, jsonRanking);
    };

    sortAndWriteToFile(ranking, '白蜡');
    sortAndWriteToFile(rankings, '季蜡');
    sortAndWriteToFile(rankingss, '亏损');
    sortAndWriteToFile(rankingsss, '赚取');
    sortAndWriteToFile(rankingssss, '抢蜡烛次数');
    sortAndWriteToFile(rankingsssss, '被抢次数');
    sortAndWriteToFile(rankingssssss, '连续签到天数');
    sortAndWriteToFile(rankingsssssss, '累计签到天数');
}
