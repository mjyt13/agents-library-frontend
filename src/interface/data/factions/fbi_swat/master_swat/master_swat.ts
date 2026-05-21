import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { mae } from '@/interface/data/agents/mae/mae'
import { createAudioSourceFromFiles } from '@/utils/createSubfractionAudioSource'

const basePath = 'factions/fbi_swat/master_swat/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/fbi_swat/master_swat/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/fbi_swat/master_swat/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/fbi_swat/master_swat/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')
const audioSource = createAudioSourceFromFiles(audioFiles, basePath)

export const master_swat: Subfraction = {
  id: 'master_swat',
  name: SubfractionType['MASTER_SWAT'],
  agents: [mae],
  ...audioSource,
}

