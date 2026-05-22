import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { anarchist_default } from '@/interface/data/agents/default/anarchist/anarchist'

export const meta: SubfractionMeta = {
  id: 'anarchist_male',
  name: SubfractionType.MALE,
  agents: [anarchist_default],
}
