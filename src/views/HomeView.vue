<template>
  <main class="homeView">
    <section class="hero">
      <p class="eyebrow">CS2 Agents Library</p>
      <h1>Слушай голосовые линии по фракциям и подфракциям.</h1>
      <p class="lead">
        Сейчас библиотека собирается вокруг архитектуры фракций: можно открыть нужную сторону,
        переключиться между подфракциями и послушать реплики конкретных агентов.
      </p>
    </section>

    <section class="factions">
      <RouterLink class="factionCard" to="/professionals">
        <strong>Professionals</strong>
        <span>Женские и мастерские подфракции с уже собранной структурой голосов.</span>
      </RouterLink>

      <RouterLink class="factionCard" to="/sabre">
        <strong>Sabre</strong>
        <span>Новая фракция с подфракциями `male` и `master`, агентами и подключёнными озвучками.</span>
      </RouterLink>
      <RouterLink class="factionCard" to="/elite-crew">
        <strong>Elite Crew</strong>
        <span>Leet-подфракции `male` и `master` с новыми файлами озвучки и привязанными агентами.</span>
      </RouterLink>

      <RouterLink class="factionCard" to="/swat-fbi">
        <strong>SWAT/FBI</strong>
        <span>Объединённая страница для `swat_fem`, `swat_male`, `master_fbi` и `master_swat`.</span>
      </RouterLink>
      <RouterLink class="factionCard" to="/fbi-old">
        <strong>FBI (old)</strong>
        <span>Legacy FBI voice lines collected on a dedicated faction page.</span>
      </RouterLink>

      <RouterLink class="factionCard" to="/sas">
        <strong>SAS</strong>
        <span>British counter-terror faction with its own voice pack and subfraction page.</span>
      </RouterLink>

      <RouterLink class="factionCard" to="/gsg-9">
        <strong>GSG-9</strong>
        <span>German faction page with separate audio records and agent preview.</span>
      </RouterLink>
    </section>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.homeView {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 1rem 3rem;
}

.hero {
  max-width: 760px;
}

.eyebrow {
  margin: 0 0 0.5rem;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #666;
}

.hero h1 {
  margin: 0 0 1rem;
  font-size: clamp(2rem, 4vw, 3.4rem);
  line-height: 1.05;
}

.lead {
  margin: 0;
  max-width: 60ch;
  font-size: 1.05rem;
  line-height: 1.6;
  color: #444;
}

.factions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.factionCard {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem;
  border: 1px solid #d8d8d8;
  border-radius: 14px;
  color: inherit;
  text-decoration: none;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(244, 244, 244, 0.96)),
    linear-gradient(135deg, rgba(17, 17, 17, 0.04), rgba(17, 17, 17, 0));
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease;
}

.factionCard:hover {
  transform: translateY(-2px);
  border-color: #999;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
}

.factionCard strong {
  font-size: 1.15rem;
}

.factionCard span {
  line-height: 1.5;
  color: #555;
}
</style>
