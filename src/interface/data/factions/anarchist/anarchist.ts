import type { Faction } from '@/core/models/faction'
import { anarchist_male } from './male/male'

export const anarchist: Faction = {
  id: 'anarchist',
  name: 'Anarchist',
  subfractions: [anarchist_male],
}
