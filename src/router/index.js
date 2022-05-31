import Vue from 'vue'
import Router from 'vue-router'

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

// 使用懒加载
const routerStudy = () => import('@/views/elementui/routerStudy')

Vue.use(Router)

const router =  new Router({
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
      path: '/templateStudy',
      name: 'templateStudy',
      component: templateStudy,
      meta: {
        info: '模板'
      }
    },
    {
      path: '/dateStudy',
      name: 'dateStudy',
      component: dateStudy,
      meta: {
        info: '日期学习'
      }
    },
    {
      path: '/transferStudy',
      name: 'transferStudy',
      component: transferStudy
    },
    {
      path: '/radioStudy',
      name: 'radioStudy',
      component: radioStudy
    },
    {
      path: '/inputStudy',
      name: 'inputStudy',
      component: inputStudy,
      meta: {
        info: '输入框学习'
      }
    },
    {
      path: '/inputNumberStudy',
      name: 'inputNumberStudy',
      component: inputNumberStudy
    },
    {
      path: '/selectStudy',
      name: 'selectStudy',
      component: selectStudy
    },
    {
      path: '/uploadStudy',
      name: 'uploadStudy',
      component: uploadStudy
    },
    {
      path: '/treeStudy',
      name: 'treeStudy',
      component: treeStudy,
      meta: {
        info: '树形组件学习'
      }
    },
    {
      path: '/cardStudy',
      name: 'cardStudy',
      component: cardStudy
    },
    {
      path: '/formStudy',
      name: 'formStudy',
      component: formStudy
    },
    {
      path: '/messageStudy',
      name: 'messageStudy',
      component: messageStudy
    },
    {
      path: '/routerStudy',
      name: 'routerStudy',
      component: routerStudy
    },
    {
      path: '/loadingStudy',
      name: 'loadingStudy',
      component: loadingStudy
    },
    {
      path: '/tableStudy',
      name: 'tableStudy',
      component: tableStudy
    }
  ]
})

export default router