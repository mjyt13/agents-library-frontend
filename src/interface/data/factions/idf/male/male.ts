import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { idf_default } from '@/interface/data/agents/default/idf/idf'
import { createAudioContentFromFiles } from '@/utils/createAudioContentFromFiles'

const basePath = 'factions/idf/male/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/idf/male/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/idf/male/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/idf/male/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')

export const idf_male: Subfraction = {
  id: 'idf_male',
  name: SubfractionType.MALE,
  agents: [idf_default],
  voiceLines: createAudioContentFromFiles(audioFiles, basePath),
}
