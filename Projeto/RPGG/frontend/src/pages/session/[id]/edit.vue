<template>
  <Modal class="session-edit">
    <div class="header">
      <SessionHeader :user="user" :session="session" />
    </div>
    <div class="body">
      <SessionForm :session="session" />
    </div>
  </Modal>
</template>
<style scoped>
.session-edit {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.session-edit .header {
  display: flex;
  align-self: flex-start;
  justify-content: space-between;
  width: 100%;
}

.session-edit .body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1 1;
  width: 100%;
}
</style>

<script setup lang="ts">
import { SessionEntity } from '~~/src/entities/session.entity';
import { UserEntity } from '~~/src/entities/user.entity';

const user = useCookie<UserEntity>('user')


const { params } = useRoute()

const { data: session, error, pending, refresh } = await useFetch<SessionEntity>(
  `/session/${params?.id}/`,
  {
    baseURL: 'http://localhost:8000/api',
    method: 'GET'
  })

</script>