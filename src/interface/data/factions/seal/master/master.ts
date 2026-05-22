import type { Subfraction } from '@/core/models/subfraction'
import { meta } from './meta'

export const seal_master: Subfraction = {
  meta,
  loadAudioSource: () => import('./audio').then((module) => module.audioSource),
}
