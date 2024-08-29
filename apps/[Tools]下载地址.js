const link = [
    'https://sky.163.com',
    'http://a.4399.cn/mobile/112700.html',
    'https://game.oppomobile.com',
    'https://www.biligame.com/detail/?id=101661',
    'http://h5.appstore.vivo.com.cn/#/details?appId=2902164',
    'https://a.9game.cn/skygy',
    'https://appgallery.huawei.com/app/C100685413',
    'https://m.app.mi.com/#page=detail&id=819119',
    'https://sj.qq.com/appdetail/com.tencent.tmgp.eyou.eygy',
    'https://www.thatskygame.com'
]

export class Ts extends plugin {
    constructor() {
        super({
            name: '[Ts]光遇下载地址',
            dsc: '光遇下载地址',
            event: 'message',
            priority: 1,
            rule: [{ reg: /^[#\/]?(光遇下载(链接)?|下载光遇)$/, fnc: 'gameDownloadLink' }]
        })
    }

    async gameDownloadLink(e) {
        let msg = []
        if (e.adapter === 'QQBot') {
            function bd(label, link) {
                return { label, link }
            }
            msg = [
                '# 请点击下方按钮跳转下载',
                Bot.Button([
                    [bd('官服', link[0]), bd('4399', link[1])],
                    [bd('OPPO', link[2]), bd('BiliBili', link[3]), bd('VIVO', link[4]), bd('九游', link[5])],
                    [bd('华为', link[6]), bd('小米', link[7]), bd('应用宝', link[8]), bd('国际服', link[9])]
                ])
            ]
        } else {
            msg = [
                `官服: ${link[0]}`,
                `\r4399渠道服: ${link[1]}`,
                `\rOPPO渠道服: ${link[2]}`,
                `\rBiliBili渠道服: ${link[3]}`,
                `\rVIVO渠道服: ${link[4]}`,
                `\r九游渠道服: ${link[5]}`,
                `\r华为渠道服: ${link[6]}`,
                `\r小米渠道服: ${link[7]}`,
                `\r应用宝渠道服: ${link[8]}`,
                `\r国际服: ${link[9]}`
            ]
        }
        return e.reply(msg)
    }
}