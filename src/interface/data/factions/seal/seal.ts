import type { Faction } from '@/core/models/faction'
import { seal_male } from './male/male'
import { seal_master } from './master/master'

export const seal: Faction = {
  id: 'seal',
  name: 'SEAL',
  subfractions: [seal_male, seal_master],
}
