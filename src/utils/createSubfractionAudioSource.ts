import type { AudioContent, AudioGroupMeta, AudioItem, LegacyAudioContent, VoicePageId, VoicePageMeta } from '@/core/models/audioContent'
import { buildVoicePageMetas, buildVoicePages, toAudioGroupMeta } from '@/utils/buildVoicePages'
import { createAudioContentFromFiles } from '@/utils/createAudioContentFromFiles'

interface SubfractionAudioSource {
  voicePages: VoicePageMeta[]
  loadVoicePage: (pageId: VoicePageId) => Promise<AudioContent[]>
}

const createLazyAudioGroup = (group: LegacyAudioContent): AudioContent => ({
  meta: {
    ...toAudioGroupMeta(group),
    itemCount: group.audioItems.length,
  },
  audioItems: group.audioItems.map(
    (item): (() => Promise<AudioItem>) =>
      async () => item,
  ),
})

export const createMissingAudioGroup = (meta: AudioGroupMeta): AudioContent => ({
  meta,
  audioItems: [],
})

export const createAudioSourceFromLegacyGroups = (
  groups: LegacyAudioContent[],
): SubfractionAudioSource => {
  const builtPages = buildVoicePages(groups)

  return {
    voicePages: buildVoicePageMetas(groups),
    loadVoicePage: async (pageId) =>
      (builtPages.find((page) => page.id === pageId)?.groups ?? []).map(createLazyAudioGroup),
  }
}

export const createAudioSourceFromFiles = (
  files: string[],
  basePath: string,
  categoryNames: Record<string, string> = {},
): SubfractionAudioSource =>
  createAudioSourceFromLegacyGroups(createAudioContentFromFiles(files, basePath, categoryNames))
