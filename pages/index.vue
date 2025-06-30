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
const projectsStore = useProjects()
const loading = ref(true)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const editingProject = ref<Project | null>(null)
const form = ref({
  nome: '',
  descricao: '',
  preco: 0,
  tipo: '' as 'Web' | 'Mobile' | '',
  categoria: ''
})

const fetchProjects = async () => {
    loading.value = true
    await projectsStore.getProjects()
    loading.value = false
}

const createProject = async () => {
    const projectData = {
      ...form.value,
      tipo: form.value.tipo as 'Web' | 'Mobile'
    }
    await projectsStore.createProject(projectData)
    closeModal()
    resetForm()
  
  
}

const updateProject = async () => {
  if (!editingProject.value) return
    const projectData = {
      ...form.value,
      tipo: form.value.tipo as 'Web' | 'Mobile'
    }
    await projectsStore.updateProject(editingProject.value.id, projectData)
    closeModal()
    resetForm()
 } 


const deleteProject = async (id: string) => {
  if (!confirm('Tem certeza que deseja excluir este projeto?')) return
  await projectsStore.deleteProject(id)
}

const editProject = (project: Project) => {
  editingProject.value = project
  form.value = { ...project }
  showEditModal.value = true
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  editingProject.value = null
  resetForm()
}

const resetForm = () => {
  form.value = {
    nome: '',
    descricao: '',
    preco: 0,
    tipo: '',
    categoria: ''
  }
}

const formatPrice = (price: number) => {
  return price.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

onMounted(() => {
  fetchProjects()
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
          <button
            @click="showCreateModal = true"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Novo Projeto
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>

      <div v-else-if="projectsStore.projects && projectsStore.projects.length > 0" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
         {{ projectsStore.projects.length }} projetos encontrados 
        <div
          v-for="project in (projectsStore.projects || [])"
          :key="project.id"
          class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
        >
          <div class="p-6">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-gray-900 truncate">{{ project.nome }}</h3>
              <div class="flex space-x-2">
                <button
                  @click="editProject(project)"
                  class="text-gray-400 hover:text-indigo-600 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <button
                  @click="deleteProject(project.id)"
                  class="text-gray-400 hover:text-red-600 transition-colors"
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

     
      <div v-else class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum projeto encontrado</h3>
        <p class="mt-1 text-sm text-gray-500">Comece criando seu primeiro projeto.</p>
        <div class="mt-6">
          <button
            @click="showCreateModal = true"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Criar Projeto
          </button>
        </div>
      </div>
    </main>

    <div v-if="showCreateModal || showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ showEditModal ? 'Editar Projeto' : 'Novo Projeto' }}
          </h3>
          
          <form @submit.prevent="showEditModal ? updateProject() : createProject()">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Nome</label>
                <input
                  v-model="form.nome"
                  type="text"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Descrição</label>
                <textarea
                  v-model="form.descricao"
                  rows="3"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Preço</label>
                <input
                  v-model="form.preco"
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Tipo</label>
                <select
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
                <label class="block text-sm font-medium text-gray-700">Categoria</label>
                <input
                  v-model="form.categoria"
                  type="text"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div class="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {{ showEditModal ? 'Atualizar' : 'Criar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 