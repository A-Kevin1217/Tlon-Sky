import yaml from 'yaml'
import fs from 'node:fs'
import Version from './components/Version.js'

if (!global.segment) { global.segment = (await import("oicq")).segment }
const directories = [
  'plugins/Tlon-Sky/data',
  'plugins/Tlon-Sky/data/Sky签到',
  'plugins/Tlon-Sky/data/背包',
  'plugins/Tlon-Sky/data/FriendCodeCD'
];

directories.forEach((directory) => {
  fs.mkdirSync(directory, { recursive: true });
});

const configFile = 'plugins/Tlon-Sky/config/Gambling.yaml';
if (!fs.existsSync(configFile)) {
  const initialConfig = { group: [] };
  fs.writeFileSync(configFile, yaml.stringify(initialConfig));
}
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