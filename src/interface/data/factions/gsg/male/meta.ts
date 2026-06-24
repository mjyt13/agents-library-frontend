import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { gsg_default } from '@/interface/data/agents/default/gsg/gsg'
import { third_commando_company } from '@/interface/data/agents/3rd_commando_company/3rd_commando_company'

export const meta: SubfractionMeta = {
  id: 'gsg_male',
  name: SubfractionType['MALE'],
  agents: [gsg_default, third_commando_company],
}
