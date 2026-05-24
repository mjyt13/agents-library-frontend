# Audio UX Plan

## Goal

Prepare the subfraction page for two audio interaction modes:

- Dropdown mode: current grouped dropdowns with lazy audio loading on open.
- Soundpad mode: button grid where pressing a group plays one voice line quickly.

The page should make audio easy to reach while keeping agent presentation useful for future full-body images or 3D models.

## Layout Direction

- Split `SubfractionPage.vue` into focused Vue components instead of growing one large file.
- Keep agent UI independent from audio UI so agent state can survive audio page changes.
- Desktop target: audio-first layout with an agent side panel.
- Mobile target: scroll-snap or tab-like sections where audio is the first section and agents are a separate swipeable section.
- Agent browsing should eventually support drag/swipe between agents in the selected subfraction.
- Mobile agent swipe needs careful planning so it does not conflict with swiping back to the audio section.

## Component Direction

- `SubfractionPage.vue`: orchestration, loading selected subfraction audio source, selected voice page, caches.
- `AgentPanel.vue`: agent image, name, description, comment, agent navigation.
- `VoicePageSwitcher.vue`: page buttons, page metadata/counts, current page description/loading state.
- `AudioContent.vue`: dropdown-mode grouped audio.
- Future `SoundpadContent.vue`: soundpad-mode grouped buttons without rendering hundreds of `<audio>` elements.

## Current Dropdown Loading

- Keep current lazy behavior.
- Audio source metadata loads when entering a subfraction.
- Voice page content loads when the page is selected.
- Group audio items load only when a dropdown is opened.
- This remains the safest mode for large audio libraries.

## Future Soundpad Loading

- Use a separate soundpad component instead of mutating dropdown behavior.
- Use one shared `Audio` instance for playback rather than many `<audio controls>` elements.
- A group button should play a random loaded line from that group.
- First press may play the first resolved line if random choice is not ready yet.
- Add configurable debounce/cooldown per group or per soundpad to avoid rapid repeated playback.
- Track heard lines per group so the UI can show progress like `3/12 heard`.
- Keep a way to open or inspect all lines from a group when the user wants manual selection.

## Soundpad Loading Strategy

- Do not eagerly load all audio files for every group.
- Resolve the currently selected page first.
- Prefer loading visible soundpad groups first.
- Use a small concurrency limit for resolving audio URLs.
- Consider `IntersectionObserver` for groups near the viewport.
- Consider idle preloading for the next voice page after the first usable audio is ready.
- Keep fallback/loading states per group button, not only one global loading message.

## Asset Notes

- Preview images use `background-size: cover`, so banner-like assets with centered focal points work best.
- Agent images currently use `object-fit: contain`, which preserves the full image without crop.
- Future full-body or 3D agent displays should reserve stable space to avoid layout shifts.

## Open Decisions

- Exact desktop layout: CSS grid versus flex row/reverse.
- Exact mobile layout: scroll-snap sections versus explicit tabs.
- Whether agent swipe is enabled in the first layout pass or postponed.
- Soundpad mode switching: separate route, query param, or in-page toggle.
- Cooldown defaults for soundpad playback.
