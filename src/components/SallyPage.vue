<script setup lang="ts">
import AgentPage from '@/pages/AgentPage.vue'
import { sally } from '@/interface/mockData/sally'
</script>

<template>
  <AgentPage :agent="sally" />
</template>
