import fs from 'node:fs'
import Version from './components/Version.js'

if (!global.segment) { global.segment = (await import("oicq")).segment }

const dir1 = './plugins/Tlon-Sky/apps'

const file = [...fs.readdirSync(dir1)].filter(file => file.endsWith('.js'));

let ret = []

logger.info(`「Sky登录中...」`)

file.forEach((file) => { ret.push(import(`./apps/${file}`)) })

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

logger.mark(`「Sky登录成功！」当前版本：${Version.version}`)