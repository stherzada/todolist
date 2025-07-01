<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useProjects } from '~/stores/projects'

interface Project {
  id: string
  nome: string
  descricao: string
  preco: number
  tipo: 'Web' | 'Mobile'
  categoria: string
}

const route = useRoute()
const router = useRouter()
const projectsStore = useProjects()
const project = ref<Project | null>(null)
const loading = ref(true)
const error = ref('')

const projectId = route.params.id as string

const fetchProject = async () => {
    loading.value = true
    const projectData = await projectsStore.getProjectById(projectId)
    if (projectData) {
      project.value = projectData
    } else {
      error.value = 'Projeto não encontrado'
    }
    loading.value = false
  } 
const formatPrice = (price: number) => {
  return price.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}
const goBack = () => {
  router.push('/projects')
}

const editProject = () => {
  router.push(`/projects/${projectId}/edit`)
}

onMounted(() => {
  fetchProject()
})


useHead({
  title: computed(() => project.value ? `${project.value.nome} - Projetos` : 'Projeto - TodoList'),
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
              <h1 class="text-3xl font-bold text-gray-900">Detalhes do Projeto</h1>
              <p class="mt-1 text-sm text-gray-500">Visualize as informações completas do projeto</p>
            </div>
          </div>
          <button
            v-if="project"
            @click="editProject"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            Editar Projeto
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>

      <div v-else-if="error" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">{{ error }}</h3>
        <div class="mt-6">
          <button
            @click="goBack"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Voltar aos Projetos
          </button>
        </div>
      </div>

      <div v-else-if="project" class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">{{ project.nome }}</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">ID: {{ project.id }}</p>
        </div>
        <div class="border-t border-gray-200">
          <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div class="text-sm font-medium text-gray-500">Nome</div>
              <div class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ project.nome }}</div>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div class="text-sm font-medium text-gray-500">Descrição</div>
              <div class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ project.descricao }}</div>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div class="text-sm font-medium text-gray-500">Preço</div>
              <div class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">R$ {{ formatPrice(project.preco) }}</div>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div class="text-sm font-medium text-gray-500">Tipo</div>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <span
                  :class="{
                    'bg-blue-100 text-blue-800': project.tipo === 'Web',
                    'bg-green-100 text-green-800': project.tipo === 'Mobile'
                  }"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                >
                  {{ project.tipo }}
                </span>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div class="text-sm font-medium text-gray-500">Categoria</div>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {{ project.categoria }}
                </span>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </main>
  </div>
</template> 