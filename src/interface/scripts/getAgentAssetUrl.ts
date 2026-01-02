/**
 * Получает URL для статических файлов агента (аудио, изображения)
 * используя динамический импорт через import.meta.url
 * @param relativePath - относительный путь от папки agents (например, 'sally/audio/file.wav')
 * @returns полный URL к файлу
 */
export const getAgentAssetUrl = (relativePath: string): string => {
  return new URL(`../mockData/agents/${relativePath}`, import.meta.url).href
}
