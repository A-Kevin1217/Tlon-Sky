import fs from 'fs'; import path from 'path'; import Yaml from 'yaml'; import fetch from 'node-fetch';

export const pluginPath = path.join(path.resolve(), 'plugins', 'Tlon-Sky');
const configPath = path.join(pluginPath, 'config', 'config')
const otherFilePath = {
    push: path.join(configPath, 'push.yaml'),
    cron: path.join(configPath, 'cron.yaml'),
    text: path.join(configPath, 'text.json')
};

/** 读取推送配置数据 */
export async function getPushData() {
    return Yaml.parse(fs.readFileSync(otherFilePath['push'], 'utf-8'))
}

/** 读取推送文案配置数据 */
export async function getPushTextData() {
    return await JSON.parse(fs.readFileSync(FILE_PATH['text'], 'utf8'))
}

/** 存储推送配置数据 */
export function storagePushData(data) {
    fs.writeFileSync(otherFilePath['push'], Yaml.stringify(data), 'utf8')
}

/** 读取cron配置数据 */
export function getCronData() {
    const cronData = Yaml.parse(fs.readFileSync(otherFilePath['cron'], 'utf-8'))
    return {
        老奶奶干饭: cronData['老奶奶干饭'],
        每日任务: cronData['每日任务'],
        献祭刷新: cronData['献祭刷新']
    }
}

/** 得到链接数据 */
export async function getLinkData(link, type) {
    let linkData = await fetch(link)
    if (type === 'json') {
        linkData = await linkData.json()
    } else if (type === 'text') {
        linkData = await linkData.text()
    }
    return linkData
}