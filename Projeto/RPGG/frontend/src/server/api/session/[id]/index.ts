
export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const body = await useBody(event);
  const method = event.req.method
  const baseURL = process.env.API_URL
  if (method == "PATCH") {
    const { affected } = await $fetch<{ affected: number }>(
      `/session/${id}`,
      {
        baseURL,
        body,
        method: 'PATCH',
      }
      )
      return affected === 1
    }
    
  if (method == "DELETE") {
    const { affected } = await $fetch<{ affected: number }>(
      `/session/${id}`,
      {
        baseURL,
        method: 'DELETE',
      }
      )
      return affected === 1
    }
  return false
})