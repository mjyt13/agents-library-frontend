<script setup lang="ts">
import FactionPage from '@/components/FactionPage.vue'
import { sas } from '@/interface/data/factions/sas/sas'
</script>

<template>
  <main>
    <FactionPage :faction="sas" />
  </main>
</template>
