<script setup lang="ts">
import FactionPage from '@/components/FactionPage.vue'
import { gign } from '@/interface/data/factions/gign/gign'
</script>

<template>
  <main>
    <FactionPage :faction="gign" />
  </main>
</template>
