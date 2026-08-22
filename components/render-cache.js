const renderCache = new Map()

function normalize(value, seen = new WeakSet()) {
  if (value === null || typeof value !== 'object') {
    return value
  }

  if (seen.has(value)) {
    return '[Circular]'
  }
  seen.add(value)

  if (Array.isArray(value)) {
    return value.map(item => normalize(item, seen))
  }

  return Object.keys(value)
    .sort()
    .reduce((result, key) => {
      if (key === 'e' || key === 'saveId' || key === 'save_id' || key === '_renderLogID') {
        return result
      }
      result[key] = normalize(value[key], seen)
      return result
    }, {})
}

function buildRenderCacheKey(path, params = {}, cfg = {}) {
  return JSON.stringify({
    path,
    params: normalize(params),
    scale: cfg.scale || 1
  })
}

async function getCachedRender(key, render, ttl = 5 * 60 * 1000) {
  if (ttl <= 0) {
    return render()
  }

  const now = Date.now()
  const cached = renderCache.get(key)
  if (cached && cached.expiresAt > now) {
    return cached.promise
  }

  const promise = Promise.resolve()
    .then(render)
    .catch(error => {
      renderCache.delete(key)
      throw error
    })

  renderCache.set(key, {
    expiresAt: now + ttl,
    promise
  })

  return promise
}

export {
  buildRenderCacheKey,
  getCachedRender
}
