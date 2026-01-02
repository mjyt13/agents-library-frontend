export const getPhrase = (phrases: string[]): string => {
  const idx = Math.floor(Math.random() * phrases.length)
  return phrases[idx] ? phrases[idx] : ''
}
