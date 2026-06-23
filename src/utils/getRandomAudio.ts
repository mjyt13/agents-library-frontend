import { factions } from '@/interface/data/factions'

// id категорий из buildVoicePages — отсюда берём случайную реплику на главной.
const RANDOM_GROUP_IDS = new Set(['cheer', 'compliment', 'thanks', 'agree', 'lets_go', 'winning'])

const pickRandom = <T>(items: readonly T[]): T | undefined =>
  items[Math.floor(Math.random() * items.length)]

export const getRandomAudio = async (): Promise<string | null> => {
  const subfraction = pickRandom(pickRandom(factions)?.subfractions ?? [])
  if (!subfraction) return null

  const source = await subfraction.loadAudioSource()

  const candidates = source.voicePages.flatMap((page) =>
    page.groups
      .filter((group) => RANDOM_GROUP_IDS.has(group.id) && !group.isMissing)
      .map((group) => ({ pageId: page.id, groupId: group.id })),
  )
  const choice = pickRandom(candidates)
  if (!choice) return null

  const groups = await source.loadVoicePage(choice.pageId)
  const group = groups.find((candidate) => candidate.meta.id === choice.groupId)
  const resolver = group && pickRandom(group.audioItems)
  if (!resolver) return null

  return (await resolver()).url
}
