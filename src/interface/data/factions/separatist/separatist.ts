import type { Faction } from '@/core/models/faction'
import { separatist_male } from './male/male'

export const separatist: Faction = {
  id: 'separatist',
  name: 'Separatist',
  subfractions: [separatist_male],
}
