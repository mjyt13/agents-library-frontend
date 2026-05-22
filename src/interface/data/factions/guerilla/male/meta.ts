import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { mango_dabisi } from '@/interface/data/agents/mango_dabisi/mango_dabisil'

export const meta: SubfractionMeta = {
  id: 'guerilla_male',
  name: SubfractionType.MALE,
  agents: [mango_dabisi],
}

