<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'
import type { AudioContent, VoicePageId } from '@/core/models/audioContent'
import type { Subfraction, SubfractionAudioSource } from '@/core/models/subfraction'
import * as AudioContentModule from '@/widgets/AudioContent.vue'

const AudioContentWidget = AudioContentModule.default

const props = defineProps<{
  subfraction: Subfraction
  factionName: string
}>()

const imageAssets = import.meta.glob('/src/interface/data/**/*.{png,jpg,jpeg,webp}', {
  import: 'default',
  query: '?url',
})

const getImageAssetUrl = async (path: string): Promise<string> => {
  const fullPath = `/src/interface/data/${path}`
  const mod = imageAssets[fullPath]
  if (typeof mod === 'function') return (await mod()) as string
  return `${import.meta.env.BASE_URL}src/interface/data/${path}`
}

const currentIndex = ref(0)
const currentVoicePageId = ref<VoicePageId>(1)
const previewUrl = ref('')
const audioSource = ref<SubfractionAudioSource | null>(null)
const currentAudioGroups = ref<AudioContent[]>([])
const isAudioSourceLoading = ref(false)
const isVoicePageLoading = ref(false)

const audioSourceCache = new Map<string, SubfractionAudioSource>()
const pageCache = new Map<string, AudioContent[]>()

const subfractionId = computed(() => props.subfraction.meta.id)
const agents = computed(() => props.subfraction.meta.agents)
const agent = computed(() => agents.value[currentIndex.value])
const hasMultiple = computed(() => agents.value.length > 1)
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

    currentIndex.value = 0
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

watchEffect(async (onCleanup) => {
  let cancelled = false
  onCleanup(() => {
    cancelled = true
  })

  const photoPath = agent.value?.photos[0]
  const resolvedPreviewUrl = photoPath ? await getImageAssetUrl(photoPath) : ''
  if (cancelled) return
  previewUrl.value = resolvedPreviewUrl
})

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + agents.value.length) % agents.value.length
}

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % agents.value.length
}
</script>

<template>
  <div class="subfractionPage">
    <div class="agentHeader">
      <img v-if="previewUrl" class="agentPreview" :src="previewUrl" :alt="agent?.name || ''" />
      <div v-else class="agentPreview agentPreviewPlaceholder">{{ factionName }}</div>
      <div class="agentMeta">
        <h1>{{ agent?.name || '' }} || {{ factionName }}</h1>
      </div>
      <div class="carousel" v-if="hasMultiple">
        <button @click="prev">←</button>
        <span>{{ currentIndex + 1 }} / {{ agents.length }}</span>
        <button @click="next">→</button>
      </div>
    </div>

    <p class="agentDescription">{{ agent?.description || '' }}</p>
    <p class="agentComment">{{ agent?.comment || '' }}</p>

    <p v-if="isAudioSourceLoading" class="voicePageLoading">Пожалуйста, подождите...</p>

    <div v-else-if="voicePages.length" class="voicePages">
      <div class="voicePageSwitcher">
        <button
          v-for="page in voicePages"
          :key="page.id"
          :class="page.id === currentVoicePageId ? 'active' : ''"
          @click="currentVoicePageId = page.id"
        >
          {{ page.title }}
          <span class="voicePageMeta">
            {{ `${page.groups.filter((group) => !group.isMissing).length}/${page.groups.length}` }}
          </span>
        </button>
      </div>

      <p v-if="currentVoicePage" class="voicePageDescription">{{ currentVoicePage.description }}</p>
      <p v-if="isVoicePageLoading" class="voicePageLoading">Подождите...</p>

      <AudioContentWidget v-else-if="currentAudioGroups.length" :audio-content="currentAudioGroups" />
    </div>
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

.agentHeader {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 900px;
}

.agentPreview {
  width: 120px;
  height: 120px;
  object-fit: contain;
  flex-shrink: 0;
}

.agentPreviewPlaceholder {
  display: grid;
  place-items: center;
  padding: 0.75rem;
  border: 1px dashed #ccc;
  border-radius: 12px;
  font-size: 0.9rem;
  text-align: center;
  color: #666;
  background: #f6f6f6;
}

.agentMeta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.agentMeta h1 {
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
}

.carousel {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.carousel button {
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  cursor: pointer;
  font-size: 1.1rem;
}

.agentDescription {
  max-width: 900px;
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.85;
}

.agentComment {
  max-width: 900px;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
}

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
