import fs from 'fs'

/** 读取 */
export function GD(FILE_PATH) {
    const Data = fs.readFileSync(FILE_PATH, 'utf8')
    const Json = JSON.parse(Data)
    return Json
}

/** 存储 */
export function SD(FILE_PATH, DATA) { fs.writeFileSync(FILE_PATH, JSON.stringify(DATA, null, 4), 'utf8') }

/** 创建文件夹 */
export function CF(FILE_PATH) { fs.mkdirSync(FILE_PATH, { recursive: true }) }

/** 用户是否存在 */
export function ITUE(ID) {
    if (!fs.existsSync(`plugins/Tlon-Sky/data/Sky签到/${ID}.json`)) return false
    return true
}

/** 读取用户数据 */
export function GUD(ID) { return GD(`plugins/Tlon-Sky/data/Sky签到/${ID}.json`) }