export interface ImagePreviewDuration {
  min: number
  max: number
}

export interface ImagePreviewSource {
  durationMs: ImagePreviewDuration
  loadImages: () => Promise<string[]>
}
