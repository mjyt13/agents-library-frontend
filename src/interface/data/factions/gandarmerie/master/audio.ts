import { createAudioSourceFromModules } from '@/utils/createSubfractionAudioSource'

const basePath = 'factions/gandarmerie/master/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/gandarmerie/master/audio/*.wav', { import: 'default', query: '?url' }),
  ...import.meta.glob('/src/interface/data/factions/gandarmerie/master/audio/*.ogg', { import: 'default', query: '?url' }),
  ...import.meta.glob('/src/interface/data/factions/gandarmerie/master/audio/*.oga', { import: 'default', query: '?url' }),
}

export const audioSource = createAudioSourceFromModules(audioModules, basePath)

