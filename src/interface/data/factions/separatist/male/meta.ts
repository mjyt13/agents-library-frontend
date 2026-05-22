import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { separatist_default } from '@/interface/data/agents/default/separatist/separatist'

export const meta: SubfractionMeta = {
  id: 'separatist_male',
  name: SubfractionType.MALE,
  agents: [separatist_default],
}

