import type { Faction } from '@/core/models/faction'
import { gign_male } from './male/male'
import { previews } from './previews'

export const gign: Faction = {
  id: 'gign',
  name: 'GIGN',
  previews,
  subfractions: [gign_male],
}
