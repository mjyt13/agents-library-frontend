import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { ricksaw } from '@/interface/data/agents/ricksaw/ricksaw'
import { createAudioSourceFromFiles } from '@/utils/createSubfractionAudioSource'

const basePath = 'factions/seal/master/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/seal/master/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/seal/master/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/seal/master/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')
const audioSource = createAudioSourceFromFiles(audioFiles, basePath)

export const seal_master: Subfraction = {
  id: 'seal_master',
  name: SubfractionType.MASTER,
  agents: [ricksaw],
  ...audioSource,
}
