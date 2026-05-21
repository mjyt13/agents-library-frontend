import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { romanov } from '@/interface/data/agents/romanov/romanov'
import { createAudioSourceFromFiles } from '@/utils/createSubfractionAudioSource'

const basePath = 'factions/sabre/master/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/sabre/master/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/sabre/master/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/sabre/master/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')
const audioSource = createAudioSourceFromFiles(audioFiles, basePath)

export const sabre_master: Subfraction = {
  id: 'sabre_master',
  name: SubfractionType['MASTER'],
  agents: [romanov],
  ...audioSource,
}

