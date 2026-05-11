import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SteveView from '@/views/SteveView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/steve',
      name: 'steve',
      component: SteveView,
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
  ],
})

export default router
