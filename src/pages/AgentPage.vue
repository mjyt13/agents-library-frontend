<script setup lang="ts">
import { computed } from 'vue'
import type { Agent } from '@/core/models/agent'
import AudioContent from '@/widgets/AudioContent.vue'

const props = defineProps<{
  agent: Agent
}>()

// Предзагружаем все файлы агентов через import.meta.glob с eager: true
// Это позволяет Vite правильно обработать динамические импорты и получить URL синхронно
// Путь должен быть относительно корня проекта
const agentAssetsModules = import.meta.glob('/src/interface/mockData/agents/**/*', {
  eager: true,
  query: '?url',
})

// Отладка: выводим ключи для проверки структуры
if (import.meta.env.DEV) {
  console.log('Agent assets modules keys:', Object.keys(agentAssetsModules).slice(0, 5))
}

/**
 * Получает URL для статических файлов агента (аудио, изображения)
 * используя предзагруженные модули через import.meta.glob
 * @param relativePath - относительный путь от папки agents (например, 'sally/audio/file.wav')
 * @returns полный URL к файлу
 */
const getAgentAssetUrl = (relativePath: string): string => {
  // Путь должен совпадать с паттерном в import.meta.glob (с начальным /)
  const fullPath = `/src/interface/mockData/agents/${relativePath}`
  const module = agentAssetsModules[fullPath]

  if (import.meta.env.DEV) {
    console.log('Looking for path:', fullPath)
    console.log('Found module:', module)
  }

  if (module && typeof module === 'object' && 'default' in module) {
    return module.default as string
  }
  // Fallback: используем прямой путь через import.meta.env.BASE_URL
  const baseUrl = import.meta.env.BASE_URL
  return `${baseUrl}src/interface/mockData/agents/${relativePath}`
}

// Преобразуем пути к фото в динамические URL
// Путь в данных: './agents/sally/1083625.png' -> нужен: 'sally/1083625.png'
const photoUrls = computed(() => {
  return props.agent.photos.map((photo) => {
    // Убираем './agents/' из начала пути
    const relativePath = photo.replace(/^\.\/agents\//, '')
    return getAgentAssetUrl(relativePath)
  })
})

// Преобразуем пути к аудио в динамические URL
const audioContentWithUrls = computed(() => {
  return props.agent.voiceLines.map((voiceLine) => ({
    ...voiceLine,
    audioItems: voiceLine.audioItems.map((audioItem) => {
      // Убираем './agents/' из начала пути
      const relativePath = audioItem.url.replace(/^\.\/agents\//, '')
      return {
        ...audioItem,
        url: getAgentAssetUrl(relativePath),
      }
    }),
  }))
})
</script>

<template>
  <div class="agentPage">
    <h1>{{ agent.name }} || {{ agent.fraction }}</h1>
    <h4 class="agentDescription">{{ agent.description }}</h4>
    <br />
    <h4 class="agentComment">{{ agent.comment }}</h4>
    <div class="agentContent">
      <div class="agentPhotos">
        <img class="agentPhoto" :key="photo" v-for="photo in photoUrls" :src="photo" />
      </div>
      <AudioContent :audio-content="audioContentWithUrls" />
    </div>
  </div>
</template>

<style scoped>
.agentPage {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.agentPage h1 {
  font-size: 3rem;
  font-weight: bold;
}
.agentPage .agentDescription {
  font-size: 1.5rem;
  font-weight: normal;
}
.agentPage .agentComment {
  font-size: 1.5rem;
  font-weight: bold;
}
.agentPage .agentContent {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
}
.agentPage .agentPhotos {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
}
.agentPage .agentPhotos .agentPhoto {
  width: 200px;
  height: 200px;
  object-fit: contain;
}
</style>
