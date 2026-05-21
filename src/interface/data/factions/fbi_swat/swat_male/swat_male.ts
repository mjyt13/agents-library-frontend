import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { markus } from '@/interface/data/agents/markus/markus'
import { createAudioSourceFromFiles } from '@/utils/createSubfractionAudioSource'

const basePath = 'factions/fbi_swat/swat_male/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/fbi_swat/swat_male/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/fbi_swat/swat_male/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/fbi_swat/swat_male/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')
const audioSource = createAudioSourceFromFiles(audioFiles, basePath)

export const swat_male: Subfraction = {
  id: 'swat_male',
  name: SubfractionType['MALE'],
  agents: [markus],
  ...audioSource,
}

