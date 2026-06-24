import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { crasswater } from '@/interface/data/agents/crasswater/crasswater'
import { medium_rare_crasswater } from '@/interface/data/agents/crasswater/medium_rare_crasswater'

export const meta: SubfractionMeta = {
  id: 'guerilla_master_male',
  name: SubfractionType.MASTER_MALE,
  agents: [crasswater, medium_rare_crasswater],
}
