import Vue from 'vue'
import Router from 'vue-router'
import NProcess from 'nprogress'
import 'nprogress/nprogress.css'
import Cookies from 'js-cookie'
import {getMenuAll} from '@/api/system/menu'

// 去掉右上角的圆圈
NProcess.configure({showSpinner:false})

Vue.use(Router)

/**
 * 静态路由
 */
// export const constantRoutes = [{
//   path: '/redirect',
//   component: Layout,
//   hidden: true,
//   children: [{
//     path: '/redirect/:path(.*)',
//     component: () => import('@/views/redirect/index')
//   }]
// },
// {
//   path: '/login',
//   component: () => import('@/views/login/index'),
//   hidden: true
// },
// {
//   path: '/auth-redirect',
//   component: () => import('@/views/login/auth-redirect'),
//   hidden: true
// },
// {
//   path: '/404',
//   component: () => import('@/views/error-page/404'),
//   hidden: true
// },
// {
//   path: '/401',
//   component: () => import('@/views/error-page/401'),
//   hidden: true
// },
// {
//   path: '/',
//   component: Layout,
//   redirect: '/dashboard',
//   children: [{
//     path: 'dashboard',
//     component: () => import('@/views/dashboard/index'),
//     name: 'Dashboard',
//     meta: {
//       title: '仪表板',
//       icon: 'dashboard',
//       affix: true
//     }
//   }]
// },
// ]

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
      component:() => import('@/views/home'),
      meta: {
        info: '首页'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/system/login'),
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
      path: '/dictItem',
      name: 'dictItem',
      component: () => import('@/views/system/dict/dictItem'),
      meta: {
        info: '字典项配置'
      }
    }
  ]
})

// 动态生成路由
getMenuAll().then(response =>{ 
  let tempRoutes = response.results;  // 后端返回的路由数据
  const routes = !!tempRoutes && tempRoutes.length > 0 ? tempRoutes.filter(v=>!!v.url&&!!v.componentAddress) : []

  // 动态生成路由
  routes.forEach(route => {
    const { url, name, componentAddress } = route;
    const routeConfig = {
      path:url,
      name,
      component: () => import(`@/views/${componentAddress}`)  // 根据组件名称动态加载组件
    };
    console.log(routeConfig)
    router.addRoute(routeConfig);
  });
})
.catch(error => {
  console.error(error);
});


// 拦截请求
router.beforeEach((to, from, next) => {
  NProcess.start() // 进度条开始
  // 如果访问的是登录界面则直接放行
  if (to.path === '/login') {
    return next()
  }
  // 获取用户页面token信息
  let token = Cookies.get('Auth-Token')

  if (!token) {
    return next('/login')
  }

  return next()
})
router.afterEach(() => {
  NProcess.done()// 页面跳转完成，关闭进度条
})

export default router
