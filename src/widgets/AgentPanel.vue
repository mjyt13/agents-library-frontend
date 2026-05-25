<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'
import type { Agent } from '@/core/models/agent'

const props = defineProps<{
  agents: Agent[]
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
const previewUrl = ref('')

const agent = computed(() => props.agents[currentIndex.value])
const hasMultiple = computed(() => props.agents.length > 1)

watch(
  () => props.agents,
  () => {
    currentIndex.value = 0
  },
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
  currentIndex.value = (currentIndex.value - 1 + props.agents.length) % props.agents.length
}

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.agents.length
}
</script>

<template>
  <section class="agentPanel">
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
  </section>
</template>

<style scoped>
.agentPanel {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1.5rem;
  width: 100%;
}

.agentHeader {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1.5rem;
  width: 100%;
  padding: 0.75rem;
  box-shadow: 0px 10px 16px 2px rgba(0, 0, 0, 0.2);
}

.agentPreview {
  width: 100%;
  height: min(420px, 58vh);
  object-fit: contain;
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
  font-size: 1.45rem;
  font-weight: bold;
  line-height: 1.25;
  margin: 0;
}

.carousel {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  width: 100%;
  max-width: none;
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.85;
}

.agentComment {
  width: 100%;
  max-width: none;
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
}

@media (min-width: 1025px) {
  .agentPreview {
    height: 280px;
  }
}
</style>
