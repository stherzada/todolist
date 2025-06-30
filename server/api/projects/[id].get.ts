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
  
  const project = db.projects.find((p) => p.id === idParam)
  
  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Projeto não encontrado'
    })
  }
  
  return project as Project
}) 