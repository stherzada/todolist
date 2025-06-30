import db from '../../../db.json'

export default defineEventHandler(async (event) => {
  const idParam = getRouterParam(event, 'id')
  if (!idParam) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID é obrigatório'
    })
  }
  
  const id = parseInt(idParam)
  const project = db.projects.find(p => p.id === id)
  
  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Projeto não encontrado'
    })
  }
  
  return project
}) 