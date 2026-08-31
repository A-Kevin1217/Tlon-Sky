import { render } from './../components/index.js';
import { fileExists, getAppConfig } from './../function/function.js';
import Button from '../model/Button.js';
import fs from 'fs';
import fetch from 'node-fetch';

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
                { reg: /^[#\/]?光遇绑定\s*(\d+)$/, fnc: 'bindSkyId' },
                { reg: /^[#\/]?光遇切换\s*(\d+)$/, fnc: 'switchSkyId' },
                { reg: /^[#\/]?光遇删除\s*(\d+)$/, fnc: 'deleteSkyId' },
                { reg: /^[#\/]?光遇ID列表$/, fnc: 'listSkyIds' },
                { reg: /^[#\/]?光翼查询$/, fnc: 'queryWings' },
                { reg: /^[#\/]?光翼查询\s*(\d+)$/, fnc: 'queryWingsById' },
                { reg: /^[#\/]?光翼详情$/, fnc: 'queryWingDetails' },
                { reg: /^[#\/]?光翼详情\s*(\d+)$/, fnc: 'queryWingDetailsById' }
            ]
        });
        const config = getAppConfig('光翼查询');
        this.wingQueryApi = 'https://api.kevcore.cn/v1/gateway/sky-wings-cn';
        this.wingQueryApiKey = process.env.KEVCORE_API_KEY || config.API_KEY || '';
        // 缓存光翼名称映射（懒加载）
        this.wingNameMap = null;
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
        const skyId = e.msg.match(/^[#\/]?光遇绑定\s*(\d+)$/)[1].trim();

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
        const index = parseInt(e.msg.match(/^[#\/]?光遇切换\s*(\d+)$/)[1].trim());

        let userData = this.getUserData(user_id);

        if (userData.ids.length === 0) {
            await e.reply(['⚠️ 您还没有绑定任何ID！']);
            return true;
        }

        if (index < 1 || index > userData.ids.length) {
            await e.reply([`序号无效！请输入1-${userData.ids.length}之间的数字。`]);
            return true;
        }

        const targetId = userData.ids[index - 1];
        userData.currentId = targetId;
        this.saveUserData(user_id, userData);

        await e.reply(['切换成功！当前ID：' + targetId]);
        return true;
    }

    async deleteSkyId(e) {
        const { user_id } = e;
        const index = parseInt(e.msg.match(/^[#\/]?光遇删除\s*(\d+)$/)[1].trim());

        let userData = this.getUserData(user_id);

        if (userData.ids.length === 0) {
            await e.reply(['⚠️ 您还没有绑定任何ID！']);
            return true;
        }

        if (index < 1 || index > userData.ids.length) {
            await e.reply([`序号无效！请输入1-${userData.ids.length}之间的数字。`]);
            return true;
        }

        const targetId = userData.ids[index - 1];
        userData.ids.splice(index - 1, 1);

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
            await e.reply(['⚠️ 您还没有绑定任何ID！\n使用光遇绑定<ID>"来绑定\nTips：这里需要绑定游戏内短ID哦']);
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
                await e.reply(['⚠️ 您还没有绑定任何ID！\n使用光遇绑定<ID>"来绑定\nTips：这里需要绑定游戏内短ID哦']);
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
        const skyId = e.msg.match(/^[#\/]?光翼查询\s*(\d+)$/)[1].trim();
        await this.queryWingsBySkyId(e, skyId);
        return true;
    }

    async queryWingsBySkyId(e, skyId) {
        try {
            if (!this.wingQueryApiKey) {
                await e.reply(['查询失败：未配置光翼查询 API Key，请在 config/config/光翼查询.yaml 中填写 API_KEY']);
                return true;
            }

            const response = await fetch(this.wingQueryApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': this.wingQueryApiKey
                },
                body: JSON.stringify({ role_id: String(skyId) })
            });
            const result = await response.json();

            if (!response.ok || result.code !== 0) {
                await e.reply(['查询失败：' + (result.msg || result.detail || `HTTP ${response.status}`)]);
                return true;
            }

            const data = result.data || {};
            const total = Number(data.role_total ?? data.wing_count ?? 0);
            const collected = Number(data.role_collected ?? data.collected_count ?? 0);
            const uncollected = Number(data.role_uncollected ?? data.uncollected_count ?? Math.max(total - collected, 0));
            const mapWingData = data.categories?.map_wings || data.map_wings || {};
            const permanentWingData = data.categories?.spirit_wings || data.permanent_wings || {};
            const mapWings = this.normalizeWingStatistics(mapWingData);
            const permanentWings = this.normalizeWingStatistics(permanentWingData);
            const mapStatistics = this.groupWingStatistics(data.map_groups, '地图光翼', mapWings);
            const permanentStatistics = this.groupWingStatistics(data.permanent_groups, '永久光翼', permanentWings);
            const uncollectedByMap = await this.buildUncollectedByMap(data.uncollected_by_map);
            const collectionRate = total > 0 ? `${((collected / total) * 100).toFixed(2)}%` : '0%';

            const templateData = {
                roleId: data.player_id || skyId,
                timestamp: data.timestamp || new Date().toLocaleString('zh-CN'),
                statistics: {
                    total,
                    actual_total: total,
                    collected,
                    deposited: Number(data.deposited_count ?? 0),
                    collection_rate: data.collection_rate || collectionRate,
                    catalog_uncollected: Number(data.catalog_uncollected ?? uncollected),
                    normal_wings: mapWings,
                    permanent_wings: permanentWings
                },
                mapStatisticsJson: JSON.stringify(mapStatistics),
                uncollectedByTypeJson: JSON.stringify(uncollectedByMap),
                permanentStatisticsJson: JSON.stringify(permanentStatistics)
            };

            await render('admin/wingQuery', templateData, { e, scale: 1.3 }, null, new Button(e).wingQuery());

        } catch (error) {
            logger.error(`光翼查询失败: ${error.message}`);
            await e.reply(['查询失败，请稍后重试']);
        }
    }

    normalizeWingStatistics(statistics = {}) {
        return {
            total: Number(statistics.total ?? 0),
            collected: Number(statistics.collected ?? 0),
            uncollected: Number(statistics.uncollected ?? 0),
            known_uncollected: Number(statistics.known_uncollected ?? 0),
            unknown: Number(statistics.unknown ?? 0),
            deposited: Number(statistics.deposited ?? 0)
        };
    }

    groupWingStatistics(groups, fallbackName, fallbackStatistics) {
        if (!Array.isArray(groups) || groups.length === 0) {
            return { [fallbackName]: fallbackStatistics };
        }

        return Object.fromEntries(groups.map(group => [
            group.name || fallbackName,
            this.normalizeWingStatistics(group)
        ]));
    }

    async buildUncollectedByMap(groups) {
        if (!Array.isArray(groups) || groups.length === 0) {
            return {};
        }

        await this.loadWingNameMap();
        return Object.fromEntries(groups.map(group => [
            group.map || '未知地图',
            (group.wings || []).map(wing => ({
                name: this.getWingChineseName(wing.wing_id) || wing.wing_id,
                wingId: wing.wing_id,
                uncollected: 1
            }))
        ]));
    }

    getMapFromWingName(wingName) {
        if (!wingName || !wingName.startsWith('l_')) {
            return '先祖永久翼';
        }

        const mapPrefixes = {
            'l_Prairie': '云野',
            'l_DayHubCave': '云野',
            'l_Rain': '雨林',
            'l_Skyway': '雨林',
            'l_Dusk': '暮土',
            'l_Sunset': '霞谷',
            'l_Night': '禁阁',
            'l_Credits': '伊甸',
            'l_Storm': '伊甸',
            'l_Dawn': '晨岛',
            'l_CandleSpace': '小黑屋',
            'l_MainStreet': '小黑屋'
        };

        if (wingName.startsWith('l_Skyway')) {
            return '雨林';
        }

        for (const [prefix, map] of Object.entries(mapPrefixes)) {
            if (prefix !== 'l_Skyway' && wingName.startsWith(prefix)) {
                return map;
            }
        }
        return '未知';
    }

    async loadWingNameMap() {
        if (this.wingNameMap) return;
        try {
            const res = await fetch('https://raw.gitcode.com/Kevin1217/resources/raw/master/resources/json/SkyChildrenoftheLight/GuangYi.json');
            this.wingNameMap = await res.json();
        } catch (err) {
            // 保证即便加载失败也不会抛出，后续使用会返回原始名字
            logger && logger.error && logger.error('加载光翼名称映射失败: ' + (err.message || err));
            this.wingNameMap = {};
        }
    }

    getWingChineseName(wingName) {
        // 如果未提供名字或未加载映射，直接返回原名
        if (!wingName) return wingName;
        if (!this.wingNameMap) return wingName;

        if (this.wingNameMap[wingName]) {
            return this.wingNameMap[wingName];
        }

        for (const [key, value] of Object.entries(this.wingNameMap)) {
            if (key.toLowerCase() === wingName.toLowerCase()) {
                return value;
            }
        }

        return wingName;
    }

    formatTimestamp(timestamp) {
        if (!timestamp || timestamp === 0) {
            return '从未收集';
        }
        const date = new Date(timestamp * 1000);
        return date.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    async queryWingDetails(e) {
        const { user_id } = e;
        let userData = this.getUserData(user_id);

        if (!userData.currentId) {
            if (userData.ids.length === 0) {
                await e.reply(['⚠️ 您还没有绑定任何ID！\n使用光遇绑定<ID>"来绑定\nTips：这里需要绑定游戏内短ID哦']);
                return true;
            } else {
                await e.reply(['请先使用"光遇切换<序号>"设置当前ID！']);
                return true;
            }
        }

        await this.queryWingDetailsBySkyId(e, userData.currentId);
        return true;
    }

    async queryWingDetailsById(e) {
        const skyId = e.msg.match(/^[#\/]?光翼详情\s*(\d+)$/)[1].trim();
        await this.queryWingDetailsBySkyId(e, skyId);
        return true;
    }

    async queryWingDetailsBySkyId(e, skyId) {
        try {

            const url = `http://sh-aliyun2.vincentzyu233.cn:51024/queryGuangyi?id=${skyId}`;
            const response = await getLinkData(url, 'json');

            if (!response.success) {
                await e.reply(['查询失败：' + (response.errmsg || '未知错误')]);
                return true;
            }

            const resultData = JSON.parse(response.data.result);
            const userWingBuffs = resultData.wing_buffs || [];


            const allWingsUrl = 'https://s.166.net/config/ds_yy_02/ma75_wing_wings.json';
            const allWingsData = await getLinkData(allWingsUrl, 'json');
            // 预加载光翼名称映射，后续同步查找中文名
            await this.loadWingNameMap();


            const userWingMap = {};
            userWingBuffs.forEach(wing => {
                userWingMap[wing.name] = wing;
            });


            const fixedWings = ['l_SunsetEnd_1', 'l_CandleSpace_0', 'l_MainStreet_0'];


            const allWings = [];
            const processedWings = new Set();

            allWingsData.forEach(wingInfo => {
                const wingName = wingInfo['光翼名字'];
                const existingWing = userWingMap[wingName];

                if (existingWing) {

                    existingWing.chineseName = this.getWingChineseName(existingWing.name);
                    allWings.push(existingWing);
                } else {

                    const uncollectedWing = {
                        name: wingName,
                        chineseName: this.getWingChineseName(wingName),
                        collected: false,
                        deposited: false,
                        last_conversion: 0
                    };
                    allWings.push(uncollectedWing);
                }
                processedWings.add(wingName);
            });


            fixedWings.forEach(wingName => {
                if (processedWings.has(wingName)) {

                    return;
                }


                const existingWing = userWingMap[wingName];
                if (existingWing) {

                    existingWing.chineseName = this.getWingChineseName(existingWing.name);
                    allWings.push(existingWing);
                } else {

                    const uncollectedWing = {
                        name: wingName,
                        chineseName: this.getWingChineseName(wingName),
                        collected: false,
                        deposited: false,
                        last_conversion: 0
                    };
                    allWings.push(uncollectedWing);
                }
            });


            const wingsByMap = {};
            const uncollectedByMap = {};

            allWings.forEach(wing => {
                const map = this.getMapFromWingName(wing.name);

                if (!wingsByMap[map]) {
                    wingsByMap[map] = [];
                    uncollectedByMap[map] = [];
                }

                wingsByMap[map].push(wing);

                if (!wing.collected) {
                    uncollectedByMap[map].push(wing);
                }
            });

            const templateData = {
                roleId: response.roleId,
                timestamp: response.timestamp,
                wingsByMapJson: JSON.stringify(wingsByMap),
                uncollectedByMapJson: JSON.stringify(uncollectedByMap),
                totalWings: allWings.length,
                collectedWings: allWings.filter(w => w.collected).length,
                uncollectedWings: allWings.filter(w => !w.collected).length,
                depositedWings: allWings.filter(w => w.deposited).length
            };

            await render('admin/wingDetails', templateData, { e, scale: 1.0 }, null, new Button(e).wingQuery());

        } catch (error) {
            logger.error(`光翼详情查询失败: ${error.message}`);
            await e.reply(['查询失败，请稍后重试']);
        }
    }
}
