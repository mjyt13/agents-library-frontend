<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { Faction } from '@/core/models/faction'
import { SubfractionType, SubfractionTypeRus } from '@/core/models/subfraction'
import type { SubfractionType as SubfractionTypeValue } from '@/core/models/subfraction'
import { useCrossfadePreview } from '@/composables/useCrossfadePreview'
import SubfractionPage from '@/pages/SubfractionPage.vue'
import { useI18nStore } from '@/stores/i18n'

const props = defineProps<{
  faction: Faction
}>()

const i18nStore = useI18nStore()

const subfractionLabels = computed<Record<SubfractionTypeValue, string>>(() => {
  const source = i18nStore.locale === 'ru' ? SubfractionTypeRus : SubfractionType

  return {
    [SubfractionType.MALE]: source.MALE,
    [SubfractionType.FEMALE]: source.FEMALE,
    [SubfractionType.MASTER]: source.MASTER,
    [SubfractionType.MASTER_FEMALE]: source.MASTER_FEMALE,
    [SubfractionType.MASTER_MALE]: source.MASTER_MALE,
    [SubfractionType.MASTER_FBI]: source.MASTER_FBI,
    [SubfractionType.MASTER_SWAT]: source.MASTER_SWAT,
  }
})

const currentId = ref(props.faction.subfractions[0]?.meta.id ?? '')
const switcherViewport = ref<HTMLElement | null>(null)
const switcherTrack = ref<HTMLElement | null>(null)
const isSwitcherDragging = ref(false)
const isCarousel = ref(false)
const subfractionPreview = useCrossfadePreview('--subfraction-preview', '/mock.webp')

const dragThreshold = 5
let isSwitcherPointerDown = false
let suppressSwitcherClick = false
let switcherPointerId: number | null = null
let switcherStartX = 0
let switcherStartScrollLeft = 0
let switcherSmoothFrame = 0
let switcherResizeObserver: ResizeObserver | null = null

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

function getSubfractionPreviewUrl(id: string): string {
  return subfractionPreview.getCurrentUrl(id)
}

function getPreviousSubfractionPreviewUrl(id: string): string {
  return subfractionPreview.getPreviousUrl(id)
}

function getSubfractionPreviewStyle(id: string): Record<string, string> {
  return subfractionPreview.getStyle(id)
}

function getPreviewStyle(url: string): Record<string, string> {
  return url ? { '--subfraction-preview': `url("${url}")` } : {}
}

function stopSwitcherResizeObserver() {
  switcherResizeObserver?.disconnect()
  switcherResizeObserver = null
}

async function loadSubfractionPreviews() {
  const entries = await Promise.all(
    props.faction.subfractions.map(async (subfraction) => {
      if (!subfraction.loadPreviewSource) {
        return null
      }

      try {
        const previewSource = await subfraction.loadPreviewSource()

        return [
          subfraction.meta.id,
          {
            durationMs: previewSource.durationMs,
            images: await previewSource.loadImages(),
          },
        ] as const
      } catch {
        // One subfraction's broken preview shouldn't blank out the others.
        return null
      }
    }),
  )

  subfractionPreview.start(Object.fromEntries(entries.filter((entry) => entry !== null)))
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

watch(() => props.faction.subfractions.length, updateSwitcherOverflow, { immediate: true })

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
  subfractionPreview.stop()
  stopSwitcherResizeObserver()
  window.cancelAnimationFrame(switcherSmoothFrame)
})
</script>

<template>
  <div class="factionPage">
    <h1 class="factionTitle">{{ faction.name }}</h1>

    <div
      v-if="faction.subfractions.length > 1"
      class="switcher"
      :class="{ 'switcher--carousel': isCarousel }"
    >
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

.factionTitle {
  margin: 1rem 0 0;
  padding: 0 1rem;
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  text-align: center;
  color: var(--color-text);
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
  touch-action: pan-x;
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
  min-height: 8rem;
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
    linear-gradient(rgba(255, 255, 255, 0.66), rgba(255, 255, 255, 0.6)),
    var(--subfraction-preview, none) 40% 15% / cover no-repeat;
  animation: preview-slide-in 0.6s ease both;
}

.switcher__buttonPreview--leaving {
  animation: preview-slide-out 0.65s ease both;
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
    var(--subfraction-preview, none) 40% 15% / cover no-repeat;
}

@keyframes preview-slide-in {
  from {
    opacity: 1;
    transform: translateX(100%) scale(1.03);
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
    opacity: 1;
    transform: translateX(-100%) scale(0.98);
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
