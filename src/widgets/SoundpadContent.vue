<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import type { AudioContent, AudioItem } from '@/core/models/audioContent'
import { useI18nStore } from '@/stores/i18n'

const i18nStore = useI18nStore()

const props = withDefaults(
  defineProps<{
    audioContent: AudioContent[]
    cooldownMs?: number
    preloadConcurrency?: number
  }>(),
  {
    cooldownMs: 450,
    preloadConcurrency: 2,
  },
)

interface GroupState {
  items: AudioItem[]
  heardIds: Set<string>
  isLoading: boolean
  isPlaying: boolean
  error: string
  lastPlayedAt: number
  resolvedIndexes: Set<number>
  pendingIndexes: Set<number>
  pendingItemPromises: Set<Promise<AudioItem | null>>
  isFullyResolved: boolean
  resolvePromise: Promise<void> | null
}

const groupStates = ref<Record<string, GroupState>>({})
const visibleGroupIds = ref(new Set<string>())
const groupElements = new Map<string, HTMLElement>()

let player: HTMLAudioElement | null = null
let observer: IntersectionObserver | null = null
let isDestroyed = false

const isMissingGroup = (audioGroup: AudioContent): boolean =>
  audioGroup.meta.isMissing === true ||
  (audioGroup.meta.itemCount ?? audioGroup.audioItems.length) === 0

const getSectionId = (audioGroup: AudioContent): string => audioGroup.meta.id

const getPlayableGroups = (): AudioContent[] =>
  props.audioContent.filter((audioGroup) => !isMissingGroup(audioGroup))

const createGroupState = (): GroupState => ({
  items: [],
  heardIds: new Set(),
  isLoading: false,
  isPlaying: false,
  error: '',
  lastPlayedAt: 0,
  resolvedIndexes: new Set(),
  pendingIndexes: new Set(),
  pendingItemPromises: new Set(),
  isFullyResolved: false,
  resolvePromise: null,
})

const ensureGroupState = (sectionId: string): GroupState => {
  groupStates.value[sectionId] ??= createGroupState()
  return groupStates.value[sectionId]
}

const getGroupState = (audioGroup: AudioContent): GroupState =>
  ensureGroupState(getSectionId(audioGroup))

const getTotalCount = (audioGroup: AudioContent): number =>
  audioGroup.meta.itemCount ?? audioGroup.audioItems.length

const getProgressLabel = (audioGroup: AudioContent): string => {
  const state = getGroupState(audioGroup)
  return `${state.heardIds.size}/${getTotalCount(audioGroup)}`
}

const isGroupComplete = (audioGroup: AudioContent): boolean =>
  !isMissingGroup(audioGroup) &&
  getGroupState(audioGroup).heardIds.size >= getTotalCount(audioGroup)

const getGroupClass = (audioGroup: AudioContent): string[] => {
  const state = getGroupState(audioGroup)
  const classes: string[] = []

  if (isMissingGroup(audioGroup)) classes.push('missing')
  if (state.isLoading) classes.push('loading')
  if (state.isPlaying) classes.push('playing')
  if (isGroupComplete(audioGroup)) classes.push('complete')

  return classes
}

const getPlayer = (): HTMLAudioElement => {
  player ??= new Audio()
  return player
}

const getAvailableResolverIndexes = (audioGroup: AudioContent, state: GroupState): number[] =>
  audioGroup.audioItems
    .map((_resolver, index) => index)
    .filter((index) => !state.resolvedIndexes.has(index) && !state.pendingIndexes.has(index))

const updateFullyResolvedState = (audioGroup: AudioContent, state: GroupState): void => {
  state.isFullyResolved = state.resolvedIndexes.size >= audioGroup.audioItems.length
}

const resolveItemAtIndex = async (
  audioGroup: AudioContent,
  state: GroupState,
  index: number,
): Promise<AudioItem | null> => {
  const resolver = audioGroup.audioItems[index]
  if (!resolver) {
    updateFullyResolvedState(audioGroup, state)
    return null
  }

  state.pendingIndexes.add(index)

  const itemPromise = resolver()
    .then((item) => {
      state.resolvedIndexes.add(index)

      if (!state.items.some((resolvedItem) => resolvedItem.id === item.id)) {
        state.items.push(item)
      }

      return item
    })
    .finally(() => {
      state.pendingIndexes.delete(index)
      state.pendingItemPromises.delete(itemPromise)
      updateFullyResolvedState(audioGroup, state)
    })

  state.pendingItemPromises.add(itemPromise)
  return itemPromise
}

const resolveNextItem = async (
  audioGroup: AudioContent,
  state: GroupState,
): Promise<AudioItem | null> => {
  const index = getAvailableResolverIndexes(audioGroup, state)[0]
  if (index === undefined) return null

  return resolveItemAtIndex(audioGroup, state, index)
}

const resolveRandomItem = async (
  audioGroup: AudioContent,
  state: GroupState,
): Promise<AudioItem | null> => {
  const indexes = getAvailableResolverIndexes(audioGroup, state)
  const index = indexes[Math.floor(Math.random() * indexes.length)]
  if (index === undefined) return null

  return resolveItemAtIndex(audioGroup, state, index)
}

const resolveGroup = async (audioGroup: AudioContent): Promise<void> => {
  const state = getGroupState(audioGroup)
  if (state.isFullyResolved || state.resolvePromise)
    return state.resolvePromise ?? Promise.resolve()

  state.isLoading = true
  state.error = ''

  const workers = Array.from({ length: Math.max(1, props.preloadConcurrency) }, async () => {
    while (!isDestroyed && !state.isFullyResolved) {
      const item = await resolveNextItem(audioGroup, state)
      if (!item) break
    }
  })

  state.resolvePromise = Promise.all(workers)
    .then(async () => {
      if (state.pendingItemPromises.size) {
        await Promise.all(Array.from(state.pendingItemPromises))
      }
    })
    .then(() => undefined)
    .catch(() => {
      state.error = i18nStore.getMessage.audio.failedToLoadLines
    })
    .finally(() => {
      state.isLoading = false
      state.resolvePromise = null
    })

  return state.resolvePromise
}

const warmRandomPlayableItem = async (audioGroup: AudioContent): Promise<AudioItem | null> => {
  const state = getGroupState(audioGroup)
  if (state.items.length) return state.items[0] ?? null

  state.isLoading = true
  state.error = ''

  try {
    return await resolveRandomItem(audioGroup, state)
  } catch {
    state.error = i18nStore.getMessage.audio.failedToLoadLine
    return null
  } finally {
    state.isLoading = false
  }
}

const warmGroup = async (audioGroup: AudioContent): Promise<void> => {
  const state = getGroupState(audioGroup)
  if (state.items.length || state.isLoading || state.isFullyResolved) return

  await warmRandomPlayableItem(audioGroup)
}

const pickRandomItem = (items: AudioItem[], heardIds: Set<string>): AudioItem | null => {
  if (!items.length) return null

  const unheardItems = items.filter((item) => !heardIds.has(item.id))
  const source = unheardItems.length ? unheardItems : items
  return source[Math.floor(Math.random() * source.length)] ?? null
}

const playGroup = async (audioGroup: AudioContent): Promise<void> => {
  if (isMissingGroup(audioGroup)) return

  const state = getGroupState(audioGroup)
  const now = Date.now()
  if (now - state.lastPlayedAt < props.cooldownMs) return

  state.lastPlayedAt = now

  await resolveGroup(audioGroup)

  const item = pickRandomItem(state.items, state.heardIds)
  if (!item) return

  const activePlayer = getPlayer()

  state.isPlaying = true
  activePlayer.pause()
  activePlayer.currentTime = 0
  activePlayer.src = item.url

  try {
    await activePlayer.play()
    state.heardIds.add(item.id)
  } catch {
    state.error = i18nStore.getMessage.audio.browserBlockedAudio
  } finally {
    state.isPlaying = false
  }
}

const setGroupElement = (sectionId: string, element: unknown): void => {
  const previousElement = groupElements.get(sectionId)
  if (previousElement && observer) observer.unobserve(previousElement)

  if (element instanceof HTMLElement) {
    groupElements.set(sectionId, element)
    if (observer) observer.observe(element)
    return
  }

  groupElements.delete(sectionId)
}

const preloadVisibleGroups = (): void => {
  for (const audioGroup of getPlayableGroups()) {
    const sectionId = getSectionId(audioGroup)
    if (visibleGroupIds.value.has(sectionId)) void warmGroup(audioGroup)
  }
}

const setupObserver = async (): Promise<void> => {
  observer?.disconnect()
  observer = null
  groupElements.clear()
  visibleGroupIds.value = new Set()

  await nextTick()

  if (!('IntersectionObserver' in window)) {
    visibleGroupIds.value = new Set(getPlayableGroups().map(getSectionId))
    preloadVisibleGroups()
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      const nextVisibleIds = new Set(visibleGroupIds.value)

      for (const entry of entries) {
        const sectionId = (entry.target as HTMLElement).dataset.groupId
        if (sectionId && entry.isIntersecting) nextVisibleIds.add(sectionId)
      }

      visibleGroupIds.value = nextVisibleIds
      preloadVisibleGroups()
    },
    {
      root: null,
      rootMargin: '180px 0px',
      threshold: 0.01,
    },
  )

  for (const element of groupElements.values()) {
    observer.observe(element)
  }
}

watch(
  () => props.audioContent,
  () => {
    groupStates.value = {}
    void setupObserver()
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  isDestroyed = true
  observer?.disconnect()
  player?.pause()
  player = null
})
</script>

<template>
  <div class="soundpadContent">
    <article
      v-for="audioGroup in props.audioContent"
      :key="audioGroup.meta.id"
      :ref="(element) => setGroupElement(audioGroup.meta.id, element)"
      class="soundpadGroup"
      :class="getGroupClass(audioGroup)"
      :data-group-id="audioGroup.meta.id"
    >
      <button
        class="soundpadButton"
        :disabled="isMissingGroup(audioGroup)"
        @click="playGroup(audioGroup)"
      >
        <span class="soundpadTitle">{{ audioGroup.meta.name }}</span>
        <span class="soundpadMeta">{{ getProgressLabel(audioGroup) }}</span>
      </button>

      <span v-if="getGroupState(audioGroup).error" class="soundpadError">
        {{ getGroupState(audioGroup).error }}
      </span>
    </article>
  </div>
</template>

<style scoped>
.soundpadContent {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 0.85rem;
  width: 100%;
  margin-top: 1rem;
}

.soundpadGroup {
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: #fff;
  transition:
    border-color 0.35s ease,
    background-color 0.35s ease,
    box-shadow 0.35s ease;
}

.soundpadGroup.playing {
  border-color: #222;
  box-shadow: 0 0 0 2px rgba(34, 34, 34, 0.12);
}

.soundpadGroup.missing {
  opacity: 0.55;
}

.soundpadGroup.complete {
  border-color: #3eb978;
  background: #f1fbf5;
  box-shadow: 0 0 0 2px rgba(62, 185, 120, 0.12);
}

.soundpadButton {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 0.8rem;
  width: 100%;
  min-height: 4.5rem;
  padding: 0.9rem 0.5rem 0;
  border: 0;
  background: #f8fafc;
  cursor: pointer;
  text-align: left;
  transition:
    background-color 0.15s ease,
    transform 0.15s ease;
}

.soundpadGroup.complete .soundpadButton {
  background: #f1fbf5;
}

.soundpadGroup.complete .soundpadButton:hover:not(:disabled) {
  background: #e4f7ec;
}

.soundpadButton:hover:not(:disabled) {
  background: #eef2f6;
}

.soundpadButton:active:not(:disabled) {
  transform: scale(0.99);
}

.soundpadButton:disabled {
  cursor: default;
}

.soundpadTitle {
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.25;
}

.soundpadMeta {
  justify-self: end;
  color: #637083;
  font-size: 0.78rem;
  font-weight: 700;
  line-height: 1.2;
}

.soundpadError {
  display: block;
  padding: 0.45rem 0.65rem;
  border-top: 1px solid var(--color-border);
  color: #b42318;
  font-size: 0.78rem;
  line-height: 1.2;
}

@media (max-width: 640px) {
  .soundpadContent {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.65rem;
  }

  .soundpadButton {
    min-height: 104px;
  }
}
</style>
