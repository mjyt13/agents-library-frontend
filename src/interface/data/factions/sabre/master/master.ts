import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { romanov } from '@/interface/data/agents/romanov/romanov'
import { createAudioContentFromFiles } from '@/utils/createAudioContentFromFiles'

const basePath = 'factions/sabre/master/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/sabre/master/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/sabre/master/audio/*.oga'),
  ...import.meta.glob('/src/interface/data/factions/sabre/master/audio/*.ogg')
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')

export const sabre_master: Subfraction = {
  id: 'sabre_master',
  name: SubfractionType['MASTER'],
  agents: [romanov],
  voiceLines: createAudioContentFromFiles(audioFiles, basePath),
}
