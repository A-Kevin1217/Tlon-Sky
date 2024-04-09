const URL = 'https://gitee.com/Tloml-Starry/resources/raw/master/resources/img/光遇/季节兑换图/'
export default class Button {
    constructor() {
        this.plugin = {
            name: 'Tlon-Sky',
            dsc: 'Tlon-Sky',
            priority: 1,
            rule: [{
                reg: /^(#|\/)?((S|s)(K|k)(Y|y)|光遇)(帮助|菜单)$/,
                fnc: 'SKY_HELP_1'
            }, {
                reg: /^(#|\/)?((S|s)(K|k)(Y|y)|光遇)娱乐(帮助|菜单)$/,
                fnc: 'SKY_HELP_2'
            }, {
                reg: /^季节兑换图列表$/,
                fnc: 'SKY_HELP_3'
            }, {
                reg: /^常驻兑换图列表$/,
                fnc: 'SKY_HELP_4'
            }, {
                reg: /^(#|\/)?(晨岛|云野|雨林|峡谷|霞谷|暮土|禁阁)兑换图$/,
                fnc: 'PERMANENT_EXCHANGE_PICTURE'
            }, {
                reg: /^(#|\/)?(AURORA|表演|风行|感恩|归巢|归属|九色鹿|梦想|魔法|破晓|潜海|圣岛|拾光|小王子|夜行|音韵|预言|重组|追光|追忆|欧若拉|集结|凌冬)(季)?兑换图$/,
                fnc: 'SEASON_EXCHANGE_PICTURE'
            }, {
                reg: /^(#|\/)?(复刻兑换图|国服复刻)$/,
                fnc: 'RETURN_EXCHANGE_PICTURE'
            }, {
                reg: /^(#|\/)?季节兑换图$/,
                fnc: 'SEASON_EXCHANGE_PICTURE'
            }, {
                reg: /^(#|\/)?(S|s)(K|k)(Y|y)(服务器)?状态$/,
                fnc: 'SERVER_STATUS'
            }, {
                reg: /^(#|\/)?光遇公告$/,
                fnc: 'RETURN_EXCHANGE_PICTURE'
            }, {
                reg: /^(#|\/)?(光遇|国服)?(今日|每日)?(任务|魔法|季蜡|大蜡)?(烛)?(位置)?$/,
                fnc: 'TASK_AND_OTHER'
            }, {
                reg: /^(#|\/)?(今日)?代币(位置)?$/,
                fnc: 'CURRENCY_LOCATION'
            }, {
                reg: /^(#|\/)?季节任务$/,
                fnc: 'CURRENCY_LOCATION'
            }, {
                reg: /^(#|\/)?(20|21|22|23|24)年复刻记录$/,
                fnc: 'A_COPY_OF_THE_PAST'
            }]
        }
    }

    SKY_HELP_1() {
        return Bot.Button([[
            { label: '今日任务', enter: true },
            { label: '季节任务', enter: true },
            { label: 'Sky状态', enter: true },
            { label: '光遇公告', enter: true },
        ], [
            { label: '季节剩余', enter: true },
            { label: '24年复刻记录', enter: true },
            { label: '季节兑换图', enter: true }
        ], [
            { label: '光遇娱乐菜单', enter: true }
        ]])
    }

    SKY_HELP_2() {
        return Bot.Button([[
            { label: '光遇签到', enter: true },
            { label: '光遇信息', enter: true },
            // { label: '排行信息', enter: true },
            // ], [
            //     { label: '设置昵称小秋' },
            //     { label: '设置头像114514' }
            // ], [
            //     { label: '蜡烛商店', enter: true },
            //     { label: '买保护卡', callback: '/购买蜡烛保护卡' },
            //     { label: '买双倍卡', callback: '/购买签到双倍卡' }
            // ], [
            //     { label: '蜡烛排行', enter: true },
            //     { label: '签到排行', enter: true },
            //     { label: '抢蜡排行', enter: true }
        ]])
    }

    SKY_HELP_3() {
        return Bot.Button([[
            { label: '感恩', callback: '/感恩季兑换图' },
            { label: '追光', callback: '/追光季兑换图' },
            { label: '归属', callback: '/归属季兑换图' },
            { label: '音韵', callback: '/音韵季兑换图' },
            { label: '魔法', callback: '/魔法季兑换图' }
        ], [
            { label: '圣岛', callback: '/圣岛季兑换图' },
            { label: '预言', callback: '/预言季兑换图' },
            { label: '梦想', callback: '/梦想季兑换图' },
            { label: '集结', callback: '/集结季兑换图' },
            { label: '小王子', callback: '/小王子季兑换图' }
        ], [
            { label: '风行', callback: '/风行季兑换图' },
            { label: '潜海', callback: '/潜海季兑换图' },
            { label: '表演', callback: '/表演季兑换图' },
            { label: '破晓', callback: '/破晓季兑换图' },
            { label: '欧若拉', callback: '/欧若拉季兑换图' }
        ], [
            { label: '追忆', callback: '/追忆季兑换图' },
            { label: '夜行', callback: '/夜行季兑换图' },
            { label: '拾光', link: `${URL}拾光季.jpg` },
            { label: '归巢', callback: '/归巢季兑换图' },
            { label: '九色鹿', callback: '/九色鹿季兑换图' }
        ]])
    }

    SKY_HELP_4() {
        return Bot.Button([[
            { label: '晨岛', callback: '/晨岛兑换图' },
            { label: '云野', callback: '/云野兑换图' },
            { label: '雨林', callback: '/雨林兑换图' }
        ], [

            { label: '霞谷', callback: '/霞谷兑换图' },
            { label: '暮土', callback: '/暮土兑换图' },
            { label: '禁阁', callback: '/禁阁兑换图' }
        ]])
    }

    PERMANENT_EXCHANGE_PICTURE() {
        return Bot.Button([[
            { label: '晨岛', callback: '/晨岛兑换图' },
            { label: '云野', callback: '/云野兑换图' },
            { label: '雨林', callback: '/雨林兑换图' },
        ], [
            { label: '霞谷', callback: '/霞谷兑换图' },
            { label: '暮土', callback: '/暮土兑换图' },
            { label: '禁阁', callback: '/禁阁兑换图' },
        ], [
            { label: '常驻兑换图列表', enter: true }
        ]])
    }

    SEASON_EXCHANGE_PICTURE() {
        return Bot.Button([[
            { label: '感恩', link: `${URL}感恩季.jpg` },
            { label: '追光', link: `${URL}追光季.jpg` },
            { label: '归属', link: `${URL}归属季.jpg` },
            { label: '音韵', link: `${URL}音韵季.jpg` },
            { label: '魔法', link: `${URL}魔法季.jpg` }
        ], [
            { label: '圣岛', link: `${URL}圣岛季.jpg` },
            { label: '预言', link: `${URL}预言季.jpg` },
            { label: '梦想', link: `${URL}梦想季.jpg` },
            { label: '集结', link: `${URL}集结季.jpg` },
            { label: '小王子', link: `${URL}小王子季.jpg` },
        ], [
            { label: '风行', link: `${URL}风行季.jpg` },
            { label: '潜海', link: `${URL}潜海季.jpg` },
            { label: '表演', link: `${URL}表演季.jpg` },
            { label: '破晓', link: `${URL}破晓季.jpg` },
            { label: '欧若拉', link: `${URL}欧若拉季.jpg` },
        ], [
            { label: '追忆', link: `${URL}追忆季.jpg` },
            { label: '夜行', link: `${URL}夜行季.jpg` },
            { label: '拾光', link: `${URL}拾光季.jpg` },
            { label: '归巢', link: `${URL}归巢季.jpg` },
            { label: '九色鹿', link: `${URL}九色鹿季.jpg` }
        ], [
            { label: '季节兑换图列表', enter: true }
        ]])
    }

    RETURN_EXCHANGE_PICTURE() {
        return Bot.Button([[
            { label: '今日任务', enter: true },
            { label: 'Sky状态', enter: true }
        ]])
    }

    SERVER_STATUS() {
        return Bot.Button([[
            { label: '再次查询排队状态', callback: '/Sky状态' }
        ]])
    }

    TASK_AND_OTHER() {
        return Bot.Button([[
            { label: '任务图', enter: true },
            { label: '复刻兑换图', enter: true },
            { label: '光遇菜单', enter: true }
        ]])
    }

    CURRENCY_LOCATION() {
        return Bot.Button([[
            { label: '没更新点我', link: 'https://gitee.com/Tloml-Starry/resources/blob/master/UPDATE.md' }
        ]])
    }


    A_COPY_OF_THE_PAST() {
        return Bot.Button([[
            { label: '20年', callback: '/20年复刻记录' },
            { label: '21年', callback: '/21年复刻记录' },
            { label: '22年', callback: '/22年复刻记录' },
            { label: '23年', callback: '/23年复刻记录' },
            { label: '24年', callback: '/24年复刻记录' }
        ]])
    }
}