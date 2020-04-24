import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/moduleList',
    children: [{
      path: 'moduleList',
      name: 'ModuleList',
      component: () => import('@/views/module/module_list/index'),
      meta: { title: '模块列表', icon: 'dashboard' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

export const asyncRouterMap = [
  {
    path: '/addModule',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'AddModule',
        component: () => import('@/views/module/add_module/index'),
        meta: { 
          title: '添加模块',
          icon: 'form',
          roles: [1]
        }
      }
    ]
  },

  {
    path: '/account',
    component: Layout,
    redirect: '/account/addAccount',
    meta: { title: '账户管理', icon: 'user' },
    children: [
      {
        path: '/addAccount',
        name: 'AddAccount',
        component: () => import('@/views/account/add_account/index'),
        meta: {
          title: '添加账户',
          icon: 'form',
          roles: [1]
        }
      },
      {
        path: '/accountList',
        name: 'AccountList',
        component: () => import('@/views/account/account_list/index'),
        meta: {
          title: '账户列表',
          icon: 'form',
          roels: [1]
        }
      }
    ]
  },

  {
    path: '/deploy',
    component: Layout,
    children: [{
      path: 'list',
      name: 'DeployList',
      component: () => import('@/views/deploy/deploy_list/index'),
      meta: {
        title: '部署列表',
        icon: 'form',
        roles: [1]
      }
    }]
  },
]