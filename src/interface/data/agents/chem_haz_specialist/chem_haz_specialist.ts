import type { Agent } from '@/core/models/agent'

export const chem_haz_specialist: Agent = {
  id: 'chem_haz_specialist',
  name: 'Chem-Haz Specialist',
  description:
    'The SWAT Chemical Hazard Specialists are able to survive and succeed in toxic environment operations for hours at a time. Where others run away, they run in.',
  comment: '',
  rarity: 'Distinguished',
  photos: ['agents/chem_haz_specialist/chem_haz_specialist.webp'],
}
// team (для привязки к подфракции в meta.ts): SWAT
