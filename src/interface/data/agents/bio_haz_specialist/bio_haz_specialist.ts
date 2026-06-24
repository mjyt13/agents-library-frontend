import type { Agent } from '@/core/models/agent'

export const bio_haz_specialist: Agent = {
  id: 'bio_haz_specialist',
  name: 'Bio-Haz Specialist',
  description:
    "The SWAT's Biological Hazard Specialists are trained to handle worst case bio warfare situations. Terrorists planning to unleash a bio hazard attack upon unsuspecting civilians do not want to deal with these guys.",
  comment: '',
  rarity: 'Distinguished',
  photos: ['agents/bio_haz_specialist/bio_haz_specialist.webp'],
}
// team (для привязки к подфракции в meta.ts): SWAT
