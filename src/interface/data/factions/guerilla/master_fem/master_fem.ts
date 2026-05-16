import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { vypa } from '@/interface/data/agents/vypa/vypa'
import { createAudioContentFromFiles } from '@/utils/createAudioContentFromFiles'

const basePath = 'factions/guerilla/master_fem/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/guerilla/master_fem/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/guerilla/master_fem/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/guerilla/master_fem/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')

export const guerilla_master_fem: Subfraction = {
  id: 'guerilla_master_fem',
  name: SubfractionType.MASTER_FEMALE,
  agents: [vypa],
  voiceLines: createAudioContentFromFiles(audioFiles, basePath),
}
