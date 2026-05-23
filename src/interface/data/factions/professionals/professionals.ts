import type { Faction } from '@/core/models/faction'
import { professionals_fem } from './fem/fem'
import { professionals_male } from './male/male'
import { professionals_master } from './master/master'
import { previews } from './previews'

export const professionals: Faction = {
  id: 'professionals',
  name: 'Professionals',
  previews,
  subfractions: [professionals_fem, professionals_male, professionals_master],
}
