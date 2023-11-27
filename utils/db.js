import fs from 'fs'

const Userfile = 'plugins/Tlon-Sky/data/Sky签到';
export function Leaderboard() {
    const Allfile = fs.readdirSync(Userfile);
    const UserNumber = Allfile.length;
    const ranking = [];
    const rankings = [];

    Allfile.forEach((fileName) => {
        if (fileName.endsWith('.json')) {
            const userId = parseFloat(fileName.split('.')[0]);
            const filePath = path.join(Userfile, fileName);
            const fileData = fs.readFileSync(filePath);
            const data = JSON.parse(fileData.toString());
            const level = data[userId]?.白蜡 || 0;
            const nickname = data[userId]?.昵称 || '未读取';
            ranking.push({ nickname, level, userId });

            const level2 = data[userId]?.季蜡 || 0;
            rankings.push({ nickname, level: level2, userId });
        }
    });

    ranking.sort((a, b) => b.level - a.level);
    const topTen = ranking.slice(0, UserNumber);
    const jsonRanking = JSON.stringify(topTen, null, 2);
    fs.writeFileSync('plugins/Tlon-Sky/data/排行榜/白蜡.json', jsonRanking);

    rankings.sort((a, b) => b.level - a.level);
    const topTen2 = rankings.slice(0, UserNumber);
    const jsonRanking2 = JSON.stringify(topTen2, null, 2);
    fs.writeFileSync('plugins/Tlon-Sky/data/排行榜/季蜡.json', jsonRanking2);
}