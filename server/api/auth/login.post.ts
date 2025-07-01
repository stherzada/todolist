import { readFileSync } from 'fs'
import { resolve } from 'path'
import type { User } from '../../types'

export default defineEventHandler(async (event) => {
  
    const body = await readBody(event)
    const { email, senha } = body

    if (!email || !senha) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email e senha são obrigatórios'
      })
    }

    const dbPath = resolve(process.cwd(), 'db.json')
    const dbContent = readFileSync(dbPath, 'utf-8')
    const db = JSON.parse(dbContent)

    const user = db.users.find((u: User) => u.email === email && u.senha === senha)

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Credenciais inválidas'
      })
    }

    const { senha: _, ...userWithoutPassword } = user

    return {
      success: true,
      user: userWithoutPassword,
      message: 'Login realizado com sucesso'
    }
  
  
}) 