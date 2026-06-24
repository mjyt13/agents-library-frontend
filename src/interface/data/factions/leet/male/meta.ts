import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { jungle_rebel } from '@/interface/data/agents/leet_def/leet_def'
import { osiris } from '@/interface/data/agents/osiris/osiris'
import { prof_shahmat } from '@/interface/data/agents/prof_shahmat/prof_shahmat'

export const meta: SubfractionMeta = {
  id: 'leet_male',
  name: SubfractionType['MALE'],
  agents: [jungle_rebel, osiris, prof_shahmat],
}
