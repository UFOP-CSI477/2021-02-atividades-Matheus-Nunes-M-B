export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie<{ sub: number }>('token')
  if (!token?.value?.sub) {
    return navigateTo('/login')
  }
})
