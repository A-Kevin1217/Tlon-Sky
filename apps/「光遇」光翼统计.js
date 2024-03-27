import fetch from "node-fetch"

export class SKY extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]光遇:光翼统计',
            dsc: 'Tlon-Sky',
            event: 'message',
            priority: 1,
            rule: [{
                reg: /^(#|\/)?光翼统计$/,
                fnc: 'OVS'
            }]
        })
    }

    async OVS(e) {
        const URL_DATA = await (await fetch('https://s.166.net/config/ds_yy_02/ma75_wing_wings.json')).json()

        let tagCounts = {
            "复刻永久": 0,
            "普通永久": 0,
            "晨": 0,
            "云": 0,
            "雨": 0,
            "霞": 0,
            "暮": 0,
            "禁": 0,
            "暴": 0
        };
        URL_DATA.forEach(item => {
            if (item["一级标签"] === "复刻永久") {
                tagCounts["复刻永久"]++;
            } else if (item["一级标签"] === "普通永久") {
                tagCounts["普通永久"]++;
            } else if (item["一级标签"] === "晨岛") {
                tagCounts["晨"]++
            } else if (item["一级标签"] === "云野") {
                tagCounts["云"]++
            } else if (item["一级标签"] === "雨林") {
                tagCounts["雨"]++
            } else if (item["一级标签"] === "霞谷") {
                tagCounts["霞"]++
            } else if (item["一级标签"] === "暮土") {
                tagCounts["暮"]++
            } else if (item["一级标签"] === "禁阁") {
                tagCounts["禁"]++
            } else if (item["一级标签"] === "暴风眼") {
                tagCounts["暴"]++
            }
        });

        return e.reply((e.adapter === 'QQBot') ? [
            '# 光翼统计',
            `> 总光翼数量：${URL_DATA.length}`,
            `常驻翼：${(URL_DATA.length) - (tagCounts["复刻永久"] + tagCounts["普通永久"])}`,
            `永久翼：${tagCounts["复刻永久"] + tagCounts["普通永久"]}`,
            `复刻先祖永久翼：${tagCounts["复刻永久"]}`,
            `常驻先祖永久翼：${tagCounts["普通永久"]}`,
            '——————地图光翼——————',
            `晨岛光翼：${tagCounts["晨"]}`,
            `云野光翼：${tagCounts["云"]}`,
            `雨林光翼：${tagCounts["雨"]}`,
            `霞谷光翼：${tagCounts["霞"]}`,
            `暮土光翼：${tagCounts["暮"]}`,
            `禁阁光翼：${tagCounts["禁"]}`,
            `伊甸光翼：${tagCounts["暴"]}`
        ] : [
            segment.at(e.user_id),
            `\n总光翼数量：${URL_DATA.length}`,
            `\n永久翼：${tagCounts["复刻永久"] + tagCounts["普通永久"]}`,
            `\n复刻先祖永久翼：${tagCounts["复刻永久"]}`,
            `\n常驻先祖永久翼：${tagCounts["普通永久"]}`,
            `\n晨岛光翼：${tagCounts["晨"]}`,
            `\n云野光翼：${tagCounts["云"]}`,
            `\n雨林光翼：${tagCounts["雨"]}`,
            `\n霞谷光翼：${tagCounts["霞"]}`,
            `\n暮土光翼：${tagCounts["暮"]}`,
            `\n禁阁光翼：${tagCounts["禁"]}`,
            `\n伊甸光翼：${tagCounts["暴"]}`
        ])
    }
}
