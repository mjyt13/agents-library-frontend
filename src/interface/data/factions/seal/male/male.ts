import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { seal_default } from '@/interface/data/agents/default/seal/seal'
import { createAudioContentFromFiles } from '@/utils/createAudioContentFromFiles'

const basePath = 'factions/seal/male/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/seal/male/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/seal/male/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/seal/male/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')

export const seal_male: Subfraction = {
  id: 'seal_male',
  name: SubfractionType.MALE,
  agents: [seal_default],
  voiceLines: createAudioContentFromFiles(audioFiles, basePath),
}
