<template>
  <form @submit.prevent="onSubmit">
    <div class="form">
      <h1>Create Session</h1>
      <SessionAvatar class="avatar" :avatar="avatar" />
      <div class="form-control">
        <input v-model="body.name" class="input-text" id="name" type="text" placeholder="name" />
      </div>
      <div class="form-control">
        <input v-model="body.background" class="input-text" id="background" type="text" placeholder="background" />
      </div>
      <div class="form-control">
        <input v-model="avatar" class="input-text" id="avatar" type="text" placeholder="avatar" />
      </div>
      <div class="form-control-actions">
        <button class="btn-primary action" type="submit">Create</button>
      </div>
      <h1></h1>
    </div>
  </form>
</template>
<style scoped>
@import '~/styles/form.style.css';

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 40px;
  background: grey;
}
</style>
<script setup lang="ts">
import { SessionEntity } from '~~/src/entities/session.entity';
import { UserEntity } from '~~/src/entities/user.entity';

interface Props {
  user: UserEntity;
}
const { user } = defineProps<Props>()


const body = {
  name: "",
  background: "",
}
const avatar = ref("")

const onSubmit = async () => {
  const { data: { value: session } } = await useFetch<SessionEntity>(
    `/user/${user.id}/session/`,
    {
      baseURL: 'http://localhost:8000/api',
      method: 'POST',
      body: { ...body, avatar: avatar.value },
      pick: ['id']
    })
  await navigateTo({
    path: `/session/${session.id}`
  })
}
</script>