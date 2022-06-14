import { useNuxt } from "@nuxt/kit"
import { UserEntity } from "../entities/user.entity"


export default defineEventHandler(async (event) => {
  const { username } = await useBody<{ username: string }>(event)

  const entity = await $fetch<UserEntity>(`/user/username/${username}`, {
    baseURL: `http://localhost:8000/api`,
    method: "GET",
  })
  return entity
})
