import type { AudioContent, AudioGroupMeta } from '@/core/models/audioContent'
import type { SubfractionAudioSource } from '@/core/models/subfraction'
import { buildVoicePages } from '@/utils/buildVoicePages'
import { createAudioContentFromFiles } from '@/utils/createAudioContentFromFiles'

type AudioAssetModules = Record<string, () => Promise<unknown>>

export const createMissingAudioGroup = (meta: AudioGroupMeta): AudioContent => ({
  meta,
  audioItems: [],
})

export const createAudioSourceFromFiles = (
  files: string[],
  basePath: string,
  categoryNames: Record<string, string> = {},
): SubfractionAudioSource => {
  const pages = buildVoicePages(createAudioContentFromFiles(files, basePath, categoryNames))

  return {
    voicePages: pages.map((page) => ({
      id: page.id,
      title: page.title,
      description: page.description,
      groups: page.groups.map((group) => group.meta),
    })),
    loadVoicePage: async (pageId) => pages.find((page) => page.id === pageId)?.groups ?? [],
  }
}

export const createAudioSourceFromModules = (
  audioModules: AudioAssetModules,
  basePath: string,
  categoryNames: Record<string, string> = {},
): SubfractionAudioSource => {
  const audioFiles = Object.keys(audioModules).map((path) => path.split('/').pop() ?? '')
  const resolveAudioUrl = async (fileName: string, assetPath: string): Promise<string> => {
    const modulePath = `/src/interface/data/${basePath}/${fileName}`
    const loadModule = audioModules[modulePath]
    if (typeof loadModule === 'function') return String(await loadModule())

    return `${import.meta.env.BASE_URL}src/interface/data/${assetPath}`
  }

  const pages = buildVoicePages(createAudioContentFromFiles(audioFiles, basePath, categoryNames, resolveAudioUrl))

  return {
    voicePages: pages.map((page) => ({
      id: page.id,
      title: page.title,
      description: page.description,
      groups: page.groups.map((group) => group.meta),
    })),
    loadVoicePage: async (pageId) => pages.find((page) => page.id === pageId)?.groups ?? [],
  }
}
