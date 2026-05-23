import type { Faction } from '@/core/models/faction'
import { anarchist_male } from './male/male'
import { previews } from './previews'

export const anarchist: Faction = {
  id: 'anarchist',
  name: 'Anarchist',
  previews,
  subfractions: [anarchist_male],
}
