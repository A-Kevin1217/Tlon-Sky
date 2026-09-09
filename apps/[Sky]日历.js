/**
 * [Tlon-Sky] 光遇本月日历
 * 调用 KevCore 网关 https://api.kevcore.cn/v1/gateway/sky-calendar-cn
 * 获取光遇国服本月日历图片并直接回复图片
 *
 * 与光翼查询共用 KevCore 网关 API Key：
 *   config/config/kevcore.yaml 中的 API_KEY，也可通过环境变量 KEVCORE_API_KEY 配置（优先级最高）
 */
import { getKevCoreApiKey, makeMarkdownSegment } from '../function/function.js'

const CALENDAR_API = 'https://api.kevcore.cn/v1/gateway/sky-calendar-cn'

// 图片尺寸探测失败时的兜底尺寸（参考网易日历图常用比例）
const FALLBACK_IMAGE_SIZE = { width: 2500, height: 1400 }

function isQQBotEvent(e) {
  const bot = e?.bot ?? globalThis.Bot?.[e?.self_id] ?? globalThis.Bot
  const adapterId = bot?.adapter?.id || bot?.adapter?.name || e?.adapter_name || ''
  const versionId = bot?.version?.id || bot?.version?.name || ''
  const platform = e?.platform || ''
  return adapterId === 'QQBot' || versionId === 'QQBot' || String(platform).startsWith('QQ-')
}

// 从图片文件头解析宽高，仅读取前 8KB，支持 JPEG / PNG / WebP / GIF
function parseImageSize(bytes) {
  const buf = Buffer.from(bytes)
  if (buf.length < 10) return null

  // PNG: 宽高在 IHDR(第16-23字节)
  if (buf.length >= 24 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
  }

  // GIF: 宽高在第6-9字节(小端)
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x38) {
    return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) }
  }

  // WebP
  if (buf.toString('latin1', 0, 4) === 'RIFF' && buf.toString('latin1', 8, 12) === 'WEBP') {
    const type = buf.toString('latin1', 12, 16)
    if (type === 'VP8X' && buf.length >= 30) {
      return {
        width: 1 + buf[24] + (buf[25] << 8) + (buf[26] << 16),
        height: 1 + buf[27] + (buf[28] << 8) + (buf[29] << 16)
      }
    }
    if (type === 'VP8 ' && buf.length >= 30) {
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff }
    }
    if (type === 'VP8L' && buf.length >= 25) {
      return {
        width: 1 + (buf[21] | ((buf[22] & 0x3f) << 8)),
        height: 1 + ((buf[22] >> 6) | (buf[23] << 2) | (buf[24] << 10))
      }
    }
    return null
  }

  // JPEG: 遍历标记段找到 SOF，读取高宽
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let offset = 2
    while (offset + 9 <= buf.length) {
      if (buf[offset] !== 0xff) { offset++; continue }
      const marker = buf[offset + 1]
      // 填充字节与无长度段
      if (marker === 0xff || marker === 0x00) { offset++; continue }
      if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { offset += 2; continue }
      if (offset + 4 > buf.length) return null
      const isSOF = (marker >= 0xc0 && marker <= 0xc3) || (marker >= 0xc5 && marker <= 0xc7) ||
        (marker >= 0xc9 && marker <= 0xcb) || (marker >= 0xcd && marker <= 0xcf)
      if (isSOF) {
        return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) }
      }
      offset += 2 + buf.readUInt16BE(offset + 2)
    }
  }
  return null
}

export class SkyCalendar extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]光遇:本月日历',
      dsc: '光遇本月日历查询',
      event: 'message',
      priority: 1,
      rule: [
        { reg: /^[#\/]?光遇本月日历$/, fnc: 'handleMonthlyCalendar' }
      ]
    })
    // KevCore 网关通用 API Key（config/config/kevcore.yaml，与光翼查询共用）
    this.apiKey = getKevCoreApiKey()
    this.imageSizeCache = new Map()
  }

  async handleMonthlyCalendar(e) {
    try {
      if (!this.apiKey) {
        return e.reply(['查询失败：未配置 KevCore API Key（与光翼查询共用）\n请前往 https://api.kevcore.cn/ 获取 API Key 后，填入 config/config/kevcore.yaml 或环境变量 KEVCORE_API_KEY'])
      }

      const imageUrl = await this.fetchCalendarImageUrl()

      if (isQQBotEvent(e)) {
        // QQ 官方机器人：使用 markdown 图片消息
        const markdown = await this.buildImageMarkdown(imageUrl)
        return e.reply([makeMarkdownSegment(markdown)])
      }
      // 普通环境：直接发送图片
      return e.reply([segment.image(imageUrl)])
    } catch (error) {
      logger.error(`[光遇日历] 获取失败: ${error.message}`)
      return e.reply(['日历获取失败，请稍后重试'])
    }
  }

  // 调用日历接口，优先 GET，失败时尝试 POST（部分网关接口以 POST 注册）
  async fetchCalendarImageUrl() {
    const headers = { 'X-API-Key': this.apiKey, 'Content-Type': 'application/json' }
    let response = await fetch(CALENDAR_API, { headers })

    if (!response.ok) {
      response = await fetch(CALENDAR_API, { method: 'POST', headers, body: '{}' })
    }
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const result = await response.json()
    if (result.code !== 0) {
      throw new Error(result.msg || result.detail || `接口返回码 ${result.code}`)
    }

    const imageUrl = result.data?.image_url || result.data
    if (!imageUrl || typeof imageUrl !== 'string') {
      throw new Error('接口未返回图片地址')
    }
    return imageUrl
  }

  // QQ 官方 markdown 需要声明图片宽高，先探测真实尺寸
  async buildImageMarkdown(imageUrl) {
    const size = await this.probeImageSize(imageUrl) || FALLBACK_IMAGE_SIZE

    // 过大时等比缩放到 QQ 可接受的展示尺寸
    const maxSide = 2000
    const scale = Math.min(1, maxSide / Math.max(size.width, size.height))
    const width = Math.round(size.width * scale)
    const height = Math.round(size.height * scale)

    return `![日历 #${width}px #${height}px](${imageUrl})`
  }

  // 通过 Range 请求读取图片头部字节解析尺寸，失败返回 null
  async probeImageSize(imageUrl) {
    if (this.imageSizeCache.has(imageUrl)) {
      return this.imageSizeCache.get(imageUrl)
    }

    let size = null
    try {
      const response = await fetch(imageUrl, { headers: { Range: 'bytes=0-8191' } })
      if (response.ok) {
        size = parseImageSize(Buffer.from(await response.arrayBuffer()))
      }
    } catch (error) {
      logger.debug(`[光遇日历] 图片尺寸探测失败: ${error.message}`)
    }

    this.imageSizeCache.set(imageUrl, size)
    return size
  }
}
