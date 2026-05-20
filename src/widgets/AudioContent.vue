<script setup lang="ts">
import { ref } from 'vue'
import type { AudioContent } from '@/core/models/audioContent'

defineProps<{
  audioContent: AudioContent[]
}>()

const openSections = ref<Record<string, boolean>>({})

const toggleSection = (sectionId: string) => {
  openSections.value[sectionId] = !openSections.value[sectionId]
}

const isSectionOpen = (sectionId: string): boolean => openSections.value[sectionId] ?? false
const isMissingGroup = (audioGroup: AudioContent): boolean =>
  audioGroup.isMissing === true || audioGroup.audioItems.length === 0
</script>

<template>
  <div class="audioContent">
    <div v-for="audioGroup in audioContent" :key="audioGroup.id" class="audioItems">
      <button
        class="audioSectionHeader"
        :class="isMissingGroup(audioGroup) ? 'missing' : ''"
        :aria-expanded="isSectionOpen(audioGroup.id)"
        :disabled="isMissingGroup(audioGroup)"
        @click="toggleSection(audioGroup.id)"
      >
        <h3>{{ audioGroup.name }}</h3>
        <span v-if="isMissingGroup(audioGroup)" class="missingBadge">Нет</span>
        <span v-else class="toggleIcon" :class="isSectionOpen(audioGroup.id) ? 'open' : ''">▼</span>
      </button>

      <div v-if="audioGroup.isMissing" class="audioSectionMissing">Нет у этой подфракции</div>

      <div v-else-if="isSectionOpen(audioGroup.id)" class="audioSectionContent open">
        <div v-for="audio in audioGroup.audioItems" :key="audio.id" class="audioItem">
          <p class="audioTitle">{{ audio.title }}</p>
          <audio :src="audio.url" class="audioPlayer" controls preload="none"></audio>
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
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
}

.audioItems:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.audioSectionHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 1.5rem;
  border: none;
  background-color: #fff;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.2s ease;
}

.audioSectionHeader:hover {
  background-color: #f0f0f0;
}

.audioSectionHeader.missing {
  cursor: default;
  background-color: #fafafa;
}

.audioSectionHeader h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

.missingBadge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 3rem;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #8a5a00;
  background: #fff3d8;
}

.toggleIcon {
  font-size: 0.75rem;
  color: #666;
  user-select: none;
  transition: transform 0.3s ease;
}

.toggleIcon.open {
  transform: rotate(180deg);
}

.audioSectionContent {
  max-height: 0;
  overflow: hidden;
  padding: 0 1.5rem;
  transition:
    max-height 0.3s ease,
    padding 0.3s ease;
}

.audioSectionContent.open {
  max-height: 5000px;
  padding: 1rem 1.5rem;
}

.audioSectionMissing {
  padding: 0.9rem 1.5rem 1.1rem;
  color: #666;
  font-size: 0.95rem;
  background: #fcfcfc;
}

.audioItem {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background-color: #fff;
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
  border-radius: 4px;
  outline: none;
  filter: grayscale(0%);
}

.audioPlayer:focus {
  outline: 2px solid #4a90e2;
  outline-offset: 2px;
}
</style>
