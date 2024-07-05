import fs from 'fs';

/**
 * 读取JSON数据
 * @param {string} FILE JSON文件路径
 * @returns {JSON}
 */
export async function GET_JSON_DATA(FILE) { return JSON.parse(fs.readFileSync(FILE, 'utf8')) }

/**
 * 存储JSON数据
 * @param {string|Array} FILE_PATH 文件路径
 * @param {JSON} JSON_DATA JSON数据
 * @returns {undefined}
 */
export function STORAGE_JSON_DATA(FILE_PATH, JSON_DATA) {
    if (Array.isArray(FILE_PATH)) {
        for (let i = 0; i < FILE_PATH.length; i++) {
            fs.writeFileSync(FILE_PATH[i], JSON.stringify(JSON_DATA[i], null, 4))
        }
    } else {
        fs.writeFileSync(FILE_PATH, JSON.stringify(JSON_DATA, null, 4));
    }
}

/**
 * 存储数据
 * @param {string} FILE_PATH 文件路径
 * @param {string} DATA 数据
 * @returns {undefined}
 */
export function STORAGE_DATA(FILE_PATH, DATA) { fs.writeFileSync(FILE_PATH, DATA) }

/**
 * 休眠后执行
 * @param {number} ms 毫秒
 * @returns 
 */
export function SLEEP(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 判断文件是否存在
 * @param {string} FILE_PATH 文件路径
 * @returns {any}
 */
export function IS_EXIST(FILE_PATH) {
    if (fs.existsSync(FILE_PATH)) return true
    return false
}

/**
 * 读取文件夹返回文件列表
 * @param {string} FILE_PATH 文件路径
 * @returns {Array}
 */
export function GET_FILE_DIRECTORY(FILE_PATH) {
    return fs.readdirSync(FILE_PATH)
}

/** 将时间戳转换为DD:HH:MM:SS */
export function GET_DATE(TIMESTAMP) {
    const DIFFERENCE_VALUE = Date.now() - TIMESTAMP;
    const DD = String(Math.floor(DIFFERENCE_VALUE / (1000 * 60 * 60 * 24))).padStart(2, '0');
    const HH = String(Math.floor((DIFFERENCE_VALUE % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    const MM = String(Math.floor((DIFFERENCE_VALUE % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    const SS = String(Math.floor((DIFFERENCE_VALUE % (1000 * 60)) / 1000)).padStart(2, '0');
    return { DD, HH, MM, SS };
}
