<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { Faction } from '@/core/models/faction'
import type { ImagePreviewDuration } from '@/core/models/imagePreview'
import { SubfractionType, SubfractionTypeRus } from '@/core/models/subfraction'
import type { SubfractionType as SubfractionTypeValue } from '@/core/models/subfraction'
import SubfractionPage from '@/pages/SubfractionPage.vue'
import {
  createRandomPreviewTimer,
  type RandomPreviewCandidate,
} from '@/utils/imagePreviewTimer'

const props = defineProps<{
  faction: Faction
}>()

const subfractionLabels: Record<SubfractionTypeValue, string> = {
  [SubfractionType.MALE]: SubfractionTypeRus.MALE,
  [SubfractionType.FEMALE]: SubfractionTypeRus.FEMALE,
  [SubfractionType.MASTER]: SubfractionTypeRus.MASTER,
  [SubfractionType.MASTER_FEMALE]: SubfractionTypeRus.MASTER_FEMALE,
  [SubfractionType.MASTER_MALE]: SubfractionTypeRus.MASTER_MALE,
  [SubfractionType.MASTER_FBI]: SubfractionTypeRus.MASTER_FBI,
  [SubfractionType.MASTER_SWAT]: SubfractionTypeRus.MASTER_SWAT,
}

interface LoadedSubfractionPreview {
  durationMs: ImagePreviewDuration
  images: string[]
}

const currentId = ref(props.faction.subfractions[0]?.meta.id ?? '')
const switcherViewport = ref<HTMLElement | null>(null)
const switcherTrack = ref<HTMLElement | null>(null)
const isSwitcherDragging = ref(false)
const isCarousel = ref(false)
const subfractionPreviews = ref<Record<string, LoadedSubfractionPreview>>({})
const subfractionPreviewUrls = ref<Record<string, string>>({})
const previousSubfractionPreviewUrls = ref<Record<string, string>>({})

const dragThreshold = 5
let isSwitcherPointerDown = false
let suppressSwitcherClick = false
let switcherPointerId: number | null = null
let switcherStartX = 0
let switcherStartScrollLeft = 0
let switcherSmoothFrame = 0
let switcherResizeObserver: ResizeObserver | null = null
let subfractionPreviewTimers: Array<ReturnType<typeof createRandomPreviewTimer<string>>> = []
let subfractionPreviewAnimationTimeouts: number[] = []

const currentSubfraction = computed(
  () => props.faction.subfractions.find((sub) => sub.meta.id === currentId.value) ?? null,
)

const currentIndex = computed(() =>
  props.faction.subfractions.findIndex((sub) => sub.meta.id === currentId.value),
)

async function updateSwitcherOverflow() {
  await nextTick()

  const viewport = switcherViewport.value
  const track = switcherTrack.value

  if (!viewport || !track) {
    isCarousel.value = false
    return
  }

  isCarousel.value = track.scrollWidth > viewport.clientWidth + 1
}

function selectSubfraction(id: string) {
  if (suppressSwitcherClick) {
    suppressSwitcherClick = false
    return
  }

  currentId.value = id
}

function startSwitcherDrag(event: PointerEvent) {
  if (!isCarousel.value || (event.pointerType === 'mouse' && event.button !== 0)) {
    return
  }

  const viewport = switcherViewport.value

  if (!viewport) {
    return
  }

  isSwitcherPointerDown = true
  isSwitcherDragging.value = false
  suppressSwitcherClick = false
  switcherPointerId = event.pointerId
  switcherStartX = event.clientX
  switcherStartScrollLeft = viewport.scrollLeft

}

function moveSwitcherDrag(event: PointerEvent) {
  if (!isSwitcherPointerDown || switcherPointerId !== event.pointerId) {
    return
  }

  const viewport = switcherViewport.value

  if (!viewport) {
    return
  }

  const distance = event.clientX - switcherStartX

  if (!isSwitcherDragging.value && Math.abs(distance) < dragThreshold) {
    return
  }

  isSwitcherDragging.value = true
  suppressSwitcherClick = true

  if (!viewport.hasPointerCapture(event.pointerId)) {
    viewport.setPointerCapture(event.pointerId)
  }

  viewport.scrollLeft = switcherStartScrollLeft - distance
  event.preventDefault()
}

function finishSwitcherDrag(event: PointerEvent) {
  if (!isSwitcherPointerDown || switcherPointerId !== event.pointerId) {
    return
  }

  const viewport = switcherViewport.value

  if (viewport?.hasPointerCapture(event.pointerId)) {
    viewport.releasePointerCapture(event.pointerId)
  }

  isSwitcherPointerDown = false
  isSwitcherDragging.value = false
  switcherPointerId = null

  if (suppressSwitcherClick) {
    window.setTimeout(() => {
      suppressSwitcherClick = false
    }, 0)
  }
}

function scrollSwitcherBy(left: number) {
  const viewport = switcherViewport.value

  if (!viewport) {
    return
  }

  window.cancelAnimationFrame(switcherSmoothFrame)
  switcherSmoothFrame = window.requestAnimationFrame(() => {
    viewport.scrollBy({
      left,
      behavior: 'smooth',
    })
  })
}

function scrollSwitcherWheel(event: WheelEvent) {
  if (!isCarousel.value || !event.deltaX) {
    return
  }

  event.preventDefault()
  scrollSwitcherBy(event.deltaX)
}

function moveSubfraction(direction: -1 | 1) {
  const total = props.faction.subfractions.length

  if (!total) {
    return
  }

  const index = currentIndex.value >= 0 ? currentIndex.value : 0
  const nextIndex = (index + direction + total) % total
  const nextSubfraction = props.faction.subfractions[nextIndex]

  if (nextSubfraction) {
    currentId.value = nextSubfraction.meta.id
  }
}

function getSubfractionPreviewCandidates(subfractionId: string): RandomPreviewCandidate<string>[] {
  const preview = subfractionPreviews.value[subfractionId]

  return (
    preview?.images.map((url) => ({
      durationMs: preview.durationMs,
      value: url,
    })) ?? []
  )
}

function createSubfractionPreviewTimer(subfractionId: string) {
  return createRandomPreviewTimer({
    getCandidates: () => getSubfractionPreviewCandidates(subfractionId),
    onChange: (url) => setSubfractionPreviewUrl(subfractionId, url),
  })
}

function startSubfractionPreviewTimers() {
  stopSubfractionPreviewTimers()
  subfractionPreviewTimers = Object.keys(subfractionPreviews.value).map((subfractionId) => {
    const timer = createSubfractionPreviewTimer(subfractionId)
    timer.start()
    return timer
  })
}

function stopSubfractionPreviewTimers() {
  subfractionPreviewTimers.forEach((timer) => timer.stop())
  subfractionPreviewTimers = []
}

function getSubfractionPreviewUrl(id: string): string {
  return subfractionPreviewUrls.value[id] ?? ''
}

function getPreviousSubfractionPreviewUrl(id: string): string {
  return previousSubfractionPreviewUrls.value[id] ?? ''
}

function getSubfractionPreviewStyle(id: string): Record<string, string> {
  const url = getSubfractionPreviewUrl(id)

  return url
    ? {
        '--subfraction-preview': `url("${url}")`,
      }
    : {}
}

function getPreviewStyle(url: string): Record<string, string> {
  return url ? { '--subfraction-preview': `url("${url}")` } : {}
}

function setSubfractionPreviewUrl(subfractionId: string, url: string) {
  const currentUrl = subfractionPreviewUrls.value[subfractionId]

  if (currentUrl && currentUrl !== url) {
    previousSubfractionPreviewUrls.value = {
      ...previousSubfractionPreviewUrls.value,
      [subfractionId]: currentUrl,
    }

    const timeout = window.setTimeout(() => {
      const { [subfractionId]: _removed, ...rest } = previousSubfractionPreviewUrls.value
      previousSubfractionPreviewUrls.value = rest
    }, 650)

    subfractionPreviewAnimationTimeouts.push(timeout)
  }

  subfractionPreviewUrls.value = {
    ...subfractionPreviewUrls.value,
    [subfractionId]: url,
  }
}

function stopSubfractionPreviewAnimations() {
  subfractionPreviewAnimationTimeouts.forEach(window.clearTimeout)
  subfractionPreviewAnimationTimeouts = []
}

function stopSwitcherResizeObserver() {
  switcherResizeObserver?.disconnect()
  switcherResizeObserver = null
}

async function loadSubfractionPreviews() {
  stopSubfractionPreviewTimers()

  const entries = await Promise.all(
    props.faction.subfractions.map(async (subfraction) => {
      if (!subfraction.loadPreviewSource) {
        return null
      }

      const previewSource = await subfraction.loadPreviewSource()

      return [
        subfraction.meta.id,
        {
          durationMs: previewSource.durationMs,
          images: await previewSource.loadImages(),
        },
      ] as const
    }),
  )

  subfractionPreviews.value = Object.fromEntries(entries.filter((entry) => entry !== null))
  startSubfractionPreviewTimers()
}

watch(currentId, async (id) => {
  await nextTick()

  const activeButton = switcherViewport.value?.querySelector<HTMLElement>(
    `[data-subfraction-id="${id}"]`,
  )

  activeButton?.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center',
  })
})

watch(() => props.faction.id, loadSubfractionPreviews, { immediate: true })

watch(
  () => props.faction.subfractions.length,
  updateSwitcherOverflow,
  { immediate: true },
)

onMounted(() => {
  switcherResizeObserver = new ResizeObserver(() => {
    void updateSwitcherOverflow()
  })

  if (switcherViewport.value) {
    switcherResizeObserver.observe(switcherViewport.value)
  }

  if (switcherTrack.value) {
    switcherResizeObserver.observe(switcherTrack.value)
  }

  void updateSwitcherOverflow()
})

onBeforeUnmount(() => {
  stopSubfractionPreviewTimers()
  stopSubfractionPreviewAnimations()
  stopSwitcherResizeObserver()
  window.cancelAnimationFrame(switcherSmoothFrame)
})
</script>

<template>
  <div class="factionPage">
    <div class="switcher" :class="{ 'switcher--carousel': isCarousel }">
      <button
        v-if="isCarousel"
        class="switcher__control"
        type="button"
        aria-label="Previous subfraction"
        @click="moveSubfraction(-1)"
      >
        &lsaquo;
      </button>

      <div
        ref="switcherViewport"
        class="switcher__viewport"
        :class="{ 'switcher__viewport--dragging': isSwitcherDragging }"
        @pointerdown="startSwitcherDrag"
        @pointermove="moveSwitcherDrag"
        @pointerup="finishSwitcherDrag"
        @pointercancel="finishSwitcherDrag"
        @lostpointercapture="finishSwitcherDrag"
        @wheel="scrollSwitcherWheel"
      >
        <div ref="switcherTrack" class="switcher__track">
          <button
            v-for="sub in faction.subfractions"
            :key="sub.meta.id"
            :data-subfraction-id="sub.meta.id"
            :class="sub.meta.id === currentId ? 'active' : ''"
            :style="getSubfractionPreviewStyle(sub.meta.id)"
            type="button"
            @click="selectSubfraction(sub.meta.id)"
          >
            <span
              v-if="getPreviousSubfractionPreviewUrl(sub.meta.id)"
              :key="`previous-${getPreviousSubfractionPreviewUrl(sub.meta.id)}`"
              class="switcher__buttonPreview switcher__buttonPreview--leaving"
              :style="getPreviewStyle(getPreviousSubfractionPreviewUrl(sub.meta.id))"
              aria-hidden="true"
            ></span>
            <span
              v-if="getSubfractionPreviewUrl(sub.meta.id)"
              :key="`current-${getSubfractionPreviewUrl(sub.meta.id)}`"
              class="switcher__buttonPreview"
              :style="getPreviewStyle(getSubfractionPreviewUrl(sub.meta.id))"
              aria-hidden="true"
            ></span>
            <span class="switcher__buttonText">{{ subfractionLabels[sub.meta.name] }}</span>
          </button>
        </div>
      </div>

      <button
        v-if="isCarousel"
        class="switcher__control"
        type="button"
        aria-label="Next subfraction"
        @click="moveSubfraction(1)"
      >
        &rsaquo;
      </button>
    </div>

    <SubfractionPage
      v-if="currentSubfraction"
      :subfraction="currentSubfraction"
      :faction-name="faction.name"
    />
  </div>
</template>

<style scoped>
.factionPage {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.switcher {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: center;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}

.switcher__viewport {
  width: 100%;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-behavior: smooth;
  scrollbar-width: none;
  scroll-snap-type: x proximity;
  -ms-overflow-style: none;
}

.switcher__viewport::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.switcher--carousel .switcher__viewport {
  cursor: grab;
  touch-action: pan-y;
}

.switcher__viewport--dragging {
  cursor: grabbing;
  scroll-snap-type: none;
  user-select: none;
}

.switcher__viewport--dragging * {
  cursor: grabbing;
}

.switcher__track {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.switcher--carousel .switcher__track {
  justify-content: flex-start;
  width: max-content;
}

.switcher button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  transition:
    background-color 0.15s,
    color 0.15s,
    border-color 0.15s;
}

.switcher__track button {
  flex: 1 1 0;
  min-width: min(400px, 100%);
  scroll-snap-align: center;
  background-color: #fff;
  overflow: hidden;
}

.switcher__buttonPreview {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    linear-gradient(rgba(255, 255, 255, 0.66), rgba(255, 255, 255, 0.7)),
    var(--subfraction-preview, none) center / cover no-repeat;
  animation: preview-slide-in 0.6s ease both;
}

.switcher__buttonPreview--leaving {
  animation: preview-slide-out 0.6s ease both;
}

.switcher__buttonText {
  position: relative;
  z-index: 1;
}

.switcher--carousel .switcher__track button {
  flex: 0 0 400px;
}

.switcher__control {
  flex: 0 0 44px;
  min-width: 44px;
  min-height: 100px;
  font-size: 2rem;
  line-height: 1;
}

.switcher button:hover {
  background-color: #f0f0f0;
}

.switcher button.active {
  background-color: #333;
  color: #fff;
  border-color: #333;
  text-shadow:
    0 1px 1px #000,
    1px 0 1px #000,
    0 -1px 1px #000,
    -1px 0 1px #000;
}

.switcher button.active .switcher__buttonPreview {
  background:
    linear-gradient(rgba(0, 0, 0, 0.56), rgba(0, 0, 0, 0.62)),
    var(--subfraction-preview, none) center / cover no-repeat;
}

@keyframes preview-slide-in {
  from {
    opacity: 0;
    transform: translateX(22px) scale(1.03);
  }

  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes preview-slide-out {
  from {
    opacity: 1;
    transform: translateX(0) scale(1);
  }

  to {
    opacity: 0;
    transform: translateX(-22px) scale(0.98);
  }
}

@media (max-width: 520px) {
  .switcher {
    padding-inline: 0.5rem;
  }

  .switcher--carousel .switcher__track button {
    flex-basis: min(320px, 78vw);
  }
}
</style>
