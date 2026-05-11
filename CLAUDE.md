# CS2 Agents Library — Project Guide for Claude

## Philosophy

- Minimum code for the task. No abstractions until they're needed twice.
- No comments explaining what the code does — only why, when it's non-obvious.
- No error handling for things that can't happen in practice.
- All assets live in the frontend (`src/interface/data/`). Vite handles bundling.

## Tech Stack

Vue 3 + TypeScript + Vite. Pinia for state (not used yet). No backend.
Target: Android app via Capacitor (future).

## Data Hierarchy

```
Faction          (src/core/models/faction.ts)
  └── Subfraction  (src/core/models/subfraction.ts)   ← has voiceLines + agents[]
        └── Agent    (src/core/models/agent.ts)        ← name, description, comment, photos
```

`SubfractionType` is a `const` object (`as const`) — access as `SubfractionType.FEMALE` or `SubfractionType['FEMALE']`.
Not an enum, not a Map.

## Data Files

```
src/interface/data/
  sally.ts                                  ← Agent const (id, name, description, comment, photos)
  factions/
    professionals/
      fem.ts                                ← Subfraction const (agents: [sally], voiceLines: [...])
      professionals.ts                      ← Faction const (subfractions: [professionals_fem])
  agents/
    sally/
      1083625.png
      images.jpg
      audio/*.wav
```

## Asset Resolution

Assets are resolved at build time via `import.meta.glob`:

```ts
const agentAssets = import.meta.glob('/src/interface/data/agents/**/*', {
  eager: true,
  query: '?url',
})
```

Paths in data files use the convention `./agents/<id>/audio/file.wav`.
Strip `./agents/` prefix before looking up in the glob map.

## Pages

- `src/pages/SubfractionPage.vue` — main page, takes `subfraction: Subfraction` + `factionName: string`.
  Shows: [photo | agent name | faction name] → description → comment → AudioContent (voice lines).
  Carousel (prev/next) when `subfraction.agents.length > 1`.

- `src/components/SallyPage.vue` — thin wrapper: passes `professionals_fem` + `professionals.name` to SubfractionPage.

- `src/pages/AgentPage.vue` — old page, now dead code. Can be deleted.

## UI Layout (SubfractionPage)

```
Row 1: [square photo]  [agent name]       [← N/total →]  ← carousel only if >1 agent
                       [faction name]
Row 2: description (game flavor text)
Row 3: comment (personal/community note)
AudioContent widget (collapsible sections of voice lines)
```

## Planned but not yet built

- FactionPage: shows all subfractions of a faction (SubfractionPage instances stacked or tabbed)
- AudioGrid widget: grid of category buttons → random sound on click (UI variant 1)
- AudioDropdowns widget: dropdown per category → pick specific track (UI variant 2)
- Agent slider auto-play (setInterval, pause on hover)
- 3D models: Source 2 → .glb via Source2Viewer, rendered with @tresjs/core
- Capacitor for Android: WAV→OGG conversion needed before packaging
