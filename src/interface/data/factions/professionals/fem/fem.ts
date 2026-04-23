import type { Subfraction } from '@/core/models/subfraction'
import { SubfractionType } from '@/core/models/subfraction'
import { sally } from '@/interface/data/agents/sally/sally'
import { createAudioItems } from '@/utils/createAudioItems'

const basePath = 'factions/professionals/fem/audio'

export const professionals_fem: Subfraction = {
  id: 'professionals_fem',
  name: SubfractionType['FEMALE'],
  agents: [sally],
  voiceLines: [
    {
      id: 'affirmation',
      name: 'Подтверждения',
      audioItems: createAudioItems('affirmation', 10, 'Подтверждение', basePath),
    },
    {
      id: 'agree',
      name: 'Согласие',
      audioItems: createAudioItems('agree', 7, 'Согласие', basePath),
    },
    {
      id: 'at_enemy_spawn',
      name: 'У спавна врага',
      audioItems: createAudioItems('at_enemy_spawn', 3, 'У спавна врага', basePath),
    },
    {
      id: 'at_our_spawn',
      name: 'У нашего спавна',
      audioItems: createAudioItems('at_our_spawn', 3, 'У нашего спавна', basePath),
    },
    {
      id: 'attacking',
      name: 'Атака',
      audioItems: createAudioItems('attacking', 10, 'Атака', basePath),
    },
    {
      id: 'blinded',
      name: 'Ослеплен',
      audioItems: createAudioItems('blinded', 4, 'Ослеплен', basePath),
    },
    {
      id: 'bomb_planted',
      name: 'Бомба установлена',
      audioItems: createAudioItems('bomb_planted', 4, 'Бомба установлена', basePath),
    },
    {
      id: 'bomb_pre_explosion',
      name: 'Бомба перед взрывом',
      audioItems: createAudioItems('bomb_pre_explosion', 3, 'Бомба перед взрывом', basePath),
    },
    {
      id: 'bombsite_clear',
      name: 'Бомбовая площадка чиста',
      audioItems: createAudioItems('bombsite_clear', 4, 'Бомбовая площадка чиста', basePath),
    },
    {
      id: 'cheer',
      name: 'Радость',
      audioItems: createAudioItems('cheer', 10, 'Радость', basePath),
    },
    {
      id: 'compliment',
      name: 'Комплимент',
      audioItems: createAudioItems('compliment', 7, 'Комплимент', basePath),
    },
    {
      id: 'covering_friend',
      name: 'Прикрываю союзника',
      audioItems: createAudioItems('covering_friend', 5, 'Прикрываю союзника', basePath),
    },
    {
      id: 'death',
      name: 'Смерть',
      audioItems: createAudioItems('death', 7, 'Смерть', basePath),
    },
    {
      id: 'disagree',
      name: 'Несогласие',
      audioItems: createAudioItems('disagree', 7, 'Несогласие', basePath),
    },
    {
      id: 'enemies_left_none',
      name: 'Врагов не осталось',
      audioItems: createAudioItems('enemies_left_none', 5, 'Врагов не осталось', basePath),
    },
    {
      id: 'enemies_left_one',
      name: 'Остался один враг',
      audioItems: createAudioItems('enemies_left_one', 5, 'Остался один враг', basePath),
    },
    {
      id: 'enemies_left_three',
      name: 'Осталось три врага',
      audioItems: createAudioItems('enemies_left_three', 4, 'Осталось три врага', basePath),
    },
    {
      id: 'enemies_left_two',
      name: 'Осталось два врага',
      audioItems: createAudioItems('enemies_left_two', 4, 'Осталось два врага', basePath),
    },
    {
      id: 'following_friend',
      name: 'Следую за союзником',
      audioItems: createAudioItems('following_friend', 6, 'Следую за союзником', basePath),
    },
    {
      id: 'friend_plant_bomb',
      name: 'Союзник устанавливает бомбу',
      audioItems: createAudioItems('friend_plant_bomb', 9, 'Союзник устанавливает бомбу', basePath),
    },
    {
      id: 'guarding_bombsite',
      name: 'Охраняю бомбовую площадку',
      audioItems: createAudioItems('guarding_bombsite', 6, 'Охраняю бомбовую площадку', basePath),
    },
    {
      id: 'guarding_bombsite_a',
      name: 'Охраняю бомбовую площадку A',
      audioItems: createAudioItems(
        'guarding_bombsite_a',
        4,
        'Охраняю бомбовую площадку A',
        basePath,
      ),
    },
    {
      id: 'guarding_bombsite_b',
      name: 'Охраняю бомбовую площадку B',
      audioItems: createAudioItems(
        'guarding_bombsite_b',
        6,
        'Охраняю бомбовую площадку B',
        basePath,
      ),
    },
    {
      id: 'guarding_escapezone',
      name: 'Охраняю зону эвакуации',
      audioItems: createAudioItems('guarding_escapezone', 6, 'Охраняю зону эвакуации', basePath),
    },
    {
      id: 'guarding_hostage',
      name: 'Охраняю заложника',
      audioItems: createAudioItems('guarding_hostage', 5, 'Охраняю заложника', basePath),
    },
    {
      id: 'guarding_live_bomb',
      name: 'Охраняю живую бомбу',
      audioItems: createAudioItems('guarding_live_bomb', 5, 'Охраняю живую бомбу', basePath),
    },
    {
      id: 'heard_sound',
      name: 'Услышал звук',
      audioItems: createAudioItems('heard_sound', 6, 'Услышал звук', basePath),
    },
    {
      id: 'i_killed_enemy',
      name: 'Я убил врага',
      audioItems: createAudioItems('i_killed_enemy', 15, 'Я убил врага', basePath),
    },
    {
      id: 'i_killed_sniper',
      name: 'Я убил снайпера',
      audioItems: createAudioItems('i_killed_sniper', 6, 'Я убил снайпера', basePath),
    },
    {
      id: 'i_plant_bomb',
      name: 'Я устанавливаю бомбу',
      audioItems: createAudioItems('i_plant_bomb', 5, 'Я устанавливаю бомбу', basePath),
    },
    {
      id: 'in_position',
      name: 'На позиции',
      audioItems: createAudioItems('in_position', 8, 'На позиции', basePath),
    },
    {
      id: 'last_unit_alive',
      name: 'Последний в живых',
      audioItems: createAudioItems('last_unit_alive', 8, 'Последний в живых', basePath),
    },
    {
      id: 'loc_a',
      name: 'Локация A',
      audioItems: createAudioItems('loc_a', 12, 'Локация A', basePath),
    },
    {
      id: 'loc_b',
      name: 'Локация B',
      audioItems: createAudioItems('loc_b', 10, 'Локация B', basePath),
    },
    {
      id: 'loc_hostage',
      name: 'Локация: Заложник',
      audioItems: createAudioItems('loc_hostage', 6, 'Локация: Заложник', basePath),
    },
    {
      id: 'loc_hostage_escapezone',
      name: 'Локация: Зона эвакуации заложника',
      audioItems: createAudioItems(
        'loc_hostage_escapezone',
        3,
        'Локация: Зона эвакуации заложника',
        basePath,
      ),
    },
    {
      id: 'loc_mid',
      name: 'Локация: Середина',
      audioItems: createAudioItems('loc_mid', 4, 'Локация: Середина', basePath),
    },
    {
      id: 'lost_sight_enemy',
      name: 'Потерял врага из виду',
      audioItems: createAudioItems('lost_sight_enemy', 3, 'Потерял врага из виду', basePath),
    },
    {
      id: 'negative',
      name: 'Негатив',
      audioItems: createAudioItems('negative', 8, 'Негатив', basePath),
    },
    {
      id: 'omw',
      name: 'В пути',
      audioItems: createAudioItems('omw', 6, 'В пути', basePath),
    },
    {
      id: 'omw_to_escapezone',
      name: 'В пути к зоне эвакуации',
      audioItems: createAudioItems('omw_to_escapezone', 4, 'В пути к зоне эвакуации', basePath),
    },
    {
      id: 'omw_to_hostage',
      name: 'В пути к заложнику',
      audioItems: [
        ...createAudioItems('omw_to_hostage', 3, 'В пути к заложнику', basePath),
        {
          id: 'omw_to_hostage_05',
          title: 'В пути к заложнику 5',
          url: `${basePath}/omw_to_hostage_05.wav`,
        },
      ],
    },
    {
      id: 'omw_to_plant_a',
      name: 'В пути к установке бомбы A',
      audioItems: createAudioItems('omw_to_plant_a', 4, 'В пути к установке бомбы A', basePath),
    },
    {
      id: 'omw_to_plant_b',
      name: 'В пути к установке бомбы B',
      audioItems: createAudioItems('omw_to_plant_b', 6, 'В пути к установке бомбы B', basePath),
    },
    {
      id: 'pinned',
      name: 'Прижат',
      audioItems: createAudioItems('pinned', 5, 'Прижат', basePath),
    },
    {
      id: 'reporting_in',
      name: 'Докладываю',
      audioItems: createAudioItems('reporting_in', 5, 'Докладываю', basePath),
    },
    {
      id: 'request_backup',
      name: 'Запрос подкрепления',
      audioItems: createAudioItems('request_backup', 4, 'Запрос подкрепления', basePath),
    },
    {
      id: 'request_coverme',
      name: 'Запрос прикрытия',
      audioItems: createAudioItems('request_coverme', 3, 'Запрос прикрытия', basePath),
    },
    {
      id: 'request_decoy',
      name: 'Запрос муляжа',
      audioItems: createAudioItems('request_decoy', 3, 'Запрос муляжа', basePath),
    },
    {
      id: 'request_eco',
      name: 'Запрос экономного раунда',
      audioItems: createAudioItems('request_eco', 3, 'Запрос экономного раунда', basePath),
    },
    {
      id: 'request_fallback',
      name: 'Запрос отступления',
      audioItems: createAudioItems('request_fallback', 3, 'Запрос отступления', basePath),
    },
    {
      id: 'request_fire',
      name: 'Запрос огня',
      audioItems: createAudioItems('request_fire', 3, 'Запрос огня', basePath),
    },
    {
      id: 'request_flash',
      name: 'Запрос светошумовой',
      audioItems: createAudioItems('request_flash', 3, 'Запрос светошумовой', basePath),
    },
    {
      id: 'request_follow_me',
      name: 'Запрос следовать за мной',
      audioItems: createAudioItems('request_follow_me', 6, 'Запрос следовать за мной', basePath),
    },
    {
      id: 'request_grenade',
      name: 'Запрос гранаты',
      audioItems: createAudioItems('request_grenade', 3, 'Запрос гранаты', basePath),
    },
    {
      id: 'request_help',
      name: 'Запрос помощи',
      audioItems: createAudioItems('request_help', 6, 'Запрос помощи', basePath),
    },
    {
      id: 'request_hold',
      name: 'Запрос удержания',
      audioItems: createAudioItems('request_hold', 3, 'Запрос удержания', basePath),
    },
    {
      id: 'request_leader',
      name: 'Запрос лидера',
      audioItems: createAudioItems('request_leader', 3, 'Запрос лидера', basePath),
    },
    {
      id: 'request_move',
      name: 'Запрос движения',
      audioItems: createAudioItems('request_move', 8, 'Запрос движения', basePath),
    },
    {
      id: 'request_plan',
      name: 'Запрос плана',
      audioItems: createAudioItems('request_plan', 4, 'Запрос плана', basePath),
    },
    {
      id: 'request_quiet',
      name: 'Запрос тишины',
      audioItems: createAudioItems('request_quiet', 7, 'Запрос тишины', basePath),
    },
    {
      id: 'request_regroup',
      name: 'Запрос перегруппировки',
      audioItems: createAudioItems('request_regroup', 4, 'Запрос перегруппировки', basePath),
    },
    {
      id: 'request_report',
      name: 'Запрос доклада',
      audioItems: createAudioItems('request_report', 6, 'Запрос доклада', basePath),
    },
    {
      id: 'request_smoke',
      name: 'Запрос дымовой',
      audioItems: createAudioItems('request_smoke', 3, 'Запрос дымовой', basePath),
    },
    {
      id: 'request_spend',
      name: 'Запрос траты',
      audioItems: createAudioItems('request_spend', 5, 'Запрос траты', basePath),
    },
    {
      id: 'request_spreadout',
      name: 'Запрос рассредоточения',
      audioItems: createAudioItems('request_spreadout', 5, 'Запрос рассредоточения', basePath),
    },
    {
      id: 'request_stick_together',
      name: 'Запрос держаться вместе',
      audioItems: createAudioItems(
        'request_stick_together',
        5,
        'Запрос держаться вместе',
        basePath,
      ),
    },
    {
      id: 'request_weapon',
      name: 'Запрос оружия',
      audioItems: createAudioItems('request_weapon', 4, 'Запрос оружия', basePath),
    },
    {
      id: 'round_losing',
      name: 'Проигрываем раунд',
      audioItems: createAudioItems('round_losing', 10, 'Проигрываем раунд', basePath),
    },
    {
      id: 'round_lost',
      name: 'Раунд проигран',
      audioItems: createAudioItems('round_lost', 3, 'Раунд проигран', basePath),
    },
    {
      id: 'round_start',
      name: 'Начало раунда',
      audioItems: createAudioItems('round_start', 4, 'Начало раунда', basePath),
    },
    {
      id: 'round_winning',
      name: 'Выигрываем раунд',
      audioItems: createAudioItems('round_winning', 3, 'Выигрываем раунд', basePath),
    },
    {
      id: 'round_won',
      name: 'Раунд выигран',
      audioItems: createAudioItems('round_won', 4, 'Раунд выигран', basePath),
    },
    {
      id: 'sees_enemy',
      name: 'Видит врага',
      audioItems: createAudioItems('sees_enemy', 8, 'Видит врага', basePath),
    },
    {
      id: 'sees_enemy_killed',
      name: 'Видит убитого врага',
      audioItems: createAudioItems('sees_enemy_killed', 12, 'Видит убитого врага', basePath),
    },
    {
      id: 'sees_friend_killed',
      name: 'Видит убитого союзника',
      audioItems: createAudioItems('sees_friend_killed', 7, 'Видит убитого союзника', basePath),
    },
    {
      id: 'sees_hostage_death',
      name: 'Видит смерть заложника',
      audioItems: createAudioItems('sees_hostage_death', 5, 'Видит смерть заложника', basePath),
    },
    {
      id: 'sees_multiple_enemies',
      name: 'Видит нескольких врагов',
      audioItems: createAudioItems('sees_multiple_enemies', 8, 'Видит нескольких врагов', basePath),
    },
    {
      id: 'sees_one_enemy',
      name: 'Видит одного врага',
      audioItems: createAudioItems('sees_one_enemy', 7, 'Видит одного врага', basePath),
    },
    {
      id: 'sees_sniper',
      name: 'Видит снайпера',
      audioItems: createAudioItems('sees_sniper', 4, 'Видит снайпера', basePath),
    },
    {
      id: 'sees_sniper_killed',
      name: 'Видит убитого снайпера',
      audioItems: createAudioItems('sees_sniper_killed', 7, 'Видит убитого снайпера', basePath),
    },
    {
      id: 'sees_team_combo',
      name: 'Видит командную комбо',
      audioItems: createAudioItems('sees_team_combo', 8, 'Видит командную комбо', basePath),
    },
    {
      id: 'sorry',
      name: 'Извинение',
      audioItems: createAudioItems('sorry', 6, 'Извинение', basePath),
    },
    {
      id: 'takingfire',
      name: 'Под огнем',
      audioItems: createAudioItems('takingfire', 8, 'Под огнем', basePath),
    },
    {
      id: 'takingfire_friendly',
      name: 'Союзник под огнем',
      audioItems: createAudioItems('takingfire_friendly', 13, 'Союзник под огнем', basePath),
    },
    {
      id: 'ten_seconds_remaining',
      name: 'Осталось десять секунд',
      audioItems: createAudioItems('ten_seconds_remaining', 4, 'Осталось десять секунд', basePath),
    },
    {
      id: 'thankful',
      name: 'Благодарность',
      audioItems: createAudioItems('thankful', 10, 'Благодарность', basePath),
    },
    {
      id: 'throwing_decoy',
      name: 'Бросаю муляж',
      audioItems: createAudioItems('throwing_decoy', 3, 'Бросаю муляж', basePath),
    },
    {
      id: 'throwing_fire',
      name: 'Бросаю зажигательную',
      audioItems: createAudioItems('throwing_fire', 2, 'Бросаю зажигательную', basePath),
    },
    {
      id: 'throwing_flashbang',
      name: 'Бросаю светошумовую',
      audioItems: createAudioItems('throwing_flashbang', 4, 'Бросаю светошумовую', basePath),
    },
    {
      id: 'throwing_grenade',
      name: 'Бросаю гранату',
      audioItems: createAudioItems('throwing_grenade', 3, 'Бросаю гранату', basePath),
    },
    {
      id: 'throwing_molotov',
      name: 'Бросаю коктейль Молотова',
      audioItems: createAudioItems('throwing_molotov', 4, 'Бросаю коктейль Молотова', basePath),
    },
    {
      id: 'throwing_smoke',
      name: 'Бросаю дымовую',
      audioItems: createAudioItems('throwing_smoke', 4, 'Бросаю дымовую', basePath),
    },
    {
      id: 'waiting_here',
      name: 'Ожидание',
      audioItems: createAudioItems('waiting_here', 8, 'Ожидание', basePath),
    },
  ],
}
