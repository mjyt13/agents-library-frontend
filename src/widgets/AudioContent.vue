<script setup lang="ts">
import { ref } from 'vue'
import type { AudioContent } from '@/core/models/audioContent'

const props = defineProps<{
  audioContent: AudioContent[]
}>()

// Состояние для отслеживания открытых/закрытых секций (все закрыты по умолчанию)
const openSections = ref<Record<string, boolean>>({})

// Функция для переключения состояния секции
const toggleSection = (sectionId: string) => {
  openSections.value[sectionId] = !openSections.value[sectionId]
}

// Проверка, открыта ли секция
const isSectionOpen = (sectionId: string): boolean => {
  return openSections.value[sectionId] ?? false
}
</script>

<template>
  <div class="audioContent">
    <div class="audioItems" :key="audioGroup.id" v-for="audioGroup in audioContent">
      <button
        class="audioSectionHeader"
        @click="toggleSection(audioGroup.id)"
        :aria-expanded="isSectionOpen(audioGroup.id)"
      >
        <h3>{{ audioGroup.name }}</h3>
        <span class="toggleIcon" :class="{ open: isSectionOpen(audioGroup.id) }">▼</span>
      </button>
      <div
        class="audioSectionContent"
        :class="{ open: isSectionOpen(audioGroup.id) }"
        v-show="isSectionOpen(audioGroup.id)"
      >
        <div class="audioItem" :key="audio.id" v-for="audio in audioGroup.audioItems">
          <p class="audioTitle">{{ audio.title }}</p>
          <audio :src="audio.url" class="audioPlayer" controls></audio>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.audioContent {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
  max-width: 800px;
}

.audioItems {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
}

.audioItems:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.audioSectionHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem 1.5rem;
  background-color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-align: left;
}

.audioSectionHeader:hover {
  background-color: #f0f0f0;
}

.audioSectionHeader h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

.toggleIcon {
  font-size: 0.75rem;
  color: #666;
  transition: transform 0.3s ease;
  user-select: none;
}

.toggleIcon.open {
  transform: rotate(180deg);
}

.audioSectionContent {
  max-height: 0;
  overflow: hidden;
  transition:
    max-height 0.3s ease,
    padding 0.3s ease;
  padding: 0 1.5rem;
}

.audioSectionContent.open {
  max-height: 5000px;
  padding: 1rem 1.5rem;
}

.audioItem {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  transition: box-shadow 0.2s ease;
}

.audioItem:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.audioTitle {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: #555;
}

.audioPlayer {
  width: 100%;
  height: 40px;
  outline: none;
  border-radius: 4px;
}

/* Стилизация нативного audio плеера */
.audioPlayer::-webkit-media-controls-panel {
  background-color: #f5f5f5;
}

.audioPlayer::-webkit-media-controls-play-button {
  background-color: #4a90e2;
  border-radius: 50%;
}

.audioPlayer::-webkit-media-controls-play-button:hover {
  background-color: #a635bd;
}

.audioPlayer::-webkit-media-controls-current-time-display,
.audioPlayer::-webkit-media-controls-time-remaining-display {
  color: #ff0000;
  font-size: 1.875rem;
  transition: color 0.3s ease;
  &:hover {
    color: #a635bd;
  }
}

.audioPlayer::-webkit-media-controls-timeline {
  background-color: #ddd;
  border-radius: 2px;
}

.audioPlayer::-webkit-media-controls-volume-slider {
  background-color: #4a90e2;
}

/* Для Firefox */
.audioPlayer {
  filter: grayscale(0%);
}

.audioPlayer:focus {
  outline: 2px solid #4a90e2;
  outline-offset: 2px;
}
</style>
