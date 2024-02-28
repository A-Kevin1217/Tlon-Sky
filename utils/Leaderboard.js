import path from 'path';
import fs from 'fs/promises';

const userFile = 'plugins/Tlon-Sky/data/Sky签到';
const rankingKeys = ['白蜡', '季蜡', '亏损', '赚取', '抢蜡烛次数', '被抢次数', '连续签到天数', '累计签到天数'];

const readJsonFile = async (filePath) => {
    try {
        const fileData = await fs.readFile(filePath);
        return JSON.parse(fileData.toString());
    } catch (error) {
        console.error('Error reading file:', error);
        return null;
    }
};

const sortAndWriteToFile = async (array, fileName) => {
    array.sort((a, b) => b.level - a.level);
    const topTen = array.slice(0, array.length);
    const jsonRanking = JSON.stringify(topTen, null, 2);
    await fs.writeFile(`plugins/Tlon-Sky/data/排行榜/${fileName}.json`, jsonRanking);
};

export async function leaderboard() {
    try {
        const allFiles = await fs.readdir(userFile);
        const userNumber = allFiles.length;
        const ranking = [];

        await Promise.all(allFiles.map(async (fileName) => {
            if (fileName.endsWith('.json')) {
                const userId = fileName.split('.')[0].length > 20 ? fileName.split('.')[0] : parseFloat(fileName.split('.')[0]);
                const filePath = path.join(userFile, fileName);
                const data = await readJsonFile(filePath);
                if (data) {
                    const { 昵称: nickname = '未读取', 头像: headShot = 3620060826, ...restData } = data;
                    rankingKeys.forEach((key) => {
                        const level = restData[key] || 0;
                        ranking.push({ nickname, level, userId, headShot });
                    });
                }
            }
        }));

        await Promise.all(rankingKeys.map(async (key) => {
            await sortAndWriteToFile(ranking.filter(data => data[key]), key);
        }))
    } catch (error) {
        console.error('Error:', error);
    }
}
