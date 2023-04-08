import fs from 'node:fs'
import Version from './components/Version.js'
import chalk from 'chalk'

if (!global.segment) {
  global.segment = (await import("oicq")).segment
}

const files = fs.readdirSync('./plugins/Tlon-Sky/apps').filter(file => file.endsWith('.js'))

let ret = []

logger.info(` `)
logger.info(` `)
logger.info(`「Sky登录成功！」当前版本：${Version.version}`)
logger.info(` `)
logger.info(` `)
files.forEach((file) => {
  ret.push(import(`./apps/${file}`))
})

ret = await Promise.allSettled(ret)

let apps = {}
for (let i in files) {
  let name = files[i].replace('.js', '')

  if (ret[i].status != 'fulfilled') {
    logger.error(`载入插件错误：${logger.red(name)}`)
    logger.error(ret[i].reason)
    continue
  }
  apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}
export { apps }
