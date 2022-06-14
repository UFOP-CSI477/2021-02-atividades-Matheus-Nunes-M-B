import { UserEntity } from "../server/entities/user.entity"

export default defineNuxtPlugin(async (nuxtApp) => {
  return {
    provide: {
      getAuthToken: async () => {
        const token = useCookie<{ sub: number }>("token")
        const sub = (await token?.value)?.sub
        if (!sub) {
          await navigateTo('/login')
        }
        return sub
      }
    }
  }
})
