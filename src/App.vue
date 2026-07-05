<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/widgets/AppHeader.vue'
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
