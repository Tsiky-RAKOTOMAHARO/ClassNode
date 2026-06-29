import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore.js'
import LoginView from '../views/LoginView.vue'
import ListView from '../views/ListView.vue'
import CreateView from '../views/CreateView.vue'
import StatView from '../views/StatView.vue'
import AppShell from '@/layouts/AppShell.vue'

const routes = [
  {
    path: '/login',
    component: LoginView,
    meta: { public: true }
  },
  {
    path: '/',
    component: AppShell,
    meta: { requiresAuth: true },
    redirect: '/list',         
    children: [
      { path: 'list', component: ListView },
      { path: 'create', component: CreateView },
      { path: 'stats', component: StatView },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const auth = useAuthStore()   

  if (to.meta.requiresAuth && !auth.isAuthenticated)  {
    return '/login'
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated)  {
    return '/'
  }
})

export default router