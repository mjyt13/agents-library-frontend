import type { Faction } from '@/core/models/faction'
import { anarchist } from './anarchist/anarchist'
import { fbi_old } from './fbi_old/fbi_old'
import { fbi_swat } from './fbi_swat/fbi_swat'
import { gandarmerie } from './gandarmerie/gandarmerie'
import { gign } from './gign/gign'
import { gsg } from './gsg/gsg'
import { guerilla } from './guerilla/guerilla'
import { idf } from './idf/idf'
import { leet } from './leet/leet'
import { phoenix } from './phoenix/phoenix'
import { pirate } from './pirate/pirate'
import { professionals } from './professionals/professionals'
import { sabre } from './sabre/sabre'
import { sas } from './sas/sas'
import { seal } from './seal/seal'
import { seal_frogman } from './seal_frogman/seal_frogman'
import { separatist } from './separatist/separatist'

export const factions: Faction[] = [
  anarchist,
  fbi_old,
  fbi_swat,
  gandarmerie,
  gign,
  gsg,
  guerilla,
  idf,
  leet,
  phoenix,
  pirate,
  professionals,
  sabre,
  sas,
  seal,
  seal_frogman,
  separatist,
]
