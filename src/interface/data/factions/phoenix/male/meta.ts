import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { phoenix_default } from '@/interface/data/agents/default/phoenix/phoenix'
import { slingshot } from '@/interface/data/agents/slingshot/slingshot'

export const meta: SubfractionMeta = {
  id: 'phoenix_male',
  name: SubfractionType.MALE,
  agents: [phoenix_default, slingshot],
}
