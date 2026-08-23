import { Data, Version, Plugin_Name } from './index.js'
import puppeteer from '../../../lib/puppeteer/puppeteer.js'
import fs from 'fs'
import { buildRenderCacheKey, getCachedRender } from './render-cache.js'
const _path = process.cwd()

async function renderImage(path, params = {}, cfg = {}) {
  let [app, tpl] = path.split('/')
  let { e } = cfg
  let layoutPath = process.cwd() + `/plugins/${Plugin_Name}/resources/common/layout/`
  let resPath = `../../../../../plugins/${Plugin_Name}/resources/`
  Data.createDir(`data/html/${Plugin_Name}/${app}/${tpl}`, 'root')
  let data = {
    ...params,
    _plugin: Plugin_Name,
    saveId: params.saveId || params.save_id || tpl,
    tplFile: `./plugins/${Plugin_Name}/resources/${app}/${tpl}.html`,
    pluResPath: resPath,
    _res_path: resPath,
    _layout_path: layoutPath,
    _tpl_path: process.cwd() + `/plugins/${Plugin_Name}/resources/common/tpl/`,
    defaultLayout: layoutPath + 'default.html',
    elemLayout: layoutPath + 'elem.html',
    pageGotoParams: {
      waitUntil: 'networkidle0'
    },
    sys: {
      scale: `style=transform:scale(${cfg.scale || 1})`,
      copyright: `Tlon-Sky<span class="version">${Version.version}</span>`
    },
    quality: 100
  }
  if (process.argv.includes('web-debug')) {
    let saveDir = _path + '/data/ViewData/'
    if (!fs.existsSync(saveDir)) {
      fs.mkdirSync(saveDir)
    }
    let file = saveDir + tpl + '.json'
    data._app = app
    fs.writeFileSync(file, JSON.stringify(data))
  }
  const cacheKey = buildRenderCacheKey(path, params, cfg)
  const cacheTTL = Number.isFinite(Number(cfg.cacheTTL))
    ? Number(cfg.cacheTTL)
    : 5 * 60 * 1000
  const screenshot = () => puppeteer.screenshot(`${Plugin_Name}/${app}/${tpl}`, data)
  let base64 = cfg.cache === false
    ? await screenshot()
    : await getCachedRender(cacheKey, screenshot, cacheTTL, cfg.forceRefresh === true)
  return { base64, e, text: cfg.text, button: cfg.button }
}

async function render(path, params = {}, cfg = {}, text, button) {
  const result = await renderImage(path, params, cfg)
  const { base64, e } = result
  let ret = true
  if (cfg.retType === 'base64') {
    return base64
  }
  if (base64) {
    let msg = [base64]
    if (text) msg.unshift(text)
    if (button) msg.push(button)
    if (e?.reply) {
      ret = await e.reply(msg)
    } else {
      return base64
    }
  }
  return cfg.retMsgId ? ret : true
}

export async function preRender(path, params = {}, cfg = {}) {
  return render(path, params, {
    ...cfg,
    retType: 'base64'
  })
}

export default render
