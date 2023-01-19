import plugin from '../../../lib/plugins/plugin.js'
import fetch from 'node-fetch'
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { exec, execSync } = require("child_process");

const _path = process.cwd();

export class update extends plugin {
    constructor() {
        super({
            name: '光遇更新',
            dsc: '光遇更新自身',
            event: 'message',
            priority: 999,
            rule: [
                {
                    reg: '^#(SKY更新|SKY强制更新)$',
                    fnc: 'SKY_GuangYu_plugin_update'
                },
            ]
        })
    }

    /**
     * 
     * @param e oicq传递的事件参数e
     */
    async SKY_GuangYu_plugin_update(e) {
        if (!this.e.isMaster) {
            await this.e.reply("您无权操作");
            return true;
        }

        let isForce = this.e.msg.includes("强制") ? true : false;

        let command = "git pull";

        if (isForce) {
            command = "git checkout . && git pull";
            await this.e.reply("正在执行强制更新操作，请稍等");
        } else {
            await this.e.reply("正在执行更新操作，请稍等");
        }
        var me = this;
        var ls = exec(command, { cwd: `${_path}/plugins/SKY-GuangYu-plugin/` }, async function (error, stdout, stderr) {
            if (error) {
                let isChanges = error.toString().includes("Your local changes to the following files would be overwritten by merge") ? true : false;

                let isNetwork = error.toString().includes("fatal: unable to access") ? true : false;

                if (isChanges) {
                    await me.e.reply(
                        "失败！\nError code: " +
                        error.code +
                        "\n" +
                        error.stack +
                        "\n\n本地代码与远程代码存在冲突,上面报错信息中包含冲突文件名称及路径，请尝试处理冲突\n如果不想保存本地修改请使用【#强制更新】"
                    );
                } else if (isNetwork) {
                    await me.e.reply(
                        "失败！\nError code: " + error.code + "\n" + error.stack + "\n\n可能是网络问题，请关闭加速器之类的网络工具，或请过一会尝试。"
                    );
                } else {
                    await me.e.reply("失败！\nError code: " + error.code + "\n" + error.stack + "\n\n出错了。请尝试处理错误");
                }
            } else {
                if (/Already up to date/.test(stdout)) {
                    e.reply("目前已经是最新了~");
                    return true;
                }
                me.restartApp();
            }
        });

    }
}