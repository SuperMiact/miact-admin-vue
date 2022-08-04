import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'

import templateStudy from '@/views/elementui/templateStudy'
import dateStudy from '@/views/elementui/dateStudy'
import transferStudy from '@/views/elementui/transferStudy'
import radioStudy from '@/views/elementui/radioStudy'
import inputStudy from '@/views/elementui/inputStudy'
import inputNumberStudy from '@/views/elementui/inputNumberStudy'
import selectStudy from '@/views/elementui/selectStudy'
import uploadStudy from '@/views/elementui/uploadStudy'
import treeStudy from '@/views/elementui/treeStudy'
import cardStudy from '@/views/elementui/cardStudy'
import formStudy from '@/views/elementui/formStudy'
import messageStudy from '@/views/elementui/messageStudy'
import loadingStudy from '@/views/elementui/loadingStudy'
import tableStudy from '@/views/elementui/tableStudy'
import home from '@/views/home'
import login from '@/views/login'
import menu from '@/components/sysAdmin/menu'

// 使用懒加载
const routerStudy = () => import('@/views/elementui/routerStudy')

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
      path: '/templateStudy',
      name: 'templateStudy',
      component: templateStudy,
      meta: {
        info: '模板组件'
      }
    },
    {
      path: '/dateStudy',
      name: 'dateStudy',
      component: dateStudy,
      meta: {
        info: '日期组件'
      }
    },
    {
      path: '/transferStudy',
      name: 'transferStudy',
      component: transferStudy,
      meta: {
        info: '穿梭框组件'
      }
    },
    {
      path: '/radioStudy',
      name: 'radioStudy',
      component: radioStudy,
      meta: {
        info: '单选框组件'
      }
    },
    {
      path: '/inputStudy',
      name: 'inputStudy',
      component: inputStudy,
      meta: {
        info: '输入框组件'
      }
    },
    {
      path: '/inputNumberStudy',
      name: 'inputNumberStudy',
      component: inputNumberStudy,
      meta: {
        info: '数字输入框组件'
      }
    },
    {
      path: '/selectStudy',
      name: 'selectStudy',
      component: selectStudy,
      meta: {
        info: '下拉选择框组件'
      }
    },
    {
      path: '/uploadStudy',
      name: 'uploadStudy',
      component: uploadStudy,
      meta: {
        info: '上传组件'
      }
    },
    {
      path: '/treeStudy',
      name: 'treeStudy',
      component: treeStudy,
      meta: {
        info: '树形组件'
      }
    },
    {
      path: '/cardStudy',
      name: 'cardStudy',
      component: cardStudy,
      meta: {
        info: '卡片组件'
      }
    },
    {
      path: '/formStudy',
      name: 'formStudy',
      component: formStudy,
      meta: {
        info: '表单组件'
      }
    },
    {
      path: '/messageStudy',
      name: 'messageStudy',
      component: messageStudy,
      meta: {
        infl: '消息组件'
      }
    },
    {
      path: '/routerStudy',
      name: 'routerStudy',
      component: routerStudy
    },
    {
      path: '/loadingStudy',
      name: 'loadingStudy',
      component: loadingStudy,
      meta: {
        info: '加载组件'
      }
    },
    {
      path: '/tableStudy',
      name: 'tableStudy',
      component: tableStudy,
      meta: {
        info: '表格组件'
      }
    },
    {
      path: '/menu',
      name: 'menuModel',
      component: menu,
      meta: {
        info: '菜单配置'
      }
    }
  ]
})

// 拦截请求
router.beforeEach((to, from, next) => {
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

export default router
