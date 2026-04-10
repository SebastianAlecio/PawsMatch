import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/filtros',
      name: 'filtros',
      component: () => import('../views/FiltrosView.vue'),
    },
    {
      path: '/matches',
      name: 'matches',
      component: () => import('../views/MatchesView.vue'),
    },
    {
      path: '/matches/:id',
      name: 'pet-detail',
      component: () => import('../views/PetDetailView.vue'),
      props: true,
    },
  ],
})

export default router
