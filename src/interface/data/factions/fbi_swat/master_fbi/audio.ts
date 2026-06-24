import { createAudioSourceFromModules } from '@/utils/createSubfractionAudioSource'

const basePath = 'factions/fbi_swat/master_fbi/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/fbi_swat/master_fbi/audio/*.wav', {
    import: 'default',
    query: '?url',
  }),
  ...import.meta.glob('/src/interface/data/factions/fbi_swat/master_fbi/audio/*.ogg', {
    import: 'default',
    query: '?url',
  }),
  ...import.meta.glob('/src/interface/data/factions/fbi_swat/master_fbi/audio/*.oga', {
    import: 'default',
    query: '?url',
  }),
}

export const audioSource = createAudioSourceFromModules(audioModules, basePath)
