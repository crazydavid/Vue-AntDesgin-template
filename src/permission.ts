import router from '@/router/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { usetTitle } from '@/utils/setTitle'
import { getToken, getUser, setUser } from '@/utils/common'
import store from './store'

NProgress.configure({ showSpinner: false })

const whiteList = ['/user/login', '/auth-redirect']

// 全局路由守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  usetTitle(to.meta.title)
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/user/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasUserInfo = getUser()
      if (hasUserInfo) {
        store.commit('user/SET_USER', hasUserInfo)
        next()
      } else {
        const { data, code } = await store.dispatch('user/getUserInfo')
        if (data && code === '0000') setUser('data')
        next('/user/login')
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/user/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to, form) => {
  NProgress.done()
})
