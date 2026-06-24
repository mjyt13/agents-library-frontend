import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { aspirant } from '@/interface/data/agents/aspirant/aspirant'
import { chemhaz_captain } from '@/interface/data/agents/chemhaz_captain/chemhaz_captain'
import { medic } from '@/interface/data/agents/medic/medic'
import { officer_jacques_beltram } from '@/interface/data/agents/officer_jacques_beltram/officer_jacques_beltram'

export const meta: SubfractionMeta = {
  id: 'gandarmerie_male',
  name: SubfractionType.MALE,
  agents: [aspirant, chemhaz_captain, medic, officer_jacques_beltram],
}
