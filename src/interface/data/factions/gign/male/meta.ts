import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { gign_default } from '@/interface/data/agents/default/gign/gign'

export const meta: SubfractionMeta = {
  id: 'gign_male',
  name: SubfractionType.MALE,
  agents: [gign_default],
}
