import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { crasswater } from '@/interface/data/agents/crasswater/crasswater'
import { createAudioSourceFromFiles } from '@/utils/createSubfractionAudioSource'

const basePath = 'factions/guerilla/master_male/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/guerilla/master_male/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/guerilla/master_male/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/guerilla/master_male/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')
const audioSource = createAudioSourceFromFiles(audioFiles, basePath)

export const guerilla_master_male: Subfraction = {
  id: 'guerilla_master_male',
  name: SubfractionType.MASTER_MALE,
  agents: [crasswater],
  ...audioSource,
}
