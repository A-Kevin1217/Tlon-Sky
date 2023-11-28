import fs from 'fs'

export function GetData(filepath) {
    const Data = fs.readFileSync(filepath, 'utf8')
    const Json = JSON.parse(Data)
    return Json
}

export function SaveData(filepath, Data) {
    fs.writeFileSync(filepath, JSON.stringify(Data, null, 4), 'utf8')
}

export function CreateFolder(filepath) {
    fs.mkdirSync(filepath, { recursive: true })
}

export function UserFiles(id) {
    if (!fs.existsSync(`plugins/Tlon-Sky/data/Sky签到/${id}`)) {
        return false
    } else {
        return true
    }
}