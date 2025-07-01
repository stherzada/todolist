<script setup lang="ts">
import { ref } from 'vue'
import { useProjects } from '~/stores/projects'

interface ProjectForm {
  nome: string
  descricao: string
  preco: number
  tipo: '' | 'Web' | 'Mobile'
  categoria: string
}

const router = useRouter()
const projectsStore = useProjects()
const loading = ref(false)
const message = ref('')
const isSuccess = ref(false)

const form = ref<ProjectForm>({
  nome: '',
  descricao: '',
  preco: 0,
  tipo: '',
  categoria: ''
})

const createProject = async () => {
  if (!form.value.nome || !form.value.descricao || !form.value.tipo || !form.value.categoria) {
    message.value = 'Por favor, preencha todos os campos obrigatórios'
    isSuccess.value = false
    return
  }
    loading.value = true
    const projectData = {
      ...form.value,
      tipo: form.value.tipo as 'Web' | 'Mobile'
    }
    
    await projectsStore.createProject(projectData)
    message.value = 'Projeto criado com sucesso!'
    isSuccess.value = true
    
    setTimeout(() => {
      router.push('/projects')
    }, 100)
    loading.value = false
  } 
    


const goBack = () => {
  router.push('/projects')
}

useHead({
  title: 'Novo Projeto - TodoList'
})

definePageMeta({
  middleware: 'auth'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center space-x-4">
            <button
              @click="goBack"
              class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Voltar
            </button>
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Novo Projeto</h1>
              <p class="mt-1 text-sm text-gray-500">Crie um novo projeto</p>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <form @submit.prevent="createProject" class="space-y-6">
            <div>
              <label for="nome" class="block text-sm font-medium text-gray-700">Nome do Projeto *</label>
              <input
                id="nome"
                v-model="form.nome"
                type="text"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Digite o nome do projeto"
              />
            </div>

            <div>
              <label for="descricao" class="block text-sm font-medium text-gray-700">Descrição *</label>
              <textarea
                id="descricao"
                v-model="form.descricao"
                rows="4"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Descreva o projeto"
              ></textarea>
            </div>

            <div>
              <label for="preco" class="block text-sm font-medium text-gray-700">Preço</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm">R$</span>
                </div>
                <input
                  id="preco"
                  v-model="form.preco"
                  type="number"
                  min="0"
                  step="0.01"
                  class="pl-12 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="0,00"
                />
              </div>
            </div>

            <div>
              <label for="tipo" class="block text-sm font-medium text-gray-700">Tipo *</label>
              <select
                id="tipo"
                v-model="form.tipo"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Selecione um tipo</option>
                <option value="Web">Web</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>

            <div>
              <label for="categoria" class="block text-sm font-medium text-gray-700">Categoria *</label>
              <input
                id="categoria"
                v-model="form.categoria"
                type="text"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Digite a categoria do projeto"
              />
            </div>

            <div v-if="message" :class="[
              'text-sm text-center p-3 rounded-md',
              isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            ]">
              {{ message }}
            </div>

            <div class="flex justify-end space-x-3">
              <button
                type="button"
                @click="goBack"
                class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ loading ? 'Criando...' : 'Criar Projeto' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template> 