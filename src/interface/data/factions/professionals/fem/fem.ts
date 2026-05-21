import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { sally } from '@/interface/data/agents/sally/sally'
import { createAudioSourceFromFiles } from '@/utils/createSubfractionAudioSource'

const basePath = 'factions/professionals/fem/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/professionals/fem/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/professionals/fem/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/professionals/fem/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')
const audioSource = createAudioSourceFromFiles(audioFiles, basePath)

export const professionals_fem: Subfraction = {
  id: 'professionals_fem',
  name: SubfractionType.FEMALE,
  agents: [sally],
  ...audioSource,
}
