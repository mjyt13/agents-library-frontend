import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { davida } from '@/interface/data/agents/davida/davida'

export const meta: SubfractionMeta = {
  id: 'seal_frogman_master_female',
  name: SubfractionType.MASTER_FEMALE,
  agents: [davida],
}

