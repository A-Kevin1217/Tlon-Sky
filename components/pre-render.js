import { preRender } from './renderer.js'
import { buildRenderCacheKey, deleteCachedRender } from './render-cache.js'

let started = false

const DAILY_TASK_REFRESH_TIMES = [
  [1, 5],
  [1, 20],
  [1, 40],
  ...Array.from({ length: 22 }, (_, index) => [index + 2, 0])
]

const dailyTask = {
  path: 'admin/每日任务',
  params: {
    text: '看不清发[ 任务图 ]，复刻发[ 复刻兑换图 ]'
  },
  cfg: {
    scale: 1.4,
    cacheTTL: 26 * 60 * 60 * 1000
  }
}

const shardCalendar = {
  path: 'admin/光遇碎石日历',
  params: {},
  cfg: {
    scale: 1.4,
    cacheTTL: 26 * 60 * 60 * 1000
  }
}

function getNextRun(hour, minute) {
  const now = new Date()
  const next = new Date(now)
  next.setHours(hour, minute, 0, 0)
  if (next <= now) next.setDate(next.getDate() + 1)
  return next
}

function scheduleDaily(hour, minute, action) {
  const scheduleNext = () => {
    const next = getNextRun(hour, minute)
    const timer = setTimeout(async () => {
      try {
        await action()
      } catch (error) {
        globalThis.logger?.warn?.(
          `[Tlon-Sky] 定时任务失败 ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}: ${error.message || error}`
        )
      } finally {
        scheduleNext()
      }
    }, next.getTime() - Date.now())
    timer.unref?.()
  }

  scheduleNext()
}

async function forcePreRender(task) {
  return preRender(task.path, task.params, {
    ...task.cfg,
    forceRefresh: true
  })
}

function clearMidnightCaches() {
  const dailyTaskKey = buildRenderCacheKey(dailyTask.path, dailyTask.params, dailyTask.cfg)
  const shardCalendarKey = buildRenderCacheKey(shardCalendar.path, shardCalendar.params, shardCalendar.cfg)
  deleteCachedRender(dailyTaskKey)
  deleteCachedRender(shardCalendarKey)
}

function shouldWarmDailyTaskAtStartup() {
  const now = new Date()
  return now.getHours() >= 2
}

export function warmupRenderCache() {
  if (started) return
  started = true

  setTimeout(async () => {
    const startupTasks = shouldWarmDailyTaskAtStartup()
      ? [dailyTask, shardCalendar]
      : [shardCalendar]

    for (const task of startupTasks) {
      try {
        await preRender(task.path, task.params, task.cfg)
      } catch (error) {
        globalThis.logger?.debug?.(`[Tlon-Sky] 预渲染失败 ${task.path}: ${error.message || error}`)
      }
    }
  }, 0)

  scheduleDaily(0, 0, clearMidnightCaches)
  scheduleDaily(0, 1, () => forcePreRender(shardCalendar))

  for (const [hour, minute] of DAILY_TASK_REFRESH_TIMES) {
    scheduleDaily(hour, minute, () => forcePreRender(dailyTask))
  }
}
