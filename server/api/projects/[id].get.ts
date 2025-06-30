import db from '../../../db.json'
import type { Project } from '../../types'

export default defineEventHandler(async (event) => {
  const idParam = getRouterParam(event, 'id')
  if (!idParam) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID é obrigatório'
    })
  }
  
  const project = db.projects.find((p) => p.id.toString() === idParam)
  
  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Projeto não encontrado'
    })
  }
  
  const typedProject: Project = {
    id: typeof project.id === 'string' ? parseInt(project.id) || 0 : project.id,
    nome: project.nome,
    descricao: project.descricao,
    preco: project.preco,
    tipo: project.tipo,
    categoria: project.categoria
  }
  
  return typedProject
}) 