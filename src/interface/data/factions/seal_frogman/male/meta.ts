import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { rex } from '@/interface/data/agents/rex/rex'

export const meta: SubfractionMeta = {
  id: 'seal_frogman_male',
  name: SubfractionType.MALE,
  agents: [rex],
}
