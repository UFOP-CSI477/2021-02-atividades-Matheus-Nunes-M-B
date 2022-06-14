<template>
  <div class="header-layout header-left">
    <SessionAvatar class="avatar" v-if="session.avatar" :avatar="session.avatar" />
    <h1>{{ session.status }}</h1>
  </div>
  <div class="header-layout header-center">
    <h1>{{ session.name }}</h1>
  </div>
  <div class="header-layout header-right">
    <div class="session-options">
      <button v-if="session.masterId !== user.id" class="action" @click="leaveSession()">Sair da Sessao</button>
      <button v-else class="action" @click="openConfigSession()">
        Configurar
      </button>
      <Popup v-if="configuringSession" @closed="closePopups()">
        <div class="edit-session-popup">
          <input type="text" placeholder="Nome da Sessão" v-model="editBody.name">
          <SelectableOptions :default-option="'offline'" @optionChange="(type) => editBody.status = type"
            :options="statusOptions">
          </SelectableOptions>
          <div class="edit-session-actions">
            <button class="btn-primary" @click="() => { $emit('updated'); updateSession() }">Enviar Alterações</button>
            <button class="btn-danger" @click="deleteSession()">Deletar</button>
          </div>
        </div>
      </Popup>
    </div>
  </div>

</template>
<style scoped>
@import "~/styles/form.style.css";

.edit-session-popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
}

.edit-session-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

.edit-session-actions input,
.edit-session-actions button {
  margin: 10px;
}

.header-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.header-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.header-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 3 3;
}

.header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
}
</style>
<script setup lang="ts">
import { SessionEntity, SessionStatus } from '~~/src/entities/session.entity';
import { UserEntity } from '~~/src/entities/user.entity';
interface Props {
  session: SessionEntity;
  user: UserEntity;
}

defineEmits(['updated'])
const { session, user } = defineProps<Props>()

const configureSession = async () => {
  await navigateTo(`/session/${session.id}/edit`)
}
const leaveSession = async () => {
  const { data, error } = await useFetch<SessionEntity>(
    `/api/user/${user.id}/session/${session.id}/leave`)
  if (data.value.id === session.id) {
    await navigateTo(`/user/${user.id}`)
  }
}

const closePopups = () => {
  configuringSession.value = false;
}


const configuringSession = ref(false)
const openConfigSession = () => {
  closePopups()
  configuringSession.value = true
}
const statusOptions = {
  [SessionStatus.OFFLINE]: 'Offline',
  [SessionStatus.ONLINE]: 'Online',
  [SessionStatus.CLOSED]: 'Closed',
  [SessionStatus.COMPLETED]: 'Commpleted'
}
const editBody = ref<SessionEntity>({} as SessionEntity)

const updateSession = async () => {
  console.log(editBody.value)
  const { data, error } = await useFetch(`/api/session/${session.id}`, {
    method: 'PATCH',
    body: editBody.value
  })
  closePopups()
}

const deleteSession = async () => {
  const { data, error } = await useFetch(`/api/session/${session.id}`, {
    method: 'DELETE',
  })
  closePopups()
  await navigateTo(`/user/${user.id}`)
}

</script>
