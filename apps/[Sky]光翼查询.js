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
            await e.reply(['⚠️ 您还没有绑定任何ID！\n光遇绑定<ID>"来绑定\nTips：这里需要绑定游戏内短ID哦']);
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
                await e.reply(['⚠️ 您还没有绑定任何ID！\n光遇绑定<ID>"来绑定\nTips：这里需要绑定游戏内短ID哦']);
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
            const url = `https://ovoav.com/api/sky/gycx/gka?key=IIoAMkBC5c5zl&id=${skyId}&type=json`;
            const data = await getLinkData(url, 'json');

            if (!data.success) {
                await e.reply(['查询失败：' + (data.message || '未知错误')]);
                return true;
            }

            const statistics = data.statistics;

            const mapStats = statistics.map_statistics;

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

    getWingChineseName(wingName) {
        const wingNameMap = {
            'l_Dawn_0': '晨岛',
            'l_Dawn_1': '晨岛',
            'l_Dawn_2': '晨岛',
            'l_Dawn_3': '晨岛',
            'l_Dawn_4': '晨岛',
            'l_Dawn_5': '晨岛',
            'l_Dawn_6': '晨岛',
            'l_Dawn_TrialsAir_0': '风试炼',
            'l_Dawn_TrialsEarth_0': '土试炼',
            'l_Dawn_TrialsFire_0': '火试炼',
            'l_Dawn_TrialsWater_0': '水试炼',

            'l_Prairie_Cave_0': '幽光山洞',
            'l_Prairie_Cave_1': '幽光山洞',
            'l_Prairie_Village_0': '仙乡',
            'l_Prairie_Village_1': '仙乡',
            'l_Prairie_Village_2': '仙乡',
            'l_Prairie_Village_3': '仙乡',
            'l_Prairie_Village_4': '仙乡',
            'l_DayHubCave_0': '仙乡',
            'l_Prairie_Island_0': '圣岛',
            'l_Prairie_Island_1': '圣岛',
            'l_Prairie_Island_2': '圣岛',
            'l_Prairie_Island_3': '圣岛',
            'l_Prairie_Island_4': '圣岛',
            'l_Prairie_Island_5': '圣岛',
            'l_Prairie_Island_6': '圣岛',
            'l_Prairie_Island_7': '圣岛',
            'l_Prairie_ButterflyFields_0': '蝴蝶平原',
            'l_Prairie_ButterflyFields_1': '蝴蝶平原',
            'l_Prairie_ButterflyFields_2': '蝴蝶平原',
            'l_Prairie_NestAndKeeper_0': '云顶浮石',
            'l_Prairie_NestAndKeeper_1': '云顶浮石',
            'l_Prairie_WildlifePark_0': '云峰',
            'l_Prairie_WildlifePark_1': '云峰',
            'l_Prairie_WildlifePark_2': '云峰',
            'l_Prairie_WildLifePark_0': '云峰',
            'l_Prairie_WildLifePark_1': '云峰',
            'l_Prairie_WildLifePark_2': '云峰',

            'l_Rain_0': '雨林',
            'l_Rain_1': '雨林',
            'l_RainMid_0': '密林遗迹',
            'l_RainMid_1': '密林遗迹',
            'l_RainMid_2': '密林遗迹',
            'l_RainEnd_0': '雨林神殿',
            'l_RainShelter_0': '秘密花园',
            'l_RainShelter_1': '秘密花园',
            'l_Rain_Cave_0': '地下溶洞',
            'l_Rain_Cave_1': '地下溶洞',
            'l_Rain_Cave_2': '地下溶洞',
            'l_Rain_Cave_3': '地下溶洞',
            'l_Rain_BaseCamp_0': '大树屋',
            'l_Rain_BaseCamp_1': '大树屋',
            'l_RainForest_0': '荧光森林',
            'l_RainForest_1': '荧光森林',
            'l_RainForest_2': '荧光森林',
            'l_RainForest_3': '荧光森林',
            'l_Rain_BlueBirdTheater_0': '青鸟剧场',
            'l_Skyway_0': '风行网道',
            'l_Skyway_1': '风行网道',

            'l_Sunset_0': '霞谷',
            'l_Sunset_1': '霞谷',
            'l_Sunset_2': '霞谷',
            'l_Sunset_Theater_0': '圆梦村剧场',
            'l_Sunset_Citadel_0': '霞光城',
            'l_Sunset_Citadel_1': '霞光城',
            'l_SunsetRace_0': '滑行赛道',
            'l_SunsetColosseum_0': '落日竞技场',
            'l_SunsetEnd_0': '落日竞技场',
            'l_SunsetEnd_1': '旧版终点',
            'l_Sunset_YetiPark_0': '雪隐峰',
            'l_Sunset_YetiPark_1': '雪隐峰',
            'l_SunsetVillage_0': '圆梦村',
            'l_SunsetVillage_1': '圆梦村',
            'l_SunsetVillage_2': '圆梦村',
            'l_SunsetEnd2_0': '霞谷神殿',
            'l_Sunset_FlyRace_0': '飞行赛道',
            'l_Sunset_FlyRace_1': '飞行赛道',

            'l_Dusk_0': '暮土',
            'l_Dusk_1': '暮土',
            'l_DuskEnd_0': '暮土神殿',
            'l_DuskMid_0': '远古战场',
            'l_DuskMid_1': '远古战场',
            'l_Dusk_CrabField_0': '黑水港湾',
            'l_Dusk_CrabField_1': '黑水港湾',
            'l_Dusk_CrabField_2': '黑水港湾',
            'l_DuskGraveyard_0': '巨兽荒原',
            'l_DuskGraveyard_1': '巨兽荒原',
            'l_DuskGraveyard_2': '巨兽荒原',
            'l_DuskGraveyard_3': '巨兽荒原',
            'l_DuskGraveyard_4': '巨兽荒原',
            'l_DuskGraveyard_5': '巨兽荒原',
            'l_Dusk_Triangle_0': '藏宝岛礁',
            'l_Dusk_Triangle_1': '藏宝岛礁',
            'l_DuskOasis_0': '失落方舟',
            'l_DuskOasis_1': '失落方舟',

            'l_Night_0': '禁阁光翼',
            'l_Night_1': '禁阁光翼',
            'l_Night2_0': '禁阁二层',
            'l_Night2_1': '禁阁二层',
            'l_Night2_2': '禁阁二层',
            'l_Night2_3': '禁阁二层',
            'l_Night_PaintedWorld_0': '月牙绿洲',
            'l_Night_PaintedWorld_1': '月牙绿洲',
            'l_Night_PaintedWorld_2': '月牙绿洲',
            'l_Night_StoryBook_0': '姆明故事书',
            'l_NightArchive_0': '档案阁',
            'l_NightArchive_1': '档案阁',
            'l_NightDesert_0': '星光沙漠',
            'l_NightDesert_1': '星光沙漠',
            'l_NightDesert_2': '星光沙漠',
            'l_Night_Shelter_0': '庇护所',

            'l_StormStart_0': '伊甸',
            'l_Storm_0': '伊甸',
            'l_Storm_1': '伊甸',
            'l_Storm_2': '伊甸',
            'l_Storm_3': '伊甸',
            'l_Storm_4': '伊甸',
            'l_Storm_5': '伊甸',
            'l_Storm_6': '伊甸',
            'l_Storm_7': '伊甸',
            'l_Storm_8': '伊甸',
            'l_Credits_0': '重生之路',
            'l_StormEvent_VoidSpace_0': '远古回忆',
            'l_StormEvent_VoidSpace_1': '远古回忆',
            'l_StormEvent_VoidSpace_2': '远古回忆',
            'l_StormEvent_VoidSpace_3': '远古回忆',
            'l_StormEvent_VoidSpace_4': '远古回忆',
            'l_StormEvent_VoidSpace_5': '远古回忆',

            'l_CandleSpace_0': '遇境(小黑屋)',
            'l_MainStreet_0': '云巢(小黑屋)'

            
        };

        if (wingNameMap[wingName]) {
            return wingNameMap[wingName];
        }
        
        for (const [key, value] of Object.entries(wingNameMap)) {
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
                await e.reply(['⚠️ 您还没有绑定任何ID！\n光遇绑定<ID>"来绑定\nTips：这里需要绑定游戏内短ID哦']);
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

            await render('admin/wingDetails', templateData, { e, scale: 1.0 });

        } catch (error) {
            logger.error(`光翼详情查询失败: ${error.message}`);
            await e.reply(['查询失败，请稍后重试']);
        }
    }
}

