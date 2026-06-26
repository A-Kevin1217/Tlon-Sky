/**
 * 插件名: Tlon-Sky
 * 作者: Tloml-Starry
 * 于2023-01-15开始编写
 * 项目主页Gitee: https://gitee.com/Tloml-Starry/Tlon-Sky
 */
import fs from 'node:fs';

global.SKY_IMAGE_URL = {
  A: "https://raw.gitcode.com/Kevin1217/resources/raw/master/resources/img/光遇/",
  B: "https://api.t1qq.com/api/sky/"
};

const file = [
  ...fs.readdirSync('./plugins/Tlon-Sky/apps')
].filter(file => file.endsWith('.js'));

let ret = []

logger.info('Sky载入中...')

file.forEach((file) => {
  ret.push(import(`./apps/${file}`))
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