import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { crasswater } from '@/interface/data/agents/crasswater/crasswater'

export const meta: SubfractionMeta = {
  id: 'guerilla_master_male',
  name: SubfractionType.MASTER_MALE,
  agents: [crasswater],
}
