import type { Faction } from '@/core/models/faction'
import { separatist_male } from './male/male'
import { previews } from './previews'

export const separatist: Faction = {
  id: 'separatist',
  name: 'Separatist',
  previews,
  subfractions: [separatist_male],
}
