<script setup lang="ts">
import FactionPage from '@/pages/FactionPage.vue'
import { anarchist } from '@/interface/data/factions/anarchist/anarchist'
</script>

<template>
  <main>
    <FactionPage :faction="anarchist" />
  </main>
</template>
