import { render } from './../components/index.js';
import { fileExists } from './../function/function.js';
import fs from 'fs';

if (!fileExists('plugins/Tlon-Sky/data/wingBindings')) {
    fs.mkdirSync('plugins/Tlon-Sky/data/wingBindings', { recursive: true });
}

export class SkyWingQueryPlugin extends plugin {
    constructor() {
        super({
            name: '[Ts]光翼查询',
            dsc: '光遇ID绑定和光翼查询',
            event: 'message',
            priority: 1,
            rule: [
                { reg: /^光遇绑定\s*(\d+)$/, fnc: 'bindSkyId' },
                { reg: /^光遇切换\s*(.+)$/, fnc: 'switchSkyId' },
                { reg: /^光遇删除\s*(.+)$/, fnc: 'deleteSkyId' },
                { reg: /^光遇ID列表$/, fnc: 'listSkyIds' },
                { reg: /^光翼查询$/, fnc: 'queryWings' },
                { reg: /^光翼查询\s*(\d+)$/, fnc: 'queryWingsById' }
            ]
        });
    }

    getUserDataFile(user_id) {
        return `plugins/Tlon-Sky/data/wingBindings/${user_id}.json`;
    }

    getUserData(user_id) {
        const file = this.getUserDataFile(user_id);
        if (!fileExists(file)) {
            const initialData = {
                user_id: user_id,
                ids: [],
                currentId: null
            };
            fs.writeFileSync(file, JSON.stringify(initialData, null, 2), 'utf8');
            return initialData;
        }
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    }

    saveUserData(user_id, userData) {
        const file = this.getUserDataFile(user_id);
        fs.writeFileSync(file, JSON.stringify(userData, null, 2), 'utf8');
    }

    async bindSkyId(e) {
        const { user_id } = e;
        const skyId = e.msg.match(/^光遇绑定\s*(\d+)$/)[1].trim();

        let userData = this.getUserData(user_id);

        if (userData.ids.includes(skyId)) {
            await e.reply(['ID已经绑定过了！']);
            return true;
        }

        userData.ids.push(skyId);
        if (userData.ids.length === 1) {
            userData.currentId = skyId;
        }
        this.saveUserData(user_id, userData);

        await e.reply(['绑定成功！']);
        return true;
    }

    async switchSkyId(e) {
        const { user_id } = e;
        const targetId = e.msg.match(/^光遇切换\s*(.+)$/)[1].trim();

        let userData = this.getUserData(user_id);

        if (!userData.ids.includes(targetId)) {
            await e.reply(['ID不存在，请先绑定该ID！']);
            return true;
        }

        userData.currentId = targetId;
        this.saveUserData(user_id, userData);

        await e.reply(['切换成功！当前ID：' + targetId]);
        return true;
    }

    async deleteSkyId(e) {
        const { user_id } = e;
        const targetId = e.msg.match(/^光遇删除\s*(.+)$/)[1].trim();

        let userData = this.getUserData(user_id);

        if (!userData.ids.includes(targetId)) {
            await e.reply(['ID不存在！']);
            return true;
        }

        userData.ids = userData.ids.filter(id => id !== targetId);
        
        // 如果删除的是当前ID，切换到第一个（如果还有ID的话）
        if (userData.currentId === targetId) {
            userData.currentId = userData.ids.length > 0 ? userData.ids[0] : null;
        }

        this.saveUserData(user_id, userData);

        await e.reply(['删除成功！']);
        return true;
    }

    async listSkyIds(e) {
        const { user_id } = e;
        let userData = this.getUserData(user_id);

        if (userData.ids.length === 0) {
            await e.reply(['您还没有绑定任何ID！\n使用"光遇绑定<ID>"来绑定。']);
            return true;
        }

        let message = ['已绑定的ID列表：\n'];
        userData.ids.forEach((id, index) => {
            const isCurrent = id === userData.currentId ? ' (当前)' : '';
            message.push(`${index + 1}. ${id}${isCurrent}`);
        });

        await e.reply(message.join('\n'));
        return true;
    }

    async queryWings(e) {
        const { user_id } = e;
        let userData = this.getUserData(user_id);

        if (!userData.currentId) {
            if (userData.ids.length === 0) {
                await e.reply(['您还没有绑定任何ID！\n使用"光遇绑定<ID>"来绑定。']);
                return true;
            } else {
                await e.reply(['请先使用"光遇切换<ID>"设置当前ID！']);
                return true;
            }
        }

        await this.queryWingsBySkyId(e, userData.currentId);
        return true;
    }

    async queryWingsById(e) {
        const skyId = e.msg.match(/^光遇查询\s*(\d+)$/)[1].trim();
        await this.queryWingsBySkyId(e, skyId);
        return true;
    }

    async queryWingsBySkyId(e, skyId) {
        try {
            const url = `https://ovoav.com/api/sky/gycx/gka?key=IIoAMkBC5c5zl&id=${skyId}&type=json`;
            const data = await getLinkData(url, 'json');

            if (!data.success) {
                await e.reply(['查询失败：' + (data.message || '未知错误')]);
                return true;
            }

            // 处理数据，准备渲染
            const statistics = data.statistics;
            
            // 构建地图统计信息
            const mapStats = statistics.map_statistics;
            
            // 构建未收集列表（按类型分组）
            const uncollectedByType = {};
            statistics.uncollected_list.forEach(item => {
                if (!uncollectedByType[item.type]) {
                    uncollectedByType[item.type] = [];
                }
                uncollectedByType[item.type].push({
                    name: item.name,
                    uncollected: item.uncollected,
                    details: item.details || []
                });
            });

            // 准备传递给模板的数据
            const templateData = {
                roleId: data.roleId,
                timestamp: data.timestamp,
                statistics: {
                    total: statistics.total,
                    actual_total: statistics.actual_total,
                    collected: statistics.collected,
                    deposited: statistics.deposited,
                    collection_rate: statistics.collection_rate,
                    unredeemed_permanent: statistics.unredeemed_permanent,
                    normal_wings: statistics.normal_wings,
                    permanent_wings: statistics.permanent_wings
                },
                mapStatisticsJson: JSON.stringify(mapStats),
                uncollectedByTypeJson: JSON.stringify(uncollectedByType),
                seasonStatisticsJson: JSON.stringify(statistics.season_statistics)
            };

            await render('admin/wingQuery', templateData, { e, scale: 1.3 });
            
        } catch (error) {
            logger.error(`光翼查询失败: ${error.message}`);
            await e.reply(['查询失败，请稍后重试']);
        }
    }
}

