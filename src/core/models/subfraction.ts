import type { Agent } from './agent'
import type { AudioContent } from './audioContent'

export const SubfractionType = {
  MALE: 'male',
  FEMALE: 'female',
  MASTER: 'master',
} as const

export const SubfractionTypeRus = {
  MALE: 'Мужские',
  FEMALE: 'Женские',
  MASTER: 'Мастерские',
} as const

// Тип: 'male' | 'female' | 'master' — используется для поля name в Subfraction
export type SubfractionType = (typeof SubfractionType)[keyof typeof SubfractionType]
export type SubfractionTypeRus = (typeof SubfractionTypeRus)[keyof typeof SubfractionTypeRus]

export interface Subfraction {
  id: string
  name: SubfractionType
  agents: Agent[]
  voiceLines: AudioContent[]
}
