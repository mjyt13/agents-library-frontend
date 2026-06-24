import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { trapper } from '@/interface/data/agents/trapper/trapper'

export const meta: SubfractionMeta = {
  id: 'guerilla_fem',
  name: SubfractionType.FEMALE,
  agents: [trapper],
}
