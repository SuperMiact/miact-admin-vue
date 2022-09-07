import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'
import NProcess from 'nprogress'
import 'nprogress/nprogress.css'

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
      component: () => import('@/views/system/personInfo/index'),
      meta: {
        info: '个人信息'
      }
    },
    {
      path: '/templateStudy',
      name: 'templateStudy',
      component: () => import('@/views/elementui/templateStudy'),
      meta: {
        info: '模板组件'
      }
    },
    {
      path: '/dateStudy',
      name: 'dateStudy',
      component: () => import('@/views/elementui/dateStudy'),
      meta: {
        info: '日期组件'
      }
    },
    {
      path: '/transferStudy',
      name: 'transferStudy',
      component: () => import('@/views/elementui/transferStudy'),
      meta: {
        info: '穿梭框组件'
      }
    },
    {
      path: '/radioStudy',
      name: 'radioStudy',
      component: () => import('@/views/elementui/radioStudy'),
      meta: {
        info: '单选框组件'
      }
    },
    {
      path: '/inputStudy',
      name: 'inputStudy',
      component: () => import('@/views/elementui/inputStudy'),
      meta: {
        info: '输入框组件'
      }
    },
    {
      path: '/inputNumberStudy',
      name: 'inputNumberStudy',
      component: () => import('@/views/elementui/inputNumberStudy'),
      meta: {
        info: '数字输入框组件'
      }
    },
    {
      path: '/selectStudy',
      name: 'selectStudy',
      component: () => import('@/views/elementui/selectStudy'),
      meta: {
        info: '下拉选择框组件'
      }
    },
    {
      path: '/uploadStudy',
      name: 'uploadStudy',
      component: () => import('@/views/elementui/uploadStudy'),
      meta: {
        info: '上传组件'
      }
    },
    {
      path: '/treeStudy',
      name: 'treeStudy',
      component: () => import('@/views/elementui/treeStudy'),
      meta: {
        info: '树形组件'
      }
    },
    {
      path: '/cardStudy',
      name: 'cardStudy',
      component: () => import('@/views/elementui/cardStudy'),
      meta: {
        info: '卡片组件'
      }
    },
    {
      path: '/formStudy',
      name: 'formStudy',
      component: () => import('@/views/elementui/formStudy'),
      meta: {
        info: '表单组件'
      }
    },
    {
      path: '/messageStudy',
      name: 'messageStudy',
      component: () => import('@/views/elementui/messageStudy'),
      meta: {
        infl: '消息组件'
      }
    },
    {
      path: '/routerStudy',
      name: 'routerStudy',
      component: () => import('@/views/elementui/routerStudy')
    },
    {
      path: '/loadingStudy',
      name: 'loadingStudy',
      component: () => import('@/views/elementui/loadingStudy'),
      meta: {
        info: '加载组件'
      }
    },
    {
      path: '/tableStudy',
      name: 'tableStudy',
      component: () => import('@/views/elementui/tableStudy'),
      meta: {
        info: '表格组件'
      }
    },
    {
      path: '/timeLineStudy',
      name: 'timeLineStudy',
      component: () => import('@/views/elementui/timeLineStudy'),
      meta: {
        info: '时间线组件'
      }
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('@/views/system/menu/index'),
      meta: {
        info: '菜单配置'
      }
    },
    {
      path: '/role',
      name: 'role',
      component: () => import('@/views/system/role/index'),
      meta: {
        info: '角色配置'
      }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/system/user/index'),
      meta: {
        info: '用户配置'
      }
    }
  ]
})

// 拦截请求
router.beforeEach((to, from, next) => {
  NProcess.start(); //进度条开始
  // 如果访问的是登录界面则直接放行
  if (to.path === '/login') return next()
  // 获取用户页面token信息
  let token = window.sessionStorage.getItem('token')

  if (!token) {
    if (to.path !== '/home') {
      Message.error('请重新登录！')
    }
    return next('/login')
  }

  return next()
})
router.afterEach((to,from)=>{
  NProcess.done();//页面跳转完成，关闭进度条
})

export default router
