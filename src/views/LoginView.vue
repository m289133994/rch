<template>
  <div class="login-container">
    <div class="login-card">
      <div class="brand-header">
        <div class="logo-wrapper">
          <i class="fas fa-gem logo-icon"></i>
        </div>
        <h2 class="title">Welcome Back</h2>
        <p class="subtitle">登录以探索无限可能</p>
      </div>

      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="input-group" :class="{ 'input-error': errors.username }">
          <div class="input-icon">
            <i class="fas fa-user-astronaut"></i>
          </div>
          <input 
            type="text" 
            v-model="form.username" 
            placeholder="用户名 / 邮箱"
            autocomplete="username"
            @input="clearError('username')"
          >
        </div>
        <div v-if="errors.username" class="error-message">
          <i class="fas fa-exclamation-circle"></i> {{ errors.username }}
        </div>

        <div class="input-group" :class="{ 'input-error': errors.password }">
          <div class="input-icon">
            <i class="fas fa-key"></i>
          </div>
          <input 
            :type="showPassword ? 'text' : 'password'" 
            v-model="form.password" 
            placeholder="密码"
            autocomplete="current-password"
            @input="clearError('password')"
          >
          <button type="button" class="toggle-password" @click="togglePasswordVisibility">
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>
        <div v-if="errors.password" class="error-message">
          <i class="fas fa-exclamation-circle"></i> {{ errors.password }}
        </div>

        <div class="form-options">
          <label class="checkbox-label">
            <input type="checkbox" v-model="form.rememberMe">
            <span class="checkmark"></span>
            <span class="checkbox-text">记住此设备</span>
          </label>
          <a href="#" class="forgot-link" @click.prevent="handleForgotPassword">找回密码?</a>
        </div>

        <button type="submit" class="login-btn" :disabled="loading">
          <span v-if="loading" class="spinner"></span>
          <span v-else><i class="fas fa-arrow-right-to-bracket"></i> 安全登录</span>
          <span v-if="loading">验证中...</span>
        </button>

        <div v-if="globalError" class="global-error-message">
          <i class="fas fa-circle-exclamation"></i> {{ globalError }}
        </div>
      </form>

      <div class="signup-prompt">
        首次造访？
        <a href="#" @click.prevent="handleSignup" class="signup-link">创建新账户 →</a>
      </div>

      <div class="demo-hint">
        <i class="fas fa-flask"></i> 体验账号: <strong>admin</strong> / <strong>123456</strong>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'

const router = useRouter()
const userStore = useUserStore()

const form = reactive({
  username: '',
  password: '',
  rememberMe: false
})

const errors = reactive({
  username: '',
  password: ''
})

const showPassword = ref(false)
const loading = ref(false)
const globalError = ref('')

const validateForm = () => {
  let isValid = true
  errors.username = ''
  errors.password = ''

  if (!form.username.trim()) {
    errors.username = '请输入用户名或邮箱'
    isValid = false
  } else if (form.username.trim().length < 2) {
    errors.username = '用户名至少需要2个字符'
    isValid = false
  }

  if (!form.password) {
    errors.password = '密码不能为空'
    isValid = false
  } else if (form.password.length < 4) {
    errors.password = '密码长度至少4位'
    isValid = false
  }

  return isValid
}

const clearError = (field) => {
  if (errors[field]) errors[field] = ''
  if (globalError.value) globalError.value = ''
}

const handleSubmit = async () => {
  globalError.value = ''
  
  if (!validateForm()) return
  
  loading.value = true
  
  try {
    const result = await userStore.login(form)
    
    if (result.success) {
      // 登录成功，跳转到仪表盘
      router.push('/dashboard')
    } else {
      globalError.value = result.message || '登录失败，请重试'
    }
  } catch (error) {
    globalError.value = '网络异常，请稍后重试'
    console.error('登录错误:', error)
  } finally {
    loading.value = false
  }
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleForgotPassword = () => {
  alert('📧 重置密码链接已发送至您的注册邮箱')
}

const handleSignup = () => {
  alert('✨ 注册功能即将开放，欢迎关注')
}
</script>

<style scoped>
/* 样式与之前美化版类似，这里引用之前的样式 */
@import '@/assets/styles/login.css';
</style>