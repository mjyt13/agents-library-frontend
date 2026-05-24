<script setup lang="ts">
import FactionPage from '@/pages/FactionPage.vue'
import { seal } from '@/interface/data/factions/seal/seal'
</script>

<template>
  <main>
    <FactionPage :faction="seal" />
  </main>
</template>
