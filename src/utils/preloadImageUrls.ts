export function preloadImageUrls(urls: string[]) {
  urls.forEach((url) => {
    const image = new Image()
    image.src = url
  })
}
