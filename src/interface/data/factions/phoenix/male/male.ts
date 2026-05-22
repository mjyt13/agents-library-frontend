import type { Subfraction } from '@/core/models/subfraction'
import { meta } from './meta'

export const phoenix_male: Subfraction = {
  meta,
  loadAudioSource: () => import('./audio').then((module) => module.audioSource),
}

