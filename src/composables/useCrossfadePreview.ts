import { ref } from 'vue'
import type { ImagePreviewDuration } from '@/core/models/imagePreview'
import { createRandomPreviewTimer } from '@/utils/imagePreviewTimer'
import { decodeImageUrl, preloadImageUrls } from '@/utils/preloadImageUrls'

export interface CrossfadePreviewSource {
  durationMs: ImagePreviewDuration
  images: string[]
}

// Random candidates make "preload the next one" undefined ahead of time, so instead
// every image for a key is kicked off as soon as its source is known. By the time the
// timer swaps to any of them, the browser has already fetched (and often decoded) it,
// so the slide-in animation never uncovers a blank frame while waiting on the network.
export function useCrossfadePreview(cssVar: string, fallbackUrl = '') {
  const currentUrls = ref<Record<string, string>>({})
  const previousUrls = ref<Record<string, string>>({})
  const cleanupTimeouts: number[] = []
  let timers: Array<ReturnType<typeof createRandomPreviewTimer<string>>> = []

  function getCurrentUrl(key: string): string {
    return currentUrls.value[key] || fallbackUrl
  }

  function getPreviousUrl(key: string): string {
    return previousUrls.value[key] ?? ''
  }

  function toStyle(url: string): Record<string, string> {
    return url ? { [cssVar]: `url("${url}")` } : {}
  }

  function getStyle(key: string): Record<string, string> {
    return toStyle(getCurrentUrl(key))
  }

  function getPreviousStyle(key: string): Record<string, string> {
    return toStyle(getPreviousUrl(key))
  }

  function setUrl(key: string, url: string) {
    const currentUrl = currentUrls.value[key]

    if (currentUrl && currentUrl !== url) {
      previousUrls.value = { ...previousUrls.value, [key]: currentUrl }

      const timeout = window.setTimeout(() => {
        const nextPreviousUrls = { ...previousUrls.value }
        delete nextPreviousUrls[key]
        previousUrls.value = nextPreviousUrls
      }, 650)

      cleanupTimeouts.push(timeout)
    }

    currentUrls.value = { ...currentUrls.value, [key]: url }
  }

  function start(sources: Record<string, CrossfadePreviewSource>) {
    stop()

    timers = Object.entries(sources).map(([key, source]) => {
      preloadImageUrls(source.images)

      const timer = createRandomPreviewTimer({
        getCandidates: () =>
          source.images.map((url) => ({ durationMs: source.durationMs, value: url })),
        onChange: async (url) => {
          await decodeImageUrl(url)
          setUrl(key, url)
        },
      })

      timer.start()
      return timer
    })
  }

  function stop() {
    timers.forEach((timer) => timer.stop())
    timers = []
    cleanupTimeouts.forEach(window.clearTimeout)
    cleanupTimeouts.length = 0
  }

  return { getCurrentUrl, getPreviousUrl, getStyle, getPreviousStyle, start, stop }
}
