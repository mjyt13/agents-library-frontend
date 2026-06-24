import { createAudioSourceFromModules } from '@/utils/createSubfractionAudioSource'

const basePath = 'factions/seal/male/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/seal/male/audio/*.wav', {
    import: 'default',
    query: '?url',
  }),
  ...import.meta.glob('/src/interface/data/factions/seal/male/audio/*.ogg', {
    import: 'default',
    query: '?url',
  }),
  ...import.meta.glob('/src/interface/data/factions/seal/male/audio/*.oga', {
    import: 'default',
    query: '?url',
  }),
}

export const audioSource = createAudioSourceFromModules(audioModules, basePath)
