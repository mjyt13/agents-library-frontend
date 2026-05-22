import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { professional_default } from '@/interface/data/agents/default/professional/professional'

export const meta: SubfractionMeta = {
  id: 'professionals_male',
  name: SubfractionType.MALE,
  agents: [professional_default],
}

