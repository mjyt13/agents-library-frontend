import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { vypa } from '@/interface/data/agents/vypa/vypa'

export const meta: SubfractionMeta = {
  id: 'guerilla_master_fem',
  name: SubfractionType.MASTER_FEMALE,
  agents: [vypa],
}
