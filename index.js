import fs from 'node:fs'
import Ver from './components/Version.js'
import chalk from 'chalk'

const files = fs.readdirSync('./plugins/SKY-GuangYu-plugin/apps').filter(file => file.endsWith('.js'))

let ret = []

logger.info(`\n\t${chalk.white(`┌───────────────────────────┐`)}\t\n\t${chalk.cyan(`「SKY光遇登录中···」${Ver.ver}`)}\n\t${chalk.blue(`「登录成功！」`)}\n\t${chalk.yellow(`「交流群号：392665563」`)}\n\t${chalk.white(`└───────────────────────────┘`)}\t`)
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
