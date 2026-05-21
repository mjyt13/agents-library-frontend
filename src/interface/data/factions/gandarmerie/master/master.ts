import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { rouchard } from '@/interface/data/agents/rouchard/rouchard'
import { createAudioSourceFromFiles } from '@/utils/createSubfractionAudioSource'

const basePath = 'factions/gandarmerie/master/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/gandarmerie/master/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/gandarmerie/master/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/gandarmerie/master/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')
const audioSource = createAudioSourceFromFiles(audioFiles, basePath)

export const gandarmerie_master: Subfraction = {
  id: 'gandarmerie_master',
  name: SubfractionType.MASTER,
  agents: [rouchard],
  ...audioSource,
}

