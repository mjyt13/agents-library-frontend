import type { Faction } from '@/core/models/faction'
import { idf_male } from './male/male'

export const idf: Faction = {
  id: 'idf',
  name: 'IDF',
  subfractions: [idf_male],
}
