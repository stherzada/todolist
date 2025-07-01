export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated, initAuth, getCurrentToken } = useAuth()
  if (process.client) {
    initAuth()
  }
  
  const currentToken = getCurrentToken()
  
  if (isAuthenticated.value && currentToken) {
    return navigateTo('/')
  }
}) 