import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { anarchist_default } from '@/interface/data/agents/default/anarchist/anarchist'
import { createAudioContentFromFiles } from '@/utils/createAudioContentFromFiles'

const basePath = 'factions/anarchist/male/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/anarchist/male/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/anarchist/male/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/anarchist/male/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')

export const anarchist_male: Subfraction = {
  id: 'anarchist_male',
  name: SubfractionType.MALE,
  agents: [anarchist_default],
  voiceLines: createAudioContentFromFiles(audioFiles, basePath),
}
