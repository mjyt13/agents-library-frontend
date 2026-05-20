<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'
import type { Subfraction } from '@/core/models/subfraction'
import * as AudioContentModule from '@/widgets/AudioContent.vue'
import { buildVoicePages, type VoicePage, type VoicePageId } from '@/utils/buildVoicePages'

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
const currentVoicePageId = ref<VoicePageId>(1)

const agent = computed(() => props.subfraction.agents[currentIndex.value])
const hasMultiple = computed(() => props.subfraction.agents.length > 1)

const previewUrl = ref('')
const voicePages = ref<VoicePage[]>([])
const currentVoicePage = computed(
  () => voicePages.value.find((page) => page.id === currentVoicePageId.value) ?? voicePages.value[0] ?? null,
)

watch(
  () => props.subfraction.id,
  () => {
    currentIndex.value = 0
    currentVoicePageId.value = 1
  },
)

watchEffect(async (onCleanup) => {
  let cancelled = false
  onCleanup(() => {
    cancelled = true
  })

  const photoPath = agent.value?.photos[0]
  const organizedPages = buildVoicePages(props.subfraction.voiceLines)

  const [resolvedPreviewUrl, resolvedVoicePages] = await Promise.all([
    photoPath ? getAssetUrl(photoPath) : Promise.resolve(''),
    Promise.all(
      organizedPages.map(async (page) => ({
        ...page,
        groups: await Promise.all(
          page.groups.map(async (group) => ({
            ...group,
            audioItems: await Promise.all(
              group.audioItems.map(async (item) => ({
                ...item,
                url: await getAssetUrl(item.url),
              })),
            ),
          })),
        ),
      })),
    ),
  ])

  if (cancelled) return

  previewUrl.value = resolvedPreviewUrl
  voicePages.value = resolvedVoicePages
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
      <img v-if="previewUrl" class="agentPreview" :src="previewUrl" :alt="agent?.name || ''" />
      <div v-else class="agentPreview agentPreviewPlaceholder">{{ factionName }}</div>
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

    <div v-if="voicePages.length" class="voicePages">
      <div class="voicePageSwitcher">
        <button
          v-for="page in voicePages"
          :key="page.id"
          :class="page.id === currentVoicePageId ? 'active' : ''"
          @click="currentVoicePageId = page.id"
        >
          {{ page.title }}
          <span class="voicePageMeta">
            {{
              `${page.groups.filter((group) => !group.isMissing).length}/${page.groups.length}`
            }}
          </span>
        </button>
      </div>

      <p v-if="currentVoicePage" class="voicePageDescription">{{ currentVoicePage.description }}</p>

      <AudioContent v-if="currentVoicePage" :audio-content="currentVoicePage.groups" />
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

.voicePageDescription {
  width: 100%;
  max-width: 800px;
  margin: 1rem 0 0;
  color: #666;
  line-height: 1.5;
}
</style>
