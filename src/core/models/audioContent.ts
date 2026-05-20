// content.ts
/**
 * Model for a single audio file such as a voice line.
 */
export interface AudioItem {
  id: string
  /**
   * Voice line title.
   */
  title: string
  /**
   * Full audio file URL.
   */
  url: string
}

/**
 * Model for a section of grouped voice lines.
 */
export interface AudioContent {
  id: string
  canonicalId?: string
  name: string
  page?: 1 | 2
  isMissing?: boolean
  audioItems: AudioItem[]
}
