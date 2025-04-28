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
        const links = await getLinkData('https://gitcode.com/Kevin1217/resources/raw/master/resources/json/SkyChildrenoftheLight/GameDownload.json', 'json')

        if (platform === 'QQBot') {
            function content(type) {
                const buttonConfig = {
                    'Miao': {
                        row1: [
                            { label: '官服', link: links.官服 },
                            { label: '4399', link: links.四三九九 }
                        ],
                        row2: [
                            { label: 'OPPO', link: links.OPPO },
                            { label: 'BiliBili', link: links.BiliBili },
                            { label: 'VIVO', link: links.VIVO }
                        ],
                        row3: [
                            { label: '华为', link: links.华为 },
                            { label: '小米', link: links.小米 },
                            { label: '应用宝', link: links.应用宝 }
                        ]
                    },
                    'TRSS': {
                        row1: [
                            { text: '官服', link: links.官服 },
                            { text: '4399', link: links.四三九九 }
                        ],
                        row2: [
                            { text: 'OPPO', link: links.OPPO },
                            { text: 'BiliBili', link: links.BiliBili },
                            { text: 'VIVO', link: links.VIVO }
                        ],
                        row3: [
                            { text: '华为', link: links.华为 },
                            { text: '小米', link: links.小米 },
                            { text: '应用宝', link: links.应用宝 }
                        ]
                    }
                }

                const config = buttonConfig[type]
                return [config.row1, config.row2, config.row3]
            }

            let button
            if (typeof Bot.Button === 'function') {
                button = Bot.Button(content('Miao'))
            } else if (typeof segment?.button === 'function') {
                button = segment.button(...content('TRSS'))
            }

            return e.reply([
                '# 光遇下载地址',
                button || '当前框架暂不支持按钮交互'
            ])
        }

        // 其他平台返回文本链接
        const msg = Object.entries(links)
            .map(([name, link]) => `${name}: ${link}`)
            .join('\n')
        return e.reply(msg)
    }
}
