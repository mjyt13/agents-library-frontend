import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { muhlik } from '@/interface/data/agents/muhlik/muhlik'

export const meta: SubfractionMeta = {
  id: 'leet_master',
  name: SubfractionType['MASTER'],
  agents: [muhlik],
}
