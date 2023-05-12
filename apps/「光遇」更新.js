import plugin from '../../../lib/plugins/plugin.js'
import { Restart } from '../../other/restart.js'
import { createRequire } from 'module'
import lodash from 'lodash'
import fs from 'fs'
const require = createRequire(import.meta.url)
const { exec, execSync } = require('child_process')
const _path = process.cwd()
const resPath = `${_path}/plugins/Tlon-Sky/resource/`;
let uping = false

export class 光遇_更新 extends plugin {
    constructor() {
        super({
            name: '光遇_更新',
            dsc: '光遇',
            event: 'message',
            priority: 999,
            rule: [
                {
                    reg: /^#?(光遇|sky|SKY|Sky)(插件)?(强制)?(更新)$/,
                    fnc: 'sky_update'
                },{
                    reg: /^#?(Sky更新图库|sky更新图库|光遇更新图库)$/,
                    fnc: 'sky_updateRes'
                },{
                    reg: /^#?(刷新复刻|更新复刻|sky更新复刻|sky刷新复刻)/,
                    fnc: 'sky_updateReprint'
                }
            ]
        })
        this.typeName = 'Tlon-Sky'
    }
    async sky_update(e) {
        if (!this.e.isMaster) return false
        if (uping) {
            await this.reply('已有命令更新中..请勿重复操作')
            return
        }
        let plugin = 'Tlon-Sky'
        if (!await this.checkGit()) return
        await this.runUpdate(plugin)
        if (this.isUp) {
            setTimeout(() => this.restart(), 2000)
        }
    }
    restart() {
        new Restart(this.e).restart()
    }
    async checkGit() {
        let ret = await execSync('git --version', { encoding: 'utf-8' })
        if (!ret || !ret.includes('git version')) {
            await this.reply('请先安装git')
            return false
        }
        return true
    }
    async runUpdate(plugin = '') {
        this.isNowUp = false
        let cm = `git -C ./plugins/${plugin}/ pull --no-rebase`
        let type = '更新'
        if (this.e.msg.includes('强制')) {
            type = '强制更新'
            cm = `git -C ./plugins/${plugin}/ checkout . && ${cm}`
        }
        this.oldCommitId = await this.getcommitId(plugin)
        await this.reply(`开始执行${type}操作...`)
        uping = true
        let ret = await this.execSync(cm)
        uping = false
        if (ret.error) {
            logger.mark(`${this.e.logFnc} 更新失败：${this.typeName}`)
            this.gitErr(ret.error, ret.stdout)
            return false
        }
        let time = await this.getTime(plugin)
        if (/Already up|已经是最新/g.test(ret.stdout)) {
            await this.reply(`${this.typeName}已经是最新\n最后更新时间：${time}`)
        } else {
            await this.reply(`${this.typeName}更新成功\n更新时间：${time}`)
            this.isUp = true
            let log = await this.getLog(plugin)
            await this.reply(log)
        }
        logger.mark(`${this.e.logFnc} 最后更新时间：${time}`)
        return true
    }
    async gitErr(err, stdout) {
        let msg = '更新失败！'
        let errMsg = err.toString()
        stdout = stdout.toString()
        if (errMsg.includes('Timed out')) {
            let remote = errMsg.match(/'(.+?)'/g)[0].replace(/'/g, '')
            await this.reply(msg + `\n连接超时：${remote}`)
            return
        }
        if (/Failed to connect|unable to access/g.test(errMsg)) {
            let remote = errMsg.match(/'(.+?)'/g)[0].replace(/'/g, '')
            await this.reply(msg + `\n连接失败：${remote}`)
            return
        }
        if (errMsg.includes('be overwritten by merge')) {
            await this.reply(msg + `存在冲突：\n${errMsg}\n` + '请解决冲突后再更新，或者执行#光遇强制更新，放弃本地修改')
            return
        }
        if (stdout.includes('CONFLICT')) {
            await this.reply([msg + '存在冲突\n', errMsg, stdout, '\n请解决冲突后再更新，或者执行#光遇强制更新，放弃本地修改'])
            return
        }
        await this.reply([errMsg, stdout])
    }
    async getcommitId(plugin = '') {
        let cm = 'git rev-parse --short HEAD'
        if (plugin) {
            cm = `git -C ./plugins/${plugin}/ rev-parse --short HEAD`
        }
        let commitId = await execSync(cm, { encoding: 'utf-8' })
        commitId = lodash.trim(commitId)
        return commitId
    }
    async getTime(plugin = '') {
        let cm = 'git log  -1 --oneline --pretty=format:"%cd" --date=format:"%m-%d %H:%M"'
        if (plugin) {
            cm = `cd ./plugins/${plugin}/ && git log -1 --oneline --pretty=format:"%cd" --date=format:"%m-%d %H:%M"`
        }
        let time = ''
        try {
            time = await execSync(cm, { encoding: 'utf-8' })
            time = lodash.trim(time)
        } catch (error) {
            logger.error(error.toString())
            time = '获取时间失败'
        }
        return time
    }
    async execSync(cmd) {
        return new Promise((resolve, reject) => {
            exec(cmd, { windowsHide: true }, (error, stdout, stderr) => {
                resolve({ error, stdout, stderr })
            })
        })
    }
    async getLog(plugin = '') {
        let cm = 'git log  -20 --oneline --pretty=format:"%h||[%cd]  %s" --date=format:"%m-%d %H:%M"'
        if (plugin) {
            cm = `cd ./plugins/${plugin}/ && ${cm}`
        }
        let logAll
        try {
            logAll = await execSync(cm, { encoding: 'utf-8' })
        } catch (error) {
            logger.error(error.toString())
            this.reply(error.toString())
        }
        if (!logAll) return false
        logAll = logAll.split('\n')
        let log = []
        for (let str of logAll) {
            str = str.split('||')
            if (str[0] == this.oldCommitId) break
            if (str[1].includes('Merge branch')) continue
            log.push(str[1])
        }
        let line = log.length
        log = log.join('\n\n')
        if (log.length <= 0) return ''
        log = await this.makeForwardMsg(`${plugin}更新日志，共${line}条`, log)
        return log
    }
    async makeForwardMsg(title, msg) {
        let nickname = Bot.nickname
        if (this.e.isGroup) {
            let info = await Bot.getGroupMemberInfo(this.e.group_id, Bot.uin)
            nickname = info.card ?? info.nickname
        }
        let userInfo = {
            user_id: Bot.uin,
            nickname
        }
        let forwardMsg = [
            {
                ...userInfo,
                message: title
            },
            {
                ...userInfo,
                message: msg
            }
        ]
        /** 制作转发内容 */
        if (this.e.isGroup) {
            forwardMsg = await this.e.group.makeForwardMsg(forwardMsg)
        } else {
            forwardMsg = await this.e.friend.makeForwardMsg(forwardMsg)
        }
        /** 处理描述 */
        forwardMsg.data = forwardMsg.data
            .replace(/\n/g, '')
            .replace(/<title color="#777777" size="26">(.+?)<\/title>/g, '___')
            .replace(/___+/, `<title color="#777777" size="26">${title}</title>`)
        return forwardMsg
    }
    async sky_updateRes (e) {
        if (!await checkAuth(e)) return
        let command = '';
        if (fs.existsSync(`${resPath}/光遇绘画分享/`)) {
            // 图片包已经安装，尝试更新
            e.reply('开始尝试更新，请耐心等待~');
            command = 'git pull';
            exec(command, { cwd: `${resPath}/光遇绘画分享/` }, function (error, stdout, stderr) {
                console.log(stdout);
                if (/(Already up[ -]to[ -]date|已经是最新的)/.test(stdout)) {
                    e.reply('目前所有图片都已经是最新的~');
                    return true;
                }
                let numRet = /(\d*) files changed,/.exec(stdout);
                if (numRet && numRet[1]) {
                    e.reply(`此次更新了${numRet[1]}张图片`);
                    return true;
                }
                if (error) {
                    e.reply('更新失败！\nError code: ' + error.code + '\n' + error.stack + '\n 请稍后重试。');
                } else {
                    e.reply('绘图分享图库更新成功~');
                }
            });
        } else {
            // 图片包未安装，尝试从Git仓库克隆
            command = `git clone https://gitee.com/Tloml-Starry/Tlon-Sky-gallery.git "${resPath}/光遇绘画分享/" --depth=1`;
            e.reply('开始尝试安装绘画分享图库\n可能会需要一段时间，请耐心等待~');
            exec(command, function (error, stdout, stderr) {
                if (error) {
                    e.reply('绘画分享图库安装失败！\nError code: ' + error.code + '\n' + error.stack + '\n 请稍后重试。');
                } else {
                    e.reply('绘画分享图库安装成功\n您后续也可以通过[ #Sky更新图库 ]命令来更新图像');
                }
            });
        }
    }
    async sky_updateReprint (e) {
        let command = '';
        if (fs.existsSync(`${resPath}/复刻图/`)) {
            e.reply('开始尝试更新，请耐心等待~');
            command = 'git pull';
            exec(command, { cwd: `${resPath}/复刻图/` }, function (error, stdout, stderr) {
                console.log(stdout);
                if (/(Already up[ -]to[ -]date|已经是最新的)/.test(stdout)) {
                    e.reply('目前复刻已经是最新的~或者暂未更新~');
                    return true;
                }
                let numRet = /(\d*) files changed,/.exec(stdout);
                if (numRet && numRet[1]) {
                    e.reply(`复刻已更新~`);
                    return true;
                }
                if (error) {
                    e.reply('更新失败！\nError code: ' + error.code + '\n' + error.stack + '\n 请稍后重试。');
                } else {
                    e.reply('复刻更新成功~');
                }
            });
        } else {
            command = `git clone https://gitee.com/Tloml-Starry/Tlon-Sky-reprint.git "${resPath}/复刻图/" --depth=1`;
            e.reply('开始尝试安装复刻图\n可能会需要一段时间，请耐心等待~');
            exec(command, function (error, stdout, stderr) {
                if (error) {
                    e.reply('复刻图安装失败！\nError code: ' + error.code + '\n' + error.stack + '\n 请稍后重试。');
                } else {
                    e.reply('复刻图安装成功\n您后续也可以通过[ #更新复刻 ]命令来更新复刻');
                }
            });
        }
    }
}
const checkAuth = async function (e) {
    if (!e.isMaster) {
      e.reply(`只有主人才能命令哦~`)
      return false
    }
    return true
  }