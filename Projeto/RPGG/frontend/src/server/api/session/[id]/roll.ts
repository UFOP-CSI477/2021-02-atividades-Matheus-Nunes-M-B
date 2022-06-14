import { RollEntity } from "~~/src/entities/roll.entity"


export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const method = event.req.method
  const baseURL = process.env.API_URL
  if (method === 'GET') {
    const entity = await $fetch<RollEntity>(`/session/${id}/roll`, {
      baseURL,
      method: 'GET',
    })
    return entity
  }
  return;
})
