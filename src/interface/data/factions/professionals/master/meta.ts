import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { darryl_miami } from '@/interface/data/agents/darryl/darryl_miami'
import { darryl_royale } from '@/interface/data/agents/darryl/darryl_royale'
import { sir_bloody_silent_darryl } from '@/interface/data/agents/darryl/sir_bloody_silent_darryl'
import { sir_bloody_loudmouth_darryl } from '@/interface/data/agents/darryl/sir_bloody_loudmouth_darryl'
import { sir_bloody_skullhead_darryl } from '@/interface/data/agents/darryl/sir_bloody_skullhead_darryl'
import { bloody_darryl_the_strapped } from '@/interface/data/agents/darryl/bloody_darryl_the_strapped'

export const meta: SubfractionMeta = {
  id: 'professionals_master',
  name: SubfractionType.MASTER,
  agents: [
    darryl_miami,
    darryl_royale,
    sir_bloody_loudmouth_darryl,
    sir_bloody_silent_darryl,
    sir_bloody_skullhead_darryl,
    bloody_darryl_the_strapped,
  ],
}
