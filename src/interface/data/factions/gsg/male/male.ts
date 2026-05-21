import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { createAudioSourceFromFiles } from '@/utils/createSubfractionAudioSource'
import { gsg_default } from '@/interface/data/agents/default/gsg/gsg'

const basePath = 'factions/gsg/male/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/gsg/male/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/gsg/male/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/gsg/male/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')
const audioSource = createAudioSourceFromFiles(audioFiles, basePath)

export const gsg_male: Subfraction = {
  id: 'gsg_male',
  name: SubfractionType['MALE'],
  agents: [gsg_default],
  ...audioSource,
}

