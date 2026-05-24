import type { ImagePreviewDuration } from '@/core/models/imagePreview'

export const DEFAULT_IMAGE_PREVIEW_DURATION_MS: ImagePreviewDuration = {
  min: 1400,
  max: 3200,
}

export interface RandomPreviewCandidate<T> {
  durationMs: ImagePreviewDuration
  value: T
}

interface RandomPreviewTimerOptions<T> {
  getCandidates: () => RandomPreviewCandidate<T>[]
  onChange: (value: T) => void
}

const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min

const getRandomItem = <T>(items: T[]): T | null => {
  if (!items.length) {
    return null
  }

  return items[Math.floor(Math.random() * items.length)] ?? null
}

export const createRandomPreviewTimer = <T>({
  getCandidates,
  onChange,
}: RandomPreviewTimerOptions<T>) => {
  let timeoutId: number | null = null

  const stop = () => {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  const scheduleNext = () => {
    const candidate = getRandomItem(getCandidates())

    if (!candidate) {
      stop()
      return
    }

    onChange(candidate.value)
    timeoutId = window.setTimeout(
      scheduleNext,
      getRandomInt(candidate.durationMs.min, candidate.durationMs.max),
    )
  }

  const start = () => {
    stop()
    scheduleNext()
  }

  return {
    start,
    stop,
  }
}
