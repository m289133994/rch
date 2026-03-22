import axios from 'axios'

// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 从localStorage获取token
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    const res = response.data
    // 根据后端返回的code判断
    if (res.code === 200 || res.code === 0) {
      return res
    } else if (res.code === 401) {
      // token过期，清除登录信息并跳转登录页
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
      window.location.href = '/login'
      return Promise.reject(new Error('未授权，请重新登录'))
    } else {
      return Promise.reject(new Error(res.message || '请求失败'))
    }
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

export default request