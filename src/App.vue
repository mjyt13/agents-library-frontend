<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { App as CapacitorApp } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'
import AppHeader from '@/widgets/AppHeader.vue'

const router = useRouter()

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
  <div class="appShell">
    <AppHeader />
    <RouterView />
  </div>
</template>

<style scoped>
.appShell {
  min-height: 100vh;
}
</style>
