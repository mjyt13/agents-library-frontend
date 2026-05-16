import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { davida } from '@/interface/data/agents/davida/davida'
import { createAudioContentFromFiles } from '@/utils/createAudioContentFromFiles'

const basePath = 'factions/seal_frogman/master_female/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/seal_frogman/master_female/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/seal_frogman/master_female/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/seal_frogman/master_female/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')

export const seal_frogman_master_female: Subfraction = {
  id: 'seal_frogman_master_female',
  name: SubfractionType.MASTER_FEMALE,
  agents: [davida],
  voiceLines: createAudioContentFromFiles(audioFiles, basePath),
}
