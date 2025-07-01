export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated, initAuth, getCurrentToken } = useAuth()
  
  if (process.client) {
    initAuth()
    
    const hasStoredAuth = () => {
      if (process.client) {
        const token = localStorage.getItem('todolist_auth_token')
        const user = localStorage.getItem('todolist_user')
        return !!(token && user && token.startsWith('dummy_token_'))
      }
      return false
    }
    
    if (!hasStoredAuth()) {
      return navigateTo('/login')
    }
    
    const currentToken = getCurrentToken()
    if (isAuthenticated.value && currentToken) {
      return
    }
    
    return new Promise((resolve) => {
      nextTick(() => {
        const currentToken = getCurrentToken()
        if (isAuthenticated.value && currentToken) {
          resolve()
        } else {
          resolve(navigateTo('/login'))
        }
      })
    })
  }
  
  return navigateTo('/login')
}) 