import type { SubfractionMeta } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { maximus } from '@/interface/data/agents/maximus/maximus'
import { dragomir } from '@/interface/data/agents/dragomir/dragomir'
import { rezan } from '@/interface/data/agents/rezan/rezan'
import { rezan_the_redshirt } from '@/interface/data/agents/rezan/rezan_the_redshirt'
import { blackwolf } from '@/interface/data/agents/blackwolf/blackwolf'

export const meta: SubfractionMeta = {
  id: 'sabre_male',
  name: SubfractionType['MALE'],
  agents: [maximus, dragomir, rezan, blackwolf, rezan_the_redshirt],
}
