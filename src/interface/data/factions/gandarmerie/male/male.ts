import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { aspirant } from '@/interface/data/agents/aspirant/aspirant'
import { createAudioSourceFromFiles } from '@/utils/createSubfractionAudioSource'
import { chemhaz_captain } from '@/interface/data/agents/chemhaz_captain/chemhaz_captain'
import { medic } from '@/interface/data/agents/medic/medic'

const basePath = 'factions/gandarmerie/male/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/factions/gandarmerie/male/audio/*.wav'),
  ...import.meta.glob('/src/interface/data/factions/gandarmerie/male/audio/*.ogg'),
  ...import.meta.glob('/src/interface/data/factions/gandarmerie/male/audio/*.oga'),
}
const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')
const audioSource = createAudioSourceFromFiles(audioFiles, basePath)

export const gandarmerie_male: Subfraction = {
  id: 'gandarmerie_male',
  name: SubfractionType.MALE,
  agents: [aspirant, chemhaz_captain, medic],
  ...audioSource,
}

