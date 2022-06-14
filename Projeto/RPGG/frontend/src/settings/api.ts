import { UseFetchOptions } from "nuxt/dist/app/composables";

export const BASE_URL = 'http://localhost:8000/api/';

export const api = (request: any, options?: UseFetchOptions<ResponseType>) => $fetch(request, {
  baseURL: BASE_URL,
  ...options
})