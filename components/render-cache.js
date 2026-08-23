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

async function getCachedRender(key, render, ttl = 5 * 60 * 1000, forceRefresh = false) {
  if (ttl <= 0) {
    return render()
  }

  const now = Date.now()
  const cached = renderCache.get(key)
  if (!forceRefresh && cached && cached.expiresAt > now) {
    return cached.promise
  }

  if (forceRefresh) {
    const value = await render()
    renderCache.set(key, {
      expiresAt: Date.now() + ttl,
      promise: Promise.resolve(value)
    })
    return value
  }

  const promise = Promise.resolve()
    .then(render)
    .catch(error => {
      if (renderCache.get(key)?.promise === promise) {
        renderCache.delete(key)
      }
      throw error
    })

  renderCache.set(key, {
    expiresAt: now + ttl,
    promise
  })

  return promise
}

function deleteCachedRender(key) {
  return renderCache.delete(key)
}

export {
  buildRenderCacheKey,
  deleteCachedRender,
  getCachedRender
}
