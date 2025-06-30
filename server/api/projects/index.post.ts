import { writeFileSync, readFileSync } from 'fs'
import { resolve } from 'path'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const dbPath = resolve(process.cwd(), 'db.json')
  const db = JSON.parse(readFileSync(dbPath, 'utf-8'))
  
  if (!db.projects) {
    db.projects = []
  }
  
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000)
  const newId = `${timestamp}${random}`
  
  const newProject = {
    id: newId,
    ...body
  }
  
  db.projects.push(newProject)
  
  writeFileSync(dbPath, JSON.stringify(db, null, 2))
  
  return newProject
}) 