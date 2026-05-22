<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import type { Faction } from '@/core/models/faction'
import { SubfractionType, SubfractionTypeRus } from '@/core/models/subfraction'
import type { SubfractionType as SubfractionTypeValue } from '@/core/models/subfraction'
import SubfractionPage from '@/pages/SubfractionPage.vue'

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

const currentId = ref(props.faction.subfractions[0]?.meta.id ?? '')
const switcherViewport = ref<HTMLElement | null>(null)
const isSwitcherDragging = ref(false)

const dragThreshold = 5
let isSwitcherPointerDown = false
let suppressSwitcherClick = false
let switcherPointerId: number | null = null
let switcherStartX = 0
let switcherStartScrollLeft = 0
let switcherSmoothFrame = 0

const currentSubfraction = computed(
  () => props.faction.subfractions.find((sub) => sub.meta.id === currentId.value) ?? null,
)

const isCarousel = computed(() => props.faction.subfractions.length > 3)

const currentIndex = computed(() =>
  props.faction.subfractions.findIndex((sub) => sub.meta.id === currentId.value),
)

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
        <div class="switcher__track">
          <button
            v-for="sub in faction.subfractions"
            :key="sub.meta.id"
            :data-subfraction-id="sub.meta.id"
            :class="sub.meta.id === currentId ? 'active' : ''"
            type="button"
            @click="selectSubfraction(sub.meta.id)"
          >
            {{ subfractionLabels[sub.meta.name] }}
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
