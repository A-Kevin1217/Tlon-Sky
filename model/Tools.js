import fs from 'fs';


export async function GET_JSON_DATA(FILE) { return JSON.parse(fs.readFileSync(FILE, 'utf8')) }


export function STORAGE_JSON_DATA(FILE_PATH, JSON_DATA) {
    if (Array.isArray(FILE_PATH)) {
        for (let i = 0; i < FILE_PATH.length; i++) {
            fs.writeFileSync(FILE_PATH[i], JSON.stringify(JSON_DATA[i], null, 4))
        }
    } else {
        fs.writeFileSync(FILE_PATH, JSON.stringify(JSON_DATA, null, 4));
    }
}


export function STORAGE_DATA(FILE_PATH, DATA) { fs.writeFileSync(FILE_PATH, DATA) }


export function SLEEP(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}


export function IS_EXIST(FILE_PATH) {
    if (fs.existsSync(FILE_PATH)) return true
    return false
}


export function GET_FILE_DIRECTORY(FILE_PATH) {
    return fs.readdirSync(FILE_PATH)
}


export function GET_DATE(TIMESTAMP) {
    const DIFFERENCE_VALUE = Date.now() - TIMESTAMP;
    const DD = String(Math.floor(DIFFERENCE_VALUE / (1000 * 60 * 60 * 24))).padStart(2, '0');
    const HH = String(Math.floor((DIFFERENCE_VALUE % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    const MM = String(Math.floor((DIFFERENCE_VALUE % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    const SS = String(Math.floor((DIFFERENCE_VALUE % (1000 * 60)) / 1000)).padStart(2, '0');
    return { DD, HH, MM, SS };
}
