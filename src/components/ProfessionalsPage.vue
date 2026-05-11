<script setup lang="ts">
import { ref, computed } from 'vue'
import { SubfractionType, SubfractionTypeRus } from '@/core/models/subfraction'
import { professionals } from '@/interface/data/factions/professionals/professionals'
import SubfractionPage from '@/pages/SubfractionPage.vue'

const subfractionLabels: Record<SubfractionType, string> = {
  [SubfractionType.MALE]: SubfractionTypeRus.MALE,
  [SubfractionType.FEMALE]: SubfractionTypeRus.FEMALE,
  [SubfractionType.MASTER]: SubfractionTypeRus.MASTER,
  [SubfractionType.MASTER_FEMALE]: SubfractionTypeRus.MASTER_FEMALE,
  [SubfractionType.MASTER_MALE]: SubfractionTypeRus.MASTER_MALE,
  [SubfractionType.MASTER_FBI]: SubfractionTypeRus.MASTER_FBI,
  [SubfractionType.MASTER_SWAT]: SubfractionTypeRus.MASTER_SWAT,
}

const currentId = ref(professionals.subfractions[0]?.id ?? '')

const currentSubfraction = computed(() =>
  professionals.subfractions.find((s) => s.id === currentId.value) ?? null,
)
</script>

<template>
  <div class="professionalsPage">
    <div class="switcher">
      <button
        v-for="sub in professionals.subfractions"
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
      :faction-name="professionals.name"
    />
  </div>
</template>

<style scoped>
.professionalsPage {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.switcher {
  display: flex;
  flex-direction: row;
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
  transition: background-color 0.15s;
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
