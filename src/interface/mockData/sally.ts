import type { Agent } from '@/core/models/agent'

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
      audioItems: [
        {
          id: 'affirmation_01',
          title: 'Подтверждение 1',
          url: './agents/sally/audio/affirmation_01.wav',
        },
        {
          id: 'affirmation_02',
          title: 'Подтверждение 2',
          url: './agents/sally/audio/affirmation_02.wav',
        },
      ],
    },
    {
      id: 'agree',
      name: 'Согласие',
      audioItems: [
        {
          id: 'agree_01',
          title: 'Согласие 1',
          url: './agents/sally/audio/agree_01.wav',
        },
        {
          id: 'agree_02',
          title: 'Согласие 2',
          url: './agents/sally/audio/agree_02.wav',
        },
      ],
    },
    {
      id: 'bomb_pre_explosion',
      name: 'Бомба перед взрывом',
      audioItems: [
        {
          id: 'bomb_pre_explosion_01',
          title: 'Бомба перед взрывом 1',
          url: './agents/sally/audio/bomb_pre_explosion_01.wav',
        },
        {
          id: 'bomb_pre_explosion_02',
          title: 'Бомба перед взрывом 2',
          url: './agents/sally/audio/bomb_pre_explosion_02.wav',
        },
        {
          id: 'bomb_pre_explosion_03',
          title: 'Бомба перед взрывом 3',
          url: './agents/sally/audio/bomb_pre_explosion_03.wav',
        },
      ],
    },
    {
      id: 'round_start',
      name: 'Начало раунда',
      audioItems: [
        {
          id: 'round_start_01',
          title: 'Начало раунда 1',
          url: './agents/sally/audio/round_start_01.wav',
        },
        {
          id: 'round_start_02',
          title: 'Начало раунда 2',
          url: './agents/sally/audio/round_start_02.wav',
        },
        {
          id: 'round_start_03',
          title: 'Начало раунда 3',
          url: './agents/sally/audio/round_start_03.wav',
        },
        {
          id: 'round_start_04',
          title: 'Начало раунда 4',
          url: './agents/sally/audio/round_start_04.wav',
        },
        {
          id: 'round_start_05',
          title: 'Начало раунда 5',
          url: './agents/sally/audio/round_start_05.wav',
        },
        {
          id: 'round_start_06',
          title: 'Начало раунда 6',
          url: './agents/sally/audio/round_start_06.wav',
        },
        {
          id: 'round_start_07',
          title: 'Начало раунда 7',
          url: './agents/sally/audio/round_start_07.wav',
        },
        {
          id: 'round_start_08',
          title: 'Начало раунда 8',
          url: './agents/sally/audio/round_start_08.wav',
        },
        {
          id: 'round_start_09',
          title: 'Начало раунда 9',
          url: './agents/sally/audio/round_start_09.wav',
        },
        {
          id: 'round_start_10',
          title: 'Начало раунда 10',
          url: './agents/sally/audio/round_start_10.wav',
        },
        {
          id: 'round_start_11',
          title: 'Начало раунда 11',
          url: './agents/sally/audio/round_start_11.wav',
        },
        {
          id: 'round_start_12',
          title: 'Начало раунда 12',
          url: './agents/sally/audio/round_start_12.wav',
        },
      ],
    },
    {
      id: 'round_winning',
      name: 'Выигрыш раунда',
      audioItems: [
        {
          id: 'round_winning_01',
          title: 'Выигрыш раунда 1',
          url: './agents/sally/audio/round_winning_01.wav',
        },
        {
          id: 'round_winning_02',
          title: 'Выигрыш раунда 2',
          url: './agents/sally/audio/round_winning_02.wav',
        },
        {
          id: 'round_winning_03',
          title: 'Выигрыш раунда 3',
          url: './agents/sally/audio/round_winning_03.wav',
        },
      ],
    },
    {
      id: 'round_won',
      name: 'Раунд выигран',
      audioItems: [
        {
          id: 'round_won_01',
          title: 'Раунд выигран 1',
          url: './agents/sally/audio/round_won_01.wav',
        },
        {
          id: 'round_won_02',
          title: 'Раунд выигран 2',
          url: './agents/sally/audio/round_won_02.wav',
        },
        {
          id: 'round_won_03',
          title: 'Раунд выигран 3',
          url: './agents/sally/audio/round_won_03.wav',
        },
        {
          id: 'round_won_04',
          title: 'Раунд выигран 4',
          url: './agents/sally/audio/round_won_04.wav',
        },
      ],
    },
    {
      id: 'sees_enemy',
      name: 'Видит врага',
      audioItems: [
        {
          id: 'sees_enemy_01',
          title: 'Видит врага 1',
          url: './agents/sally/audio/sees_enemy_01.wav',
        },
        {
          id: 'sees_enemy_02',
          title: 'Видит врага 2',
          url: './agents/sally/audio/sees_enemy_02.wav',
        },
        {
          id: 'sees_enemy_03',
          title: 'Видит врага 3',
          url: './agents/sally/audio/sees_enemy_03.wav',
        },
      ],
    },
    {
      id: 'waiting_here',
      name: 'Ожидание',
      audioItems: [
        {
          id: 'waiting_here_01',
          title: 'Ожидание 1',
          url: './agents/sally/audio/waiting_here_01.wav',
        },
        {
          id: 'waiting_here_02',
          title: 'Ожидание 2',
          url: './agents/sally/audio/waiting_here_02.wav',
        },
      ],
    },
  ],
}
