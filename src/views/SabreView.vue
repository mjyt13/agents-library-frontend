<script setup lang="ts">
import FactionPage from '@/components/FactionPage.vue'
import { sabre } from '@/interface/data/factions/sabre/sabre'
</script>

<template>
  <main>
    <FactionPage :faction="sabre" />
  </main>
</template>
