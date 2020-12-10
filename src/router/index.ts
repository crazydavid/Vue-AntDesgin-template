// eslint-disable-next-line
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BasicLayout from '@/layout/BasicLayout/index.vue'
import UserLayout from '@/layout/UserLayout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: BasicLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }, {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/user/Login.vue')
      }
      // {
      //   path: 'register',
      //   name: 'register',
      //   component: () => import('@/views/user/Register')
      // },
      // {
      //   path: 'register-result',
      //   name: 'registerResult',
      //   component: () => import('@/views/user/RegisterResult')
      // }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
