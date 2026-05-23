import type { Faction } from '@/core/models/faction'
import { seal_frogman_male } from './male/male'
import { seal_frogman_master_female } from './master_female/master_female'
import { seal_frogman_master_male } from './master_male/master_male'
import { previews } from './previews'

export const seal_frogman: Faction = {
  id: 'seal_frogman',
  name: 'SEAL Frogman',
  previews,
  subfractions: [
    seal_frogman_male,
    seal_frogman_master_female,
    seal_frogman_master_male,
  ],
}
