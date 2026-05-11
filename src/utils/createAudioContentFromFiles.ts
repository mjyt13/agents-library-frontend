import type { AudioContent, AudioItem } from '@/core/models/audioContent'

const splitCamelOrSnake = (value: string): string[] =>
  value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .trim()
    .split(/\s+/)

const toTitleCase = (value: string): string =>
  splitCamelOrSnake(value)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

const buildCategoryId = (fileName: string): string => {
  const withoutExtension = fileName.replace(/\.(wav|ogg|oga)$/i, '')
  const underscored = withoutExtension.match(/^(.*)_\d+$/)
  if (underscored?.[1]) return underscored[1]

  const compact = withoutExtension.match(/^(.*?)(\d+)$/)
  if (compact?.[1]) return compact[1]

  return withoutExtension
}

const buildItemTitle = (categoryName: string, index: number): string => `${categoryName} ${index + 1}`

/**
 * Создание аудиофайлов
 * @param files
 * @param basePath папка с файлами
 * @param categoryNames сейчас опционально, параметр четкого обозначения категории
 * @returns
 */
export const createAudioContentFromFiles = (
  files: string[],
  basePath: string,
  categoryNames: Record<string, string> = {},
): AudioContent[] => {
  const grouped = new Map<string, string[]>()

  for (const fileName of files) {
    const categoryId = buildCategoryId(fileName)
    const bucket = grouped.get(categoryId)
    if (bucket) {
      bucket.push(fileName)
      continue
    }

    grouped.set(categoryId, [fileName])
  }

  return Array.from(grouped.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([categoryId, categoryFiles]) => {
      const categoryName = categoryNames[categoryId] ?? toTitleCase(categoryId)
      const audioItems: AudioItem[] = categoryFiles
        .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }))
        .map((fileName, index) => ({
          id: fileName.replace(/\.(wav|ogg|oga)$/i, ''),
          title: buildItemTitle(categoryName, index),
          url: `${basePath}/${fileName}`,
        }))

      return {
        id: categoryId,
        name: categoryName,
        audioItems,
      }
    })
}
