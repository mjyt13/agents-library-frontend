import type { Subfraction } from '@/core/models/subfraction'
import { meta } from './meta'

export const pirate_male: Subfraction = {
  meta,
  loadAudioSource: () => import('./audio').then((module) => module.audioSource),
}

