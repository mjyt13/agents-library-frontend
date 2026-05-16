import type { Faction } from '@/core/models/faction'
import { gandarmerie_male } from './male/male'
import { gandarmerie_master } from './master/master'

export const gandarmerie: Faction = {
  id: 'gandarmerie',
  name: 'Gendarmerie',
  subfractions: [gandarmerie_male, gandarmerie_master],
}
