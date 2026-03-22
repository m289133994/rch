<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>欢迎回来，{{ userName }}！</h1>
      <button @click="handleLogout" class="logout-btn">
        <i class="fas fa-sign-out-alt"></i> 退出登录
      </button>
    </div>
    <div class="dashboard-content">
      <div class="info-card">
        <h3>用户信息</h3>
        <p><strong>用户名:</strong> {{ userInfo?.username || userInfo?.name }}</p>
        <p><strong>邮箱:</strong> {{ userInfo?.email || '未设置' }}</p>
        <p><strong>角色:</strong> {{ userInfo?.role || '普通用户' }}</p>
      </div>
      <div class="info-card">
        <h3>系统状态</h3>
        <p>登录状态: <span class="status-badge success">已登录</span></p>
        <p>API 地址: {{ apiBaseUrl }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'

const router = useRouter()
const userStore = useUserStore()

const userName = computed(() => userStore.userInfo?.name || userStore.userInfo?.username || '用户')
const userInfo = computed(() => userStore.userInfo)
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.dashboard-header {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.dashboard-header h1 {
  color: #1e293b;
  margin: 0;
}

.logout-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
}

.logout-btn:hover {
  background: #dc2626;
  transform: translateY(-2px);
}

.dashboard-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.info-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.info-card h3 {
  color: #667eea;
  margin-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

.info-card p {
  margin: 0.5rem 0;
  color: #475569;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-badge.success {
  background: #10b981;
  color: white;
}
</style>