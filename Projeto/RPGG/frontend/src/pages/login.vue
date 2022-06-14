<template>
  <Modal>
    <form @submit.prevent="onSubmit">
      <div class="form">
        <h1>RPGG</h1>
        <h2>Login</h2>
        <div class="form-control">
          <input v-model="body.username" class="input-text" id="username" type="text" placeholder="Username" />
        </div>
        <div class="form-control-actions">
          <button class="btn-primary action" type="submit" :disabled="submiting">Login</button>
          <NuxtLink to="/register">Não tem uma conta?</NuxtLink>
        </div>
        <h1></h1>
      </div>
    </form>
  </Modal>
</template>
<style scoped>
@import '~/styles/form.style.css';
</style>
<script setup lang="ts">
import { UserEntity } from '../server/entities/user.entity';


const { $getAuthToken } = useNuxtApp()
const sub = await $getAuthToken()
if (sub) {
  navigateTo(`/user/${sub}`)
}

const body = {
  username: ""
}
const submiting = ref(false)
const onSubmit = async () => {
  const { data: { value: user }, error, pending, refresh } = await useLazyFetch(
    '/api/login',
    {
      method: 'POST',
      body
    })
  if (error.value) {
    return
  }
  submiting.value = pending.value
  watch(pending, () => {
    submiting.value = pending.value
  })
  const tokenCookie = useCookie<{ sub: number }>("token")
  tokenCookie.value = { sub: user.id }

  const userCookie = useCookie<UserEntity>("user")
  userCookie.value = user
  await navigateTo({
    path: `/user/${user.id}`
  })
}
</script>