import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/professionals',
      name: 'professionals',
      component: () => import('@/views/ProfessionalsView.vue'),
    },
    {
      path: '/sabre',
      name: 'sabre',
      component: () => import('@/views/SabreView.vue'),
    },
    {
      path: '/elite-crew',
      name: 'elite-crew',
      component: () => import('@/views/EliteCrewView.vue'),
    },
    {
      path: '/swat-fbi',
      name: 'swat-fbi',
      component: () => import('@/views/FbiSwatView.vue'),
    },
    {
      path: '/fbi-old',
      name: 'fbi-old',
      component: () => import('@/views/FbiOldView.vue'),
    },
    {
      path: '/sas',
      name: 'sas',
      component: () => import('@/views/SasView.vue'),
    },
    {
      path: '/gsg-9',
      name: 'gsg-9',
      component: () => import('@/views/Gsg9View.vue'),
    },
    {
      path: '/anarchist',
      name: 'anarchist',
      component: () => import('@/views/AnarchistView.vue'),
    },
    {
      path: '/gign',
      name: 'gign',
      component: () => import('@/views/GignView.vue'),
    },
    {
      path: '/idf',
      name: 'idf',
      component: () => import('@/views/IdfView.vue'),
    },
    {
      path: '/phoenix',
      name: 'phoenix',
      component: () => import('@/views/PhoenixView.vue'),
    },
    {
      path: '/separatist',
      name: 'separatist',
      component: () => import('@/views/SeparatistView.vue'),
    },
    {
      path: '/gandarmerie',
      name: 'gandarmerie',
      component: () => import('@/views/GandarmerieView.vue'),
    },
    {
      path: '/guerilla',
      name: 'guerilla',
      component: () => import('@/views/GuerillaView.vue'),
    },
    {
      path: '/pirate',
      name: 'pirate',
      component: () => import('@/views/PirateView.vue'),
    },
    {
      path: '/seal',
      name: 'seal',
      component: () => import('@/views/SealView.vue'),
    },
    {
      path: '/seal-frogman',
      name: 'seal-frogman',
      component: () => import('@/views/SealFrogmanView.vue'),
    },
    {
      path: '/crop-inspector',
      name: 'crop-inspector',
      component: () => import('@/views/CropInspectorView.vue'),
    },
  ],
})

export default router
