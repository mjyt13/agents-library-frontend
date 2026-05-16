import type { Faction } from '@/core/models/faction'
import { phoenix_male } from './male/male'

export const phoenix: Faction = {
  id: 'phoenix',
  name: 'Phoenix Connexion',
  subfractions: [phoenix_male],
}
