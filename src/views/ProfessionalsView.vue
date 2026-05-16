<script setup lang="ts">
import FactionPage from '@/components/FactionPage.vue'
import { professionals } from '@/interface/data/factions/professionals/professionals'
</script>

<template>
  <main>
    <FactionPage :faction="professionals" />
  </main>
</template>
