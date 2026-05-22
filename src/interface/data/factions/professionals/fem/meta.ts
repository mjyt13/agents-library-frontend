import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { sally } from '@/interface/data/agents/sally/sally'

export const meta: SubfractionMeta = {
  id: 'professionals_fem',
  name: SubfractionType.FEMALE,
  agents: [sally],
}
