<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { isAuthenticated, initAuth, getCurrentToken } = useAuth()

onMounted(() => {
  if (process.client) {
    initAuth()
    const currentToken = getCurrentToken()
    if (isAuthenticated.value && currentToken) {
      navigateTo('/projects')
    }
  }
})

definePageMeta({
  middleware: 'auth'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Verificando autenticação...</p>
    </div>
  </div>
</template> 