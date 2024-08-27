import fs from 'fs'; import path from 'path'; import Yaml from 'yaml';

export const pluginPath = path.join(path.resolve(), 'plugins', 'Tlon-Sky');
const otherFilePath = {
    push: path.join(pluginPath, 'config', 'config', 'push.yaml'),
    text: path.join(pluginPath, 'config', 'config', 'text.json')
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