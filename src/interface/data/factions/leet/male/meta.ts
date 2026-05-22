import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { jungle_rebel } from '@/interface/data/agents/leet_def/leet_def'

export const meta: SubfractionMeta = {
  id: 'leet_male',
  name: SubfractionType['MALE'],
  agents: [jungle_rebel],
}

