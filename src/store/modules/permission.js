import { constantRoutes, asyncRouterMap } from '@/router'

export default {
  namespaced: true,
  state: {
    routers: constantRoutes,
    addRouters: []
  },
  mutations: {
    SET_ROUTES (state, role) {
      // 根据权限过滤页面
      let add = asyncRouterMap.filter(router => {
        return router.children.some(element => element.meta.roles.indexOf(role) !== -1)
      })
      state.addRouters = add
      state.routers = constantRoutes.concat(add)
    }
  }
}