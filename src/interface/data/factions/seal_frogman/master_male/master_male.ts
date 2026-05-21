import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { wetsox } from '@/interface/data/agents/wetsox/wetsox'
import { createAudioSourceFromFiles } from '@/utils/createSubfractionAudioSource'

const basePath = 'factions/seal_frogman/master_male/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/seal_frogman/master_male/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/seal_frogman/master_male/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/seal_frogman/master_male/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')
const audioSource = createAudioSourceFromFiles(audioFiles, basePath)

export const seal_frogman_master_male: Subfraction = {
  id: 'seal_frogman_master_male',
  name: SubfractionType.MASTER_MALE,
  agents: [wetsox],
  ...audioSource,
}

