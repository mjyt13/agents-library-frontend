import type { Faction } from '@/core/models/faction'
import { sabre_master } from './master/master'
import { sabre_male } from './male/male'

export const sabre: Faction = {
  id: 'sabre',
  name: 'Sabre',
  subfractions: [sabre_male, sabre_master],
}
