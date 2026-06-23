# CS2 Agents Library — Project Guide for Claude

## Philosophy

- Minimum code for the task. No abstractions until they're needed twice.
- No comments explaining what the code does — only why, when it's non-obvious.
- No error handling for things that can't happen in practice.
- All assets live in the frontend (`src/interface/data/`). Vite handles bundling.

## Tech Stack

Vue 3 + TypeScript + Vite, `vue-router` for routing. Pinia is installed but unused
(`src/stores/counter.ts` is the scaffold default). No backend.
Target: Android app via Capacitor (future).

## Data Hierarchy

```
Faction          (src/core/models/faction.ts)      ← id, name, previews?, subfractions[]
  └── Subfraction  (src/core/models/subfraction.ts)  ← meta + loadAudioSource() + loadPreviewSource()?
        ├── meta.agents[]  → Agent (src/core/models/agent.ts)  ← name, description, comment, photos
        └── audio source   → voice pages / groups / lazy AudioItems
```

A `Subfraction` no longer stores voice lines inline. It exposes **async loaders**:

```ts
interface Subfraction {
  meta: SubfractionMeta                              // id, name (SubfractionType), agents[]
  loadAudioSource: () => Promise<SubfractionAudioSource>
  loadPreviewSource?: () => Promise<ImagePreviewSource>
}
```

`SubfractionType` / `SubfractionTypeRus` are `const` objects (`as const`), not enums.
Access as `SubfractionType.FEMALE`. Values: `MALE`, `FEMALE`, `MASTER`, `MASTER_FEMALE`,
`MASTER_MALE`, `MASTER_FBI`, `MASTER_SWAT`. `SubfractionTypeRus` holds the Russian UI labels.

## Audio Model & Resolution Chain

Audio is resolved **lazily**, in stages — only the picked file is fetched:

```
subfraction.loadAudioSource()        → SubfractionAudioSource { voicePages, loadVoicePage }
  source.loadVoicePage(pageId)       → AudioContent[]   (groups: Affirmative, Agree, …)
    group.audioItems[i]()            → Promise<AudioItem { id, title, url }>   ← url resolved here
```

`AudioContent.audioItems` is `Array<() => Promise<AudioItem>>` — each entry is a resolver
that, when called, runs `import.meta.glob`'s lazy loader and returns the final asset `url`.

Per-subfraction `audio.ts` wires the glob:

```ts
const basePath = 'factions/professionals/fem/audio'
const audioModules = {
  ...import.meta.glob('/src/interface/data/.../audio/*.wav', { import: 'default', query: '?url' }),
  ...import.meta.glob('/src/interface/data/.../audio/*.ogg', { import: 'default', query: '?url' }),
  ...import.meta.glob('/src/interface/data/.../audio/*.oga', { import: 'default', query: '?url' }),
}
export const audioSource = createAudioSourceFromModules(audioModules, basePath)
```

Globs are **lazy** (no `eager: true`). `buildVoicePages` groups files by category (e.g. `agree_01.wav`
→ category `agree`) and splits them across 3 voice pages. `createImagePreviewSourceFromModules`
does the same for preview images.

## Data Files Layout

```
src/interface/data/
  factions/
    professionals/
      professionals.ts            ← Faction const (id, name, previews, subfractions[])
      previews.ts / previews/     ← faction-level preview images
      fem/
        fem.ts                    ← Subfraction const (meta + loadAudioSource + loadPreviewSource)
        meta.ts                   ← SubfractionMeta (id, name: SubfractionType, agents[])
        audio.ts                  ← import.meta.glob of ./audio/*  → audioSource
        audio/*.wav|*.ogg|*.oga
        previews.ts / previews/
      male/ … master/ …           ← same shape per subfraction
  agents/
    sally/
      sally.ts                    ← Agent const (id, name, description, comment, photos[])
      *.png / *.jpg / audio/*.wav
```

Each faction has its own folder under `factions/`; subfraction folders are typically
`fem` / `male` / `master` (some factions merge several, e.g. `fbi_swat`).

## Pages & Components

- `src/views/*.vue` — **thin route wrappers**. Each imports a `Faction` const and renders
  `<FactionPage :faction="…" />`. One view per route (see `src/router/index.ts`).
  `HomeView.vue` is the landing page (faction cards + background `<video>`).

- `src/pages/FactionPage.vue` — owns subfraction switching (`VoicePageSwitcher`),
  preview crossfade timers, and renders the active `SubfractionPage`.

- `src/pages/SubfractionPage.vue` — shows the agent (`AgentPanel`) + voice lines
  (`AudioContent` / `SoundpadContent`). Carousel when a subfraction has >1 agent.

- `src/widgets/` — `AudioContent.vue` (collapsible category sections),
  `SoundpadContent.vue` (soundpad mode: random non-repeating play with heard-count),
  `VoicePageSwitcher.vue`, `AgentPanel.vue`.

## Utils (`src/utils/`)

- `createSubfractionAudioSource.ts` — `createAudioSourceFromModules` / `…FromFiles`: build a
  `SubfractionAudioSource` from globbed modules or a file list.
- `createAudioContentFromFiles.ts` — group files into categories + lazy `AudioItem` resolvers.
- `buildVoicePages.ts` — distribute categories across 3 voice pages.
- `createImagePreviewSource.ts` / `imagePreviewTimer.ts` / `preloadImageUrls.ts` — preview images + crossfade.
- `getRandomAudio.ts` — `getRandomAudio(faction = professionals)`: walks the resolution chain
  and returns one random resolved audio `url` (async). Useful for the home page background sound.

## Planned / not yet built

- Agent slider auto-play (setInterval, pause on hover).
- 3D models: Source 2 → `.glb` via Source2Viewer, rendered with `@tresjs/core` (see `Agent.modelPath`).
- Capacitor for Android: WAV→OGG conversion before packaging.
