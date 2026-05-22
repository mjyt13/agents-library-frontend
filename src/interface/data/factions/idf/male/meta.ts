import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { idf_default } from '@/interface/data/agents/default/idf/idf'

export const meta: SubfractionMeta = {
  id: 'idf_male',
  name: SubfractionType.MALE,
  agents: [idf_default],
}

