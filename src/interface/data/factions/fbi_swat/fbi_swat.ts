import type { Faction } from '@/core/models/faction'
import { master_fbi } from './master_fbi/master_fbi'
import { master_swat } from './master_swat/master_swat'
import { swat_fem } from './swat_fem/swat_fem'
import { swat_male } from './swat_male/swat_male'

export const fbi_swat: Faction = {
  id: 'fbi_swat',
  name: 'FBI SWAT',
  subfractions: [swat_fem, swat_male, master_fbi, master_swat],
}
