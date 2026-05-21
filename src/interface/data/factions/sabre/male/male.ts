import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { maximus } from '@/interface/data/agents/maximus/maximus'
import { dragomir } from '@/interface/data/agents/dragomir/dragomir'
import { rezan } from '@/interface/data/agents/rezan/rezan'
import { blackwolf } from '@/interface/data/agents/blackwolf/blackwolf'
import { createAudioSourceFromFiles } from '@/utils/createSubfractionAudioSource'

const basePath = 'factions/sabre/male/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/sabre/male/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/sabre/male/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/sabre/male/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')
const audioSource = createAudioSourceFromFiles(audioFiles, basePath)

export const sabre_male: Subfraction = {
  id: 'sabre_male',
  name: SubfractionType['MALE'],
  agents: [maximus, dragomir, rezan, blackwolf],
  ...audioSource,
}

