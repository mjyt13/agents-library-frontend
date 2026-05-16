<script setup lang="ts">
import FactionPage from '@/components/FactionPage.vue'
import { seal_frogman } from '@/interface/data/factions/seal_frogman/seal_frogman'
</script>

<template>
  <main>
    <FactionPage :faction="seal_frogman" />
  </main>
</template>
