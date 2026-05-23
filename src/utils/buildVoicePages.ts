import type {
  AudioContent,
  VoicePageId,
} from '@/core/models/audioContent'

export interface VoicePage {
  id: VoicePageId
  title: string
  description: string
  groups: AudioContent[]
}

interface VoiceCategoryConfig {
  id: string
  name: string
  page: VoicePageId
  alwaysShow: boolean
}

const pageOneCategories: VoiceCategoryConfig[] = [
  { id: 'affirmative', name: 'Affirmative', page: 1, alwaysShow: true },
  { id: 'negative', name: 'Negative', page: 1, alwaysShow: true },
  { id: 'agree', name: 'Agree', page: 1, alwaysShow: true },
  { id: 'ticking_down', name: 'Ticking down', page: 1, alwaysShow: true },
  { id: 'clear', name: 'Clear', page: 1, alwaysShow: true },
  { id: 'cheer', name: 'Cheer', page: 1, alwaysShow: true },
  { id: 'compliment', name: 'Compliment', page: 1, alwaysShow: true },
  { id: 'heard', name: 'Heard', page: 1, alwaysShow: true },
  { id: 'start', name: 'Start', page: 1, alwaysShow: true },
  { id: 'lose', name: 'Lose', page: 1, alwaysShow: true },
  { id: 'waiting', name: 'Waiting', page: 1, alwaysShow: true },
  { id: 'won', name: 'Won', page: 1, alwaysShow: true },
  { id: 'winning', name: 'Winning', page: 1, alwaysShow: true },
  { id: 'sorry', name: 'Sorry', page: 1, alwaysShow: true },
  { id: 'lets_go', name: "Let's go", page: 1, alwaysShow: true },
  { id: 'friendly_fire', name: 'Friendly fire', page: 1, alwaysShow: true },
  { id: 'ten_secs', name: '10 secs', page: 1, alwaysShow: true },
  { id: 'thanks', name: 'Thanks', page: 1, alwaysShow: true },
  { id: 'decoy', name: 'Decoy', page: 1, alwaysShow: true },
  { id: 'fire_molotov', name: 'Fire / Molotov', page: 1, alwaysShow: true },
  { id: 'flashbang', name: 'Flashbang', page: 1, alwaysShow: true },
  { id: 'he_grenade', name: 'HE Grenade', page: 1, alwaysShow: true },
  { id: 'smoke', name: 'Smoke', page: 1, alwaysShow: true },
]

const pageTwoCategories: VoiceCategoryConfig[] = [
  { id: 'attack', name: 'Attack', page: 2, alwaysShow: true },
  { id: 'covering', name: 'Covering', page: 2, alwaysShow: true },
  { id: 'disagree', name: 'Disagree', page: 2, alwaysShow: true },
  { id: 'none_left', name: '0 left', page: 2, alwaysShow: true },
  { id: 'following', name: 'Following', page: 2, alwaysShow: true },
  { id: 'i_killed_enemy', name: 'I killed enemy', page: 2, alwaysShow: true },
  { id: 'planting_defusing', name: 'Planting / Defusing', page: 2, alwaysShow: true },
  { id: 'in_position', name: 'In position', page: 2, alwaysShow: true },
  { id: 'i_got_last', name: 'I got last', page: 2, alwaysShow: true },
  { id: 'on_my_way', name: 'On my way', page: 2, alwaysShow: true },
  { id: 'reporting_in', name: 'Reporting in', page: 2, alwaysShow: true },
  { id: 'request_follow_me', name: 'Follow me', page: 2, alwaysShow: true },
  { id: 'request_help', name: 'Request Help', page: 2, alwaysShow: true },
  { id: 'request_hold_position', name: 'Hold this position', page: 2, alwaysShow: true },
  { id: 'losing', name: 'Losing', page: 2, alwaysShow: true },
  { id: 'see_dead_enemy', name: 'I see dead enemy', page: 2, alwaysShow: true },
  { id: 'enemy_spotted', name: 'Enemy spotted', page: 2, alwaysShow: true },
  { id: 'request_leader', name: 'Request Lead', page: 2, alwaysShow: true },
]

const pageThreeCategories: VoiceCategoryConfig[] = [
  { id: 'blinded', name: 'Blinded', page: 3, alwaysShow: true },
  { id: 'bomb_planted', name: 'Bomb planted', page: 3, alwaysShow: true },
  { id: 'countdown', name: 'Countdown', page: 3, alwaysShow: true },
  { id: 'death', name: 'Death', page: 3, alwaysShow: true },
  { id: 'one_left', name: '1 left', page: 3, alwaysShow: true },
  { id: 'two_left', name: '2 left', page: 3, alwaysShow: true },
  { id: 'three_left', name: '3 left', page: 3, alwaysShow: true },
  { id: 'friend_planting', name: 'Planting friend', page: 3, alwaysShow: true },
  { id: 'i_killed_sniper', name: 'I killed sniper', page: 3, alwaysShow: true },
  { id: 'location_mid', name: 'Location Mid', page: 3, alwaysShow: true },
  { id: 'pinned', name: 'Pinned', page: 3, alwaysShow: true },
  { id: 'request_backup', name: 'Request Backup', page: 3, alwaysShow: true },
  { id: 'request_fallback', name: 'Request Fallback', page: 3, alwaysShow: true },
  { id: 'request_cover_me', name: 'Cover me', page: 3, alwaysShow: true },
  { id: 'request_weapon', name: 'Give me weapon', page: 3, alwaysShow: true },
  { id: 'many_enemies_spotted', name: 'Many enemies spotted', page: 3, alwaysShow: true },
  { id: 'sniper', name: 'Sniper', page: 3, alwaysShow: true },
  { id: 'see_bomb', name: 'I see bomb', page: 3, alwaysShow: true },
  { id: 'taking_fire', name: 'Taking fire', page: 3, alwaysShow: true },
  { id: 'regroup', name: 'Regroup', page: 3, alwaysShow: true },
  { id: 'scared', name: 'Scared', page: 3, alwaysShow: true },
]

const categoryConfigs = [...pageOneCategories, ...pageTwoCategories, ...pageThreeCategories]
const categoryConfigMap = Object.fromEntries(
  categoryConfigs.map((config) => [config.id, config]),
) as Record<string, VoiceCategoryConfig>

const aliasMap: Record<string, string> = {
  affirmative: 'affirmation',
  rogerthat: 'affirmation',
  metoo: 'agree',
  negativeno: 'negative',
  bombtickingdown: 'bomb_pre_explosion',
  bombsiteclear: 'bombsite_clear',
  clearedarea: 'sees_area_clear',
  heardnoise: 'heard_sound',
  waitinghere: 'waiting_here',
  waitingforhumantodefusebomb: 'waiting_here',
  reportingin: 'reporting_in',
  coveringfriend: 'covering_friend',
  followingfriend: 'following_friend',
  friendlyfire: 'takingfire_friendly',
  inposition: 'in_position',
  defusingbomb: 'defusing',
  plantingbomb: 'i_plant_bomb',
  onmyway: 'omw',
  lastmanstanding: 'last_unit_alive',
  lostenemy: 'lost_sight_enemy',
  oneenemyleft: 'enemies_left_one',
  oneenemyleftpirate: 'enemies_left_one',
  twoenemiesleft: 'enemies_left_two',
  threeenemiesleft: 'enemies_left_three',
  noenemiesleft: 'enemies_left_none',
  noenemiesleftbomb: 'enemies_left_none',
  noenemiesleftpirates: 'enemies_left_none',
  sniperkilled: 'i_killed_sniper',
  sniperwarning: 'sees_sniper',
  scaredemote: 'scared',
  spottedbomber: 'sees_enemy',
  spottedloosebomb: 'sees_dropped_bomb',
  whereisthebomb: 'querybomb',
  theypickedupthebomb: 'see_bomb_pickup',
  radio_enemyspotted: 'sees_enemy',
  radio_enemyspottedcount: 'sees_multiple_enemies',
  radio_enemyspottedpirates: 'sees_enemy',
  radio_followme: 'request_follow_me',
  radio_letsgo: 'request_move',
  radio_locknload: 'round_start',
  radio_needbackup: 'request_backup',
  radio_takingfire: 'takingfire',
  radiobotreponsepositive: 'affirmation',
  radiobotreponsenegative: 'negative',
  radiobotgo: 'request_move',
  radiobotfollowme: 'request_follow_me',
  radiobotfollowyou: 'following_friend',
  radiobothear: 'heard_sound',
  radiobotwait: 'waiting_here',
  radiobotreport: 'reporting_in',
  radiobotregroup: 'request_regroup',
  radiobotfallback: 'request_fallback',
  radiobotunderfire: 'takingfire',
  radiobotunderfirefriendly: 'takingfire_friendly',
  radiobotclear: 'sees_area_clear',
  radiobotcompliment: 'compliment',
  radiobotniceshot: 'compliment',
  radiobotcoverdefuse: 'cover_defuse',
  radiobotreponsecoverrequest: 'covering_friend',
  radiobotdefusing: 'defusing',
  radiobotbombatsafe: 'bomb_planted',
  radiobotbombpick: 'see_bomb_pickup',
  radiobotbombspot: 'sees_dropped_bomb',
  radiobotquerybomb: 'querybomb',
  radiobotstart: 'round_start',
  radiobotreponseattacking: 'attacking',
  radiobotreponseomw: 'omw',
  radiobotkill: 'i_killed_enemy',
  radiobotkillsniper: 'i_killed_sniper',
  radiobothold: 'request_hold',
  ctbomb_dropped: 'sees_dropped_bomb',
  plantedbombplacesafe: 'bomb_planted',
  planted_a: 'bomb_planted',
  planted_b: 'bomb_planted',
  planting_a: 'i_plant_bomb',
  planting_b: 'i_plant_bomb',
  t_death: 'death',
  ct_death: 'death',
  t_decoy: 'throwing_decoy',
  ct_decoy: 'throwing_decoy',
  t_flashbang: 'throwing_flashbang',
  ct_flashbang: 'throwing_flashbang',
  t_grenade: 'throwing_grenade',
  ct_grenade: 'throwing_grenade',
  t_molotov: 'throwing_molotov',
  ct_molotov: 'throwing_molotov',
  t_smoke: 'throwing_smoke',
  ct_smoke: 'throwing_smoke',
  ct_bombexploding: 'bomb_pre_explosion',
  coverme: 'request_coverme',
  help: 'request_help',
  incombat: 'takingfire',
  request_defuse: 'defusing',
  niceshot: 'compliment',
  peptalk: 'cheer',
  enemydown: 'i_killed_enemy',
  enemydownpirate: 'i_killed_enemy',
  i_killed_enemy_headshot: 'i_killed_enemy',
  hostagedown: 'sees_hostage_death',
  killedfriend: 'takingfire_friendly',
  pinneddown: 'pinned',
  at_position: 'in_position',
  request_report: 'reporting_in',
  requestreport: 'reporting_in',
  clear: 'sees_area_clear',
}

const normalizeGroupId = (value: string): string => {
  let normalized = value.trim().toLowerCase().replace(/\./g, '_')
  normalized = normalized.replace(/\s+/g, '_').replace(/_+/g, '_')
  normalized = normalized.replace(/^[a-z]{2,4}\d+_/, '')

  if (/^cheer_\d+_tk$/.test(normalized)) return 'cheer'
  if (/^death_\d+_tk$/.test(normalized)) return 'death'
  if (/^round_won_(?:nocasualities|quickly)$/.test(normalized)) return 'round_won'
  if (/^round_start_hostages?$/.test(normalized)) return 'round_start'
  if (/^taunt\d+$/.test(normalized)) return 'cheer'
  if (/^at_mid$/.test(normalized)) return 'loc_mid'
  if (/^goto_.+$/.test(normalized)) return 'goto'
  if (/^goingto.+$/.test(normalized)) return 'goingto'

  return aliasMap[normalized] ?? normalized
}

const resolveCategoryId = (rawGroupId: string): string | null => {
  const groupId = normalizeGroupId(rawGroupId)

  if (/^(affirmation|affirmative)$/.test(groupId)) return 'affirmative'
  if (/^agree$/.test(groupId)) return 'agree'
  if (/^negative$/.test(groupId)) return 'negative'
  if (/^bomb_pre_explosion$/.test(groupId)) return 'ticking_down'
  if (/^(bombsite_clear|sees_area_clear)$/.test(groupId)) return 'clear'
  if (/^cheer$/.test(groupId)) return 'cheer'
  if (/^compliment$/.test(groupId)) return 'compliment'
  if (/^heard_sound$/.test(groupId)) return 'heard'
  if (/^round_start$/.test(groupId)) return 'start'
  if (/^round_lost$/.test(groupId)) return 'lose'
  if (/^waiting_here$/.test(groupId)) return 'waiting'
  if (/^round_won$/.test(groupId)) return 'won'
  if (/^round_winning$/.test(groupId)) return 'winning'
  if (/^sorry$/.test(groupId)) return 'sorry'
  if (/^request_move$/.test(groupId)) return 'lets_go'
  if (/^takingfire_friendly$/.test(groupId)) return 'friendly_fire'
  if (/^ten_seconds_remaining$/.test(groupId)) return 'ten_secs'
  if (/^(thankful|thanks)$/.test(groupId)) return 'thanks'
  if (/^throwing_decoy$/.test(groupId)) return 'decoy'
  if (/^(throwing_fire|throwing_molotov)$/.test(groupId)) return 'fire_molotov'
  if (/^throwing_flashbang$/.test(groupId)) return 'flashbang'
  if (/^throwing_grenade$/.test(groupId)) return 'he_grenade'
  if (/^throwing_smoke$/.test(groupId)) return 'smoke'

  if (/^attacking$/.test(groupId)) return 'attack'
  if (/^blinded$/.test(groupId)) return 'blinded'
  if (/^bomb_planted$/.test(groupId)) return 'bomb_planted'
  if (/^countdown$/.test(groupId)) return 'countdown'
  if (/^(covering_friend|cover_defuse)$/.test(groupId)) return 'covering'
  if (/^death$/.test(groupId)) return 'death'
  if (/^disagree$/.test(groupId)) return 'disagree'
  if (/^enemies_left_none$/.test(groupId)) return 'none_left'
  if (/^enemies_left_one$/.test(groupId)) return 'one_left'
  if (/^enemies_left_two$/.test(groupId)) return 'two_left'
  if (/^enemies_left_three$/.test(groupId)) return 'three_left'
  if (/^following_friend$/.test(groupId)) return 'following'
  if (/^friend_plant_bomb$/.test(groupId)) return 'friend_planting'
  if (/^last_unit_alive$/.test(groupId)) return 'i_got_last'
  if (/^i_killed_enemy$/.test(groupId)) return 'i_killed_enemy'
  if (/^i_killed_sniper$/.test(groupId)) return 'i_killed_sniper'
  if (/^(i_plant_bomb|defusing)$/.test(groupId)) return 'planting_defusing'
  if (/^in_position$/.test(groupId)) return 'in_position'
  if (/^loc_mid$/.test(groupId)) return 'location_mid'
  if (/^(omw($|_.+)|goto|goingto)$/.test(groupId)) return 'on_my_way'
  if (/^pinned$/.test(groupId)) return 'pinned'
  if (/^reporting_in$/.test(groupId)) return 'reporting_in'
  if (/^request_backup$/.test(groupId)) return 'request_backup'
  if (/^request_fallback$/.test(groupId)) return 'request_fallback'
  if (/^request_coverme$/.test(groupId)) return 'request_cover_me'
  if (/^request_follow_me$/.test(groupId)) return 'request_follow_me'
  if (/^request_help$/.test(groupId)) return 'request_help'
  if (/^request_hold$/.test(groupId)) return 'request_hold_position'
  if (/^request_weapon$/.test(groupId)) return 'request_weapon'
  if (/^round_losing$/.test(groupId)) return 'losing'
  if (/^sees_enemy_killed$/.test(groupId)) return 'see_dead_enemy'
  if (/^(sees_enemy|sees_one_enemy)$/.test(groupId)) return 'enemy_spotted'
  if (/^sees_multiple_enemies$/.test(groupId)) return 'many_enemies_spotted'
  if (/^sees_sniper$/.test(groupId)) return 'sniper'
  if (
    /^(see_bomb_pickup|sees_dropped_bomb|hear_bomb|querybomb|at_loosebomb|sees_bomb_carrier)$/.test(
      groupId,
    )
  ) {
    return 'see_bomb'
  }
  if (/^takingfire$/.test(groupId)) return 'taking_fire'
  if (/^request_leader$/.test(groupId)) return 'request_leader'
  if (/^request_regroup$/.test(groupId)) return 'regroup'
  if (/^scared$/.test(groupId)) return 'scared'

  return null
}

const createMissingGroup = (config: VoiceCategoryConfig): AudioContent => ({
  meta: {
    id: config.id,
    canonicalId: config.id,
    name: config.name,
    page: config.page,
    isMissing: true,
    itemCount: 0,
  },
  audioItems: [],
})

const createPageGroups = (
  categories: VoiceCategoryConfig[],
  groupedByCategory: Map<string, AudioContent>,
): AudioContent[] =>
  categories.map((config) => groupedByCategory.get(config.id) ?? createMissingGroup(config))

export const buildVoicePages = (audioGroups: AudioContent[]): VoicePage[] => {
  const groupedByCategory = new Map<string, AudioContent>()

  for (const group of audioGroups) {
    const categoryId = resolveCategoryId(group.meta.id)
    if (!categoryId) continue

    const config = categoryConfigMap[categoryId]
    if (!config) continue

    const existing = groupedByCategory.get(categoryId)

    if (existing) {
      existing.audioItems.push(...group.audioItems)
      existing.meta.itemCount = (existing.meta.itemCount ?? 0) + (group.meta.itemCount ?? group.audioItems.length)
      continue
    }

    groupedByCategory.set(categoryId, {
      meta: {
        id: config.id,
        canonicalId: config.id,
        name: config.name,
        page: config.page,
        itemCount: group.meta.itemCount ?? group.audioItems.length,
      },
      audioItems: [...group.audioItems],
    })
  }

  return [
    {
      id: 1,
      title: 'Страница 1',
      description: 'Наиболее известные голоcовые линии.',
      groups: createPageGroups(pageOneCategories, groupedByCategory),
    },
    {
      id: 2,
      title: 'Страница 2',
      description: 'Менее известные, но важные события группы.',
      groups: createPageGroups(pageTwoCategories, groupedByCategory),
    },
    {
      id: 3,
      title: 'Страница 3',
      description: 'Ситуативные линии',
      groups: createPageGroups(pageThreeCategories, groupedByCategory),
    },
  ]
}
