import { createRouter, createWebHashHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Appointments from '../views/Appointments.vue'
import Billing from '../views/Billing.vue'
import Personnel from '../views/Personnel.vue'
import Rooms from '../views/Rooms.vue'
import Reports from '../views/Reports.vue'
import Settings from '../views/Settings.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/dashboard',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: Dashboard }
    ]
  },
  {
    path: '/patients',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('../views/patients/index.vue') },
      { path: 'add', component: () => import('../views/patients/add.vue') },
      { path: ':id', component: () => import('../views/patients/view.vue') }
    ]
  },
  {
    path: '/hospitalizations',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('../views/hospitalization/index.vue') },
      { path: ':id', component: () => import('../views/hospitalization/view.vue') },
      { path: ':id/edit', component: () => import('../views/hospitalization/edit.vue') }
    ]
  },
  {
    path: '/appointments',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: Appointments }
    ]
  },
  {
    path: '/billing',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: Billing }
    ]
  },
  {
    path: '/doctors',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: Personnel }
    ]
  },
  {
    path: '/rooms',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: Rooms }
    ]
  },
  {
    path: '/reports',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: Reports }
    ]
  },
  {
    path: '/settings',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: Settings }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

function isAuthenticated() {
  return !!localStorage.getItem('proclinic-auth')
}

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return next('/login')
  }

  if (to.path === '/login' && isAuthenticated()) {
    return next('/dashboard')
  }

  next()
})

export default router
