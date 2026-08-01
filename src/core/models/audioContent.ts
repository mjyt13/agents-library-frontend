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

export interface GroupState {
  items: AudioItem[]
  heardIds: Set<string>
  isLoading: boolean
  isPlaying: boolean
  error: string
  lastPlayedAt: number
  resolvedIndexes: Set<number>
  pendingIndexes: Set<number>
  pendingItemPromises: Set<Promise<AudioItem | null>>
  isFullyResolved: boolean
  resolvePromise: Promise<void> | null
}

export interface VoicePageMeta {
  id: VoicePageId
  groups: AudioGroupMeta[]
}

export interface AudioContent {
  meta: AudioGroupMeta
  audioItems: Array<() => Promise<AudioItem>>
}
