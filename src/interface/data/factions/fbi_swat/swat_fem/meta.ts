import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { farlow } from '@/interface/data/agents/farlow/farlow'

export const meta: SubfractionMeta = {
  id: 'swat_fem',
  name: SubfractionType['FEMALE'],
  agents: [farlow],
}
