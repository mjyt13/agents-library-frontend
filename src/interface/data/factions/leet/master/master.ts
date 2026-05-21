import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { muhlik } from '@/interface/data/agents/muhlik/muhlik'
import { createAudioSourceFromFiles } from '@/utils/createSubfractionAudioSource'

const basePath = 'factions/leet/master/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/leet/master/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/leet/master/audio/*.oga'),
  ...import.meta.glob('/src/interface/data/factions/leet/master/audio/*.wav'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')
const audioSource = createAudioSourceFromFiles(audioFiles, basePath)

export const leet_master: Subfraction = {
  id: 'leet_master',
  name: SubfractionType['MASTER'],
  agents: [muhlik],
  ...audioSource,
}
