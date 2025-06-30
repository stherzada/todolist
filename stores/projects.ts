import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Project {
    id: string
    nome: string
    descricao: string
    preco: number
    tipo: 'Web' | 'Mobile'
    categoria: string
}

export const useProjects = defineStore('projects', () => {
    const projects = ref<Project[]>([])
    const getProjects = async () => {
        const { data } = await useFetch('/api/projects')
        projects.value = (data.value as unknown as Project[]) || []
    }

    const getProjectById = async (id: string) => {
        const { data } = await useFetch(`/api/projects/${id}`)
        return data.value as unknown as Project
    }

    const createProject = async (project: Omit<Project, 'id'>) => {
        const { data } = await useFetch('/api/projects', {
            method: 'POST',
            body: project
        })
        if (data.value) {
            projects.value.push(data.value as Project)
        }
        return data.value
    }

    const updateProject = async (id: string, project: Partial<Project>) => {
        const { data } = await useFetch(`/api/projects/${id}`, {
            method: 'PUT',
            body: project
        })
        if (data.value) {
            const index = projects.value.findIndex(p => p.id === id)
            if (index !== -1) {
                projects.value[index] = data.value as Project
            }
        }
        return data.value
    }

    const deleteProject = async (id: string) => {
        await useFetch(`/api/projects/${id}`, {
            method: 'DELETE'
        })
        projects.value = projects.value.filter(p => p.id !== id)
    }

    return {
        projects,
        getProjects,
        getProjectById,
        createProject,
        updateProject,
        deleteProject
    }
})