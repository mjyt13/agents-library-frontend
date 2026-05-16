import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { pirate_default } from '@/interface/data/agents/default/pirate/pirate'
import { createAudioContentFromFiles } from '@/utils/createAudioContentFromFiles'

const basePath = 'factions/pirate/male/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/pirate/male/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/pirate/male/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/pirate/male/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')

export const pirate_male: Subfraction = {
  id: 'pirate_male',
  name: SubfractionType.MALE,
  agents: [pirate_default],
  voiceLines: createAudioContentFromFiles(audioFiles, basePath),
}
