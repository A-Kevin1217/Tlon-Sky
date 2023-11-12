import schedule from "node-schedule";
import moment from "moment";
import fs from 'fs'

let Gruop  = [392665563];
/** 推送群号,多个群用英文逗号','隔开 */
async function sleep(ms) {
   return new Promise((resolve) => setTimeout(resolve, ms));
}
/** cron表达式定义推送时间 (秒 分 时 日 月 星期) */
schedule.scheduleJob('0 1 0 * * 1', async()=>{ 
   let time = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
   // let getDate = (new Date(time).getDate());
   // let getMinutes =(new Date(time).getMinutes());
   // let getSeconds = (new Date(time).getSeconds());
   let getDay = (new Date(time).getDay());
   let msg;
   if (getDay === 1) {
      const 用户文件夹 = 'plugins/Tlon-Sky/data/Sky签到';
      const 文件列表 = fs.readdirSync(用户文件夹);
      let 用户数量 = 0; // 初始化用户数量

      文件列表.forEach((文件名) => {
         const 文件路径 = `${用户文件夹}/${文件名}`;
         const 文件数据 = fs.readFileSync(文件路径, 'utf8');
         const 用户信息 = JSON.parse(文件数据);

         const 用户ID = 文件名.replace(/.json/g, "")
         用户信息[用户ID]['白蜡'] += 50
         用户信息[用户ID]['季蜡'] += 10
         
         fs.writeFileSync(文件路径, JSON.stringify(用户信息, null, 2), 'utf8');

         // 打印日志提示
         logger.mark(`已发放：${文件名}`);
         用户数量++; // 每次处理一个文件，用户数量加一
     });
      const Textreply = `Tlon-Sky每周礼包发放成功！\n用户数量：${用户数量}\n白蜡+50丨季蜡+10`;
         msg = [
            Textreply ? Textreply : ""
         ];
   }
   console.log(msg)
   for (var key of Gruop) {
      Bot.pickGroup(key * 1).sendMsg(msg);
      await sleep(10000) 
   }
});