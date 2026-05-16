import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { phoenix_default } from '@/interface/data/agents/default/phoenix/phoenix'
import { createAudioContentFromFiles } from '@/utils/createAudioContentFromFiles'

const basePath = 'factions/phoenix/male/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/phoenix/male/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/phoenix/male/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/phoenix/male/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')

export const phoenix_male: Subfraction = {
  id: 'phoenix_male',
  name: SubfractionType.MALE,
  agents: [phoenix_default],
  voiceLines: createAudioContentFromFiles(audioFiles, basePath),
}
