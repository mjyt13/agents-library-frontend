export function preloadImageUrls(urls: string[]) {
  urls.forEach((url) => {
    const image = new Image()
    image.src = url
  })
}

// Resolves once the image is fetched AND decoded, so callers can swap it in
// without the browser visibly painting it mid-animation.
export async function decodeImageUrl(url: string): Promise<void> {
  const image = new Image()
  image.src = url

  try {
    await image.decode()
  } catch {
    // decode() rejects on detached/invalid images; the slide-in still proceeds.
  }
}
