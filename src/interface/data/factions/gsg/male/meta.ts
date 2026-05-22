import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { gsg_default } from '@/interface/data/agents/default/gsg/gsg'

export const meta: SubfractionMeta = {
  id: 'gsg_male',
  name: SubfractionType['MALE'],
  agents: [gsg_default],
}

