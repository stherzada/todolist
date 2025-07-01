export default defineNuxtPlugin(() => {
  const { initAuth } = useAuth()
  
  onMounted(() => {
    initAuth()
  })
}) 