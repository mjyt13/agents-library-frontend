import { createAudioSourceFromModules } from '@/utils/createSubfractionAudioSource'

const basePath = 'factions/sabre/male/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/sabre/male/audio/*.wav', {
    import: 'default',
    query: '?url',
  }),
  ...import.meta.glob('/src/interface/data/factions/sabre/male/audio/*.ogg', {
    import: 'default',
    query: '?url',
  }),
  ...import.meta.glob('/src/interface/data/factions/sabre/male/audio/*.oga', {
    import: 'default',
    query: '?url',
  }),
}

export const audioSource = createAudioSourceFromModules(audioModules, basePath)
