import type { Faction } from '@/core/models/faction'
import { pirate_male } from './male/male'

export const pirate: Faction = {
  id: 'pirate',
  name: 'Pirate',
  subfractions: [pirate_male],
}
