import { defineStore } from 'pinia'
import { login as loginApi, getUserInfo as getUserInfoApi } from '@/api/auth'
import { setToken, removeToken, setUserInfo, clearUserInfo } from '@/utils/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    userInfo: null,
    permissions: []
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.token,
    userName: (state) => state.userInfo?.name || ''
  },
  
  actions: {
    // 登录
    async login(loginForm) {
      try {
        const res = await loginApi({
          username: loginForm.username,
          password: loginForm.password
        })
        
        if (res.code === 200) {
          const { token, userInfo } = res.data
          // 存储token
          this.token = token
          setToken(token, loginForm.rememberMe)
          
          // 存储用户信息
          this.userInfo = userInfo
          setUserInfo(userInfo, loginForm.rememberMe)
          
          return { success: true, data: res.data }
        } else {
          return { success: false, message: res.message }
        }
      } catch (error) {
        return { 
          success: false, 
          message: error.message || '登录失败，请检查网络'
        }
      }
    },
    
    // 登出
    logout() {
      this.token = null
      this.userInfo = null
      removeToken()
      clearUserInfo()
    },
    
    // 获取用户信息
    async fetchUserInfo() {
      try {
        const res = await getUserInfoApi()
        if (res.code === 200) {
          this.userInfo = res.data
          return res.data
        }
      } catch (error) {
        console.error('获取用户信息失败:', error)
      }
    }
  }
})