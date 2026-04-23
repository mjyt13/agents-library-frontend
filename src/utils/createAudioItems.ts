export const createAudioItems = (
  prefix: string,
  count: number,
  categoryName: string,
  basePath: string,
  startFrom: number = 1,
): Array<{ id: string; title: string; url: string }> => {
  return Array.from({ length: count }, (_, i) => {
    const num = (i + startFrom).toString().padStart(2, '0')
    return {
      id: `${prefix}_${num}`,
      title: `${categoryName} ${i + startFrom}`,
      url: `${basePath}/${prefix}_${num}.wav`,
    }
  })
}
