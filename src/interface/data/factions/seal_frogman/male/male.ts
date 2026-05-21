import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { rex } from '@/interface/data/agents/rex/rex'
import { createAudioSourceFromFiles } from '@/utils/createSubfractionAudioSource'

const basePath = 'factions/seal_frogman/male/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/seal_frogman/male/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/seal_frogman/male/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/seal_frogman/male/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')
const audioSource = createAudioSourceFromFiles(audioFiles, basePath)

export const seal_frogman_male: Subfraction = {
  id: 'seal_frogman_male',
  name: SubfractionType.MALE,
  agents: [rex],
  ...audioSource,
}
