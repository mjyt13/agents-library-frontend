import type { Subfraction } from '@/core/models/subfraction'
import { meta } from './meta'

export const master_swat: Subfraction = {
  meta,
  loadAudioSource: () => import('./audio').then((module) => module.audioSource),
  loadPreviewSource: () => import('./previews').then((module) => module.previewSource),
}
