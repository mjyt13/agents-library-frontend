import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { darryl_miami } from '@/interface/data/agents/darryl/darryl_miami'
import { darryl_royale } from '@/interface/data/agents/darryl/darryl_royale'

export const meta: SubfractionMeta = {
  id: 'professionals_master',
  name: SubfractionType.MASTER,
  agents: [darryl_miami, darryl_royale],
}

