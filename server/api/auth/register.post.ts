import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import type { User } from '../../types'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { email, senha, nome } = body

    if (!email || !senha || !nome) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Nome, email e senha são obrigatórios'
      })
    }

    const dbPath = resolve(process.cwd(), 'db.json')
    const dbContent = readFileSync(dbPath, 'utf-8')
    const db = JSON.parse(dbContent)

    const existingUser = db.users.find((u: User) => u.email === email)
    if (existingUser) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Email já cadastrado'
      })
    }

    const newId = Date.now().toString()

    const newUser = {
      id: newId,
      email,
      senha,
      nome
    }

    db.users.push(newUser)

    writeFileSync(dbPath, JSON.stringify(db, null, 2))

    const { senha: _, ...userWithoutPassword } = newUser

    return {
      success: true,
      user: userWithoutPassword,
      message: 'Usuário registrado com sucesso'
    }
  } 
  
) 