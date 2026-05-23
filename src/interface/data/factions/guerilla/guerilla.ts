import type { Faction } from '@/core/models/faction'
import { guerilla_fem } from './fem/fem'
import { guerilla_male } from './male/male'
import { guerilla_master_fem } from './master_fem/master_fem'
import { guerilla_master_male } from './master_male/master_male'
import { previews } from './previews'

export const guerilla: Faction = {
  id: 'guerilla',
  name: 'Guerilla',
  previews,
  subfractions: [guerilla_fem, guerilla_male, guerilla_master_fem, guerilla_master_male],
}
