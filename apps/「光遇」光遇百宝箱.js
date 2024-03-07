export class SKY extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]光遇:光遇百宝箱',
            dsc: 'Tlon-Sky',
            event: 'message',
            priority: 1,
            rule: [
                {
                    // reg: /^(#|\/)?(光遇下载(链接)?|下载光遇)$/,
                    // fnc: 'DOWNLOAD_LINK'
                }
            ]
        })
    }
    async DOWNLOAD_LINK(e) {
        // let REPLY = []
        // if (e.adapter === 'QQBot') REPLY = ['# 请点击下方按钮跳转下载']
        // else REPLY = [
        //     '网易官服：https://url.7yan.top/sky-dl-netease',
        //     '\n4399渠道服：https://url.7yan.top/sky-dl-4399',
        //     '\nOPPO渠道服：https://url.7yan.top/sky-dl-oppo',
        //     '\nBiliBili渠道服：https://url.7yan.top/sky-dl-bilibili',
        //     '\nVIVO渠道服：https://url.7yan.top/sky-dl-vivo',
        //     '\n九游渠道服：https://url.7yan.top/sky-dl-9game',
        //     '\n华为渠道服：https://url.7yan.top/sky-dl-hw',
        //     '\n小米渠道服：https://url.7yan.top/sky-dl-mi',
        //     '\n应用宝渠道服：https://url.7yan.top/sky-dl-eyou',
        //     '\n国际服：https://url.7yan.top/sky-dl-tgc',
        //     '\n国际服(华为)：https://url.7yan.top/sky-dl-tgchw'
        // ]
        // return e.reply(REPLY)
    }
}