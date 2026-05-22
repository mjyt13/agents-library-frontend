import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { mae } from '@/interface/data/agents/mae/mae'

export const meta: SubfractionMeta = {
  id: 'master_swat',
  name: SubfractionType['MASTER_SWAT'],
  agents: [mae],
}

