<script setup lang="ts">
import FactionPage from '@/components/FactionPage.vue'
import { phoenix } from '@/interface/data/factions/phoenix/phoenix'
</script>

<template>
  <main>
    <FactionPage :faction="phoenix" />
  </main>
</template>
