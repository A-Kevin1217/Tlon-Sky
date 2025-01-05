import fs from 'fs'; import path from 'path'; import Yaml from 'yaml'; import fetch from 'node-fetch';

export const pluginPath = path.join(path.resolve(), 'plugins', 'Tlon-Sky');
const configPath = path.join(pluginPath, 'config', 'config')
const otherFilePath = {
    push: path.join(configPath, 'push.yaml'),
    cron: path.join(configPath, 'cron.yaml'),
    text: path.join(configPath, 'text.json')
};

/**
 * 读取推送配置数据
 * @returns {Promise<any>} 解析后的推送配置数据
 */
async function getPushData() {
    return Yaml.parse(fs.readFileSync(otherFilePath['push'], 'utf-8'))
}

/**
 * 读取推送文案配置数据
 * @returns {Promise<any>} 解析后的推送文案配置数据
 */
async function getPushTextData() {
    return await JSON.parse(fs.readFileSync(otherFilePath['text'], 'utf8'))
}

/**
 * 存储推送配置数据
 * @param {any} data 要存储的推送配置数据
 */
function storagePushData(data) {
    fs.writeFileSync(otherFilePath['push'], Yaml.stringify(data), 'utf8')
}

/**
 * 读取cron配置数据
 * @returns {{老奶奶干饭: any, 每日任务: any, 献祭刷新: any}} 解析后的cron配置数据
 */
function getCronData() {
    const cronData = Yaml.parse(fs.readFileSync(otherFilePath['cron'], 'utf-8'))
    return {
        老奶奶干饭: cronData['老奶奶干饭'],
        每日任务: cronData['每日任务'],
        献祭刷新: cronData['献祭刷新']
    }
}

/**
 * 获取链接数据
 * @param {string} link 链接地址
 * @param {string} type 数据类型，json或text
 * @returns {Promise<any>} 根据type解析后的链接数据
 */
global.getLinkData = async function(link, type) {
    let linkData = await fetch(link)
    if (type === 'json') {
        linkData = await linkData.json()
    } else if (type === 'text') {
        linkData = await linkData.text()
    }
    return linkData
}

/**
 * 判断文件是否存在
 * @param {string} filePath 文件路径
 * @returns {boolean} 文件是否存在
 */
function fileExists(filePath) {
    return fs.existsSync(filePath);
}

/**
 * 存储JSON数据，支持单个或多个文件
 * @param {(string|Array<string>)} filePath 文件路径，可以是单个字符串或字符串数组
 * @param {(any|Array<any>)} data 要存储的数据，可以是单个对象或对象数组
 */
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

/**
 * 读取JSON数据，支持单个或多个文件
 * @param {(string|Array<string>)} filePath 文件路径，可以是单个字符串或字符串数组
 * @returns {(any|Array<any>)} 解析后的JSON数据，可以是单个对象或对象数组
 */
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
    fileExists,
    storageData,
    readJsonData
};