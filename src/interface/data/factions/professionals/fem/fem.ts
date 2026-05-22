import type { Subfraction } from '@/core/models/subfraction'
import { meta } from './meta'

export const professionals_fem: Subfraction = {
  meta,
  loadAudioSource: () => import('./audio').then((module) => module.audioSource),
}
