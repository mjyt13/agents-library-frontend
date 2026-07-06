<script setup lang="ts">
import type { VoicePageId, VoicePageMeta } from '@/core/models/audioContent'
import { useI18nStore } from '@/stores/i18n'

const i18nStore = useI18nStore()

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
        {{ i18nStore.getMessage.voicePages[page.id].title }}
        <span class="voicePageMeta">
          {{ `${page.groups.filter((group) => !group.isMissing).length}/${page.groups.length}` }}
        </span>
      </button>
    </div>

    <p v-if="currentVoicePage" class="voicePageDescription">
      {{ i18nStore.getMessage.voicePages[currentVoicePage.id].description }}
    </p>
    <p v-if="isLoading" class="voicePageLoading">{{ i18nStore.getMessage.common.pleaseWait }}</p>

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
  align-items: stretch;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  overflow: hidden;
  border: 1px solid #cfd5dd;
  border-radius: 10px;
  background: #fff;
}

.voicePageSwitcher button {
  display: inline-flex;
  flex: 1 1 0;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-width: 0;
  padding: 0.55rem 1rem;
  border: 0;
  border-left: 1px solid #cfd5dd;
  background: #fff;
  cursor: pointer;
  text-align: center;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.voicePageSwitcher button:first-child {
  border-left: 0;
}

.voicePageSwitcher button.active {
  color: #fff;
  background: #222;
}

.voicePageMeta {
  opacity: 0.7;
  font-size: 0.9rem;
}

@media (max-width: 520px) {
  .voicePageSwitcher button {
    flex-direction: column;
    gap: 0.15rem;
    padding: 0.55rem 0.35rem;
  }
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
