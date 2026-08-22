import { preRender } from './renderer.js'

let started = false

const publicRenderTasks = [
  {
    path: 'admin/每日任务',
    params: {
      text: '看不清发[ 任务图 ]，复刻发[ 复刻兑换图 ]'
    },
    cfg: {
      scale: 1.4,
      cacheTTL: 10 * 60 * 1000
    }
  },
  {
    path: 'admin/光遇碎石日历',
    params: {},
    cfg: {
      scale: 1.4,
      cacheTTL: 10 * 60 * 1000
    }
  },
  {
    path: 'admin/skyAnnouncement',
    params: {},
    cfg: {
      scale: 1.4,
      cacheTTL: 30 * 60 * 1000
    }
  }
]

export function warmupRenderCache() {
  if (started) return
  started = true

  setTimeout(async () => {
    for (const task of publicRenderTasks) {
      try {
        await preRender(task.path, task.params, task.cfg)
      } catch (error) {
        globalThis.logger?.debug?.(`[Tlon-Sky] 预渲染失败 ${task.path}: ${error.message || error}`)
      }
    }
  }, 0)
}
