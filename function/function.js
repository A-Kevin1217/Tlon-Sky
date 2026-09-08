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

// 读取 KevCore 网关通用 API Key（光翼查询 / 光遇本月日历等共用）
// 优先级：环境变量 KEVCORE_API_KEY > config/config/kevcore.yaml > 旧版 config/config/光翼查询.yaml
// 首次调用时自动尝试将旧版 光翼查询.yaml 中的 Key 一次性迁移到 kevcore.yaml
function getKevCoreApiKey() {
    migrateKevCoreApiKey()
    return process.env.KEVCORE_API_KEY ||
        getAppConfig('kevcore').API_KEY ||
        getAppConfig('光翼查询').API_KEY ||
        ''
}

let kevCoreKeyAutoMigrated = false

function escapeYamlValue(value) {
    return `'${String(value ?? '').replace(/'/g, "''")}'`
}

// 旧版 config/config/光翼查询.yaml → 通用 config/config/kevcore.yaml 自动迁移（每个进程只尝试一次）
function migrateKevCoreApiKey() {
    if (kevCoreKeyAutoMigrated) return
    kevCoreKeyAutoMigrated = true

    try {
        if (process.env.KEVCORE_API_KEY) return // 已配置环境变量则无需迁移
        const legacyKey = getAppConfig('光翼查询').API_KEY
        if (!legacyKey) return // 旧文件无 Key 则无需迁移
        if (getAppConfig('kevcore').API_KEY) return // 新文件已有 Key 则跳过

        const kevcorePath = path.join(configPath, 'kevcore.yaml')
        const keyLine = `API_KEY: ${escapeYamlValue(legacyKey)}`

        if (!fs.existsSync(kevcorePath)) {
            // 旧版本部署可能还没有 kevcore.yaml，直接创建
            const template = [
                '# ============================================================',
                '# KevCore 网关 通用 API Key（config/config/kevcore.yaml）',
                '# ------------------------------------------------------------',
                '# 以下功能共用此 Key：',
                '#   1. 光翼查询         (sky-wings-cn)      apps/[Sky]光翼查询.js',
                '#   2. 光遇本月日历     (sky-calendar-cn)   apps/[Sky]日历.js',
                '# ------------------------------------------------------------',
                '# 也可通过环境变量 KEVCORE_API_KEY 配置（优先级最高，配置后无需填写本文件）',
                '# ============================================================',
                keyLine,
                ''
            ].join('\n')
            fs.writeFileSync(kevcorePath, template, 'utf8')
        } else {
            // 只替换 API_KEY 行，保留已有注释
            let content = fs.readFileSync(kevcorePath, 'utf8')
            if (/^\s*API_KEY\s*:.*$/m.test(content)) {
                content = content.replace(/^(\s*)API_KEY\s*:.*$/m, (_, indent) => indent + keyLine)
            } else {
                content = content.replace(/\s*$/, '\n') + keyLine + '\n'
            }
            fs.writeFileSync(kevcorePath, content, 'utf8')
        }

        if (globalThis.logger?.info) {
            globalThis.logger.info('[Tlon-Sky] 检测到旧版光翼查询配置，已将 API Key 自动迁移到 config/config/kevcore.yaml')
        }
    } catch (error) {
        if (globalThis.logger?.error) {
            globalThis.logger.error(`[Tlon-Sky] KevCore API Key 自动迁移失败：${error.message}`)
        }
    }
}

function makeMarkdownSegment(content) {
    return { type: 'markdown', data: { content } }
}

function isQQBot(e) {
    return (e?.bot?.adapter?.name ?? e?.platform ?? '未知') === 'QQBot'
}

function getPlainQQBotId(userId) {
    const value = String(userId ?? '').trim()
    if (!value) return ''
    const sep = value.includes('') ? '' : ':'
    return value.includes(sep) ? value.split(sep).pop() : value
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
    getKevCoreApiKey,
    makeMarkdownSegment,
    isQQBot,
    getPlainQQBotId,
    fileExists,
    storageData,
    readJsonData
};
