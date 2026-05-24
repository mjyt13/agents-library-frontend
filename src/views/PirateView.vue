<script setup lang="ts">
import FactionPage from '@/pages/FactionPage.vue'
import { pirate } from '@/interface/data/factions/pirate/pirate'
</script>

<template>
  <main>
    <FactionPage :faction="pirate" />
  </main>
</template>
