<template>
  <Modal class="session">
    <div class="header">
      <SessionHeader :user="user" :session="session" />
    </div>
    <hr width="100%">
    <div class="body">
      <SessionSheets :user="user" :session="session" />
      <SessionRolls :user="user" :session="session" />
    </div>
  </Modal>
</template>
<style scoped>
.session {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.session .header {
  display: flex;
  align-self: flex-start;
  justify-content: space-between;
  width: 100%;
}

.session .body {
  display: flex;
  align-self: flex-start;
  justify-content: space-between;
  width: 100%;
  flex-grow: 1;
}

.session-options {
  display: flex;
  align-items: flex-center;
  flex-shrink: 0;
}

.session-config {
  margin-left: 10px;
  width: 50px;
  height: 50px;
  background: none;
  border-radius: 50%;
}

.session-config:hover {
  cursor: pointer;
  background: #ffffff10;
}

.session-config img {
  width: 30px;
}
</style>

<script setup lang="ts">

import { SessionEntity } from '~~/src/entities/session.entity';
import { UserEntity } from '~~/src/entities/user.entity';
definePageMeta({
  middleware: ['auth']
})
const user = useCookie<UserEntity>('user')


const { params } = useRoute()

const { data: session, error, pending, refresh } = await useFetch<SessionEntity>(
  `/session/${params?.id}/`,
  {
    baseURL: 'http://localhost:8000/api',
    method: 'GET'
  })

</script>
