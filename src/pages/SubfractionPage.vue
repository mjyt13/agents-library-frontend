<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { AudioContent, VoicePageId } from '@/core/models/audioContent'
import type { Subfraction, SubfractionAudioSource } from '@/core/models/subfraction'
import { useI18nStore } from '@/stores/i18n'
import AgentPanel from '@/widgets/AgentPanel.vue'
import * as AudioContentModule from '@/widgets/AudioContent.vue'
import * as SoundpadContentModule from '@/widgets/SoundpadContent.vue'
import VoicePageSwitcher from '@/widgets/VoicePageSwitcher.vue'

const AudioContentWidget = AudioContentModule.default
const SoundpadContentWidget = SoundpadContentModule.default

const i18nStore = useI18nStore()

const props = defineProps<{
  subfraction: Subfraction
  factionName: string
}>()

const currentVoicePageId = ref<VoicePageId>(1)
const audioSource = ref<SubfractionAudioSource | null>(null)
const currentAudioGroups = ref<AudioContent[]>([])
const isAudioSourceLoading = ref(false)
const isVoicePageLoading = ref(false)
const audioMode = ref<'soundpad' | 'dropdown'>('soundpad')

const audioSourceCache = new Map<string, SubfractionAudioSource>()
const pageCache = new Map<string, AudioContent[]>()

const subfractionId = computed(() => props.subfraction.meta.id)
const agents = computed(() => props.subfraction.meta.agents)
const voicePages = computed(() => audioSource.value?.voicePages ?? [])

const currentVoicePage = computed(
  () =>
    voicePages.value.find((page) => page.id === currentVoicePageId.value) ??
    voicePages.value[0] ??
    null,
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
    <main class="audioWorkspace">
      <div class="audioToolbar" aria-label="Audio mode">
        <button :class="audioMode === 'soundpad' ? 'active' : ''" @click="audioMode = 'soundpad'">
          Soundpad
        </button>
        <button :class="audioMode === 'dropdown' ? 'active' : ''" @click="audioMode = 'dropdown'">
          Dropdown
        </button>
      </div>

      <p v-if="isAudioSourceLoading" class="voicePageLoading">
        {{ i18nStore.getMessage.common.pleaseWait }}
      </p>

      <VoicePageSwitcher
        v-else-if="voicePages.length"
        v-model:current-voice-page-id="currentVoicePageId"
        :voice-pages="voicePages"
        :current-voice-page="currentVoicePage"
        :is-loading="isVoicePageLoading"
      >
        <SoundpadContentWidget
          v-if="audioMode === 'soundpad' && currentAudioGroups.length"
          :key="`soundpad:${subfractionId}:${currentVoicePageId}`"
          :audio-content="currentAudioGroups"
        />

        <AudioContentWidget
          v-else-if="currentAudioGroups.length"
          :key="`dropdown:${subfractionId}:${currentVoicePageId}`"
          :audio-content="currentAudioGroups"
        />
      </VoicePageSwitcher>
    </main>

    <aside class="agentSidebar">
      <AgentPanel :agents="agents" :faction-name="factionName" />
    </aside>
  </div>
</template>

<style scoped>
.subfractionPage {
  --agent-sidebar-width: 400px;

  display: grid;
  grid-template-columns: minmax(0, 1fr) var(--agent-sidebar-width);
  align-items: start;
  gap: 1.5rem;
  width: 100%;
  padding: 1rem;
}

.audioWorkspace,
.agentSidebar {
  min-width: 0;
  width: 100%;
}

.audioWorkspace {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.agentSidebar {
  position: sticky;
  top: 1rem;
}

.audioToolbar {
  display: inline-flex;
  gap: 0.25rem;
  align-self: center;
  padding: 0.25rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
}

.audioToolbar button {
  padding: 0.45rem 0.85rem;
  border: 0;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  color: var(--color-muted);
}

.audioToolbar button.active {
  color: #fff;
  background: var(--color-accent);
}

.voicePageLoading {
  width: 100%;
  max-width: 800px;
  margin: 1rem 0 0;
  color: #666;
  line-height: 1.5;
}

@media (max-width: 1024px) {
  .subfractionPage {
    display: flex;
    grid-template-columns: none;
    gap: 1rem;
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;
    scroll-padding: 1rem;
    scrollbar-width: none;
  }

  .subfractionPage::-webkit-scrollbar {
    display: none;
  }

  .audioWorkspace,
  .agentSidebar {
    flex: 0 0 calc(100vw - 2rem);
    min-height: calc(100vh - 2rem);
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }

  .agentSidebar {
    position: static;
  }
}
</style>
