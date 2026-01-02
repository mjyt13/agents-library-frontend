export const getPicture = (pictures: string[]): string => {
  const idx = Math.floor(Math.random() * pictures.length)
  return pictures[idx] ? pictures[idx] : ''
}
