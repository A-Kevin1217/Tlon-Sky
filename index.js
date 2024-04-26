/** 
 * 插件名[Tlon-Sky](https://gitee.com/Tloml-Starry/Tlon-Sky)
 * 由[Tloml-Starry](https://gitee.com/Tloml-Starry)于2023-01-15开始编写
 */
import fs from 'node:fs'; import fetch from "node-fetch"

if (!global.segment) global.segment = (await import("oicq")).segment

const file = [
  ...fs.readdirSync('./plugins/Tlon-Sky/apps')
].filter(file => file.endsWith('.js'));

let ret = []

logger.info(`「Sky登录中...」`)

file.forEach((file) => { ret.push(import(`./apps/${file}`)) })

ret = await Promise.allSettled(ret)

let apps = {}

const PD = JSON.parse(fs.readFileSync('plugins/Tlon-Sky/package.json', 'utf8'))
const UD = await (await fetch('https://gitee.com/Tloml-Starry/Tlon-Sky/raw/master/package.json')).json()

let T = ''
if (PD !== UD['version']) T = '，当前不是最新版本，记得及时更新呦~'

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

logger.mark(`Tlon-Sky插件载入成功！当前版本：${PD['version']}${T}`)