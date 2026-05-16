<script setup lang="ts">
import FactionPage from '@/components/FactionPage.vue'
import { idf } from '@/interface/data/factions/idf/idf'
</script>

<template>
  <main>
    <FactionPage :faction="idf" />
  </main>
</template>
