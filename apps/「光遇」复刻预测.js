import plugin from '../../../lib/plugins/plugin.js'

export class 光遇_复刻预测 extends plugin {
    constructor() {
        super({
            name: '光遇_复刻预测',
            dsc: '光遇',
            event: 'message',
            priority: 4800,
            rule: [
                {
                    reg: /^#?复刻预测$/,
                    fnc: 'sky_fkyc'
                }
            ]
        })
    }

    async sky_fkyc(e) {
        let bossName = [
            '火先知','水先知','土先知','风先知',
            '刁蛮浪者','挑衅艺伎','敬礼护卫','舒展大师','跳跃舞者','拳礼武僧',
            '蟹语者','击掌光农','随性拓荒者','肩背追光','静光学者','螺旋舞冠',
            '不舍家长','彩纸表亲','智慧长者','蓬头青年','火花家长','踏舞孩童',
            '沉思编导','致敬钢琴家','抛球杂耍','迎宾侍者','旋转舞者','献情演员',
            '冷漠术士','蟹舞者','瞌睡木匠','情绪草药师','赞许壁画家','稻草人农夫',
            '放松日浴者','鸣谢收藏家','母语者','固执登山者','内秀书虫','热血运动员',
            '偷窥邮差','熊抱雪人','回旋大师','跳舞艺人',
            '正步冒险家','傻笑童子军','白日梦森林人','管事小队长','茫然植物学生','胆小鬼学员',
            '呼风唤雨的统治者','沾沾自喜的自恋狂','萎靡不振的士兵','星光收藏家','被逼无奈的掌灯人','打喷嚏的地理学家',
            //'风行领航员','风铃修补匠','光之低语者','天才建筑师',
            //'退休将领','嬉笑炮手','焦虑渔夫','笨拙水手',
            //'老练音乐家','健忘叙事者','谦虚舞者','忙碌舞台管理员',
            //'远古光辉上','远古光辉下','远古冥暗上','远古冥暗下',
            //'希望之种','爱之战士','细心矿工','奔离旅行者',
            //'负伤战士','丧子老兵','乞求孩童','嗫足沏茶师',
        ]
        let randomNumber = Math.ceil(Math.random() * bossName.length - 1)
        let boss1 = bossName[randomNumber]
        bossName.splice(randomNumber, 1)
        randomNumber = Math.ceil(Math.random() * bossName.length - 1)
        let boss2 = bossName[randomNumber]
        bossName.splice(randomNumber, 1)
        randomNumber = Math.ceil(Math.random() * bossName.length - 1)
        await this.reply(`\n我猜下次有可能复刻\n【${boss1}】&【${boss2}】\n其中一个!`, true, { at: true })
        return true
    }
}
