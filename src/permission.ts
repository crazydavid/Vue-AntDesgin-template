import router from '@/router/index'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 全局路由守卫
router.beforeEach((to, from, next) => {
  Nprogress.start()
  next()
})

router.afterEach((to, form) => {
  Nprogress.done()
})
