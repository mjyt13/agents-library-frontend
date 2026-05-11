import type { Faction } from '@/core/models/faction'
import { leet_master } from './master/master'
import { leet_male } from './male/male'

export const leet: Faction = {
  id: 'leet',
  name: 'Elite Crew',
  subfractions: [leet_male, leet_master],
}
