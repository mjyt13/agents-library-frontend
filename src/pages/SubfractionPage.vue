<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { AudioContent, VoicePageId } from '@/core/models/audioContent'
import type { Subfraction, SubfractionAudioSource } from '@/core/models/subfraction'
import AgentPanel from '@/widgets/AgentPanel.vue'
import * as AudioContentModule from '@/widgets/AudioContent.vue'
import VoicePageSwitcher from '@/widgets/VoicePageSwitcher.vue'

const AudioContentWidget = AudioContentModule.default

const props = defineProps<{
  subfraction: Subfraction
  factionName: string
}>()

const currentVoicePageId = ref<VoicePageId>(1)
const audioSource = ref<SubfractionAudioSource | null>(null)
const currentAudioGroups = ref<AudioContent[]>([])
const isAudioSourceLoading = ref(false)
const isVoicePageLoading = ref(false)

const audioSourceCache = new Map<string, SubfractionAudioSource>()
const pageCache = new Map<string, AudioContent[]>()

const subfractionId = computed(() => props.subfraction.meta.id)
const agents = computed(() => props.subfraction.meta.agents)
const voicePages = computed(() => audioSource.value?.voicePages ?? [])

const currentVoicePage = computed(
  () => voicePages.value.find((page) => page.id === currentVoicePageId.value) ?? voicePages.value[0] ?? null,
)

watch(
  subfractionId,
  async (id, _previousId, onCleanup) => {
    let cancelled = false
    onCleanup(() => {
      cancelled = true
    })

    audioSource.value = null
    currentAudioGroups.value = []
    isVoicePageLoading.value = false
    isAudioSourceLoading.value = true

    try {
      const cached = audioSourceCache.get(id)
      const loadedAudioSource = cached ?? (await props.subfraction.loadAudioSource())
      if (cancelled) return

      audioSourceCache.set(id, loadedAudioSource)
      audioSource.value = loadedAudioSource
      currentVoicePageId.value = loadedAudioSource.voicePages[0]?.id ?? 1
    } finally {
      if (!cancelled) isAudioSourceLoading.value = false
    }
  },
  { immediate: true },
)

watch(
  [subfractionId, currentVoicePageId, audioSource],
  async ([id, pageId, source], _previous, onCleanup) => {
    if (!source) return

    let cancelled = false
    onCleanup(() => {
      cancelled = true
    })

    const cacheKey = `${id}:${pageId}`
    const cached = pageCache.get(cacheKey)
    if (cached) {
      currentAudioGroups.value = cached
      isVoicePageLoading.value = false
      return
    }

    isVoicePageLoading.value = true

    try {
      const loadedGroups = await source.loadVoicePage(pageId)
      if (cancelled) return
      pageCache.set(cacheKey, loadedGroups)
      currentAudioGroups.value = loadedGroups
    } finally {
      if (!cancelled) isVoicePageLoading.value = false
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="subfractionPage">
    <AgentPanel :agents="agents" :faction-name="factionName" />

    <p v-if="isAudioSourceLoading" class="voicePageLoading">Пожалуйста, подождите...</p>

    <VoicePageSwitcher
      v-else-if="voicePages.length"
      v-model:current-voice-page-id="currentVoicePageId"
      :voice-pages="voicePages"
      :current-voice-page="currentVoicePage"
      :is-loading="isVoicePageLoading"
    >
      <AudioContentWidget
        v-if="currentAudioGroups.length"
        :key="`${subfractionId}:${currentVoicePageId}`"
        :audio-content="currentAudioGroups"
      />
    </VoicePageSwitcher>
  </div>
</template>

<style scoped>
.subfractionPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
}

.voicePageLoading {
  width: 100%;
  max-width: 800px;
  margin: 1rem 0 0;
  color: #666;
  line-height: 1.5;
}
</style>
