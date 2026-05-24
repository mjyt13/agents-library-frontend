<script setup lang="ts">
import FactionPage from '@/pages/FactionPage.vue'
import { separatist } from '@/interface/data/factions/separatist/separatist'
</script>

<template>
  <main>
    <FactionPage :faction="separatist" />
  </main>
</template>
