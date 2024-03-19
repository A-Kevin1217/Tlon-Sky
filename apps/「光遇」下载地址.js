/** 官服 */
const URL_1 = 'https://sky.163.com'
/** 4399服 */
const URL_2 = 'http://a.4399.cn/mobile/112700.html'
/** OPPO服 */
const URL_3 = 'https://game.oppomobile.com'
/** BiliBili服 */
const URL_4 = 'https://www.biligame.com/detail/?id=101661'
/** VIVO服 */
const URL_5 = 'http://h5.appstore.vivo.com.cn/#/details?appId=2902164'
/** 九游服 */
const URL_6 = 'https://a.9game.cn/skygy'
/** 华为服 */
const URL_7 = 'https://appgallery.huawei.com/app/C100685413'
/** 小米服 */
const URL_8 = 'https://m.app.mi.com/#page=detail&id=819119'
/** 应用宝服 */
const URL_9 = 'https://sj.qq.com/appdetail/com.tencent.tmgp.eyou.eygy'
/** 国际服 */
const URL_10 = 'https://www.thatskygame.com'
export class SKY extends plugin {
    constructor() {
        super({
            name: '[Tlon-Sky]光遇:下载地址',
            dsc: 'Tlon-Sky',
            event: 'message',
            priority: 1,
            rule: [
                {
                    reg: /^(#|\/)?(光遇下载(链接)?|下载光遇)$/,
                    fnc: 'DOWNLOAD_LINK'
                }
            ]
        })
    }
    async DOWNLOAD_LINK(e) {
        let REPLY = []
        if (e.adapter === 'QQBot') {
            REPLY = [
                '# 请点击下方按钮跳转下载',
                Bot.Button([[
                    { label: '官服', link: URL_1 },
                    { label: '国际服', link: URL_10 }
                ], [
                    { label: '4399', link: URL_2 },
                    { label: 'OPPO', link: URL_3 },
                    { label: 'BiliBili', link: URL_4 },
                    { label: 'VIVO', link: URL_5 }
                ], [
                    { label: '九游', link: URL_6 },
                    { label: '华为', link: URL_7 },
                    { label: '小米', link: URL_8 },
                    { label: '应用宝', link: URL_9 }
                ]])
            ]
        } else {
            REPLY = [
                `官服：${URL_1}`,
                `4399渠道服：${URL_2}`,
                `OPPO渠道服：${URL_3}`,
                `BiliBili渠道服：${URL_4}`,
                `VIVO渠道服：${URL_5}`,
                `九游渠道服：${URL_6}`,
                `华为渠道服：${URL_7}`,
                `小米渠道服：${URL_8}`,
                `应用宝渠道服：${URL_9}`,
                `国际服：${URL_10}`
            ]
        }
        return e.reply(REPLY)
    }
}