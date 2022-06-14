import { RollEntity } from "~~/src/entities/roll.entity"


export default defineEventHandler(async (event) => {
  const { username } = await useBody<{ username: string }>(event)
  const method = event.req.method
  const baseURL = process.env.API_URL
  if (method === 'POST') {
    const body = await useBody(event)
    const entity = await $fetch<RollEntity>(`/roll`, {
      baseURL,
      body,
      method: 'POST',
    })
    return entity
  }
})
