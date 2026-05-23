import type { Agent } from './agent'
import type { AudioContent, VoicePageId, VoicePageMeta } from './audioContent'
import type { ImagePreviewSource } from './imagePreview'

export const SubfractionType = {
  MALE: 'Male',
  FEMALE: 'Female',
  MASTER: 'Master',
  MASTER_FEMALE: 'Master (Female)',
  MASTER_MALE: 'Master (Male)',
  MASTER_FBI: 'Master (FBI)',
  MASTER_SWAT: 'Master (SWAT)',
} as const

export const SubfractionTypeRus = {
  MALE: 'Мужские',
  FEMALE: 'Женские',
  MASTER: 'Мастерские',
  MASTER_FEMALE: 'Мастерские (женские)',
  MASTER_MALE: 'Мастерские (мужские)',
  MASTER_FBI: 'Мастерские (ФБР)',
  MASTER_SWAT: 'Мастерские (SWAT)',
} as const

// Тип: 'male' | 'female' | 'master' — используется для поля name в Subfraction
export type SubfractionType = (typeof SubfractionType)[keyof typeof SubfractionType]
export type SubfractionTypeRus = (typeof SubfractionTypeRus)[keyof typeof SubfractionTypeRus]

export interface SubfractionMeta {
  id: string
  name: SubfractionType
  agents: Agent[]
}

export interface SubfractionAudioSource {
  voicePages: VoicePageMeta[]
  loadVoicePage: (pageId: VoicePageId) => Promise<AudioContent[]>
}

export interface Subfraction {
  meta: SubfractionMeta
  loadAudioSource: () => Promise<SubfractionAudioSource>
  loadPreviewSource?: () => Promise<ImagePreviewSource>
}
