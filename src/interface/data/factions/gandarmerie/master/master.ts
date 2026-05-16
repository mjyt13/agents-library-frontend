import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { rouchard } from '@/interface/data/agents/rouchard/rouchard'
import { createAudioContentFromFiles } from '@/utils/createAudioContentFromFiles'

const basePath = 'factions/gandarmerie/master/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/gandarmerie/master/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/gandarmerie/master/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/gandarmerie/master/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')

export const gandarmerie_master: Subfraction = {
  id: 'gandarmerie_master',
  name: SubfractionType.MASTER,
  agents: [rouchard],
  voiceLines: createAudioContentFromFiles(audioFiles, basePath),
}
