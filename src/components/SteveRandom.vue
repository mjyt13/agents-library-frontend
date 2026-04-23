<script setup lang="ts">
import { computed, ref } from 'vue'
import { getPhrase } from '@/interface/scripts/getPhrase'
import { phrases } from '@/interface/data/phrases'
import { getPicture } from '@/interface/scripts/getPicture'
import { pictures } from '@/interface/data/pictures'

interface Props {
  imageUrl?: string
  imageName?: string
}

const props = withDefaults(defineProps<Props>(), {
  imageUrl: undefined,
  imageName: 'убил 2 зайцев.jpg',
})

// Функция для динамического импорта изображения из assets
const getImageUrl = (imageName: string): string => {
  return new URL(`../assets/${imageName}`, import.meta.url).href
}

// Реактивная переменная для текущего имени картинки
const currentImageName = ref(props.imageName)

// Вычисляемое свойство для получения URL изображения
const imageSrc = computed(() => {
  // Используем динамический импорт из assets с текущим именем картинки
  return getImageUrl(currentImageName.value)
})

const phrase = ref('')

const newPhrase = () => {
  phrase.value = getPhrase(phrases)
}

const newPicture = () => {
  currentImageName.value = getPicture(pictures)
}
</script>

<template>
  <div class="steve">
    <img :src="imageSrc" class="twoHares" />
    <button @click="newPicture" class="newPhrase">новая картинка</button>
    <button @click="newPhrase" class="newPhrase">новая фраза</button>
    <h3>{{ phrase }}</h3>
    <h2>стив когда убил сразу 2 зайцев</h2>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.steve {
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
.steve .twoHares {
  display: flex;
  flex-shrink: 0;
  /* width: 400px; */
  height: 500px;
}

.steve .newPhrase {
  display: flex;
  flex-grow: 0;
  max-width: 50%;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background-color: aqua;
  transition: 0.5s;
}

.steve .newPhrase:hover {
  background-color: aquamarine;
  padding: 0.5rem 2rem;
}
</style>
