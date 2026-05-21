import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { farlow } from '@/interface/data/agents/farlow/farlow'
import { createAudioSourceFromFiles } from '@/utils/createSubfractionAudioSource'

const basePath = 'factions/fbi_swat/swat_fem/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/fbi_swat/swat_fem/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/fbi_swat/swat_fem/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/fbi_swat/swat_fem/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')
const audioSource = createAudioSourceFromFiles(audioFiles, basePath)

export const swat_fem: Subfraction = {
  id: 'swat_fem',
  name: SubfractionType['FEMALE'],
  agents: [farlow],
  ...audioSource,
}

