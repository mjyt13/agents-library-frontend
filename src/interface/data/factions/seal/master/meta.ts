import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { ricksaw } from '@/interface/data/agents/ricksaw/ricksaw'

export const meta: SubfractionMeta = {
  id: 'seal_master',
  name: SubfractionType.MASTER,
  agents: [ricksaw],
}
