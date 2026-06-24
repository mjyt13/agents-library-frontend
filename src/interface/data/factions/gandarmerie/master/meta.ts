import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { rouchard } from '@/interface/data/agents/rouchard/rouchard'

export const meta: SubfractionMeta = {
  id: 'gandarmerie_master',
  name: SubfractionType.MASTER,
  agents: [rouchard],
}
