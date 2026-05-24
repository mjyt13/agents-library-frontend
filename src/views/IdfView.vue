<script setup lang="ts">
import FactionPage from '@/pages/FactionPage.vue'
import { idf } from '@/interface/data/factions/idf/idf'
</script>

<template>
  <main>
    <FactionPage :faction="idf" />
  </main>
</template>
