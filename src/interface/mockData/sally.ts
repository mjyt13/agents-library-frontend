import type { Agent } from '@/core/models/agent'

// Вспомогательная функция для создания массива аудио элементов
const createAudioItems = (
  prefix: string,
  count: number,
  categoryName: string,
  startFrom: number = 1,
): Array<{ id: string; title: string; url: string }> => {
  return Array.from({ length: count }, (_, i) => {
    const num = (i + startFrom).toString().padStart(2, '0')
    return {
      id: `${prefix}_${num}`,
      title: `${categoryName} ${i + startFrom}`,
      url: `./agents/sally/audio/${prefix}_${num}.wav`,
    }
  })
}

export const sally: Agent = {
  id: 'sally',
  name: 'Sally',
  fraction: ' Professionals',
  description:
    "Small enough to hide in plain sight but loud enough to frighten the biggest enemies, Getaway Sally is The Professionals' first pick for tight quarter Wealth Acquisition Projects. A talented weaver of controlled chaos, Getaway Sally has the improvisational skills to turn the tables on any dire heist and hostage situations. Now you don't see me, and now you still don't.",
  comment:
    'This might look like an obsession but right now I experience Vue and new Frontend architecture',
  photos: ['./agents/sally/1083625.png', './agents/sally/images.jpg'],
  voiceLines: [
    {
      id: 'affirmation',
      name: 'Подтверждения',
      audioItems: createAudioItems('affirmation', 10, 'Подтверждение'),
    },
    {
      id: 'agree',
      name: 'Согласие',
      audioItems: createAudioItems('agree', 7, 'Согласие'),
    },
    {
      id: 'at_enemy_spawn',
      name: 'У спавна врага',
      audioItems: createAudioItems('at_enemy_spawn', 3, 'У спавна врага'),
    },
    {
      id: 'at_our_spawn',
      name: 'У нашего спавна',
      audioItems: createAudioItems('at_our_spawn', 3, 'У нашего спавна'),
    },
    {
      id: 'attacking',
      name: 'Атака',
      audioItems: createAudioItems('attacking', 10, 'Атака'),
    },
    {
      id: 'blinded',
      name: 'Ослеплен',
      audioItems: createAudioItems('blinded', 4, 'Ослеплен'),
    },
    {
      id: 'bomb_planted',
      name: 'Бомба установлена',
      audioItems: createAudioItems('bomb_planted', 4, 'Бомба установлена'),
    },
    {
      id: 'bomb_pre_explosion',
      name: 'Бомба перед взрывом',
      audioItems: createAudioItems('bomb_pre_explosion', 3, 'Бомба перед взрывом'),
    },
    {
      id: 'bombsite_clear',
      name: 'Бомбовая площадка чиста',
      audioItems: createAudioItems('bombsite_clear', 4, 'Бомбовая площадка чиста'),
    },
    {
      id: 'cheer',
      name: 'Радость',
      audioItems: createAudioItems('cheer', 10, 'Радость'),
    },
    {
      id: 'compliment',
      name: 'Комплимент',
      audioItems: createAudioItems('compliment', 7, 'Комплимент'),
    },
    {
      id: 'countdown',
      name: 'Обратный отсчет',
      audioItems: createAudioItems('countdown', 1, 'Обратный отсчет'),
    },
    {
      id: 'covering_friend',
      name: 'Прикрываю союзника',
      audioItems: createAudioItems('covering_friend', 5, 'Прикрываю союзника'),
    },
    {
      id: 'death',
      name: 'Смерть',
      audioItems: createAudioItems('death', 7, 'Смерть'),
    },
    {
      id: 'disagree',
      name: 'Несогласие',
      audioItems: createAudioItems('disagree', 7, 'Несогласие'),
    },
    {
      id: 'enemies_left_none',
      name: 'Врагов не осталось',
      audioItems: createAudioItems('enemies_left_none', 5, 'Врагов не осталось'),
    },
    {
      id: 'enemies_left_one',
      name: 'Остался один враг',
      audioItems: createAudioItems('enemies_left_one', 5, 'Остался один враг'),
    },
    {
      id: 'enemies_left_three',
      name: 'Осталось три врага',
      audioItems: createAudioItems('enemies_left_three', 4, 'Осталось три врага'),
    },
    {
      id: 'enemies_left_two',
      name: 'Осталось два врага',
      audioItems: createAudioItems('enemies_left_two', 4, 'Осталось два врага'),
    },
    {
      id: 'following_friend',
      name: 'Следую за союзником',
      audioItems: createAudioItems('following_friend', 6, 'Следую за союзником'),
    },
    {
      id: 'friend_plant_bomb',
      name: 'Союзник устанавливает бомбу',
      audioItems: createAudioItems('friend_plant_bomb', 9, 'Союзник устанавливает бомбу'),
    },
    {
      id: 'guarding_bombsite',
      name: 'Охраняю бомбовую площадку',
      audioItems: createAudioItems('guarding_bombsite', 6, 'Охраняю бомбовую площадку'),
    },
    {
      id: 'guarding_bombsite_a',
      name: 'Охраняю бомбовую площадку A',
      audioItems: createAudioItems('guarding_bombsite_a', 4, 'Охраняю бомбовую площадку A'),
    },
    {
      id: 'guarding_bombsite_b',
      name: 'Охраняю бомбовую площадку B',
      audioItems: createAudioItems('guarding_bombsite_b', 6, 'Охраняю бомбовую площадку B'),
    },
    {
      id: 'guarding_escapezone',
      name: 'Охраняю зону эвакуации',
      audioItems: createAudioItems('guarding_escapezone', 6, 'Охраняю зону эвакуации'),
    },
    {
      id: 'guarding_hostage',
      name: 'Охраняю заложника',
      audioItems: createAudioItems('guarding_hostage', 5, 'Охраняю заложника'),
    },
    {
      id: 'guarding_live_bomb',
      name: 'Охраняю живую бомбу',
      audioItems: createAudioItems('guarding_live_bomb', 5, 'Охраняю живую бомбу'),
    },
    {
      id: 'heard_sound',
      name: 'Услышал звук',
      audioItems: createAudioItems('heard_sound', 6, 'Услышал звук'),
    },
    {
      id: 'i_killed_enemy',
      name: 'Я убил врага',
      audioItems: createAudioItems('i_killed_enemy', 15, 'Я убил врага'),
    },
    {
      id: 'i_killed_sniper',
      name: 'Я убил снайпера',
      audioItems: createAudioItems('i_killed_sniper', 6, 'Я убил снайпера'),
    },
    {
      id: 'i_plant_bomb',
      name: 'Я устанавливаю бомбу',
      audioItems: createAudioItems('i_plant_bomb', 5, 'Я устанавливаю бомбу'),
    },
    {
      id: 'in_position',
      name: 'На позиции',
      audioItems: createAudioItems('in_position', 8, 'На позиции'),
    },
    {
      id: 'last_unit_alive',
      name: 'Последний в живых',
      audioItems: createAudioItems('last_unit_alive', 8, 'Последний в живых'),
    },
    {
      id: 'loc_a',
      name: 'Локация A',
      audioItems: createAudioItems('loc_a', 12, 'Локация A'),
    },
    {
      id: 'loc_b',
      name: 'Локация B',
      audioItems: createAudioItems('loc_b', 10, 'Локация B'),
    },
    {
      id: 'loc_back',
      name: 'Локация: Сзади',
      audioItems: createAudioItems('loc_back', 1, 'Локация: Сзади'),
    },
    {
      id: 'loc_bridge',
      name: 'Локация: Мост',
      audioItems: createAudioItems('loc_bridge', 1, 'Локация: Мост'),
    },
    {
      id: 'loc_catwalk',
      name: 'Локация: Трап',
      audioItems: createAudioItems('loc_catwalk', 1, 'Локация: Трап'),
    },
    {
      id: 'loc_connector',
      name: 'Локация: Соединитель',
      audioItems: createAudioItems('loc_connector', 1, 'Локация: Соединитель'),
    },
    {
      id: 'loc_door',
      name: 'Локация: Дверь',
      audioItems: createAudioItems('loc_door', 1, 'Локация: Дверь'),
    },
    {
      id: 'loc_doubledoors',
      name: 'Локация: Двойные двери',
      audioItems: createAudioItems('loc_doubledoors', 1, 'Локация: Двойные двери'),
    },
    {
      id: 'loc_front',
      name: 'Локация: Спереди',
      audioItems: createAudioItems('loc_front', 1, 'Локация: Спереди'),
    },
    {
      id: 'loc_hole',
      name: 'Локация: Дыра',
      audioItems: createAudioItems('loc_hole', 1, 'Локация: Дыра'),
    },
    {
      id: 'loc_hostage',
      name: 'Локация: Заложник',
      audioItems: createAudioItems('loc_hostage', 6, 'Локация: Заложник'),
    },
    {
      id: 'loc_hostage_escapezone',
      name: 'Локация: Зона эвакуации заложника',
      audioItems: createAudioItems('loc_hostage_escapezone', 3, 'Локация: Зона эвакуации заложника'),
    },
    {
      id: 'loc_hut',
      name: 'Локация: Хижина',
      audioItems: createAudioItems('loc_hut', 1, 'Локация: Хижина'),
    },
    {
      id: 'loc_long',
      name: 'Локация: Длинная',
      audioItems: createAudioItems('loc_long', 1, 'Локация: Длинная'),
    },
    {
      id: 'loc_mid',
      name: 'Локация: Середина',
      audioItems: createAudioItems('loc_mid', 4, 'Локация: Середина'),
    },
    {
      id: 'loc_our_spawn',
      name: 'Локация: Наш спавн',
      audioItems: createAudioItems('loc_our_spawn', 1, 'Локация: Наш спавн'),
    },
    {
      id: 'loc_overpass',
      name: 'Локация: Эстакада',
      audioItems: createAudioItems('loc_overpass', 1, 'Локация: Эстакада'),
    },
    {
      id: 'loc_palace',
      name: 'Локация: Дворец',
      audioItems: createAudioItems('loc_palace', 1, 'Локация: Дворец'),
    },
    {
      id: 'loc_platform',
      name: 'Локация: Платформа',
      audioItems: createAudioItems('loc_platform', 1, 'Локация: Платформа'),
    },
    {
      id: 'loc_ramp',
      name: 'Локация: Пандус',
      audioItems: createAudioItems('loc_ramp', 1, 'Локация: Пандус'),
    },
    {
      id: 'loc_snipers_nest',
      name: 'Локация: Гнездо снайпера',
      audioItems: createAudioItems('loc_snipers_nest', 1, 'Локация: Гнездо снайпера'),
    },
    {
      id: 'loc_stairs',
      name: 'Локация: Лестница',
      audioItems: createAudioItems('loc_stairs', 1, 'Локация: Лестница'),
    },
    {
      id: 'loc_truck',
      name: 'Локация: Грузовик',
      audioItems: createAudioItems('loc_truck', 1, 'Локация: Грузовик'),
    },
    {
      id: 'loc_yard',
      name: 'Локация: Двор',
      audioItems: createAudioItems('loc_yard', 1, 'Локация: Двор'),
    },
    {
      id: 'lost_sight_enemy',
      name: 'Потерял врага из виду',
      audioItems: createAudioItems('lost_sight_enemy', 3, 'Потерял врага из виду'),
    },
    {
      id: 'negative',
      name: 'Негатив',
      audioItems: createAudioItems('negative', 8, 'Негатив'),
    },
    {
      id: 'omw',
      name: 'В пути',
      audioItems: createAudioItems('omw', 6, 'В пути'),
    },
    {
      id: 'omw_to_escapezone',
      name: 'В пути к зоне эвакуации',
      audioItems: createAudioItems('omw_to_escapezone', 4, 'В пути к зоне эвакуации'),
    },
    {
      id: 'omw_to_hostage',
      name: 'В пути к заложнику',
      audioItems: [
        ...createAudioItems('omw_to_hostage', 3, 'В пути к заложнику'),
        {
          id: 'omw_to_hostage_05',
          title: 'В пути к заложнику 5',
          url: './agents/sally/audio/omw_to_hostage_05.wav',
        },
      ],
    },
    {
      id: 'omw_to_plant_a',
      name: 'В пути к установке бомбы A',
      audioItems: createAudioItems('omw_to_plant_a', 4, 'В пути к установке бомбы A'),
    },
    {
      id: 'omw_to_plant_b',
      name: 'В пути к установке бомбы B',
      audioItems: createAudioItems('omw_to_plant_b', 6, 'В пути к установке бомбы B'),
    },
    {
      id: 'pinned',
      name: 'Прижат',
      audioItems: createAudioItems('pinned', 5, 'Прижат'),
    },
    {
      id: 'reporting_in',
      name: 'Докладываю',
      audioItems: createAudioItems('reporting_in', 5, 'Докладываю'),
    },
    {
      id: 'request_backup',
      name: 'Запрос подкрепления',
      audioItems: createAudioItems('request_backup', 4, 'Запрос подкрепления'),
    },
    {
      id: 'request_coverme',
      name: 'Запрос прикрытия',
      audioItems: createAudioItems('request_coverme', 3, 'Запрос прикрытия'),
    },
    {
      id: 'request_decoy',
      name: 'Запрос муляжа',
      audioItems: createAudioItems('request_decoy', 3, 'Запрос муляжа'),
    },
    {
      id: 'request_eco',
      name: 'Запрос экономного раунда',
      audioItems: createAudioItems('request_eco', 3, 'Запрос экономного раунда'),
    },
    {
      id: 'request_fallback',
      name: 'Запрос отступления',
      audioItems: createAudioItems('request_fallback', 3, 'Запрос отступления'),
    },
    {
      id: 'request_fire',
      name: 'Запрос огня',
      audioItems: createAudioItems('request_fire', 3, 'Запрос огня'),
    },
    {
      id: 'request_flash',
      name: 'Запрос светошумовой',
      audioItems: createAudioItems('request_flash', 3, 'Запрос светошумовой'),
    },
    {
      id: 'request_follow_me',
      name: 'Запрос следовать за мной',
      audioItems: createAudioItems('request_follow_me', 6, 'Запрос следовать за мной'),
    },
    {
      id: 'request_grenade',
      name: 'Запрос гранаты',
      audioItems: createAudioItems('request_grenade', 3, 'Запрос гранаты'),
    },
    {
      id: 'request_help',
      name: 'Запрос помощи',
      audioItems: createAudioItems('request_help', 6, 'Запрос помощи'),
    },
    {
      id: 'request_hold',
      name: 'Запрос удержания',
      audioItems: createAudioItems('request_hold', 3, 'Запрос удержания'),
    },
    {
      id: 'request_leader',
      name: 'Запрос лидера',
      audioItems: createAudioItems('request_leader', 3, 'Запрос лидера'),
    },
    {
      id: 'request_move',
      name: 'Запрос движения',
      audioItems: createAudioItems('request_move', 8, 'Запрос движения'),
    },
    {
      id: 'request_plan',
      name: 'Запрос плана',
      audioItems: createAudioItems('request_plan', 4, 'Запрос плана'),
    },
    {
      id: 'request_quiet',
      name: 'Запрос тишины',
      audioItems: createAudioItems('request_quiet', 7, 'Запрос тишины'),
    },
    {
      id: 'request_regroup',
      name: 'Запрос перегруппировки',
      audioItems: createAudioItems('request_regroup', 4, 'Запрос перегруппировки'),
    },
    {
      id: 'request_report',
      name: 'Запрос доклада',
      audioItems: createAudioItems('request_report', 6, 'Запрос доклада'),
    },
    {
      id: 'request_smoke',
      name: 'Запрос дымовой',
      audioItems: createAudioItems('request_smoke', 3, 'Запрос дымовой'),
    },
    {
      id: 'request_spend',
      name: 'Запрос траты',
      audioItems: createAudioItems('request_spend', 5, 'Запрос траты'),
    },
    {
      id: 'request_spreadout',
      name: 'Запрос рассредоточения',
      audioItems: createAudioItems('request_spreadout', 5, 'Запрос рассредоточения'),
    },
    {
      id: 'request_stick_together',
      name: 'Запрос держаться вместе',
      audioItems: createAudioItems('request_stick_together', 5, 'Запрос держаться вместе'),
    },
    {
      id: 'request_weapon',
      name: 'Запрос оружия',
      audioItems: createAudioItems('request_weapon', 4, 'Запрос оружия'),
    },
    {
      id: 'round_losing',
      name: 'Проигрываем раунд',
      audioItems: createAudioItems('round_losing', 10, 'Проигрываем раунд'),
    },
    {
      id: 'round_lost',
      name: 'Раунд проигран',
      audioItems: createAudioItems('round_lost', 3, 'Раунд проигран'),
    },
    {
      id: 'round_start',
      name: 'Начало раунда',
      audioItems: createAudioItems('round_start', 4, 'Начало раунда'),
    },
    {
      id: 'round_winning',
      name: 'Выигрываем раунд',
      audioItems: createAudioItems('round_winning', 3, 'Выигрываем раунд'),
    },
    {
      id: 'round_won',
      name: 'Раунд выигран',
      audioItems: createAudioItems('round_won', 4, 'Раунд выигран'),
    },
    {
      id: 'sees_enemy',
      name: 'Видит врага',
      audioItems: createAudioItems('sees_enemy', 8, 'Видит врага'),
    },
    {
      id: 'sees_enemy_killed',
      name: 'Видит убитого врага',
      audioItems: createAudioItems('sees_enemy_killed', 12, 'Видит убитого врага'),
    },
    {
      id: 'sees_friend_killed',
      name: 'Видит убитого союзника',
      audioItems: createAudioItems('sees_friend_killed', 7, 'Видит убитого союзника'),
    },
    {
      id: 'sees_hostage_death',
      name: 'Видит смерть заложника',
      audioItems: createAudioItems('sees_hostage_death', 5, 'Видит смерть заложника'),
    },
    {
      id: 'sees_multiple_enemies',
      name: 'Видит нескольких врагов',
      audioItems: createAudioItems('sees_multiple_enemies', 8, 'Видит нескольких врагов'),
    },
    {
      id: 'sees_one_enemy',
      name: 'Видит одного врага',
      audioItems: createAudioItems('sees_one_enemy', 7, 'Видит одного врага'),
    },
    {
      id: 'sees_sniper',
      name: 'Видит снайпера',
      audioItems: createAudioItems('sees_sniper', 4, 'Видит снайпера'),
    },
    {
      id: 'sees_sniper_killed',
      name: 'Видит убитого снайпера',
      audioItems: createAudioItems('sees_sniper_killed', 7, 'Видит убитого снайпера'),
    },
    {
      id: 'sees_team_combo',
      name: 'Видит командную комбо',
      audioItems: createAudioItems('sees_team_combo', 8, 'Видит командную комбо'),
    },
    {
      id: 'sorry',
      name: 'Извинение',
      audioItems: createAudioItems('sorry', 6, 'Извинение'),
    },
    {
      id: 'takingfire',
      name: 'Под огнем',
      audioItems: createAudioItems('takingfire', 8, 'Под огнем'),
    },
    {
      id: 'takingfire_friendly',
      name: 'Союзник под огнем',
      audioItems: createAudioItems('takingfire_friendly', 13, 'Союзник под огнем'),
    },
    {
      id: 'ten_seconds_remaining',
      name: 'Осталось десять секунд',
      audioItems: createAudioItems('ten_seconds_remaining', 4, 'Осталось десять секунд'),
    },
    {
      id: 'thankful',
      name: 'Благодарность',
      audioItems: createAudioItems('thankful', 10, 'Благодарность'),
    },
    {
      id: 'throwing_decoy',
      name: 'Бросаю муляж',
      audioItems: createAudioItems('throwing_decoy', 3, 'Бросаю муляж'),
    },
    {
      id: 'throwing_fire',
      name: 'Бросаю зажигательную',
      audioItems: createAudioItems('throwing_fire', 2, 'Бросаю зажигательную'),
    },
    {
      id: 'throwing_flashbang',
      name: 'Бросаю светошумовую',
      audioItems: createAudioItems('throwing_flashbang', 4, 'Бросаю светошумовую'),
    },
    {
      id: 'throwing_grenade',
      name: 'Бросаю гранату',
      audioItems: createAudioItems('throwing_grenade', 3, 'Бросаю гранату'),
    },
    {
      id: 'throwing_molotov',
      name: 'Бросаю коктейль Молотова',
      audioItems: createAudioItems('throwing_molotov', 4, 'Бросаю коктейль Молотова'),
    },
    {
      id: 'throwing_smoke',
      name: 'Бросаю дымовую',
      audioItems: createAudioItems('throwing_smoke', 4, 'Бросаю дымовую'),
    },
    {
      id: 'waiting_here',
      name: 'Ожидание',
      audioItems: createAudioItems('waiting_here', 8, 'Ожидание'),
    },
  ],
}
