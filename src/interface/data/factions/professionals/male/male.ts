import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { professional_default } from '@/interface/data/agents/default/professional/professional'
import { createAudioSourceFromFiles } from '@/utils/createSubfractionAudioSource'

const basePath = 'factions/professionals/male/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/professionals/male/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/professionals/male/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/professionals/male/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')
const audioSource = createAudioSourceFromFiles(audioFiles, basePath)

export const professionals_male: Subfraction = {
  id: 'professionals_male',
  name: SubfractionType.MALE,
  agents: [professional_default],
  ...audioSource,
}

