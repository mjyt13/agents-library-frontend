import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { markus } from '@/interface/data/agents/markus/markus'

export const meta: SubfractionMeta = {
  id: 'swat_male',
  name: SubfractionType['MALE'],
  agents: [markus],
}

