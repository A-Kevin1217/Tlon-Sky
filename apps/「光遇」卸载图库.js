import plugin from '../../../lib/plugins/plugin.js'
import path from 'path'
import fs from 'fs'

export class 光遇_卸载图库 extends plugin {
    constructor() {
        super({
            name: '光遇_卸载图库',
            dsc: '光遇',
            event: 'message',
            priority: 999,
            rule: [
                {
                    reg: /^#?卸载复刻图库$/,
                    fnc: '卸载复刻图库'
                },{
                    reg: /^#?卸载绘画图库$/,
                    fnc: '卸载绘画图库'
                }
            ]
        })
    }
    async 卸载复刻图库(e){
      if (!await checkAuth(e)) return
      const folderPath = 'plugins/Tlon-Sky/resource/复刻图';
      if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach((file) => {
          const curPath = path.join(folderPath, file);
          if (fs.lstatSync(curPath).isDirectory()) {
            deleteFolder(curPath); // 递归删除子文件夹
          } else {
            fs.unlinkSync(curPath); // 删除文件
          }
        });
        fs.rmdirSync(folderPath); // 删除空文件夹
        console.log(`成功删除文件夹：${folderPath}`);
        e.reply('卸载成功');
      } else {
        console.log(`文件夹不存在：${folderPath}`);
        e.reply('您已经卸载过了');
      }
    }
    async 卸载绘画图库(e){
      if (!await checkAuth(e)) return
        const folderPath = 'plugins/Tlon-Sky/resource/光遇绘画分享';
        if (fs.existsSync(folderPath)) {
          fs.readdirSync(folderPath).forEach((file) => {
            const curPath = path.join(folderPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
              deleteFolder(curPath); // 递归删除子文件夹
            } else {
              fs.unlinkSync(curPath); // 删除文件
            }
          });
          fs.rmdirSync(folderPath); // 删除空文件夹
          console.log(`成功删除文件夹：${folderPath}`);
          e.reply('卸载成功');
        } else {
          console.log(`文件夹不存在：${folderPath}`);
          e.reply('您已经卸载过了');
        }
    }
}
function deleteFolder(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolder(curPath); // 递归删除子文件夹
      } else {
        fs.unlinkSync(curPath); // 删除文件
      }
    });
    fs.rmdirSync(folderPath); // 删除空文件夹
    console.log(`成功删除文件夹：${folderPath}`);
  } else {
    console.log(`文件夹不存在：${folderPath}`);
  }
}
const checkAuth = async function (e) {
  if (!e.isMaster) {
    e.reply(`只有主人才能命令哦~`)
    return false
  }
  return true
}