import lodash from 'lodash'
let cfg = {}

let Cfg = {
    get (rote, def = '') {
      return lodash.get(cfg, rote, def)
    },
    isDisable (e, rote) {
        if (Cfg.get(rote, true)) {
          return false
        }
        return !/^#*Sky/.test(e.msg || '')
    },
    scale (pct = 1) {
      let scale = Cfg.get('sys.scale', 100)
      scale = Math.min(2, Math.max(0.5, scale / 100))
      pct = pct * scale
      return `style=transform:scale(${pct})`
    },
}
export default Cfg