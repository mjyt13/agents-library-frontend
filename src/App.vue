<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="appShell">
    <header>
      <RouterLink class="brand" to="/">
        <img alt="CS2 Agents Library" class="logo" src="@/assets/logo.png" width="72" height="72" />
        <div class="brandText">
          <strong>CS2 Agents Library</strong>
          <span>Фракции, подфракции и голосовые линии агентов</span>
        </div>
      </RouterLink>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/professionals">Professionals</RouterLink>
        <RouterLink to="/sabre">Sabre</RouterLink>
        <RouterLink to="/elite-crew">Elite Crew</RouterLink>
        <RouterLink to="/swat-fbi">SWAT/FBI</RouterLink>
        <RouterLink to="/fbi-old">FBI (old)</RouterLink>
        <RouterLink to="/sas">SAS</RouterLink>
        <RouterLink to="/gsg-9">GSG-9</RouterLink>
        <RouterLink to="/gign">GIGN</RouterLink>
        <RouterLink to="/idf">IDF</RouterLink>
        <RouterLink to="/phoenix">Phoenix</RouterLink>
        <RouterLink to="/separatist">Separatist</RouterLink>
        <RouterLink to="/anarchist">Anarchist</RouterLink>
        <RouterLink to="/gandarmerie">Gendarmerie</RouterLink>
        <RouterLink to="/guerilla">Guerilla</RouterLink>
        <RouterLink to="/pirate">Pirate</RouterLink>
        <RouterLink to="/seal">SEAL</RouterLink>
        <RouterLink to="/seal-frogman">SEAL Frogman</RouterLink>
      </nav>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
.appShell {
  min-height: 100vh;
}

header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  line-height: 1.5;
}

.logo {
  flex-shrink: 0;
}

.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: inherit;
  text-decoration: none;
}

.brandText {
  display: flex;
  flex-direction: column;
}

.brandText strong {
  font-size: 1.25rem;
}

.brandText span {
  color: #666;
  font-size: 0.95rem;
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

nav a.router-link-exact-active {
  color: #fff;
  background: #222;
}

nav a.router-link-exact-active:hover {
  background-color: #222;
}

nav a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.45rem 0.9rem;
  border: 1px solid #d2d2d2;
  border-radius: 999px;
  color: inherit;
  text-decoration: none;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
}

nav a:hover {
  border-color: #999;
  background: #f4f4f4;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 2rem 1rem;
  }

  nav {
    font-size: 1rem;
  }
}
</style>
