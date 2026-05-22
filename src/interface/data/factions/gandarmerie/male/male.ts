import type { Subfraction } from '@/core/models/subfraction'
import { meta } from './meta'

export const gandarmerie_male: Subfraction = {
  meta,
  loadAudioSource: () => import('./audio').then((module) => module.audioSource),
}

