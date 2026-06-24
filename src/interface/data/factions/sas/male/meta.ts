import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { sas_default } from '@/interface/data/agents/default/sas/sas'
import { b_squadron_officer } from '@/interface/data/agents/b_squadron_officer/b_squadron_officer'

export const meta: SubfractionMeta = {
  id: 'sas_male',
  name: SubfractionType['MALE'],
  agents: [sas_default, b_squadron_officer],
}
