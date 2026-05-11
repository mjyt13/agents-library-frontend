import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { muhlik } from '@/interface/data/agents/muhlik/muhlik'
import { createAudioContentFromFiles } from '@/utils/createAudioContentFromFiles'

const basePath = 'factions/leet/master/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/leet/master/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/leet/master/audio/*.oga'),
  ...import.meta.glob('/src/interface/data/factions/leet/master/audio/*.wav'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')

export const leet_master: Subfraction = {
  id: 'leet_master',
  name: SubfractionType['MASTER'],
  agents: [muhlik],
  voiceLines: createAudioContentFromFiles(audioFiles, basePath),
}
