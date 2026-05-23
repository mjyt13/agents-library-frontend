import type { Faction } from '@/core/models/faction'
import { idf_male } from './male/male'
import { previews } from './previews'

export const idf: Faction = {
  id: 'idf',
  name: 'IDF',
  previews,
  subfractions: [idf_male],
}
