import { createRouter, createWebHistory } from 'vue-router'
import { isLoggedIn } from '@/utils/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false, title: '登录' }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true, title: '仪表盘' }
  },
  {
    path: '/',
    redirect: '/dashboard'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title || 'Vue登录系统'
  
  // 检查是否需要登录
  if (to.meta.requiresAuth) {
    if (isLoggedIn()) {
      next()
    } else {
      next('/login')
    }
  } else {
    // 如果已登录且要去登录页，跳转到仪表盘
    if (to.path === '/login' && isLoggedIn()) {
      next('/dashboard')
    } else {
      next()
    }
  }
})

export default router