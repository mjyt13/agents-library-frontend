import { createAudioSourceFromModules } from '@/utils/createSubfractionAudioSource'

const basePath = 'factions/fbi_swat/master_swat/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/fbi_swat/master_swat/audio/*.wav', { import: 'default', query: '?url' }),
  ...import.meta.glob('/src/interface/data/factions/fbi_swat/master_swat/audio/*.ogg', { import: 'default', query: '?url' }),
  ...import.meta.glob('/src/interface/data/factions/fbi_swat/master_swat/audio/*.oga', { import: 'default', query: '?url' }),
}

export const audioSource = createAudioSourceFromModules(audioModules, basePath)

