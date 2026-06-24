import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { seal_default } from '@/interface/data/agents/default/seal/seal'
import { two_times_mccoy_tacp_cavalry } from '@/interface/data/agents/two_times_mccoy_tacp_cavalry/two_times_mccoy_tacp_cavalry'
import { two_times_mccoy_usaf_tacp } from '@/interface/data/agents/two_times_mccoy_usaf_tacp/two_times_mccoy_usaf_tacp'
import { buckshot } from '@/interface/data/agents/buckshot/buckshot'
import { blueberries_buckshot } from '@/interface/data/agents/blueberries_buckshot/blueberries_buckshot'

export const meta: SubfractionMeta = {
  id: 'seal_male',
  name: SubfractionType.MALE,
  agents: [
    seal_default,
    two_times_mccoy_tacp_cavalry,
    two_times_mccoy_usaf_tacp,
    blueberries_buckshot,
    buckshot,
  ],
}
