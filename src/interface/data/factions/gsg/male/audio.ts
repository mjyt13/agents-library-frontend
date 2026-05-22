import { createAudioSourceFromModules } from '@/utils/createSubfractionAudioSource'

const basePath = 'factions/gsg/male/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/gsg/male/audio/*.wav', { import: 'default', query: '?url' }),
  ...import.meta.glob('/src/interface/data/factions/gsg/male/audio/*.ogg', { import: 'default', query: '?url' }),
  ...import.meta.glob('/src/interface/data/factions/gsg/male/audio/*.oga', { import: 'default', query: '?url' }),
}

export const audioSource = createAudioSourceFromModules(audioModules, basePath)

