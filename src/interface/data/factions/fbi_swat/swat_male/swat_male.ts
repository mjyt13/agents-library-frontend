import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { markus } from '@/interface/data/agents/markus/markus'
import { createAudioContentFromFiles } from '@/utils/createAudioContentFromFiles'

const basePath = 'factions/fbi_swat/swat_male/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/fbi_swat/swat_male/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/fbi_swat/swat_male/audio/*.oga'),
  ...import.meta.glob('/src/interface/data/factions/fbi_swat/swat_male/audio/*.wav'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')

export const swat_male: Subfraction = {
  id: 'swat_male',
  name: SubfractionType['MALE'],
  agents: [markus],
  voiceLines: createAudioContentFromFiles(audioFiles, basePath),
}
