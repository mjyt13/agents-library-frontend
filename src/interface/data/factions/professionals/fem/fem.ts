import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { sally } from '@/interface/data/agents/sally/sally'
import { createAudioItems } from '@/utils/createAudioItems'

const basePath = 'factions/professionals/fem/audio'
const createFemAudioItems = (
  prefix: string,
  count: number,
  categoryName: string,
  startFrom?: number,
) =>
  createAudioItems(prefix, count, categoryName, basePath, startFrom, 'ogg')

export const professionals_fem: Subfraction = {
  id: 'professionals_fem',
  name: SubfractionType['FEMALE'],
  agents: [sally],
  voiceLines: [
    {
      id: 'affirmation',
      name: 'Подтверждения',
      audioItems: createFemAudioItems('affirmation', 10, 'Подтверждение'),
    },
    {
      id: 'agree',
      name: 'Согласие',
      audioItems: createFemAudioItems('agree', 7, 'Согласие'),
    },
    {
      id: 'at_enemy_spawn',
      name: 'У спавна врага',
      audioItems: createFemAudioItems('at_enemy_spawn', 3, 'У спавна врага'),
    },
    {
      id: 'at_our_spawn',
      name: 'У нашего спавна',
      audioItems: createFemAudioItems('at_our_spawn', 3, 'У нашего спавна'),
    },
    {
      id: 'attacking',
      name: 'Атака',
      audioItems: createFemAudioItems('attacking', 10, 'Атака'),
    },
    {
      id: 'blinded',
      name: 'Ослеплен',
      audioItems: createFemAudioItems('blinded', 4, 'Ослеплен'),
    },
    {
      id: 'bomb_planted',
      name: 'Бомба установлена',
      audioItems: createFemAudioItems('bomb_planted', 4, 'Бомба установлена'),
    },
    {
      id: 'bomb_pre_explosion',
      name: 'Бомба перед взрывом',
      audioItems: createFemAudioItems('bomb_pre_explosion', 3, 'Бомба перед взрывом'),
    },
    {
      id: 'bombsite_clear',
      name: 'Бомбовая площадка чиста',
      audioItems: createFemAudioItems('bombsite_clear', 4, 'Бомбовая площадка чиста'),
    },
    {
      id: 'cheer',
      name: 'Радость',
      audioItems: createFemAudioItems('cheer', 10, 'Радость'),
    },
    {
      id: 'compliment',
      name: 'Комплимент',
      audioItems: createFemAudioItems('compliment', 7, 'Комплимент'),
    },
    {
      id: 'covering_friend',
      name: 'Прикрываю союзника',
      audioItems: createFemAudioItems('covering_friend', 5, 'Прикрываю союзника'),
    },
    {
      id: 'death',
      name: 'Смерть',
      audioItems: createFemAudioItems('death', 7, 'Смерть'),
    },
    {
      id: 'disagree',
      name: 'Несогласие',
      audioItems: createFemAudioItems('disagree', 7, 'Несогласие'),
    },
    {
      id: 'enemies_left_none',
      name: 'Врагов не осталось',
      audioItems: createFemAudioItems('enemies_left_none', 5, 'Врагов не осталось'),
    },
    {
      id: 'enemies_left_one',
      name: 'Остался один враг',
      audioItems: createFemAudioItems('enemies_left_one', 5, 'Остался один враг'),
    },
    {
      id: 'enemies_left_three',
      name: 'Осталось три врага',
      audioItems: createFemAudioItems('enemies_left_three', 4, 'Осталось три врага'),
    },
    {
      id: 'enemies_left_two',
      name: 'Осталось два врага',
      audioItems: createFemAudioItems('enemies_left_two', 4, 'Осталось два врага'),
    },
    {
      id: 'following_friend',
      name: 'Следую за союзником',
      audioItems: createFemAudioItems('following_friend', 6, 'Следую за союзником'),
    },
    {
      id: 'friend_plant_bomb',
      name: 'Союзник устанавливает бомбу',
      audioItems: createFemAudioItems('friend_plant_bomb', 9, 'Союзник устанавливает бомбу'),
    },
    {
      id: 'guarding_bombsite',
      name: 'Охраняю бомбовую площадку',
      audioItems: createFemAudioItems('guarding_bombsite', 6, 'Охраняю бомбовую площадку'),
    },
    {
      id: 'guarding_bombsite_a',
      name: 'Охраняю бомбовую площадку A',
      audioItems: createFemAudioItems(
        'guarding_bombsite_a',
        4,
        'Охраняю бомбовую площадку A',
      ),
    },
    {
      id: 'guarding_bombsite_b',
      name: 'Охраняю бомбовую площадку B',
      audioItems: createFemAudioItems(
        'guarding_bombsite_b',
        6,
        'Охраняю бомбовую площадку B',
      ),
    },
    {
      id: 'guarding_escapezone',
      name: 'Охраняю зону эвакуации',
      audioItems: createFemAudioItems('guarding_escapezone', 6, 'Охраняю зону эвакуации'),
    },
    {
      id: 'guarding_hostage',
      name: 'Охраняю заложника',
      audioItems: createFemAudioItems('guarding_hostage', 5, 'Охраняю заложника'),
    },
    {
      id: 'guarding_live_bomb',
      name: 'Охраняю живую бомбу',
      audioItems: createFemAudioItems('guarding_live_bomb', 5, 'Охраняю живую бомбу'),
    },
    {
      id: 'heard_sound',
      name: 'Услышал звук',
      audioItems: createFemAudioItems('heard_sound', 6, 'Услышал звук'),
    },
    {
      id: 'i_killed_enemy',
      name: 'Я убил врага',
      audioItems: createFemAudioItems('i_killed_enemy', 15, 'Я убил врага'),
    },
    {
      id: 'i_killed_sniper',
      name: 'Я убил снайпера',
      audioItems: createFemAudioItems('i_killed_sniper', 6, 'Я убил снайпера'),
    },
    {
      id: 'i_plant_bomb',
      name: 'Я устанавливаю бомбу',
      audioItems: createFemAudioItems('i_plant_bomb', 5, 'Я устанавливаю бомбу'),
    },
    {
      id: 'in_position',
      name: 'На позиции',
      audioItems: createFemAudioItems('in_position', 8, 'На позиции'),
    },
    {
      id: 'last_unit_alive',
      name: 'Последний в живых',
      audioItems: createFemAudioItems('last_unit_alive', 8, 'Последний в живых'),
    },
    {
      id: 'loc_a',
      name: 'Локация A',
      audioItems: createFemAudioItems('loc_a', 12, 'Локация A'),
    },
    {
      id: 'loc_b',
      name: 'Локация B',
      audioItems: createFemAudioItems('loc_b', 10, 'Локация B'),
    },
    {
      id: 'loc_hostage',
      name: 'Локация: Заложник',
      audioItems: createFemAudioItems('loc_hostage', 6, 'Локация: Заложник'),
    },
    {
      id: 'loc_hostage_escapezone',
      name: 'Локация: Зона эвакуации заложника',
      audioItems: createFemAudioItems(
        'loc_hostage_escapezone',
        3,
        'Локация: Зона эвакуации заложника',
      ),
    },
    {
      id: 'loc_mid',
      name: 'Локация: Середина',
      audioItems: createFemAudioItems('loc_mid', 4, 'Локация: Середина'),
    },
    {
      id: 'lost_sight_enemy',
      name: 'Потерял врага из виду',
      audioItems: createFemAudioItems('lost_sight_enemy', 3, 'Потерял врага из виду'),
    },
    {
      id: 'negative',
      name: 'Негатив',
      audioItems: createFemAudioItems('negative', 8, 'Негатив'),
    },
    {
      id: 'omw',
      name: 'В пути',
      audioItems: createFemAudioItems('omw', 6, 'В пути'),
    },
    {
      id: 'omw_to_escapezone',
      name: 'В пути к зоне эвакуации',
      audioItems: createFemAudioItems('omw_to_escapezone', 4, 'В пути к зоне эвакуации'),
    },
    {
      id: 'omw_to_hostage',
      name: 'В пути к заложнику',
      audioItems: [
        ...createFemAudioItems('omw_to_hostage', 3, 'В пути к заложнику'),
        {
          id: 'omw_to_hostage_05',
          title: 'В пути к заложнику 5',
          url: `${basePath}/omw_to_hostage_05.ogg`,
        },
      ],
    },
    {
      id: 'omw_to_plant_a',
      name: 'В пути к установке бомбы A',
      audioItems: createFemAudioItems('omw_to_plant_a', 4, 'В пути к установке бомбы A'),
    },
    {
      id: 'omw_to_plant_b',
      name: 'В пути к установке бомбы B',
      audioItems: createFemAudioItems('omw_to_plant_b', 6, 'В пути к установке бомбы B'),
    },
    {
      id: 'pinned',
      name: 'Прижат',
      audioItems: createFemAudioItems('pinned', 5, 'Прижат'),
    },
    {
      id: 'reporting_in',
      name: 'Докладываю',
      audioItems: createFemAudioItems('reporting_in', 5, 'Докладываю'),
    },
    {
      id: 'request_backup',
      name: 'Запрос подкрепления',
      audioItems: createFemAudioItems('request_backup', 4, 'Запрос подкрепления'),
    },
    {
      id: 'request_coverme',
      name: 'Запрос прикрытия',
      audioItems: createFemAudioItems('request_coverme', 3, 'Запрос прикрытия'),
    },
    {
      id: 'request_decoy',
      name: 'Запрос муляжа',
      audioItems: createFemAudioItems('request_decoy', 3, 'Запрос муляжа'),
    },
    {
      id: 'request_eco',
      name: 'Запрос экономного раунда',
      audioItems: createFemAudioItems('request_eco', 3, 'Запрос экономного раунда'),
    },
    {
      id: 'request_fallback',
      name: 'Запрос отступления',
      audioItems: createFemAudioItems('request_fallback', 3, 'Запрос отступления'),
    },
    {
      id: 'request_fire',
      name: 'Запрос огня',
      audioItems: createFemAudioItems('request_fire', 3, 'Запрос огня'),
    },
    {
      id: 'request_flash',
      name: 'Запрос светошумовой',
      audioItems: createFemAudioItems('request_flash', 3, 'Запрос светошумовой'),
    },
    {
      id: 'request_follow_me',
      name: 'Запрос следовать за мной',
      audioItems: createFemAudioItems('request_follow_me', 6, 'Запрос следовать за мной'),
    },
    {
      id: 'request_grenade',
      name: 'Запрос гранаты',
      audioItems: createFemAudioItems('request_grenade', 3, 'Запрос гранаты'),
    },
    {
      id: 'request_help',
      name: 'Запрос помощи',
      audioItems: createFemAudioItems('request_help', 6, 'Запрос помощи'),
    },
    {
      id: 'request_hold',
      name: 'Запрос удержания',
      audioItems: createFemAudioItems('request_hold', 3, 'Запрос удержания'),
    },
    {
      id: 'request_leader',
      name: 'Запрос лидера',
      audioItems: createFemAudioItems('request_leader', 3, 'Запрос лидера'),
    },
    {
      id: 'request_move',
      name: 'Запрос движения',
      audioItems: createFemAudioItems('request_move', 8, 'Запрос движения'),
    },
    {
      id: 'request_plan',
      name: 'Запрос плана',
      audioItems: createFemAudioItems('request_plan', 4, 'Запрос плана'),
    },
    {
      id: 'request_quiet',
      name: 'Запрос тишины',
      audioItems: createFemAudioItems('request_quiet', 7, 'Запрос тишины'),
    },
    {
      id: 'request_regroup',
      name: 'Запрос перегруппировки',
      audioItems: createFemAudioItems('request_regroup', 4, 'Запрос перегруппировки'),
    },
    {
      id: 'request_report',
      name: 'Запрос доклада',
      audioItems: createFemAudioItems('request_report', 6, 'Запрос доклада'),
    },
    {
      id: 'request_smoke',
      name: 'Запрос дымовой',
      audioItems: createFemAudioItems('request_smoke', 3, 'Запрос дымовой'),
    },
    {
      id: 'request_spend',
      name: 'Запрос траты',
      audioItems: createFemAudioItems('request_spend', 5, 'Запрос траты'),
    },
    {
      id: 'request_spreadout',
      name: 'Запрос рассредоточения',
      audioItems: createFemAudioItems('request_spreadout', 5, 'Запрос рассредоточения'),
    },
    {
      id: 'request_stick_together',
      name: 'Запрос держаться вместе',
      audioItems: createFemAudioItems(
        'request_stick_together',
        5,
        'Запрос держаться вместе',
      ),
    },
    {
      id: 'request_weapon',
      name: 'Запрос оружия',
      audioItems: createFemAudioItems('request_weapon', 4, 'Запрос оружия'),
    },
    {
      id: 'round_losing',
      name: 'Проигрываем раунд',
      audioItems: createFemAudioItems('round_losing', 10, 'Проигрываем раунд'),
    },
    {
      id: 'round_lost',
      name: 'Раунд проигран',
      audioItems: createFemAudioItems('round_lost', 3, 'Раунд проигран'),
    },
    {
      id: 'round_start',
      name: 'Начало раунда',
      audioItems: createFemAudioItems('round_start', 4, 'Начало раунда'),
    },
    {
      id: 'round_winning',
      name: 'Выигрываем раунд',
      audioItems: createFemAudioItems('round_winning', 3, 'Выигрываем раунд'),
    },
    {
      id: 'round_won',
      name: 'Раунд выигран',
      audioItems: createFemAudioItems('round_won', 4, 'Раунд выигран'),
    },
    {
      id: 'sees_enemy',
      name: 'Видит врага',
      audioItems: createFemAudioItems('sees_enemy', 8, 'Видит врага'),
    },
    {
      id: 'sees_enemy_killed',
      name: 'Видит убитого врага',
      audioItems: createFemAudioItems('sees_enemy_killed', 12, 'Видит убитого врага'),
    },
    {
      id: 'sees_friend_killed',
      name: 'Видит убитого союзника',
      audioItems: createFemAudioItems('sees_friend_killed', 7, 'Видит убитого союзника'),
    },
    {
      id: 'sees_hostage_death',
      name: 'Видит смерть заложника',
      audioItems: createFemAudioItems('sees_hostage_death', 5, 'Видит смерть заложника'),
    },
    {
      id: 'sees_multiple_enemies',
      name: 'Видит нескольких врагов',
      audioItems: createFemAudioItems('sees_multiple_enemies', 8, 'Видит нескольких врагов'),
    },
    {
      id: 'sees_one_enemy',
      name: 'Видит одного врага',
      audioItems: createFemAudioItems('sees_one_enemy', 7, 'Видит одного врага'),
    },
    {
      id: 'sees_sniper',
      name: 'Видит снайпера',
      audioItems: createFemAudioItems('sees_sniper', 4, 'Видит снайпера'),
    },
    {
      id: 'sees_sniper_killed',
      name: 'Видит убитого снайпера',
      audioItems: createFemAudioItems('sees_sniper_killed', 7, 'Видит убитого снайпера'),
    },
    {
      id: 'sees_team_combo',
      name: 'Видит командную комбо',
      audioItems: createFemAudioItems('sees_team_combo', 8, 'Видит командную комбо'),
    },
    {
      id: 'sorry',
      name: 'Извинение',
      audioItems: createFemAudioItems('sorry', 6, 'Извинение'),
    },
    {
      id: 'takingfire',
      name: 'Под огнем',
      audioItems: createFemAudioItems('takingfire', 8, 'Под огнем'),
    },
    {
      id: 'takingfire_friendly',
      name: 'Союзник под огнем',
      audioItems: createFemAudioItems('takingfire_friendly', 13, 'Союзник под огнем'),
    },
    {
      id: 'ten_seconds_remaining',
      name: 'Осталось десять секунд',
      audioItems: createFemAudioItems('ten_seconds_remaining', 4, 'Осталось десять секунд'),
    },
    {
      id: 'thankful',
      name: 'Благодарность',
      audioItems: createFemAudioItems('thankful', 10, 'Благодарность'),
    },
    {
      id: 'throwing_decoy',
      name: 'Бросаю муляж',
      audioItems: createFemAudioItems('throwing_decoy', 3, 'Бросаю муляж'),
    },
    {
      id: 'throwing_fire',
      name: 'Бросаю зажигательную',
      audioItems: createFemAudioItems('throwing_fire', 2, 'Бросаю зажигательную'),
    },
    {
      id: 'throwing_flashbang',
      name: 'Бросаю светошумовую',
      audioItems: createFemAudioItems('throwing_flashbang', 4, 'Бросаю светошумовую'),
    },
    {
      id: 'throwing_grenade',
      name: 'Бросаю гранату',
      audioItems: createFemAudioItems('throwing_grenade', 3, 'Бросаю гранату'),
    },
    {
      id: 'throwing_molotov',
      name: 'Бросаю коктейль Молотова',
      audioItems: createFemAudioItems('throwing_molotov', 4, 'Бросаю коктейль Молотова'),
    },
    {
      id: 'throwing_smoke',
      name: 'Бросаю дымовую',
      audioItems: createFemAudioItems('throwing_smoke', 4, 'Бросаю дымовую'),
    },
    {
      id: 'waiting_here',
      name: 'Ожидание',
      audioItems: createFemAudioItems('waiting_here', 8, 'Ожидание'),
    },
  ],
}
