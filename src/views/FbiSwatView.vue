<script setup lang="ts">
import FactionPage from '@/components/FactionPage.vue'
import { fbi_swat } from '@/interface/data/factions/fbi_swat/fbi_swat'
</script>

<template>
  <main>
    <FactionPage :faction="fbi_swat" />
  </main>
</template>
