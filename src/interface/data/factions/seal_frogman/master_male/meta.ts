import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { wetsox } from '@/interface/data/agents/wetsox/wetsox'

export const meta: SubfractionMeta = {
  id: 'seal_frogman_master_male',
  name: SubfractionType.MASTER_MALE,
  agents: [wetsox],
}
