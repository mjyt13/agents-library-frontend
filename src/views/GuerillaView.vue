<script setup lang="ts">
import FactionPage from '@/pages/FactionPage.vue'
import { guerilla } from '@/interface/data/factions/guerilla/guerilla'
</script>

<template>
  <main>
    <FactionPage :faction="guerilla" />
  </main>
</template>
