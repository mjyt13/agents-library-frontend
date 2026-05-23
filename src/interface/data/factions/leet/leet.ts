import type { Faction } from '@/core/models/faction'
import { leet_master } from './master/master'
import { leet_male } from './male/male'
import { previews } from './previews'

export const leet: Faction = {
  id: 'leet',
  name: 'Elite Crew',
  previews,
  subfractions: [leet_male, leet_master],
}
