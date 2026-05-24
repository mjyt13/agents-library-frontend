<script setup lang="ts">
import FactionPage from '@/pages/FactionPage.vue'
import { fbi_old } from '@/interface/data/factions/fbi_old/fbi_old'
</script>

<template>
  <main>
    <FactionPage :faction="fbi_old" />
  </main>
</template>
