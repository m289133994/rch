// 存储token
export const setToken = (token, remember = false) => {
  if (remember) {
    localStorage.setItem('token', token)
  } else {
    sessionStorage.setItem('token', token)
  }
}

// 获取token
export const getToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token')
}

// 移除token
export const removeToken = () => {
  localStorage.removeItem('token')
  sessionStorage.removeItem('token')
}

// 存储用户信息
export const setUserInfo = (userInfo, remember = false) => {
  const storage = remember ? localStorage : sessionStorage
  storage.setItem('userInfo', JSON.stringify(userInfo))
}

// 获取用户信息
export const getUserInfo = () => {
  const userInfo = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo')
  return userInfo ? JSON.parse(userInfo) : null
}

// 清除用户信息
export const clearUserInfo = () => {
  localStorage.removeItem('userInfo')
  sessionStorage.removeItem('userInfo')
}

// 检查是否登录
export const isLoggedIn = () => {
  return !!getToken()
}