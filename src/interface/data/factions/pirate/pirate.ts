import type { Faction } from '@/core/models/faction'
import { pirate_male } from './male/male'
import { previews } from './previews'

export const pirate: Faction = {
  id: 'pirate',
  name: 'Pirate',
  previews,
  subfractions: [pirate_male],
}
