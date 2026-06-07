import fs from 'fs'; import path from 'path'; import Yaml from 'yaml'; import fetch from 'node-fetch';

export const pluginPath = path.join(path.resolve(), 'plugins', 'Tlon-Sky');
const configPathCandidates = [
    path.join(pluginPath, 'config', 'config'),
    path.join(path.resolve(), 'config', 'config')
];
const configPath = configPathCandidates.find(fs.existsSync) || configPathCandidates[1];
const otherFilePath = {
    push: path.join(configPath, 'push.yaml'),
    cron: path.join(configPath, 'cron.yaml'),
    text: path.join(configPath, 'text.json')
};

async function getPushData() {
    return Yaml.parse(fs.readFileSync(otherFilePath['push'], 'utf-8'))
}


async function getPushTextData() {
    return await JSON.parse(fs.readFileSync(otherFilePath['text'], 'utf8'))
}


function storagePushData(data) {
    fs.writeFileSync(otherFilePath['push'], Yaml.stringify(data), 'utf8')
}


function getCronData() {
    const cronData = Yaml.parse(fs.readFileSync(otherFilePath['cron'], 'utf-8'))
        return {
        老奶奶干饭: cronData['老奶奶干饭'],
        每日任务: cronData['每日任务'],
        献祭刷新: cronData['献祭刷新'],
        碎石提醒: cronData['碎石提醒'],
        碎石坠落前提醒: cronData['碎石坠落前提醒']
    }
}

function getAppConfig(appName) {
    const appConfigPath = path.join(configPath, `${appName}.yaml`)
    if (!fs.existsSync(appConfigPath)) {
        return {}
    }

    try {
        const config = Yaml.parse(fs.readFileSync(appConfigPath, 'utf8'))
        return config && typeof config === 'object' ? config : {}
    } catch (error) {
        if (globalThis.logger?.error) {
            globalThis.logger.error(`[${appName}] 读取配置失败 ${error}`)
        }
        return {}
    }
}

global.getLinkData = async function (link, type) {
    let linkData = await fetch(link)
    if (type === 'json') {
        linkData = await linkData.json()
    } else if (type === 'text') {
        linkData = await linkData.text()
    }
    return linkData
}


function fileExists(filePath) {
    return fs.existsSync(filePath);
}


function storageData(filePath, data) {
    if (Array.isArray(filePath) && Array.isArray(data) && filePath.length === data.length) {
        filePath.forEach((path, index) => {
            fs.writeFileSync(path, JSON.stringify(data[index], null, 2), 'utf8');
        });
    } else if (typeof filePath === 'string' && typeof data === 'object') {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } else {
        throw new Error('文件路径和数据格式不匹配');
    }
}


function readJsonData(filePath) {
    if (Array.isArray(filePath)) {
        return filePath.map(path => JSON.parse(fs.readFileSync(path, 'utf8')));
    } else if (typeof filePath === 'string') {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } else {
        throw new Error('文件路径格式不正确');
    }
}

export {
    getPushData,
    getPushTextData,
    storagePushData,
    getCronData,
    getAppConfig,
    fileExists,
    storageData,
    readJsonData
};