import type { ImagePreviewDuration, ImagePreviewSource } from '@/core/models/imagePreview'
import { DEFAULT_IMAGE_PREVIEW_DURATION_MS } from '@/utils/imagePreviewTimer'

type ImageAssetModules = Record<string, () => Promise<unknown>>

export const createImagePreviewSourceFromModules = (
  imageModules: ImageAssetModules,
  durationMs: ImagePreviewDuration = DEFAULT_IMAGE_PREVIEW_DURATION_MS,
): ImagePreviewSource => ({
  durationMs,
  loadImages: async () => {
    const modules = Object.entries(imageModules).sort(([left], [right]) =>
      left.localeCompare(right, undefined, { numeric: true }),
    )
    const urls = await Promise.all(modules.map(([, loadModule]) => loadModule()))

    return urls.map(String).filter(Boolean)
  },
})
