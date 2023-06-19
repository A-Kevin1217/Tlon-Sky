import { render, Version, Common, Data } from '../components/index.js'
import plugin from '../../../lib/plugins/plugin.js'
import lodash from 'lodash'
import fs from 'fs'

export class 光遇_菜单 extends plugin {
    constructor() {
        super({
            name: '光遇_菜单',
            event: 'message',
            priority: 1145,
            rule: [
                {
                    reg: /^#?(SKY|Sky|sky|光遇)(帮助|菜单|使用说明)$/,
                    fnc: '光遇菜单'
                },
                {
                    reg: /^#?(Sky|sky|光遇)版本$/,
                    fnc: '光遇版本'
                }
            ]
        });
    }

    async 光遇菜单() {return await help(this.e);}
    /**
     * 这是一个异步函数，名为光遇版本
     * 它接受一个事件对象e作为参数
     * 在函数主体内，它调用了Common.render方法，并传递了三个参数：模板名称'help/version-info'、一个包含当前版本和更改日志的对象，以及一个名为'dendro'的元素对象
     * 然后，函数返回了这个异步操作的结果，同时传递了一个包含事件对象e和比例值1.2的对象作为参数
     * 注释的作用是解释代码的含义和流程，方便其他开发者理解和维护代码
     */
    async 光遇版本(e) {
        return await Common.render('help/version-info', {
          currentVersion: Version.version,
          changelogs: Version.changelogs,
          elem: 'dendro'
        }, { e, scale: 1.2 })
      }
}

async function help(e) {
// 定义两个空对象
let custom = {}
let help = {}

// 导入配置文件并解构赋值，将diyCfg对象和sysCfg对象中的help属性分别赋值给diyCfg和sysCfg变量
let { diyCfg, sysCfg } = await Data.importCfg('help')

// 将help对象赋值给custom对象
custom = help

// 根据自定义配置、help对象和系统配置对象设置helpConfig对象，使用默认值
let helpConfig = lodash.defaults(diyCfg.helpCfg || {}, custom.helpCfg, sysCfg.helpCfg)

// 设置helpList数组，从自定义配置、help对象和系统配置对象中获取，如果不存在则默认为空数组
let helpList = diyCfg.helpList || custom.helpList || sysCfg.helpList

// 定义空数组helpGroup
let helpGroup = []

// 遍历helpList数组进行设置
lodash.forEach(helpList, (group) => {

    // 如果group对象的auth属性存在且等于'master'，且e.isMaster为false，则返回true
    if (group.auth && group.auth === 'master' && !e.isMaster) {
        return true
    }

    // 对group对象中的list数组进行遍历，设置其icon和css属性
    lodash.forEach(group.list, (help) => {

        // 将help对象的icon属性转为数字类型
        let icon = help.icon * 1

        // 如果icon等于0，将css属性设置为"display:none"
        if (!icon) {
            help.css = 'display:none'

        // 否则，根据icon属性设置css属性中的background-position
        } else {
            let x = (icon - 1) % 10
            let y = (icon - x - 1) / 10
            help.css = `background-position:-${x * 50}px -${y * 50}px`
        }
    })

    // 将修改后的group对象添加到helpGroup数组中
    helpGroup.push(group)
})

// 调用rodom函数获取bg值
let bg = await rodom()

// 定义colCount变量并设置为3
let colCount = 3;

// 将helpConfig、helpGroup、bg、colCount和element作为参数传递给render函数生成html页面，并返回它的结果
return await render('help/index', {
    helpCfg: helpConfig,
    helpGroup,
    bg,
    colCount,
    element: 'default'
}, {
    e,
    scale: 2.0
})
}

const rodom = async function () {
// 读取文件夹中的所有文件
let image = fs.readdirSync(`./plugins/Tlon-Sky/resource/help/theme/`);

// 创建一个空数组，保存所有文件名
let list_img = [];

// 将文件名添加到新创建的数组中
for (let val of image) {
    list_img.push(val)
}

// 如果文件数量为1，就选中第一个文件，否则随机选择一个文件
let theme = list_img.length == 1 ? list_img[0] : list_img[lodash.random(0, list_img.length - 1)];

// 返回选中的文件名
return theme;
}