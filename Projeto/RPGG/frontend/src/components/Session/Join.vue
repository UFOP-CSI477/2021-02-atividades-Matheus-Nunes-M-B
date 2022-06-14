<template>
  <form @submit.prevent="onSubmit">
    <div class="form">
      <h1>Entrar na Sessão</h1>
      <div class="form-control">
        <input v-model="sessionId" class="input-text" id="sessionId" type="text" placeholder="Id da Sessão" />
      </div>
      <div class="form-control-actions">
        <button class="btn-primary action" type="submit">Entrar</button>
      </div>
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

.form {
  padding: 50px 100px;
}

.form-control {
  margin-top: 20px;
}
</style>
<script setup lang="ts">
import { SessionEntity } from '~~/src/entities/session.entity';
import { UserEntity } from '~~/src/entities/user.entity';
interface Props {
  user: UserEntity;
}
const { user } = defineProps<Props>()


const sessionId = ref("")
const error = ref<boolean | Error>()

const onSubmit = async () => {
  const { data: { value: session }, error: err } = await useFetch<SessionEntity>(
    `/user/${user.id}/session/${sessionId.value}/join`,
    {
      baseURL: 'http://localhost:8000/api',
      method: 'POST',
      pick: ['id']
    })
  error.value = err.value
  await navigateTo({
    path: `/session/${sessionId.value}`
  })
}
</script>