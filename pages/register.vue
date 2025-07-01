<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'


const schema = yup.object({
  nome: yup.string().min(2, 'Nome deve ter pelo menos 2 caracteres').required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  senha: yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
  confirmarSenha: yup.string()
    .oneOf([yup.ref('senha')], 'Senhas devem ser iguais')
    .required('Confirmação de senha é obrigatória')
})

type RegisterForm = yup.InferType<typeof schema>

const isLoading = ref(false)
const message = ref('')
const isSuccess = ref(false)

const { register } = useAuth()
const router = useRouter()

const handleRegister = async (values: Object) => {
  const typedValues = values as RegisterForm
  isLoading.value = true
  message.value = ''
    const result = await register(typedValues.nome, typedValues.email, typedValues.senha)
    if (result.success) {
      isSuccess.value = true
      message.value = result.message
      
      setTimeout(() => {
        router.push('/')
      }, 1000)
    } else {
      isSuccess.value = false
      message.value = result.message
    }
    isLoading.value = false
  } 



  useHead({
    title: 'Registro - TodoList',
    meta: [
      { name: 'description', content: 'Crie sua conta TodoList' }
    ]
  })

definePageMeta({
  middleware: 'guest'
})
</script> 

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Criar nova conta
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Ou
          <NuxtLink to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
            entrar na sua conta existente
          </NuxtLink>
        </p>
      </div>
      
      <Form :validation-schema="schema" @submit="handleRegister" class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="nome" class="sr-only">Nome</label>
            <Field
              id="nome"
              name="nome"
              type="text"
              autocomplete="name"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Nome completo"
            />
            <ErrorMessage name="nome" class="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label for="email" class="sr-only">Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email"
            />
            <ErrorMessage name="email" class="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label for="senha" class="sr-only">Senha</label>
            <Field
              id="senha"
              name="senha"
              type="password"
              autocomplete="new-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Senha"
            />
            <ErrorMessage name="senha" class="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label for="confirmarSenha" class="sr-only">Confirmar Senha</label>
            <Field
              id="confirmarSenha"
              name="confirmarSenha"
              type="password"
              autocomplete="new-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Confirmar senha"
            />
            <ErrorMessage name="confirmarSenha" class="text-red-500 text-sm mt-1" />
          </div>
        </div>

        <div v-if="message" :class="[
          'text-sm text-center p-3 rounded-md',
          isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        ]">
          {{ message }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ isLoading ? 'Criando conta...' : 'Criar conta' }}
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

