import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { createAudioSourceFromFiles } from '@/utils/createSubfractionAudioSource'
import { fbi_old_default } from '@/interface/data/agents/default/fbi_old/fbi_old'

const basePath = 'factions/fbi_old/male/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/fbi_old/male/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/fbi_old/male/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/fbi_old/male/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')
const audioSource = createAudioSourceFromFiles(audioFiles, basePath)

export const fbi_old_male: Subfraction = {
  id: 'fbi_old_male',
  name: SubfractionType['MALE'],
  agents: [fbi_old_default],
  ...audioSource,
}

