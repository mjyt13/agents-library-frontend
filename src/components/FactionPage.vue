<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Faction } from '@/core/models/faction'
import { SubfractionType, SubfractionTypeRus } from '@/core/models/subfraction'
import type { SubfractionType as SubfractionTypeValue } from '@/core/models/subfraction'
import SubfractionPage from '@/pages/SubfractionPage.vue'

const props = defineProps<{
  faction: Faction
}>()

const subfractionLabels: Record<SubfractionTypeValue, string> = {
  [SubfractionType.MALE]: SubfractionTypeRus.MALE,
  [SubfractionType.FEMALE]: SubfractionTypeRus.FEMALE,
  [SubfractionType.MASTER]: SubfractionTypeRus.MASTER,
  [SubfractionType.MASTER_FEMALE]: SubfractionTypeRus.MASTER_FEMALE,
  [SubfractionType.MASTER_MALE]: SubfractionTypeRus.MASTER_MALE,
  [SubfractionType.MASTER_FBI]: SubfractionTypeRus.MASTER_FBI,
  [SubfractionType.MASTER_SWAT]: SubfractionTypeRus.MASTER_SWAT,
}

const currentId = ref(props.faction.subfractions[0]?.id ?? '')

const currentSubfraction = computed(
  () => props.faction.subfractions.find((sub) => sub.id === currentId.value) ?? null,
)
</script>

<template>
  <div class="factionPage">
    <div class="switcher">
      <button
        v-for="sub in faction.subfractions"
        :key="sub.id"
        :class="sub.id === currentId ? 'active' : ''"
        @click="currentId = sub.id"
      >
        {{ subfractionLabels[sub.name] }}
      </button>
    </div>

    <SubfractionPage
      v-if="currentSubfraction"
      :subfraction="currentSubfraction"
      :faction-name="faction.name"
    />
  </div>
</template>

<style scoped>
.factionPage {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.switcher {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #ddd;
}

.switcher button {
  padding: 0.4rem 1.2rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  cursor: pointer;
  font-size: 0.95rem;
  transition:
    background-color 0.15s,
    color 0.15s,
    border-color 0.15s;
}

.switcher button:hover {
  background-color: #f0f0f0;
}

.switcher button.active {
  background-color: #333;
  color: #fff;
  border-color: #333;
}
</style>
