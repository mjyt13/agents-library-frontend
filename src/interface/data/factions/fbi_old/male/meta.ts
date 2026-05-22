import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { fbi_old_default } from '@/interface/data/agents/default/fbi_old/fbi_old'

export const meta: SubfractionMeta = {
  id: 'fbi_old_male',
  name: SubfractionType['MALE'],
  agents: [fbi_old_default],
}

