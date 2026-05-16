import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { trapper } from '@/interface/data/agents/trapper/trapper'
import { createAudioContentFromFiles } from '@/utils/createAudioContentFromFiles'

const basePath = 'factions/guerilla/fem/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/guerilla/fem/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/guerilla/fem/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/guerilla/fem/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')

export const guerilla_fem: Subfraction = {
  id: 'guerilla_fem',
  name: SubfractionType.FEMALE,
  agents: [trapper],
  voiceLines: createAudioContentFromFiles(audioFiles, basePath),
}
