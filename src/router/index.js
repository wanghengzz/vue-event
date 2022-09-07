import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'user-info',
        component: () => import('@/views/user/userInfo')
      },
      {
        path: 'user-avatar',
        component: () => import('@/views/user/userAvatar')
      },
      {
        path: 'user-pwd',
        component: () => import('@/views/user/userPwd')
      },
      {
        path: 'art-cate',
        component: () => import('@/views/article/artCate')
      },
      {
        path: 'art-list',
        component: () => import('@/views/article/artList')
      }
    ]
  },
  {
    path: '/reg',
    component: () => import('@/views/register')
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

const whiteList = ['/login', '/reg']

router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token) {
    // 如果有token, 证明已登录
    if (!store.state.userInfo.username) {
      store.dispatch('initUserInfo')
    }
    next() // 路由放行
  } else {
    // 如果无token
    // 如果去的是白名单页面, 则放行
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 如果其他页面请强制拦截并跳转到登录页面
      next('/login')
    }
  }
})

export default router
