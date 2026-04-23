import type { Faction } from '@/core/models/faction'
import { professionals_fem } from './fem/fem'
import { professionals_master } from './master/master'

export const professionals: Faction = {
  id: 'professionals',
  name: 'Professionals',
  subfractions: [professionals_fem, professionals_master],
}
