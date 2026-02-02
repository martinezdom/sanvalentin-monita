import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('../views/QuizGame.vue')
    },
    {
      path: '/memory',
      name: 'memory',
      component: () => import('../views/MemoryGame.vue')
    },
    {
      path: '/phrase',
      name: 'phrase',
      component: () => import('../views/PhraseGame.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

export default router
