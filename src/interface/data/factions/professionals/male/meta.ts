import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { professional_default } from '@/interface/data/agents/default/professional/professional'
import { little_kev } from '@/interface/data/agents/little_kev/little_kev'
import { number_k } from '@/interface/data/agents/number_k/number_k'

export const meta: SubfractionMeta = {
  id: 'professionals_male',
  name: SubfractionType.MALE,
  agents: [professional_default, little_kev, number_k],
}
