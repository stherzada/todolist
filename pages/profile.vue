<script setup lang="ts">
const message = ref('')
const isSuccess = ref(false)
const { user, logout, getCurrentToken, validateToken } = useAuth()
const router = useRouter()

const tokenPreview = computed(() => {
  const currentToken = getCurrentToken()
  if (currentToken) {
    return currentToken.substring(0, 20) + '...'
  }
  return 'Nenhum token encontrado'
})

const handleLogout = () => {
  logout()
  message.value = 'Logout realizado com sucesso'
  isSuccess.value = true
  setTimeout(() => {
    router.push('/login')
  }, 1000)
}

const refreshToken = () => {
  const currentToken = getCurrentToken()
  if (currentToken && validateToken(currentToken)) {
    message.value = 'Token válido - não é necessário atualizar'
    isSuccess.value = true
  } else {
    message.value = 'Token inválido - faça login novamente'
    isSuccess.value = false
  }
}


useHead({
  title: 'Perfil - TodoList'
})
definePageMeta({
  middleware: 'auth'
})
</script> 

<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Perfil do Usuário</h1>
            <button
              @click="handleLogout"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sair
            </button>
          </div>

          <div v-if="user" class="space-y-6">
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Informações Pessoais</h3>
              <div class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <div class="text-sm font-medium text-gray-500">Nome</div>
                  <div class="mt-1 text-sm text-gray-900">{{ user.nome }}</div>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-500">Email</div>
                  <div class="mt-1 text-sm text-gray-900">{{ user.email }}</div>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-500">ID do Usuário</div>
                  <div class="mt-1 text-sm text-gray-900">{{ user.id }}</div>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Informações de Autenticação</h3>
              <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <div class="text-sm font-medium text-gray-500">Status da Autenticação</div>
                  <div class="mt-1">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Autenticado
                    </span>
                  </div>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-500">Token Válido</div>
                  <div class="mt-1">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Sim
                    </span>
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <div class="text-sm font-medium text-gray-500">Token (Primeiros 20 caracteres)</div>
                  <div class="mt-1 text-sm text-gray-900 font-mono">
                    {{ tokenPreview }}
                  </div>
                </div>
              </dl>
            </div>

            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Ações</h3>
              <div class="space-y-3">
                <button
                  @click="refreshToken"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Atualizar Token
              </button>
              </div>
            </div>

            <div v-if="message" :class="[
              'text-sm text-center p-3 rounded-md',
              isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            ]">
              {{ message }}
            </div>
          </div>

          <div v-else class="text-center py-8">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p class="mt-4 text-gray-500">Carregando informações do usuário...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

