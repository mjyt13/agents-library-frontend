import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import * as AppModule from './App.vue'
import router from './router'

const App = AppModule.default

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
