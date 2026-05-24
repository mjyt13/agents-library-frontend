import { createImagePreviewSourceFromModules } from '@/utils/createImagePreviewSource'

const previewModules = import.meta.glob('./previews/*.{png,jpg,jpeg,webp}', {
  import: 'default',
  query: '?url',
})

const durationMs = { min: 1100, max: 2200 }

export const previews = createImagePreviewSourceFromModules(previewModules, durationMs)
