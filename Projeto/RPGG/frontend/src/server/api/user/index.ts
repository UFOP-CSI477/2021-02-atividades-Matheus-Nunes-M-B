import { UserEntity, UserTypeEnum } from '../../entities/user.entity';


export default defineEventHandler(async (event) => {
  const body = await useBody(event)

  const user = await $fetch<UserEntity>("/user", {
    baseURL: "http://localhost:8000/api",
    method: "POST",
    body
  })
  return user
})
