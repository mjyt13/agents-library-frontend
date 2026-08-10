<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { getRandomAudio } from '@/utils/getRandomAudio'
import { debounce } from '@/utils/debounce'
import { useI18nStore } from '@/stores/i18n'
import { useBgMusicStore } from '@/stores/bgMusic'

const i18nStore = useI18nStore()
const bgMusicStore = useBgMusicStore()

const NAV_VIDEO_FALLBACK_URL = '/pet2_final.mp4'
const NAV_IMAGE_FALLBACK_URL = '/mock.webp'

// показываем картинку, пока у видео не появился первый кадр (loadeddata)
const isVideoReady = ref(false)

const player = new Audio()
player.preload = 'auto'
player.addEventListener('ended', () => bgMusicStore.normalPlaying())

let preparedUrl: string | null = null

const playRandomAudio = debounce(
  async () => {
    if (!preparedUrl) {
      const url = await getRandomAudio()
      if (!url) return
      player.src = url
    }
    preparedUrl = null

    bgMusicStore.quietPlaying()
    player.pause()
    player.currentTime = 0
    void player.play()
  },
  250,
  { leading: true },
)

onMounted(async () => {
  const url = await getRandomAudio()
  if (!url) return

  preparedUrl = url
  player.src = url
  player.load()
})

onBeforeUnmount(() => player.pause())
</script>

<template>
  <main class="homeView">
    <img
      v-if="!isVideoReady"
      :src="NAV_IMAGE_FALLBACK_URL"
      alt="CS VOICE LINES"
      class="heroImage"
    />
    <video class="heroVideo" autoplay muted loop playsinline @canplay="isVideoReady = true">
      <source :src="NAV_VIDEO_FALLBACK_URL" type="video/mp4" />
    </video>
    <section class="hero">
      <p class="eyebrow">{{ i18nStore.getMessage.home.title }}</p>
      <h1>{{ i18nStore.getMessage.home.description }}</h1>
      <p class="lead">
        {{ i18nStore.getMessage.home.lead }}
      </p>
      <button @click="playRandomAudio">{{ i18nStore.getMessage.home.randomAudioButton }}</button>
    </section>
  </main>
</template>

<style scoped>
.homeView {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  gap: 2rem;
  padding: 2rem 1rem 3rem;
  background:
    linear-gradient(rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.92)),
    var(--hero-preview, none) center / cover no-repeat;
  position: relative;
  overflow: hidden;
}

.hero {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1em 0 2rem 0;
  max-width: 760px;
  position: relative;
  z-index: 1;
}

.heroVideo,
.heroImage {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
  opacity: 0.5;
}

.eyebrow {
  margin: 0 0 0.5rem;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #666;
}

.hero h1 {
  margin: 0 0 1rem;
  font-size: clamp(2rem, 4vw, 3.4rem);
  line-height: 1.05;
}

.lead {
  margin: 0;
  max-width: 60ch;
  font-size: 1.05rem;
  line-height: 1.6;
  color: #444;
}

button {
  padding: 1.75rem 4.5rem;
  margin-top: 4rem;
  width: fit-content;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(90deg, #c8c8c8, #575757);
  border: none;
  box-shadow: 0 10px 6px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  cursor: pointer;
  align-self: center;
  opacity: 1;
}
</style>
