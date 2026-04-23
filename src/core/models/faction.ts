import type { Subfraction } from './subfraction'

// Объект-константа: доступ через SubfractionType.FEMALE или SubfractionType['FEMALE']
// Map здесь не подходит — у Map синтаксис map.get('FEMALE'), а не map['FEMALE']

export interface Faction {
  id: string
  name: string
  subfractions: Subfraction[]
}
