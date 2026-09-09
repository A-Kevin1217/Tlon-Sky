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

// ============================================================
// 本地配置文件自动补全
// config/config/ 已脱离版本管理，新装部署可能为空目录。
// 启动时若发现默认配置文件缺失，自动生成：
//   优先复制 config/config/template/ 下的同名模板；
//   template 不存在时使用内置默认内容兜底。
// 已存在的文件【绝不覆盖】，不影响用户自定义配置。
// ============================================================
const DEFAULT_CONFIG_FILES = ['cron.yaml', 'push.yaml', 'text.json', 'kevcore.yaml', '光翼查询.yaml', '国服礼包查询.yaml'];

// 内置兜底默认内容（仅在 template/ 目录缺失时使用）
const FALLBACK_CONFIG_CONTENT = {
    'cron.yaml': `老奶奶干饭: '0 55 7,9,11,15,17,19,21 * * ?'\n每日任务: '0 0 1,6,12,18 * * ?'\n献祭刷新: '1 0 0,4,8,12,16,20 * * 7'\n碎石提醒: '1 0 * * ?'\n碎石坠落前提醒: '58 6,8,9,10,12,13,14,15,16,18,19,20,21,22,23 * * ?'\n`,
    'push.yaml': `老奶奶干饭: []\n每日任务: []\n献祭刷新: []\n碎石提醒: []\n碎石坠落前提醒: []\n`,
    'text.json': `{\n    "老奶奶干饭": {\n        "text": "老奶奶干饭提醒：\\n还有五分钟就开始啦~\\n快去老奶奶那干饭呀"\n    },\n    "每日任务": {\n        "text": "每日任务自动推送",\n        "image": "https://api.t1qq.com/api/sky/gy/sc/scsky.php"\n    },\n    "献祭刷新": {\n        "text": "每周献祭已刷新！"\n    },\n    "碎石提醒": {\n        "text": "碎石提醒"\n    },\n    "碎石坠落前提醒": {\n        "text": "碎石坠落前提醒"\n    }\n}\n`,
    'kevcore.yaml': `# KevCore 网关 通用 API Key（光翼查询/本月日历/身高查询共用）\n# 也可通过环境变量 KEVCORE_API_KEY 配置（优先级最高）\nAPI_KEY: ''\n`,
    '光翼查询.yaml': `# 【已废弃】请将 KevCore API Key 迁移到 kevcore.yaml\nAPI_KEY: ''\n`,
    '国服礼包查询.yaml': `# 国服礼包查询 API Key\n# 请前往 https://api.t1qq.com 申请你的 API Key\nAPI_KEY: xxxxxxxxxxxxxxx\n`
};

function ensureDefaultConfigFiles() {
    try {
        fs.mkdirSync(configPath, { recursive: true })
        const templateDir = path.join(pluginPath, 'config', 'config', 'template')

        for (const fileName of DEFAULT_CONFIG_FILES) {
            const targetFile = path.join(configPath, fileName)
            if (fs.existsSync(targetFile)) continue // 已存在则跳过，绝不覆盖

            let content = ''
            const templateFile = path.join(templateDir, fileName)
            if (fs.existsSync(templateFile)) {
                content = fs.readFileSync(templateFile, 'utf8')
            } else {
                content = FALLBACK_CONFIG_CONTENT[fileName] || ''
            }
            if (!content) continue

            fs.writeFileSync(targetFile, content, 'utf8')
            if (globalThis.logger?.info) {
                globalThis.logger.info(`[Tlon-Sky] 已生成默认配置文件 config/config/${fileName}`)
            }
        }
    } catch (error) {
        if (globalThis.logger?.error) {
            globalThis.logger.error(`[Tlon-Sky] 配置文件自动补全失败：${error.message}`)
        }
    }
}

ensureDefaultConfigFiles();

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
