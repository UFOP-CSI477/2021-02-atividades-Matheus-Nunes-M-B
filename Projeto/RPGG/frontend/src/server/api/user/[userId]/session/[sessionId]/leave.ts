import { SheetEntity } from "~~/src/entities/sheet.entity";


export default defineEventHandler(async ({ context: { params } }) => {
  const { userId, sessionId } = params;
  const baseURL = process.env.API_URL
  const sheet = await $fetch<SheetEntity>(
    `/user/${userId}/session/${sessionId}/leave`,
    {
      baseURL,
      method: 'POST',
    }
  )

  return sheet
})