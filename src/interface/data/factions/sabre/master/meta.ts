import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { romanov } from '@/interface/data/agents/romanov/romanov'

export const meta: SubfractionMeta = {
  id: 'sabre_master',
  name: SubfractionType['MASTER'],
  agents: [romanov],
}

