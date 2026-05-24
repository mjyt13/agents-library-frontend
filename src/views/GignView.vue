<script setup lang="ts">
import FactionPage from '@/pages/FactionPage.vue'
import { gign } from '@/interface/data/factions/gign/gign'
</script>

<template>
  <main>
    <FactionPage :faction="gign" />
  </main>
</template>
