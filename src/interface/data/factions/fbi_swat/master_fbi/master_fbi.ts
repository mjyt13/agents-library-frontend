import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { ava } from '@/interface/data/agents/ava/ava'
import { createAudioSourceFromFiles } from '@/utils/createSubfractionAudioSource'

const basePath = 'factions/fbi_swat/master_fbi/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/fbi_swat/master_fbi/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/fbi_swat/master_fbi/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/fbi_swat/master_fbi/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')
const audioSource = createAudioSourceFromFiles(audioFiles, basePath)

export const master_fbi: Subfraction = {
  id: 'master_fbi',
  name: SubfractionType['MASTER_FBI'],
  agents: [ava],
  ...audioSource,
}

