import plugin from '../../../lib/plugins/plugin.js'
import { execSync } from 'child_process'
import { update } from '../../other/update.js'
import { Version , Common, Plugin_Name} from '../components/index.js'
import { version } from 'os'

export class SKY_updata extends plugin {
    constructor () {
        super({
            name: '光遇插件_更新',
            dsc: '调用Yunzai自带更新模块进行插件更新',
            event: 'message',
            priority: 1,
            rule: [
                {
                    reg: '^#?光遇(插件)?(强制)?更新$',
                    fnc: 'sky_update_plugin',
                    permission: 'master'
                },
                {
                    reg: '^#?光遇(插件)?版本$',
                    fnc: 'sky_plugin_version',
                },
                {
                    reg: '^#?光遇(插件)?更新日志$',
                    fnc: 'sky_update_log',
                }
            ]
        })
    }

    async sky_update_plugin(){
        let Update_Plugin = new update();
        Update_Plugin.e = this.e;
        Update_Plugin.reply = this.reply;

        if(Update_Plugin.getPlugin(Plugin_Name)){
            if(this.e.msg.includes('强制')){
                await execSync('git reset --hard',{cwd: `${process.cwd()}/plugins/${Plugin_Name}/`});
            }
            await Update_Plugin.runUpdata(Plugin_Name);
            if(Update_Plugin.isUp){
                setTimeout(() => Update_Plugin.restart(), 2000)
            }
        }
        return true;
    }
    async sky_plugin_version(){
        return versionInfo(thos.e);
    }
    async sky_update_log(){
        let Update_Plugin = new update();
        Update_Plugin.e = this.e;
        Update_Plugin.reply = this.reply;
        if(Update_Plugin.getPlugin(Plugin_Name)){
            this.e.reply(await Update_Plugin.getLog(Plugin_Name));
        }
        return true;
    }
}
    async function versionInfo (e) {
        return await Common.render('help/version-info', {
            currentVersion: Version.ver,
            changelogs: Version.logs,
            elem: 'cryo'
        }, { e, scale: 1.2 })
}


