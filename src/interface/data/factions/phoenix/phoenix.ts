import type { Faction } from '@/core/models/faction'
import { phoenix_male } from './male/male'
import { previews } from './previews'

export const phoenix: Faction = {
  id: 'phoenix',
  name: 'Phoenix Connexion',
  previews,
  subfractions: [phoenix_male],
}
