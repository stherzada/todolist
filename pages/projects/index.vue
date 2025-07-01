<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useProjects } from '~/stores/projects'

definePageMeta({
  middleware: 'auth'
})

const projectsStore = useProjects()
const loading = ref(true)

const fetchProjects = async () => {
    loading.value = true
    await projectsStore.getProjects()
    loading.value = false
}

const deleteProject = async (id: string) => {
  if (!confirm('Tem certeza que deseja excluir este projeto?')) return
  await projectsStore.deleteProject(id)
}

const formatPrice = (price: number) => {
  return price.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

const hasProjects = computed(() => {
  return projectsStore.projects.length > 0
})

const shouldShowProjects = computed(() => {
  return !loading.value && hasProjects.value
})

const shouldShowEmptyState = computed(() => {
  return !loading.value && !hasProjects.value
})

const { logout } = useAuth()


onMounted(() => {
  fetchProjects()
})

useHead({
  title: 'Projetos - TodoList'
})

</script>


<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm border-b">
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Gerenciador de Projetos</h1>
            <p class="mt-1 text-sm text-gray-500">Gerencie seus projetos de forma simples e eficiente</p>
          </div>
          <NuxtLink
            to="/projects/newProject"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Novo Projeto
          </NuxtLink>
          <button @click="logout"> <NuxtLink to="/login">logout</NuxtLink></button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>

      <div v-else-if="shouldShowProjects" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="project in (projectsStore.projects || [])"
          :key="project.id"
          class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
        >
          <div class="p-6">
            <div class="flex items-center justify-between">
              <NuxtLink :to="`/projects/${project.id}`" class="text-lg font-medium text-gray-900 truncate hover:text-indigo-600 transition-colors">
                {{ project.nome }}
              </NuxtLink>
              <div class="flex space-x-2">
                <NuxtLink
                  :to="`/projects/${project.id}`"
                  class="text-gray-400 hover:text-blue-600 transition-colors"
                  title="Visualizar projeto"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </NuxtLink>
                <NuxtLink
                  :to="`/projects/${project.id}/edit`"
                  class="text-gray-400 hover:text-indigo-600 transition-colors"
                  title="Editar projeto"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </NuxtLink>
                <button
                  @click="deleteProject(project.id)"
                  class="text-gray-400 hover:text-red-600 transition-colors"
                  title="Excluir projeto"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <p class="mt-2 text-sm text-gray-600 line-clamp-2">{{ project.descricao }}</p>
            
            <div class="mt-4 flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span
                  :class="{
                    'bg-blue-100 text-blue-800': project.tipo === 'Web',
                    'bg-green-100 text-green-800': project.tipo === 'Mobile'
                  }"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                >
                  {{ project.tipo }}
                </span>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {{ project.categoria }}
                </span>
              </div>
              <div class="text-lg font-semibold text-gray-900">
                R$ {{ formatPrice(project.preco) }}
              </div>
            </div>
          </div>
        </div>
      </div>     
      <div v-else-if="shouldShowEmptyState" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum projeto encontrado</h3>
        <p class="mt-1 text-sm text-gray-500">Comece criando seu primeiro projeto.</p>
        <div class="mt-6">
          <NuxtLink
            to="/projects/newProject"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Criar Projeto
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>


<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 