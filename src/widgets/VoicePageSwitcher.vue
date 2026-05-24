<script setup lang="ts">
import type { VoicePageId, VoicePageMeta } from '@/core/models/audioContent'

defineProps<{
  voicePages: VoicePageMeta[]
  currentVoicePageId: VoicePageId
  currentVoicePage: VoicePageMeta | null
  isLoading: boolean
}>()

const emit = defineEmits<{
  'update:currentVoicePageId': [value: VoicePageId]
}>()
</script>

<template>
  <div class="voicePages">
    <div class="voicePageSwitcher">
      <button
        v-for="page in voicePages"
        :key="page.id"
        :class="page.id === currentVoicePageId ? 'active' : ''"
        @click="emit('update:currentVoicePageId', page.id)"
      >
        {{ page.title }}
        <span class="voicePageMeta">
          {{ `${page.groups.filter((group) => !group.isMissing).length}/${page.groups.length}` }}
        </span>
      </button>
    </div>

    <p v-if="currentVoicePage" class="voicePageDescription">{{ currentVoicePage.description }}</p>
    <p v-if="isLoading" class="voicePageLoading">Подождите...</p>

    <slot v-else></slot>
  </div>
</template>

<style scoped>
.voicePages {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

.voicePageSwitcher {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  width: 100%;
  max-width: 800px;
}

.voicePageSwitcher button {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    background-color 0.15s ease,
    color 0.15s ease;
}

.voicePageSwitcher button.active {
  color: #fff;
  border-color: #222;
  background: #222;
}

.voicePageMeta {
  opacity: 0.7;
  font-size: 0.9rem;
}

.voicePageDescription,
.voicePageLoading {
  width: 100%;
  max-width: 800px;
  margin: 1rem 0 0;
  color: #666;
  line-height: 1.5;
}
</style>
