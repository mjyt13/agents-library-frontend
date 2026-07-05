<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { Faction } from '@/core/models/faction'
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

// Mirrors the three real preview boxes. Tune posX/posY here, then paste the
// printed `<posX%> <posY%> / cover` into the matching CSS rule.
interface Preset {
  id: string
  label: string
  // Where this value lives in the codebase.
  cssRef: string
  // Box aspect ratio (w/h) at its narrowest and widest viewport. Editable so you
  // can match a measured breakpoint and see where the crop breaks.
  ratioMin: number
  ratioMax: number
  posX: number // 0..1
  posY: number // 0..1
  gradient: string
}

const presets = reactive<Preset[]>([
  {
    id: 'navGroup',
    label: 'Nav group button',
    cssRef: 'App.vue .navDropdownButtonPreview',
    ratioMin: 3.75,
    ratioMax: 5.4,
    posX: 0.4,
    posY: 0.15,
    gradient: 'linear-gradient(rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0.22))',
  },
  {
    id: 'navItem',
    label: 'Nav dropdown item',
    cssRef: 'App.vue .navDropdownItemStaticPreview',
    ratioMin: 1.6,
    ratioMax: 5.4,
    posX: 0.4,
    posY: 0.05,
    gradient: 'linear-gradient(rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0.22))',
  },
  {
    id: 'subfraction',
    label: 'Subfraction button',
    cssRef: 'FactionPage.vue .switcher__buttonPreview',
    ratioMin: 3.2,
    ratioMax: 8,
    posX: 0.4,
    posY: 0.05,
    gradient: 'linear-gradient(rgba(255, 255, 255, 0.66), rgba(255, 255, 255, 0.6))',
  },
])

const factions: { faction: Faction; label: string }[] = [
  { faction: professionals, label: 'Professionals' },
  { faction: sabre, label: 'Sabre/Balkans' },
  { faction: leet, label: 'Elite Crew' },
  { faction: phoenix, label: 'Phoenix' },
  { faction: separatist, label: 'Separatist' },
  { faction: anarchist, label: 'Anarchist' },
  { faction: guerilla, label: 'Guerilla' },
  { faction: pirate, label: 'Pirate' },
  { faction: fbi_swat, label: 'SWAT/FBI' },
  { faction: fbi_old, label: 'FBI (old)' },
  { faction: sas, label: 'SAS' },
  { faction: gsg, label: 'GSG-9' },
  { faction: gign, label: 'GIGN' },
  { faction: idf, label: 'IDF' },
  { faction: gandarmerie, label: 'Gendarmerie' },
  { faction: seal, label: 'SEAL' },
  { faction: seal_frogman, label: 'SEAL Frogman' },
]

interface FactionImages {
  label: string
  images: string[]
  activeIndex: number
}

const loaded = ref<FactionImages[]>([])
const naturalRatios = reactive<Record<string, number>>({})

// Faction-level previews (nav) + every subfraction's previews (switcher box).
async function collectImages(faction: Faction): Promise<string[]> {
  const factionImages = faction.previews ? await faction.previews.loadImages() : []

  const subfractionImages = await Promise.all(
    faction.subfractions.map(async (subfraction) => {
      if (!subfraction.loadPreviewSource) {
        return []
      }

      const source = await subfraction.loadPreviewSource()
      return source.loadImages()
    }),
  )

  return [...factionImages, ...subfractionImages.flat()]
}

onMounted(async () => {
  loaded.value = await Promise.all(
    factions.map(async ({ faction, label }) => ({
      label,
      images: await collectImages(faction),
      activeIndex: 0,
    })),
  )
})

function onImageLoad(url: string, event: Event) {
  const img = event.target as HTMLImageElement
  if (img.naturalHeight) {
    naturalRatios[url] = img.naturalWidth / img.naturalHeight
  }
}

function pct(value: number): string {
  return `${(value * 100).toFixed(1)}%`
}

function cropBoxStyle(preset: Preset, url: string, ratio: number): Record<string, string> {
  return {
    aspectRatio: String(ratio),
    background: `${preset.gradient}, url("${url}") ${pct(preset.posX)} ${pct(
      preset.posY,
    )} / cover no-repeat`,
  }
}

// Outline (as % of the full image) marking the band a `cover` box of this ratio keeps.
// `dashed` distinguishes the min-ratio band from the max-ratio band.
function cropOutlineStyle(
  preset: Preset,
  url: string,
  ratio: number,
  dashed: boolean,
): Record<string, string> | null {
  const imgRatio = naturalRatios[url]
  if (!imgRatio) {
    return null
  }

  let visW = 1
  let visH = 1

  if (imgRatio > ratio) {
    visW = ratio / imgRatio
  } else {
    visH = imgRatio / ratio
  }

  return {
    left: pct((1 - visW) * preset.posX),
    top: pct((1 - visH) * preset.posY),
    width: pct(visW),
    height: pct(visH),
    borderColor: overlayColors[preset.id] ?? '#000',
    borderStyle: dashed ? 'dashed' : 'solid',
  }
}

const overlayColors: Record<string, string> = {
  navGroup: '#ff3b30',
  navItem: '#34c759',
  subfraction: '#0a84ff',
}

function swatchStyle(preset: Preset): Record<string, string> {
  return { background: overlayColors[preset.id] ?? '#000' }
}
</script>

<template>
  <div class="cropInspector">
    <header class="intro">
      <h1>Crop inspector</h1>
      <p>
        Each render is shown full (16:9 source) with the kept bands outlined, next to the live
        <code>cover</code> crop of every preview box at its narrowest and widest viewport ratio
        (solid = max ratio, dashed = min). Edit the min/max ratios to match a measured breakpoint —
        the band between the two lines is what may get clipped depending on viewport.
      </p>
    </header>

    <section class="controls">
      <div v-for="preset in presets" :key="preset.id" class="control">
        <div class="controlHead">
          <span class="swatch" :style="swatchStyle(preset)"></span>
          <strong>{{ preset.label }}</strong>
          <code>{{ preset.cssRef }}</code>
        </div>
        <label>
          posX {{ pct(preset.posX) }}
          <input v-model.number="preset.posX" type="range" min="0" max="1" step="0.01" />
        </label>
        <label>
          posY {{ pct(preset.posY) }}
          <input v-model.number="preset.posY" type="range" min="0" max="1" step="0.01" />
        </label>
        <div class="ratioInputs">
          <label>
            ratio min
            <input v-model.number="preset.ratioMin" type="number" min="0.5" step="0.1" />
          </label>
          <label>
            ratio max
            <input v-model.number="preset.ratioMax" type="number" min="0.5" step="0.1" />
          </label>
        </div>
        <output>{{ pct(preset.posX) }} {{ pct(preset.posY) }} / cover</output>
      </div>
    </section>

    <section v-for="entry in loaded" :key="entry.label" class="factionRow">
      <h2>{{ entry.label }}</h2>

      <div v-if="entry.images.length" class="rowBody">
        <div class="cropImage">
            <div class="full">
            <img
              :src="entry.images[entry.activeIndex]"
              alt=""
              @load="onImageLoad(entry.images[entry.activeIndex]!, $event)"
            />
            <template v-for="preset in presets" :key="preset.id">
              <span
                v-if="cropOutlineStyle(preset, entry.images[entry.activeIndex]!, preset.ratioMax, false)"
                class="cropOutline"
                :style="cropOutlineStyle(preset, entry.images[entry.activeIndex]!, preset.ratioMax, false)!"
              ></span>
              <span
                v-if="cropOutlineStyle(preset, entry.images[entry.activeIndex]!, preset.ratioMin, true)"
                class="cropOutline"
                :style="cropOutlineStyle(preset, entry.images[entry.activeIndex]!, preset.ratioMin, true)!"
              ></span>
            </template>
          </div>

        <div v-if="entry.images.length > 1" class="thumbs">
          <button
            v-for="(url, index) in entry.images"
            :key="url"
            type="button"
            :class="index === entry.activeIndex ? 'active' : ''"
            @click="entry.activeIndex = index"
          >
            <img :src="url" alt="" @load="onImageLoad(url, $event)" />
          </button>
        </div>
          
        </div>
        <div class="crops">
            <figure v-for="preset in presets" :key="preset.id">
              <figcaption>
                <span class="swatch" :style="swatchStyle(preset)"></span>
                {{ preset.label }}
              </figcaption>
              <div class="cropPair">
                <div class="cropCol">
                  <small>min · {{ preset.ratioMin }}:1 (dashed)</small>
                  <div
                    class="cropBox"
                    :style="cropBoxStyle(preset, entry.images[entry.activeIndex]!, preset.ratioMin)"
                  ></div>
                </div>
                <div class="cropCol">
                  <small>max · {{ preset.ratioMax }}:1 (solid)</small>
                  <div
                    class="cropBox"
                    :style="cropBoxStyle(preset, entry.images[entry.activeIndex]!, preset.ratioMax)"
                  ></div>
                </div>
              </div>
            </figure>
          </div>
      </div>

      <p v-else class="empty">No preview images.</p>
    </section>
  </div>
</template>

<style scoped>
.cropInspector {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.intro p {
  max-width: 70ch;
  color: #444;
}

.controls {
  position: sticky;
  top: 0;
  z-index: 5;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  padding: 1rem;
  background: #fff;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.control {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.controlHead {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.controlHead code,
.control output {
  font-size: 0.78rem;
  color: #666;
}

.swatch {
  width: 14px;
  height: 14px;
  border-radius: 3px;
  flex-shrink: 0;
}

.control label {
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  gap: 0.15rem;
}

.control output {
  font-family: monospace;
  color: #222;
}

.factionRow {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
}

.rowBody {
  display: grid;
  grid-template-columns: minmax(220px, 320px) 1fr;
  gap: 1.5rem;
  align-items: start;
}

.cropImage{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 220px;
  max-width: 380px;
}

.full {
  position: relative;
  aspect-ratio: 16 / 9;
  background: #111;
}

.full img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.cropOutline {
  position: absolute;
  border: 2px solid;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.4);
  pointer-events: none;
}

.crops {
  display: flex;
  flex-direction: column;
  /* max-width: 400px; */
  gap: 0.75rem;
}

.crops figcaption {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 0.35rem;
}

.cropPair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.cropCol {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.cropCol small {
  font-size: 0.72rem;
  color: #666;
}

.ratioInputs {
  display: flex;
  gap: 0.5rem;
}

.ratioInputs label {
  flex: 1;
}

.ratioInputs input {
  width: 100%;
}

.cropBox {
  width: 100%;
  border: 1px solid #ccc;
}

.thumbs {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.thumbs button {
  width: 64px;
  aspect-ratio: 16 / 9;
  padding: 0;
  border: 2px solid transparent;
  cursor: pointer;
  background: #111;
}

.thumbs button.active {
  border-color: #0a84ff;
}

.thumbs img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.empty {
  color: #999;
}
</style>
