import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  let userInfo = store.state.user.userInfo

  if (whiteList.indexOf(to.path) === -1) {
    if (!userInfo) {
      try {
        userInfo = await store.dispatch('user/getInfo')
        next()
      } catch(err) {
        next(`/login`)
      }
    }

    store.commit('permission/SET_ROUTES', userInfo.level)       // 根据权限判断页面路由的显示
    console.log(store.state.permission.addRouters) 
    router.addRoutes(store.state.permission.addRouters)        
  }
  next()
 
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
