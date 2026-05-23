import { createImagePreviewSourceFromModules } from '@/utils/createImagePreviewSource'

const previewModules = import.meta.glob('./previews/*.{png,jpg,jpeg,webp}', {
  import: 'default',
  query: '?url',
})

export const previewSource = createImagePreviewSourceFromModules(previewModules)
