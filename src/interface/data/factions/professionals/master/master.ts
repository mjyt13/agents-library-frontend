import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { darryl_miami } from '@/interface/data/agents/darryl/darryl_miami'
import { darryl_royale } from '@/interface/data/agents/darryl/darryl_royale'
import { createAudioSourceFromFiles } from '@/utils/createSubfractionAudioSource'

const basePath = 'factions/professionals/master/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/professionals/master/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/professionals/master/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/professionals/master/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')
const audioSource = createAudioSourceFromFiles(audioFiles, basePath)

export const professionals_master: Subfraction = {
  id: 'professionals_master',
  name: SubfractionType.MASTER,
  agents: [darryl_miami, darryl_royale],
  ...audioSource,
}
