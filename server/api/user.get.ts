export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Usuário não autenticado'
    })
  }
  return {
    success: true,
    user: {
      id: user.id,
      nome: user.nome,
      email: user.email
    },
    message: 'Informações do usuário recuperadas com sucesso'
  }
}) 