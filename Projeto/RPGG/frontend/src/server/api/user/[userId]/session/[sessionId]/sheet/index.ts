import { SheetEntity } from "~~/src/entities/sheet.entity";


export default defineEventHandler(async (event) => {
  const { userId, sessionId } = event.context.params;
  const method = event.req.method
  const baseURL = process.env.API_URL
  if (method === 'GET') {
    const sheets = await $fetch<SheetEntity[]>(
      `/user/${userId}/session/${sessionId}/sheet`,
      {
        baseURL,
        method: 'GET',
      }
    )
  
    return sheets
  }
  if (method === 'POST') {
    const body = await useBody(event)
    const sheet = await $fetch<SheetEntity>(
      `/user/${userId}/session/${sessionId}/sheet`,
      {
        baseURL,
        body,
        method: 'POST',
      }
    )
    return sheet
  }
})