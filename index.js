/** 
 * 插件名[Tlon-Sky](https://gitee.com/Tloml-Starry/Tlon-Sky)
 * 由[Tloml-Starry](https://gitee.com/Tloml-Starry)于2023-01-15开始编写
 */
import fs from 'node:fs';
['USER', 'GROUP'].forEach(dir => fs.mkdirSync(`plugins/Tlon-Sky/data/${dir}`, { recursive: true }));

global.SKY_IMAGE_URL = {
  A: "https://gitee.com/Tloml-Starry/resources/raw/master/resources/img/光遇/",
  B: "https://api.t1qq.com/api/sky/gy/sc/"
};

const file = [
  ...fs.readdirSync('./plugins/Tlon-Sky/apps'),
  ...fs.readdirSync('./plugins/Tlon-Sky/apps/Game')
].filter(file => file.endsWith('.js'));

let ret = []

logger.info('Sky载入中...')

file.forEach((file) => {
  ret.push(import(`./apps/${file}`))
  ret.push(import('./apps/Game/Robbery.js'))
  ret.push(import('./apps/Game/SignUp.js'))
  ret.push(import('./apps/Game/SkyGame.js'))
  ret.push(import('./apps/Game/UserInfo.js'))
})

ret = await Promise.allSettled(ret)

let apps = {}

for (let i in file) {
  let name = file[i].replace('.js', '')

  if (ret[i].status != 'fulfilled') {
    logger.error(`载入插件错误：${logger.red(name)}`)
    logger.error(ret[i].reason)
    continue
  }
  apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}
export { apps }
logger.mark('Sky插件载入成功')