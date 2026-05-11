<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import type { Subfraction } from '@/core/models/subfraction'
import type { AudioContent } from '@/core/models/audioContent'
import * as AudioContentModule from '@/widgets/AudioContent.vue'

const AudioContent = AudioContentModule.default

const props = defineProps<{
  subfraction: Subfraction
  factionName: string
}>()

const dataAssets = import.meta.glob('/src/interface/data/**/*', {
  import: 'default',
  query: '?url',
})

const getAssetUrl = async (path: string): Promise<string> => {
  const fullPath = `/src/interface/data/${path}`
  const mod = dataAssets[fullPath]
  if (typeof mod === 'function') return (await mod()) as string
  return `${import.meta.env.BASE_URL}src/interface/data/${path}`
}

const currentIndex = ref(0)
const agent = computed(() => props.subfraction.agents[currentIndex.value])
const hasMultiple = computed(() => props.subfraction.agents.length > 1)

const previewUrl = ref('')
const audioContentWithUrls = ref<AudioContent[]>([])

watchEffect(async (onCleanup) => {
  let cancelled = false
  onCleanup(() => {
    cancelled = true
  })

  const photoPath = agent.value?.photos[0]

  const [resolvedPreviewUrl, resolvedAudioContent] = await Promise.all([
    photoPath ? getAssetUrl(photoPath) : Promise.resolve(''),
    Promise.all(
      props.subfraction.voiceLines.map(async (group) => ({
        ...group,
        audioItems: await Promise.all(
          group.audioItems.map(async (item) => ({
            ...item,
            url: await getAssetUrl(item.url),
          })),
        ),
      })),
    ),
  ])

  if (cancelled) return

  previewUrl.value = resolvedPreviewUrl
  audioContentWithUrls.value = resolvedAudioContent
})

const prev = () => {
  currentIndex.value =
    (currentIndex.value - 1 + props.subfraction.agents.length) % props.subfraction.agents.length
}
const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.subfraction.agents.length
}
</script>

<template>
  <div class="subfractionPage">
    <div class="agentHeader">
      <img class="agentPreview" :src="previewUrl" :alt="agent?.name || ''" />
      <div class="agentMeta">
        <h1>{{ agent?.name || '' }} || {{ factionName }}</h1>
      </div>
      <div class="carousel" v-if="hasMultiple">
        <button @click="prev">←</button>
        <span>{{ currentIndex + 1 }} / {{ subfraction.agents.length }}</span>
        <button @click="next">→</button>
      </div>
    </div>

    <p class="agentDescription">{{ agent?.description || '' }}</p>
    <p class="agentComment">{{ agent?.comment || '' }}</p>

    <AudioContent :audio-content="audioContentWithUrls" />
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

.agentMeta h2 {
  font-size: 1.1rem;
  font-weight: normal;
  margin: 0;
  opacity: 0.7;
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
</style>
