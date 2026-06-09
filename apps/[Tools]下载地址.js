import Button from '../model/Button.js';

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
        const platform = e.bot?.adapter?.name || e.platform || '未知'
        const links = await getLinkData('https://ghfast.top/https://raw.githubusercontent.com/A-Kevin1217/resources/master/resources/json/SkyChildrenoftheLight/GameDownload.json', 'json')

        if (platform === 'QQBot'|| platform === 'OneBotv11') {

            const button = new Button(e).downloadLinks(links);

            return e.reply([
                segment.at(e.user_id),
                '\n# 光遇下载地址',
                button || '当前框架暂不支持按钮交互'
            ])
        }


        const msg = Object.entries(links)
            .map(([name, link]) => `${name}: ${link}`)
            .join('\n')
        return e.reply(msg)
    }
}
