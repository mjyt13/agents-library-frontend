import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { pirate_default } from '@/interface/data/agents/default/pirate/pirate'

export const meta: SubfractionMeta = {
  id: 'pirate_male',
  name: SubfractionType.MALE,
  agents: [pirate_default],
}

