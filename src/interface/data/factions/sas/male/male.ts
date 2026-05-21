import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { createAudioSourceFromFiles } from '@/utils/createSubfractionAudioSource'
import { sas_default } from '@/interface/data/agents/default/sas/sas'

const basePath = 'factions/sas/male/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/sas/male/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/sas/male/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/sas/male/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')
const audioSource = createAudioSourceFromFiles(audioFiles, basePath)

export const sas_male: Subfraction = {
  id: 'sas_male',
  name: SubfractionType['MALE'],
  agents: [sas_default],
  ...audioSource,
}

