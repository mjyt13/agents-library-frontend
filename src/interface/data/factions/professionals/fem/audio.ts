import { createAudioSourceFromModules } from '@/utils/createSubfractionAudioSource'

const basePath = 'factions/professionals/fem/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/professionals/fem/audio/*.wav', {
    import: 'default',
    query: '?url',
  }),
  ...import.meta.glob('/src/interface/data/factions/professionals/fem/audio/*.ogg', {
    import: 'default',
    query: '?url',
  }),
  ...import.meta.glob('/src/interface/data/factions/professionals/fem/audio/*.oga', {
    import: 'default',
    query: '?url',
  }),
}

export const audioSource = createAudioSourceFromModules(audioModules, basePath)
