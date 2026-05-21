import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { jungle_rebel } from '@/interface/data/agents/leet_def/leet_def'
import { createAudioSourceFromFiles } from '@/utils/createSubfractionAudioSource'

const basePath = 'factions/leet/male/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/leet/male/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/leet/male/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/leet/male/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')
const audioSource = createAudioSourceFromFiles(audioFiles, basePath)

export const leet_male: Subfraction = {
  id: 'leet_male',
  name: SubfractionType['MALE'],
  agents: [jungle_rebel],
  ...audioSource,
}

