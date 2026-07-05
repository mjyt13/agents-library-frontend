<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import type { Faction } from '@/core/models/faction'
import type { ImagePreviewDuration } from '@/core/models/imagePreview'
import { anarchist } from '@/interface/data/factions/anarchist/anarchist'
import { fbi_old } from '@/interface/data/factions/fbi_old/fbi_old'
import { fbi_swat } from '@/interface/data/factions/fbi_swat/fbi_swat'
import { gandarmerie } from '@/interface/data/factions/gandarmerie/gandarmerie'
import { gign } from '@/interface/data/factions/gign/gign'
import { gsg } from '@/interface/data/factions/gsg/gsg'
import { guerilla } from '@/interface/data/factions/guerilla/guerilla'
import { idf } from '@/interface/data/factions/idf/idf'
import { leet } from '@/interface/data/factions/leet/leet'
import { phoenix } from '@/interface/data/factions/phoenix/phoenix'
import { pirate } from '@/interface/data/factions/pirate/pirate'
import { professionals } from '@/interface/data/factions/professionals/professionals'
import { sabre } from '@/interface/data/factions/sabre/sabre'
import { sas } from '@/interface/data/factions/sas/sas'
import { seal } from '@/interface/data/factions/seal/seal'
import { seal_frogman } from '@/interface/data/factions/seal_frogman/seal_frogman'
import { separatist } from '@/interface/data/factions/separatist/separatist'
import { createRandomPreviewTimer, type RandomPreviewCandidate } from '@/utils/imagePreviewTimer'
import { decodeImageUrl, preloadImageUrls } from '@/utils/preloadImageUrls'

interface NavItem {
  to: string
  label: string
  faction: Faction
}

interface NavGroup {
  id: string
  label: string
  description: string
  items: NavItem[]
}

interface LoadedNavPreview {
  durationMs: ImagePreviewDuration
  images: string[]
}

const route = useRoute()
const NAV_PREVIEW_FALLBACK_URL = '/mock.png'

const navGroups: NavGroup[] = [
  {
    id: 'terrorists',
    label: 'T-side',
    description: 'Terrorist factions',
    items: [
      {
        to: '/professionals',
        label: 'Professionals',
        faction: professionals,
      },
      {
        to: '/sabre',
        label: 'Sabre/Balkans',
        faction: sabre,
      },
      {
        to: '/elite-crew',
        label: 'Elite Crew',
        faction: leet,
      },
      {
        to: '/phoenix',
        label: 'Phoenix',
        faction: phoenix,
      },
      {
        to: '/separatist',
        label: 'Separatist',
        faction: separatist,
      },
      {
        to: '/anarchist',
        label: 'Anarchist',
        faction: anarchist,
      },
      {
        to: '/guerilla',
        label: 'Guerilla',
        faction: guerilla,
      },
      {
        to: '/pirate',
        label: 'Pirate',
        faction: pirate,
      },
    ],
  },
  {
    id: 'counterTerrorists',
    label: 'CT-side',
    description: 'Counter-terrorist factions',
    items: [
      {
        to: '/swat-fbi',
        label: 'SWAT/FBI',
        faction: fbi_swat,
      },
      {
        to: '/fbi-old',
        label: 'FBI (old)',
        faction: fbi_old,
      },
      {
        to: '/sas',
        label: 'SAS',
        faction: sas,
      },
      {
        to: '/gsg-9',
        label: 'GSG-9',
        faction: gsg,
      },
      {
        to: '/gign',
        label: 'GIGN',
        faction: gign,
      },
      {
        to: '/idf',
        label: 'IDF',
        faction: idf,
      },
      {
        to: '/gandarmerie',
        label: 'Gendarmerie',
        faction: gandarmerie,
      },
      {
        to: '/seal',
        label: 'SEAL',
        faction: seal,
      },
      {
        to: '/seal-frogman',
        label: 'SEAL Frogman',
        faction: seal_frogman,
      },
    ],
  },
]

const openGroupId = ref<string | null>(null)
const isHeaderCompact = ref(false)
const groupPreviewUrls = ref<Record<string, string>>({})
const previousGroupPreviewUrls = ref<Record<string, string>>({})
const groupButtonPreviews = ref<Record<string, LoadedNavPreview>>({})
const navPreviews = ref<Record<string, LoadedNavPreview>>({})
const loadedGroupIds = new Set<string>()
const loadingGroupPromises = new Map<string, Promise<void>>()
let groupButtonPreviewTimers: Array<ReturnType<typeof createRandomPreviewTimer<string>>> = []
let previewAnimationTimeouts: number[] = []

function updateHeaderCompact() {
  if (isHeaderCompact.value) {
    isHeaderCompact.value = window.scrollY > 0
    return
  }

  isHeaderCompact.value = window.scrollY > 32
}

const activeGroupId = computed(
  () => navGroups.find((group) => group.items.some((item) => item.to === route.path))?.id ?? null,
)
const headerClass = computed(() => (isHeaderCompact.value ? 'appHeaderCompact' : ''))

async function loadGroupButtonImages() {
  const entries = await Promise.all(
    navGroups.map(async (group) => {
      const previews = await Promise.all(
        group.items.map(async (item) => {
          const previewSource = item.faction.previews!

          return {
            durationMs: previewSource.durationMs,
            images: await previewSource.loadImages(),
          }
        }),
      )

      return [
        group.id,
        {
          durationMs: previews[0]?.durationMs ?? { min: 2200, max: 2800 },
          images: previews.flatMap((preview) => preview.images),
        },
      ] as const
    }),
  )

  groupButtonPreviews.value = Object.fromEntries(entries)
  startGroupButtonPreviewTimers()
}

function getGroupFirstPreviewUrls(group: NavGroup): string[] {
  return group.items
    .map((item) => navPreviews.value[item.to]?.images[0])
    .filter((url): url is string => Boolean(url))
}

async function loadGroupNavImages(group: NavGroup, options: { preloadFirstImages?: boolean } = {}) {
  if (loadedGroupIds.has(group.id)) {
    if (options.preloadFirstImages) {
      preloadImageUrls(getGroupFirstPreviewUrls(group))
    }

    return
  }

  const pendingLoad = loadingGroupPromises.get(group.id)

  if (pendingLoad) {
    await pendingLoad

    if (options.preloadFirstImages) {
      preloadImageUrls(getGroupFirstPreviewUrls(group))
    }

    return
  }

  const loadPromise = Promise.all(
    group.items.map(async (item) => {
      const previews = item.faction.previews!

      return [
        item.to,
        {
          durationMs: previews.durationMs,
          images: await previews.loadImages(),
        },
      ] as const
    }),
  ).then((entries) => {
    navPreviews.value = {
      ...navPreviews.value,
      ...Object.fromEntries(entries),
    }
    loadedGroupIds.add(group.id)
  })

  loadingGroupPromises.set(group.id, loadPromise)

  try {
    await loadPromise
  } finally {
    loadingGroupPromises.delete(group.id)
  }

  if (options.preloadFirstImages) {
    preloadImageUrls(getGroupFirstPreviewUrls(group))
  }
}

function preloadGroupNavImages(group: NavGroup) {
  void loadGroupNavImages(group, { preloadFirstImages: true })
}

async function toggleGroup(id: string) {
  if (openGroupId.value === id) {
    openGroupId.value = null
    return
  }

  const group = navGroups.find((item) => item.id === id)
  if (!group) {
    return
  }

  openGroupId.value = id
  await loadGroupNavImages(group)
}

function getItemImages(item: NavItem): string[] {
  return navPreviews.value[item.to]?.images ?? []
}

function getItemPreviewUrl(item: NavItem): string {
  return getItemImages(item)[0] ?? NAV_PREVIEW_FALLBACK_URL
}

function getGroupPreviewUrl(group: NavGroup): string {
  return groupPreviewUrls.value[group.id] ?? NAV_PREVIEW_FALLBACK_URL
}

function getPreviousGroupPreviewUrl(group: NavGroup): string {
  return previousGroupPreviewUrls.value[group.id] ?? ''
}

function getPreviewStyle(url: string): Record<string, string> {
  return url ? { '--nav-preview': `url("${url}")` } : {}
}

function isGroupActive(group: NavGroup) {
  return group.id === activeGroupId.value
}

function getGroupPreviewCandidates(group: NavGroup): RandomPreviewCandidate<string>[] {
  const preview = groupButtonPreviews.value[group.id]

  return (
    preview?.images.map((url) => ({
      durationMs: preview.durationMs,
      value: url,
    })) ?? []
  )
}

function createGroupButtonPreviewTimer(group: NavGroup) {
  return createRandomPreviewTimer({
    getCandidates: () => getGroupPreviewCandidates(group),
    onChange: async (url) => {
      await decodeImageUrl(url)
      setGroupPreviewUrl(group.id, url)
    },
  })
}

function startGroupButtonPreviewTimers() {
  stopGroupButtonPreviewTimers()
  groupButtonPreviewTimers = navGroups.map((group) => {
    const timer = createGroupButtonPreviewTimer(group)
    timer.start()
    return timer
  })
}

function stopGroupButtonPreviewTimers() {
  groupButtonPreviewTimers.forEach((timer) => timer.stop())
  groupButtonPreviewTimers = []
}

function setGroupPreviewUrl(groupId: string, url: string) {
  const currentUrl = groupPreviewUrls.value[groupId]

  if (currentUrl && currentUrl !== url) {
    previousGroupPreviewUrls.value = {
      ...previousGroupPreviewUrls.value,
      [groupId]: currentUrl,
    }

    const timeout = window.setTimeout(() => {
      clearPreviousGroupPreviewUrl(groupId)
    }, 650)

    previewAnimationTimeouts.push(timeout)
  }

  groupPreviewUrls.value = {
    ...groupPreviewUrls.value,
    [groupId]: url,
  }
}

function stopPreviewAnimations() {
  previewAnimationTimeouts.forEach(window.clearTimeout)
  previewAnimationTimeouts = []
}

function clearPreviousGroupPreviewUrl(groupId: string) {
  const nextPreviousUrls = { ...previousGroupPreviewUrls.value }
  delete nextPreviousUrls[groupId]
  previousGroupPreviewUrls.value = nextPreviousUrls
}

onMounted(() => {
  void loadGroupButtonImages()
  updateHeaderCompact()
  window.addEventListener('scroll', updateHeaderCompact, { passive: true })
})

onBeforeUnmount(() => {
  stopGroupButtonPreviewTimers()
  stopPreviewAnimations()
  window.removeEventListener('scroll', updateHeaderCompact)
})

watch(
  () => route.path,
  () => {
    openGroupId.value = null
  },
)
</script>

<template>
  <div class="appShell">
    <header class="appHeader" :class="headerClass">
      <RouterLink class="brand" to="/">
        <img alt="CS2 Agents Library" class="logo" src="@/assets/logo.png" width="72" height="72" />
        <div class="brandText">
          <strong>CS2 Agents Library</strong>
          <span>Фракции, подфракции и голосовые линии агентов</span>
        </div>
      </RouterLink>

      <nav class="mainNav" aria-label="Main navigation">
        <div
          v-for="group in navGroups"
          :key="group.id"
          class="navDropdown"
          @mouseenter="preloadGroupNavImages(group)"
          @focusin="preloadGroupNavImages(group)"
        >
          <button
            class="navDropdownButton"
            :class="[isGroupActive(group) ? 'active' : '', openGroupId === group.id ? 'open' : '']"
            :style="getPreviewStyle(getGroupPreviewUrl(group))"
            type="button"
            :aria-expanded="openGroupId === group.id"
            @click="toggleGroup(group.id)"
          >
            <span
              v-if="getPreviousGroupPreviewUrl(group)"
              :key="`previous-${getPreviousGroupPreviewUrl(group)}`"
              class="navDropdownButtonPreview navDropdownButtonPreview--leaving"
              :style="getPreviewStyle(getPreviousGroupPreviewUrl(group))"
              aria-hidden="true"
            ></span>
            <span
              v-if="getGroupPreviewUrl(group)"
              :key="`current-${getGroupPreviewUrl(group)}`"
              class="navDropdownButtonPreview"
              :style="getPreviewStyle(getGroupPreviewUrl(group))"
              aria-hidden="true"
            ></span>
            <span class="navDropdownButtonText">
              <strong>{{ group.label }}</strong>
              <small>{{ group.description }}</small>
            </span>
          </button>

          <div v-if="openGroupId === group.id" class="navDropdownMenu">
            <RouterLink
              v-for="item in group.items"
              :key="item.to"
              class="navDropdownItem"
              :style="getPreviewStyle(getItemPreviewUrl(item))"
              :to="item.to"
            >
              <span class="navDropdownItemImage" aria-hidden="true">
                <span
                  v-if="getItemPreviewUrl(item)"
                  :key="getItemPreviewUrl(item)"
                  class="navDropdownItemStaticPreview"
                  :style="getPreviewStyle(getItemPreviewUrl(item))"
                ></span>
                <span class="navDropdownItemText">{{ item.label }}</span>
              </span>
            </RouterLink>
          </div>
        </div>
      </nav>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
.appShell {
  min-height: 100vh;
}

.appHeader {
  --header-padding-block: 0.75rem;
  --header-padding-inline: 0.75rem;
  --brand-padding-block: 0.75rem;
  --brand-column-width: minmax(260px, 320px);
  --logo-size: 48px;
  --nav-dropdown-width: clamp(11rem, 24vw, 13rem);
  --nav-dropdown-ratio: 3.75;
  --nav-dropdown-text-scale: 0.92;

  position: sticky;
  top: 0;
  z-index: 100;
  background: #fff;
  display: grid;
  grid-template-columns: var(--brand-column-width) 1fr;
  gap: 0.75rem;
  padding: var(--header-padding-block) var(--header-padding-inline);
  line-height: 1.5;
  border-bottom: 1px solid #e5e5e5;
  transition:
    grid-template-columns 0.24s ease,
    padding 0.24s ease,
    box-shadow 0.24s ease;
}

.appHeaderCompact {
  --header-padding-block: 0.45rem;
  --brand-padding-block: 0.25rem;
  --brand-column-width: minmax(220px, 0.8fr);
  --logo-size: 40px;
  --nav-dropdown-width: clamp(8rem, 36vw, 11.5rem);
  --nav-dropdown-text-scale: 0.82;

  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
}

.logo {
  width: var(--logo-size);
  height: var(--logo-size);
  flex-shrink: 0;
  transition:
    width 0.24s ease,
    height 0.24s ease;
}

.brand {
  display: flex;
  align-items: center;
  min-width: 0;
  padding: var(--brand-padding-block) 0;
  gap: 1rem;
  color: inherit;
  text-decoration: none;
  transition:
    padding 0.24s ease,
    gap 0.24s ease;
}

.brandText {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.brandText strong {
  font-size: 1.25rem;
  line-height: 1.2;
}

.brandText span {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.35;
}

.appHeaderCompact .brand {
  gap: 0.65rem;
}

.appHeaderCompact .brandText strong {
  font-size: 1rem;
}

.appHeaderCompact .brandText span {
  font-size: 0.78rem;
}

.mainNav {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.75rem;
}

.homeLink,
.navDropdownButton {
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  color: inherit;
  background: #fff;
  text-decoration: none;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease,
    transform 0.15s ease;
}

.homeLink {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.45rem 1rem;
}

.homeLink.router-link-exact-active,
.navDropdownButton.active {
  color: #fff;
  border-color: #222;
  background: #222;
}

.homeLink:hover,
.navDropdownButton:hover,
.navDropdownButton.open {
  border-color: #999;
  transform: translateY(-1px);
}

.navDropdown {
  position: relative;
  width: var(--nav-dropdown-width);
  transition: width 0.24s ease;
}

.navDropdownButton {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: var(--nav-dropdown-ratio);
  padding: 0.35rem;
  overflow: hidden;
  cursor: pointer;
}

.navDropdownButton::before {
  position: absolute;
  inset: 0;
  content: '';
  background: #f0f0f0;
  opacity: 0.9;
  transition: opacity 0.2s ease;
}

.navDropdownButton.active::before {
  background: #222;
}

.navDropdownButton:hover::before,
.navDropdownButton.open::before {
  opacity: 1;
}

.navDropdownButtonText {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  text-shadow:
    0 1px 1px #000,
    1px 0 1px #000,
    0 -1px 1px #000,
    -1px 0 1px #000;
}

.navDropdownButtonPreview {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0.22)),
    var(--nav-preview, none) 40% 15% / cover no-repeat;
  animation: preview-slide-in 0.6s ease both;
}

.navDropdownButtonPreview--leaving {
  animation: preview-slide-out 0.7s ease both;
}

.navDropdownButton.active .navDropdownButtonPreview {
  background:
    linear-gradient(rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.06)),
    var(--nav-preview, none) 40% 15% / cover no-repeat;
}

.navDropdownButtonText strong {
  font-size: calc(1.1rem * var(--nav-dropdown-text-scale));
  font-weight: 800;
  letter-spacing: 0.02em;
}

.navDropdownButtonText small {
  font-size: calc(0.82rem * var(--nav-dropdown-text-scale));
  opacity: 0.86;
}

.navDropdownMenu {
  position: absolute;
  z-index: 20;
  top: calc(100% + 0.5rem);
  left: 0;
  display: grid;
  width: 100%;
  max-height: min(520px, 72vh);
  padding: 0.5rem;
  overflow-y: auto;
  border: 1px solid #dedede;
  border-radius: 0px;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.18);
}

.navDropdownItem {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 96px;
  /* padding: 0.35rem; */
  border-radius: 0px;
  color: inherit;
  text-decoration: none;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.navDropdownItem:hover {
  background: #f4f4f4;
}

.navDropdownItem.router-link-exact-active {
  color: #fff;
  background: #222;
}

.navDropdownItemImage {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 0;
  width: 100%;
  min-height: 88px;
  overflow: hidden;
  background: #f0f0f0;
}

.navDropdownItemStaticPreview {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    linear-gradient(rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0.22)),
    var(--nav-preview, none) 40% 5% / cover no-repeat;
}

.navDropdownItemText {
  position: relative;
  z-index: 1;
  padding: 0.25rem 0.5rem;
  color: #fff;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  text-align: center;
  text-shadow:
    0 1px 1px #000,
    1px 0 1px #000,
    0 -1px 1px #000,
    -1px 0 1px #000;
}

@keyframes preview-slide-in {
  from {
    /* New image fade-in: set opacity to 1 here to remove fade-in. */
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
    /* Old image fade-out: set opacity to 1 here to keep it visible while sliding away. */
    opacity: 1;
    transform: translateX(-100%) scale(0.98);
  }
}

@media (min-width: 1024px) {
  .appHeader {
    --header-padding-block: 1rem;
    --header-padding-inline: 2rem;
    --brand-padding-block: 0;
    --brand-column-width: minmax(320px, 360px);
    --logo-size: 72px;
    --nav-dropdown-width: clamp(22rem, 30vw, 30rem);
    --nav-dropdown-text-scale: 1;

    align-items: center;
  }

  .appHeaderCompact {
    --header-padding-block: 0.55rem;
    --brand-column-width: minmax(240px, 300px);
    --logo-size: 48px;
    --nav-dropdown-width: clamp(17rem, 24vw, 23rem);
    --nav-dropdown-text-scale: 0.86;
  }

  .mainNav {
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .appHeader {
    --brand-column-width: minmax(320px, 1fr);
    --logo-size: 42px;
    --nav-dropdown-width: 100%;
    --nav-dropdown-ratio: 5;
    --nav-dropdown-text-scale: 0.9;

    grid-template-columns: minmax(0, 1fr);
  }

  .mainNav {
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
    overflow-x: visible;
  }

  .appHeaderCompact {
    --brand-column-width: minmax(220px, 1fr);
    --logo-size: 36px;
    --nav-dropdown-ratio: 5.4;
    --nav-dropdown-text-scale: 0.82;
  }
}

@media (min-width: 641px) and (max-width: 1023px) {
  .appHeader {
    --brand-column-width: minmax(240px, 280px);
    --logo-size: 38px;
    --nav-dropdown-width: clamp(12rem, 28vw, 15rem);
    --nav-dropdown-text-scale: 0.86;
  }

  .appHeaderCompact {
    --brand-column-width: minmax(210px, 240px);
    --logo-size: 32px;
    --nav-dropdown-width: clamp(10.5rem, 26vw, 13rem);
  }
}
</style>
