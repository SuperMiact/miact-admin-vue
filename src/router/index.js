import Vue from 'vue'
import Router from 'vue-router'
import NProcess from 'nprogress'
import 'nprogress/nprogress.css'
import Cookies from 'js-cookie'

import home from '@/views/home'
import login from '@/views/login'

// 去掉右上角的圆圈
NProcess.configure({showSpinner:false})

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        info: '首页'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        showNav: true
      }
    },
    {
      path: '/personInfo',
      name: 'personInfo',
      component: () => import('@/views/system/personInfo'),
      meta: {
        info: '个人信息'
      }
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('@/views/system/menu'),
      meta: {
        info: '菜单配置'
      }
    },
    {
      path: '/role',
      name: 'role',
      component: () => import('@/views/system/role'),
      meta: {
        info: '角色配置'
      }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/system/user'),
      meta: {
        info: '用户配置'
      }
    },
    {
      path: '/dictType',
      name: 'dictType',
      component: () => import('@/views/system/dict'),
      meta: {
        info: '字典配置'
      }
    },
    {
      path: '/dictItem',
      name: 'dictItem',
      component: () => import('@/views/system/dict/dictItem'),
      meta: {
        info: '字典项配置'
      }
    }
  ]
})

// 拦截请求
router.beforeEach((to, from, next) => {
  NProcess.start() // 进度条开始
  // 如果访问的是登录界面则直接放行
  if (to.path === '/login') {
    return next()
  }
  // 获取用户页面token信息
  let token = Cookies.get('Auth-Token')

  if (token===''&&token===undefined&&token===null) {
    return next('/login')
  }

  return next()
})
router.afterEach(() => {
  NProcess.done()// 页面跳转完成，关闭进度条
})

export default router
