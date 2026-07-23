<script setup lang="ts">
import { ref, watch } from 'vue'
import type { AudioContent, AudioItem } from '@/core/models/audioContent'
import { useI18nStore } from '@/stores/i18n'

const props = defineProps<{
  audioContent: AudioContent[]
}>()

const i18nStore = useI18nStore()

const rootEl = ref<HTMLElement | null>(null)

const pauseOtherPlayers = (event: Event) => {
  const startedPlayer = event.target as HTMLAudioElement
  rootEl.value?.querySelectorAll('audio').forEach((audio) => {
    if (audio !== startedPlayer && !audio.paused) audio.pause()
  })
}

const openSections = ref<Record<string, boolean>>({})
const loadingSections = ref<Record<string, boolean>>({})
const resolvedItems = ref<Record<string, AudioItem[]>>({})

const getSectionId = (audioGroup: AudioContent): string => audioGroup.meta.id

const isMissingGroup = (audioGroup: AudioContent): boolean =>
  audioGroup.meta.isMissing === true ||
  (audioGroup.meta.itemCount ?? audioGroup.audioItems.length) === 0

const isSectionOpen = (sectionId: string): boolean => openSections.value[sectionId] ?? false
const isSectionLoading = (sectionId: string): boolean => loadingSections.value[sectionId] ?? false
const getSectionItems = (sectionId: string): AudioItem[] => resolvedItems.value[sectionId] ?? []

const resetSections = () => {
  openSections.value = {}
  loadingSections.value = {}
  resolvedItems.value = {}
}

const resolveSectionItems = async (audioGroup: AudioContent): Promise<void> => {
  const sectionId = getSectionId(audioGroup)
  if (resolvedItems.value[sectionId] || isMissingGroup(audioGroup)) return

  loadingSections.value[sectionId] = true

  try {
    resolvedItems.value[sectionId] = await Promise.all(
      audioGroup.audioItems.map((loadItem) => loadItem()),
    )
  } finally {
    loadingSections.value[sectionId] = false
  }
}

const toggleSection = async (audioGroup: AudioContent) => {
  if (isMissingGroup(audioGroup)) return

  const sectionId = getSectionId(audioGroup)
  const nextState = !isSectionOpen(sectionId)
  openSections.value[sectionId] = nextState

  if (nextState) {
    await resolveSectionItems(audioGroup)
  }
}

watch(() => props.audioContent, resetSections)
</script>

<template>
  <div ref="rootEl" class="audioContent" @play.capture="pauseOtherPlayers">
    <div v-for="audioGroup in props.audioContent" :key="audioGroup.meta.id" class="audioItems">
      <button
        class="audioSectionHeader"
        :class="isMissingGroup(audioGroup) ? 'missing' : ''"
        :aria-expanded="isSectionOpen(audioGroup.meta.id)"
        :disabled="isMissingGroup(audioGroup)"
        @click="toggleSection(audioGroup)"
      >
        <h3>{{ audioGroup.meta.name }}</h3>
        <span v-if="audioGroup.meta.isMissing" class="missingBadge">{{
          i18nStore.getMessage.common.no
        }}</span>
        <span v-else class="toggleMeta">
          <span class="itemCount">{{
            audioGroup.meta.itemCount ?? audioGroup.audioItems.length
          }}</span>
          <span class="toggleIcon" :class="isSectionOpen(audioGroup.meta.id) ? 'open' : ''">▼</span>
        </span>
      </button>

      <!-- <div v-if="audioGroup.meta.isMissing" class="audioSectionMissing">Нет {{ audioGroup.meta.name }}</div> -->

      <div v-if="isSectionOpen(audioGroup.meta.id)" class="audioSectionContent open">
        <div v-if="isSectionLoading(audioGroup.meta.id)" class="audioSectionLoading">
          {{ i18nStore.getMessage.audio.loadingVoiceLines }}
        </div>

        <div
          v-else
          v-for="audio in getSectionItems(audioGroup.meta.id)"
          :key="audio.id"
          class="audioItem"
        >
          <p class="audioTitle">{{ audio.title }}</p>
          <audio :src="audio.url" class="audioPlayer" controls preload="none"></audio>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.audioContent {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
  /* max-width: 900px; */
}

.audioItems {
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  margin: 0 0 1rem;
  break-inside: avoid;
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 4px;
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

.toggleMeta {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
}

.itemCount {
  font-size: 0.85rem;
  color: #666;
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

.audioSectionMissing,
.audioSectionLoading {
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

@media (max-width: 768px) {
  .audioContent {
    columns: 1;
  }
}
</style>
