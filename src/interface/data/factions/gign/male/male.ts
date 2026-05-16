import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { gign_default } from '@/interface/data/agents/default/gign/gign'
import { createAudioContentFromFiles } from '@/utils/createAudioContentFromFiles'

const basePath = 'factions/gign/male/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/gign/male/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/gign/male/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/gign/male/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')

export const gign_male: Subfraction = {
  id: 'gign_male',
  name: SubfractionType.MALE,
  agents: [gign_default],
  voiceLines: createAudioContentFromFiles(audioFiles, basePath),
}
