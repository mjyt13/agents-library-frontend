import type { Subfraction } from './subfraction'
import type { ImagePreviewSource } from './imagePreview'

export interface Faction {
  id: string
  name: string
  previews?: ImagePreviewSource
  subfractions: Subfraction[]
}
