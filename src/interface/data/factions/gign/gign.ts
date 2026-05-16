import type { Faction } from '@/core/models/faction'
import { gign_male } from './male/male'

export const gign: Faction = {
  id: 'gign',
  name: 'GIGN',
  subfractions: [gign_male],
}
