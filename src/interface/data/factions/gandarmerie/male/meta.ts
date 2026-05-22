import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { aspirant } from '@/interface/data/agents/aspirant/aspirant'
import { chemhaz_captain } from '@/interface/data/agents/chemhaz_captain/chemhaz_captain'
import { medic } from '@/interface/data/agents/medic/medic'

export const meta: SubfractionMeta = {
  id: 'gandarmerie_male',
  name: SubfractionType.MALE,
  agents: [aspirant, chemhaz_captain, medic],
}

