// eslint-disable-next-line
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BasicLayout from '@/layout/BasicLayout/index.vue'
import UserLayout from '@/layout/UserLayout.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: BasicLayout,
    redirect: '/dashboard',
    name: 'Dashboard',
    meta: { title: 'Dashboard' },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'watch',
        meta: { title: '监控室', icon: 'dashboard', affix: true }
      }
    ]
  }, {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    meta: { hidden: true, title: '用户' },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/user/Login.vue'),
        meta: { title: '登录页', icon: 'login' }
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
  },
  {
    path: '/table',
    component: BasicLayout,
    redirect: '/table/basic-list',
    name: 'Table',
    meta: { title: 'Table', icon: 'table' },
    children: [
      {
        path: 'basic-list',
        component: () => import('@/views/table/basic-list/index.vue'),
        name: 'basicList',
        meta: { title: '标准列表' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
