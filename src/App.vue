<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { App as CapacitorApp } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'
import AppHeader from '@/widgets/AppHeader.vue'
import { useBgMusicStore } from './stores/bgMusic'

const router = useRouter()
const bgMusicStore = useBgMusicStore()
const started = ref(false)
const startPlaying = () => {
  if (!started.value) {
    bgMusicStore.play()
    started.value = true
  }
}

let removeBackButtonListener: (() => void) | null = null

onMounted(async () => {
  if (!Capacitor.isNativePlatform()) return

  const handle = await CapacitorApp.addListener('backButton', () => {
    if (window.history.state?.back) {
      router.back()
    } else {
      void CapacitorApp.exitApp()
    }
  })

  removeBackButtonListener = () => handle.remove()
})

onBeforeUnmount(() => {
  removeBackButtonListener?.()
})
</script>

<template>
  <div class="appShell" @click="startPlaying()">
    <AppHeader />
    <RouterView />
  </div>
</template>

<style scoped>
.appShell {
  min-height: 100vh;
}
</style>
