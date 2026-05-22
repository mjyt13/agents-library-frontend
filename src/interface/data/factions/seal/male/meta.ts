import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { seal_default } from '@/interface/data/agents/default/seal/seal'

export const meta: SubfractionMeta = {
  id: 'seal_male',
  name: SubfractionType.MALE,
  agents: [seal_default],
}

