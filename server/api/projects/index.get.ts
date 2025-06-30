import db from '../../../db.json'
import type { Project } from '../../types'
export default defineEventHandler(async (event) => {
  return db.projects as unknown as Project[]
}) 