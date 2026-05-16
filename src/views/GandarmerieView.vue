<script setup lang="ts">
import FactionPage from '@/components/FactionPage.vue'
import { gandarmerie } from '@/interface/data/factions/gandarmerie/gandarmerie'
</script>

<template>
  <main>
    <FactionPage :faction="gandarmerie" />
  </main>
</template>
