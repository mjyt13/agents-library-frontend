<script setup lang="ts">
import FactionPage from '@/pages/FactionPage.vue'
import { gsg } from '@/interface/data/factions/gsg/gsg'
</script>

<template>
  <main>
    <FactionPage :faction="gsg" />
  </main>
</template>
