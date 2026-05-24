<script setup lang="ts">
import FactionPage from '@/pages/FactionPage.vue'
import { leet } from '@/interface/data/factions/leet/leet'
</script>

<template>
  <main>
    <FactionPage :faction="leet" />
  </main>
</template>
