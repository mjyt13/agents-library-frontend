import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { ava } from '@/interface/data/agents/ava/ava'

export const meta: SubfractionMeta = {
  id: 'master_fbi',
  name: SubfractionType['MASTER_FBI'],
  agents: [ava],
}

