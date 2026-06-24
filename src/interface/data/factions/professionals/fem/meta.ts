import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { sally } from '@/interface/data/agents/sally/sally'
import { safecracker_voltzmann } from '@/interface/data/agents/safecracker_voltzmann/safecracker_voltzmann'

export const meta: SubfractionMeta = {
  id: 'professionals_fem',
  name: SubfractionType.FEMALE,
  agents: [sally, safecracker_voltzmann],
}
