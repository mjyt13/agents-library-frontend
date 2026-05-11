import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { mae } from '@/interface/data/agents/mae/mae'
import { createAudioContentFromFiles } from '@/utils/createAudioContentFromFiles'

const basePath = 'factions/fbi_swat/master_swat/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/fbi_swat/master_swat/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/fbi_swat/master_swat/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')

export const master_swat: Subfraction = {
  id: 'master_swat',
  name: SubfractionType['MASTER_SWAT'],
  agents: [mae],
  voiceLines: createAudioContentFromFiles(audioFiles, basePath),
}
