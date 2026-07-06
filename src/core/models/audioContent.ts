export type VoicePageId = 1 | 2 | 3

export interface AudioItem {
  id: string
  title: string
  url: string
}

export interface AudioGroupMeta {
  id: string
  canonicalId?: string
  name: string
  page?: VoicePageId
  isMissing?: boolean
  itemCount?: number
}

export interface VoicePageMeta {
  id: VoicePageId
  groups: AudioGroupMeta[]
}

export interface AudioContent {
  meta: AudioGroupMeta
  audioItems: Array<() => Promise<AudioItem>>
}
