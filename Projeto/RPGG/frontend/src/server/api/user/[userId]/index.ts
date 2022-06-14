import { UserEntity } from "~~/src/entities/user.entity";


export default defineEventHandler(async ({ context: { params } }) => {
  const { userId } = params;
  const baseURL = process.env.API_URL
  const user = await $fetch<UserEntity>(
    `/user/${userId}`,
    {
      baseURL,
      method: 'GET',
    }
  )

  user.mySessions = await $fetch(`/user/${user.id}/session/mySession`, {
    baseURL,
    method: 'GET',
  })
  user.sessions = await $fetch(`/user/${user.id}/session`, {
    baseURL,
    method: 'GET',
  })
  return user
})