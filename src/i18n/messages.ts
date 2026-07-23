export type NavGroupId = 'terrorists' | 'counterTerrorists'

type Message = {
  home: Record<string, string>
  header: {
    tagline: string
    navGroups: Record<NavGroupId, { label: string; description: string }>
  }
  common: {
    pleaseWait: string
    no: string
    retry: string
    pageNotFound: string
    backHome: string
  }
  audio: {
    loadingVoiceLines: string
    failedToLoadLines: string
    failedToLoadLine: string
    browserBlockedAudio: string
  }
  voicePages: Record<1 | 2 | 3, { title: string; description: string }>
}

const rus: Message = {
  home: {
    title: 'CS2/CS:GO Radio Library',
    description: 'Слушай реплики фракций персонажей из CS2 и CS:GO.',
    lead: 'Сейчас библиотека собирается вокруг фракций: можно открыть конкретную фракцию, выбрать подфракциями и увидеть, какие агенты имеют эту озвучку.',
    randomAudioButton: 'Случайная реплика',
  },
  header: {
    tagline: 'Реплики фракций и доступные агенты',
    navGroups: {
      terrorists: { label: 'Террористы', description: 'Фракции террористов' },
      counterTerrorists: { label: 'Спецназ', description: 'Фракции спецназа' },
    },
  },
  common: {
    pleaseWait: 'Пожалуйста, подождите...',
    no: 'Нет',
    retry: 'Повторить',
    pageNotFound: 'Страница не найдена',
    backHome: 'На главную',
  },
  audio: {
    loadingVoiceLines: 'Загружаю голосовые линии...',
    failedToLoadLines: 'Не удалось загрузить линии',
    failedToLoadLine: 'Не удалось загрузить линию',
    browserBlockedAudio: 'Браузер не дал запустить звук',
  },
  voicePages: {
    1: { title: 'Страница 1', description: 'Наиболее известные голосовые линии.' },
    2: { title: 'Страница 2', description: 'Менее известные, но важные события группы.' },
    3: { title: 'Страница 3', description: 'Ситуативные линии' },
  },
}

const eng: Message = {
  home: {
    title: 'CS2/CS:GO Radio Library',
    description: 'Listen to the faction lines of characters from CS2 and CS:GO.',
    lead: 'The library is currently organized around factions: you can open a specific faction, select sub-factions, and see which agents have this voiceover.',
    randomAudioButton: 'Play Random Audio',
  },
  header: {
    tagline: 'Faction lines and available agents',
    navGroups: {
      terrorists: { label: 'T-side', description: 'Terrorist factions' },
      counterTerrorists: { label: 'CT-side', description: 'Counter-terrorist factions' },
    },
  },
  common: {
    pleaseWait: 'Please wait...',
    no: 'None',
    retry: 'Retry',
    pageNotFound: 'Page not found',
    backHome: 'Back to home',
  },
  audio: {
    loadingVoiceLines: 'Loading voice lines...',
    failedToLoadLines: 'Failed to load lines',
    failedToLoadLine: 'Failed to load line',
    browserBlockedAudio: 'The browser blocked audio playback',
  },
  voicePages: {
    1: { title: 'Page 1', description: 'The most well-known voice lines.' },
    2: { title: 'Page 2', description: 'Less well-known but important group events.' },
    3: { title: 'Page 3', description: 'Situational lines' },
  },
}

export const messages: Record<'en' | 'ru', Message> = {
  en: eng,
  ru: rus,
}
