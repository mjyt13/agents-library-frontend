import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { mango_dabisi } from '@/interface/data/agents/mango_dabisi/mango_dabisil'
import { createAudioSourceFromFiles } from '@/utils/createSubfractionAudioSource'

const basePath = 'factions/guerilla/male/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/guerilla/male/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/guerilla/male/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/guerilla/male/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')
const audioSource = createAudioSourceFromFiles(audioFiles, basePath)

export const guerilla_male: Subfraction = {
  id: 'guerilla_male',
  name: SubfractionType.MALE,
  agents: [mango_dabisi],
  ...audioSource,
}

