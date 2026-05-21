import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { separatist_default } from '@/interface/data/agents/default/separatist/separatist'
import { createAudioSourceFromFiles } from '@/utils/createSubfractionAudioSource'

const basePath = 'factions/separatist/male/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/separatist/male/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/separatist/male/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/separatist/male/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')
const audioSource = createAudioSourceFromFiles(audioFiles, basePath)

export const separatist_male: Subfraction = {
  id: 'separatist_male',
  name: SubfractionType.MALE,
  agents: [separatist_default],
  ...audioSource,
}

