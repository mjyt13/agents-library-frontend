<script setup lang="ts">
import { useI18nStore } from '@/stores/i18n'

const i18nStore = useI18nStore()
</script>

<template>
  <div class="notFound">
    <h1>{{ i18nStore.getMessage.common.pageNotFound }}</h1>
    <RouterLink to="/" class="notFound__link">
      {{ i18nStore.getMessage.common.backHome }}
    </RouterLink>
  </div>
</template>

<style scoped>
.notFound {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem 1rem;
  text-align: center;
}

.notFound h1 {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-text);
}

.notFound__link {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-accent);
  text-decoration: none;
}
</style>
