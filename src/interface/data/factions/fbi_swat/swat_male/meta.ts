import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { markus } from '@/interface/data/agents/markus/markus'
import { michael_syfers } from '@/interface/data/agents/michael_syfers/michael_syfers'
import { bio_haz_specialist } from '@/interface/data/agents/bio_haz_specialist/bio_haz_specialist'
import { chem_haz_specialist } from '@/interface/data/agents/chem_haz_specialist/chem_haz_specialist'

export const meta: SubfractionMeta = {
  id: 'swat_male',
  name: SubfractionType['MALE'],
  agents: [markus, michael_syfers, bio_haz_specialist, chem_haz_specialist],
}
