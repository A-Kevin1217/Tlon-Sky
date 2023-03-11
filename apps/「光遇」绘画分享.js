import plugin from'../../../lib/plugins/plugin.js'
import{segment}from'oicq'
const path=process.cwd()
let reply_img = 1.00
let jpg_number = 36
export class chuo extends plugin{
    constructor() {
        super({
        name: '光遇_随机同人绘画',
        dsc: '光遇',
        event: 'message',
        priority: 5000,
        rule: [
            {
                reg: '#?绘画分享$',
                fnc: 'sky_hhfx'
            }
        ]
        })
    }
    async sky_hhfx (e){
        let random_type = Math.random()
        if(random_type < (reply_img)){
            let photo_number = Math.ceil(Math.random() * (jpg_number))
            if(photo_number<=jpg_number){
                e.reply(segment.image('file:///' + path + '/plugins/Tlon-Sky/resource/光遇绘画分享/图像'+ photo_number + '.jpg'))
            }
        }
    }
}