import { writeFileSync, readFileSync } from 'fs'
import { resolve } from 'path'
import type { Project } from '../../types'

export default defineEventHandler(async (event) => {
  const idParam = getRouterParam(event, 'id')
  if (!idParam) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID é obrigatório'
    })
  }
  const id = idParam
  const body = await readBody(event)
  const dbPath = resolve(process.cwd(), 'db.json')
  const db = JSON.parse(readFileSync(dbPath, 'utf-8'))
  
  const projectIndex = db.projects.findIndex((p: Project) => p.id === id)
  
  if (projectIndex === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Projeto não encontrado'
    })
  }
  
  db.projects[projectIndex] = {
    ...db.projects[projectIndex],
    ...body
  }
  
  writeFileSync(dbPath, JSON.stringify(db, null, 2))
  return db.projects[projectIndex]
}) 