import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { mango_dabisi } from '@/interface/data/agents/mango_dabisi/mango_dabisil'
import { arno_the_overgrown } from '@/interface/data/agents/arno_the_overgrown/arno_the_overgrown'

export const meta: SubfractionMeta = {
  id: 'guerilla_male',
  name: SubfractionType.MALE,
  agents: [mango_dabisi, arno_the_overgrown],
}
