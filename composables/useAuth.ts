interface User {
  id: string
  email: string
  nome: string
}
interface AuthResponse {
  success: boolean
  user?: User
  message: string
  token?: string
}

const DUMMY_TOKEN_PREFIX = 'dummy_token_'
const TOKEN_KEY = 'todolist_auth_token'
const USER_KEY = 'todolist_user'

export const useAuth = () => {
  const user = useState<User | null>('user', () => null)
  const token = useState<string | null>('token', () => null)
  const isAuthenticated = computed(() => !!user.value && !!token.value)

  const generateDummyToken = (userId: string): string => {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2)
    return `${DUMMY_TOKEN_PREFIX}${userId}_${timestamp}_${random}`
  }

  const saveAuthData = (userData: User, authToken: string) => {
    if (process.client) {
      localStorage.setItem(TOKEN_KEY, authToken)
      localStorage.setItem(USER_KEY, JSON.stringify(userData))
    }
    user.value = userData
    token.value = authToken
  }

  const loadAuthData = () => {
    if (process.client) {
      const savedToken = localStorage.getItem(TOKEN_KEY)
      const savedUser = localStorage.getItem(USER_KEY)
      if (savedToken && savedUser) {
          const userData = JSON.parse(savedUser)
          if (savedToken.startsWith(DUMMY_TOKEN_PREFIX)) {
            user.value = userData
            token.value = savedToken
            return true
          }
        } 
    }
    return false
  }

  const clearAuthData = () => {
    if (process.client) {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    }
    user.value = null
    token.value = null
  }

  const validateToken = (authToken: string): boolean => {
    return authToken.startsWith(DUMMY_TOKEN_PREFIX)
  }

  const getCurrentToken = (): string | null => {
    return token.value
  }

  const login = async (email: string, senha: string): Promise<AuthResponse> => {
      const response = await $fetch<AuthResponse>('/api/auth/login', {
        method: 'POST',
        body: { email, senha }
      })

      if (response.success && response.user) {
        const dummyToken = generateDummyToken(response.user.id)
        saveAuthData(response.user, dummyToken)
        return { 
          success: true, 
          message: response.message,
          token: dummyToken
        }
      }
      return { success: false, message: 'Erro ao fazer login' }
    } 
  

  const register = async (nome: string, email: string, senha: string): Promise<AuthResponse> => {
   
      const response = await $fetch<AuthResponse>('/api/auth/register', {
        method: 'POST',
        body: { nome, email, senha }
      })

      if (response.success && response.user) {
        const dummyToken = generateDummyToken(response.user.id)
        saveAuthData(response.user, dummyToken)
        return { 
          success: true, 
          message: response.message,
          token: dummyToken
        }
      }
      
      return { success: false, message: 'Erro ao registrar usuário' }
  }

  const logout = () => {
    clearAuthData()
  }

  const initAuth = () => {
    if (process.client) {
      loadAuthData()
    }
  }

  return {
    user: readonly(user),
    token: readonly(token),
    isAuthenticated,
    login,
    register,
    logout,
    initAuth,
    validateToken,
    getCurrentToken
  }
} 